"""Spoken Hebrew for the phrases page via Google Cloud Text-to-Speech.

Same pipeline as the Shalom City game (playable-debug
games/hebrew-shalom-city/scripts/tts/generate.py), same voices and rate:

1. Every synthesis is cached by a hash of its request (.cache/, git-ignored),
   so the same voice + text + rate is never paid for twice. The game's own
   cache is read too (never written), so a line the game already paid for
   is reused. --force only re-renders the mp3s from the cache.
2. Every billed call is appended to spend.csv (timestamp, endpoint, voice,
   text, characters, estimated cost). The cap covers the whole job: what
   spend.csv already holds plus this run must stay within --cap-usd (the
   owner's limit), or the run stops before any call.
3. Each clip is trimmed to ~100 ms of silence at each end, brought to one
   loudness, mono mp3, written to public/audio/phrases/.

The clip list is phrases-clips.json, built by phrases-manifest.mjs from
src/data/hebrew-phrases.ts. The service-account key is read from --key
(never copied, never printed). Run with the venv that has
google-cloud-texttospeech:

    PY=~/Developer/android/hangul_hero/tools/korean_tts/.venv/bin/python
    node scripts/tts/phrases-manifest.mjs
    $PY scripts/tts/generate.py --dry-run
    $PY scripts/tts/generate.py --cap-usd 0.10
    $PY scripts/tts/generate.py --index      # only rewrite src/data/phrase-audio.json
"""

import argparse, csv, datetime, hashlib, json, subprocess, sys, tempfile
from pathlib import Path

HERE = Path(__file__).parent
SITE = HERE.parent.parent
MANIFEST = HERE / "phrases-clips.json"
CACHE = HERE / ".cache"
# Read-only: raw syntheses the game already paid for (same request key).
SHARED_CACHES = [Path.home() / "Desktop/playable-debug/games/hebrew-shalom-city/scripts/tts/.cache"]
LEDGER = HERE / "spend.csv"
OUT = SITE / "public" / "audio" / "phrases"
INDEX = SITE / "src" / "data" / "phrase-audio.json"
DEFAULT_KEY = Path.home() / "Developer/android/hangul_hero/tools/korean_tts/gcloud-key.json"
# USD per character beyond the free tier (Google list prices); the estimate
# ignores the monthly free tier, so it is an upper bound.
PRICE = {"Chirp3-HD": 30e-6, "Wavenet": 16e-6, "Neural2": 16e-6, "Standard": 4e-6}

ap = argparse.ArgumentParser()
ap.add_argument("--dry-run", action="store_true", help="print what would be synthesised, no calls")
ap.add_argument("--only", nargs="*", help="clip files to render, e.g. --only f-192522cb0e")
ap.add_argument("--force", action="store_true", help="re-render existing mp3s (from cache when possible)")
ap.add_argument("--cap-usd", type=float, default=0.10, help="whole-job limit: spend.csv so far plus this run")
ap.add_argument("--index", action="store_true", help="only rewrite src/data/phrase-audio.json from the mp3s")
ap.add_argument("--key", type=Path, default=DEFAULT_KEY, help="service-account JSON key")
args = ap.parse_args()

data = json.loads(MANIFEST.read_text(encoding="utf-8"))
rate = data.get("rate", 1.0)
voices = data["voices"]
clips = data["clips"]


def price_of(voice, text):
    tier = next((t for t in PRICE if t in voice), "Chirp3-HD")
    return PRICE[tier] * len(text)


def request_key(voice, text):
    body = json.dumps({"voice": voice, "text": text, "rate": rate, "enc": "MP3"}, ensure_ascii=False, sort_keys=True)
    return hashlib.sha256(body.encode("utf-8")).hexdigest()[:24]


def cached(voice, text):
    name = f"{request_key(voice, text)}.mp3"
    for folder in [CACHE, *SHARED_CACHES]:
        if (folder / name).exists():
            return folder / name
    return None


def spent_so_far():
    if not LEDGER.exists():
        return 0.0
    with LEDGER.open(encoding="utf-8") as fh:
        return sum(float(row["est_usd_upper_bound"]) for row in csv.DictReader(fh))


def write_index():
    """src/data/phrase-audio.json: "<gender>|<Hebrew as shown>" -> file and
    length in ms, for every clip that exists. Lines without a clip get no
    play button (and fail phrases-manifest.mjs --check)."""
    index = {}
    for clip in clips:
        path = OUT / clip["file"]
        if not path.exists():
            continue
        seconds = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                                 capture_output=True, text=True, check=True).stdout.strip()
        index[f"{clip['gender']}|{clip['text']}"] = {"file": clip["file"], "ms": round(float(seconds) * 1000)}
    INDEX.write_text(json.dumps({"note": "Written by scripts/tts/generate.py; do not edit by hand.",
                                 "voices": voices, "clips": index}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"Index: {len(index)} of {len(clips)} clips -> {INDEX.relative_to(SITE)}")


if args.index:
    write_index()
    raise SystemExit

jobs = []  # (voice, say, target, label)
for clip in clips:
    name = clip["file"].removesuffix(".mp3")
    if args.only and name not in args.only:
        continue
    target = OUT / clip["file"]
    if target.exists() and not args.force:
        continue
    jobs.append((voices[clip["gender"]], clip["say"], target, f"{name} {clip['text']}"))

billed = [(v, t) for v, t, _, _ in jobs if not cached(v, t)]
cost = sum(price_of(v, t) for v, t in billed)
spent = spent_so_far()
print(f"Clips: {len(jobs)}, new syntheses (billed): {len(billed)}, "
      f"{sum(len(t) for _, t in billed)} characters, est. at most ${cost:.4f}; "
      f"spend.csv so far ${spent:.4f}; cap ${args.cap_usd:.2f} for the whole job")

if args.dry_run:
    for voice, text, target, label in jobs:
        hit = cached(voice, text)
        where = "" if not hit else ("  (cached)" if hit.parent == CACHE else "  (game cache)")
        print(f"  {label:<48} -> {target.relative_to(SITE)}{where}")
    raise SystemExit
if not jobs:
    print("Nothing to do (files exist; --force to re-render).")
    write_index()
    raise SystemExit
if spent + cost > args.cap_usd:
    print("Stopped: this run would take the job above the cap. Ask the owner before going on.")
    raise SystemExit(1)

client = None
CACHE.mkdir(parents=True, exist_ok=True)


def synthesize(voice, text):
    global client
    hit = cached(voice, text)
    if hit:
        return hit, False
    if client is None:
        from google.cloud import texttospeech
        client = (texttospeech, texttospeech.TextToSpeechClient.from_service_account_file(str(args.key)))
    tts, c = client
    audio = c.synthesize_speech(
        input=tts.SynthesisInput(text=text),
        voice=tts.VoiceSelectionParams(language_code="he-IL", name=voice),
        audio_config=tts.AudioConfig(audio_encoding=tts.AudioEncoding.MP3, speaking_rate=rate),
    ).audio_content
    raw = CACHE / f"{request_key(voice, text)}.mp3"
    raw.write_bytes(audio)
    new_file = not LEDGER.exists() or LEDGER.stat().st_size == 0
    with LEDGER.open("a", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        if new_file:
            w.writerow(["timestamp", "endpoint", "voice", "text", "characters", "est_usd_upper_bound"])
        w.writerow([datetime.datetime.now().isoformat(timespec="seconds"), "texttospeech.synthesize_speech",
                    voice, text, len(text), f"{price_of(voice, text):.6f}"])
    return raw, True


TRIM = ("silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.1,"
        "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.1,areverse")
TARGET_LUFS = -17.0
LIMIT = "alimiter=limit=0.84:attack=5:release=50:level=false"  # peaks about -1.5 dBFS


def finish(raw, target):
    """Trim, one linear gain to TARGET_LUFS (measured EBU R128), limiter, mono mp3."""
    target.parent.mkdir(parents=True, exist_ok=True)
    probe = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(raw), "-af",
                            f"{TRIM},loudnorm=print_format=json", "-f", "null", "-"],
                           capture_output=True, text=True, check=True).stderr
    measured = float(json.loads(probe[probe.rindex("{"):probe.rindex("}") + 1])["input_i"])
    chain = f"{TRIM},volume={TARGET_LUFS - measured:.2f}dB,{LIMIT}"
    with tempfile.TemporaryDirectory() as tmp:
        out = Path(tmp) / target.name
        subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(raw), "-af", chain,
                        "-ac", "1", "-ar", "44100", "-codec:a", "libmp3lame", "-b:a", "64k", str(out)], check=True)
        target.write_bytes(out.read_bytes())


fails = 0
for n, (voice, text, target, label) in enumerate(jobs, 1):
    try:
        raw, paid = synthesize(voice, text)
        finish(raw, target)
        print(f"[{n}/{len(jobs)}] ok {label:<48} {'synth' if paid else 'cache'} -> {target.name}")
    except Exception as e:  # keep going; report at the end
        fails += 1
        print(f"[{n}/{len(jobs)}] FAIL {label}: {type(e).__name__}: {e}")

print(f"\nDone: {len(jobs) - fails} ok, {fails} failed. spend.csv total: ${spent_so_far():.4f}")
write_index()
sys.exit(1 if fails else 0)
