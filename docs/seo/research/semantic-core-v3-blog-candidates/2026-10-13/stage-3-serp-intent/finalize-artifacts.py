import contextlib, hashlib, importlib.util, io, json, shutil, subprocess
from pathlib import Path
from types import SimpleNamespace
from datetime import datetime, timezone
from decimal import Decimal

OUT=Path('/tmp/hebrewedu-stage3-serp-intent-2026-10-13')
DEST=Path('/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v3-blog-candidates/2026-10-13/stage-3-serp-intent')
SITE=Path('/Users/kasutaja/Developer/web/hebrewedu-site')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def now():return datetime.now(timezone.utc).isoformat()
assert not DEST.exists(), 'Stop: destination exists; preserve all existing artifacts'
before=json.loads((OUT/'fingerprints-before.json').read_text())
changed=[n for scope in ['research','website'] for n,d in before[scope].items() if not Path(n).is_file() or sha(Path(n))!=d]
assert not changed,changed
assert subprocess.check_output(['git','status','--porcelain'],cwd=SITE).decode()==before['git_status']
tasks=[]
for i in range(1,5):
    prefix=f'{i:02d}';env=json.loads((OUT/f'{prefix}-tool-response.json').read_text());blocks=[b['text'] for b in env['content'] if b['type']=='text']
    assert len(blocks)==1 and blocks[0].encode()==(OUT/f'{prefix}-raw-response.json').read_bytes(), 'Raw text altered'
    raw=json.loads(blocks[0]);t=raw['tasks'][0];tasks.append(t)
    assert raw['status_code']==t['status_code']==20000
    assert Decimal(str(raw['cost']))==Decimal(str(t['cost']))==Decimal('0.002')
    req=json.loads((OUT/f'{prefix}-request.json').read_text());dispatch=json.loads((OUT/f'{prefix}-dispatch.json').read_text())
    assert len(req)==1 and set(req[0])=={'keyword','location_code','language_code','device','os','depth'}
    assert dispatch['data']==req and dispatch['noAiMode'] is True
    expected=[x for x in t['result'][0]['items'] if x['type']!='organic']
    assert json.loads((OUT/f'{prefix}-visible-features.json').read_text())['features']==expected
    assert not any(x.get('is_featured_snippet') for x in t['result'][0]['items'] if x['type']=='organic')
assert len({t['id'] for t in tasks})==4
manifest=json.loads((OUT/'existing-ownership-evidence.json').read_text())['course_manifest']
assert all(not lesson['published'] for lesson in manifest['lessons'] if lesson.get('slug')!='aleph')

# Copy only into a new directory. Each original source artifact remains untouched.
DEST.mkdir()
for p in sorted(OUT.iterdir()):
    assert p.is_file()
    with (DEST/p.name).open('xb') as f:f.write(p.read_bytes())
for short in ['prepare','guard','analyze','finalize']:
    p=Path(f'/tmp/hebrewedu_stage3_{short}.py')
    with (DEST/f'{short}-artifacts.py').open('xb') as f:f.write(p.read_bytes())

# Record actual charges with the installed spending helper, once per task.
# This updates its financial journal only; earlier research ledgers stay unchanged.
spec=importlib.util.spec_from_file_location('costs','/Users/kasutaja/.codex/skills/seo/scripts/dataforseo_costs.py');mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
ledger=json.loads(mod._read_path(mod.LEDGER_FILE,mod.LEGACY_LEDGER_FILE).read_text())
assert not any(t['id'] in e.get('note','') for t in tasks for e in ledger['entries']), 'Charge already logged; do not double-log'
logs=[]
for t in tasks:
    capture=io.StringIO()
    with contextlib.redirect_stdout(capture):
        mod.cmd_log(SimpleNamespace(endpoint='serp_organic_live_advanced',cost=t['cost'],note=f"HebrewEdu Stage 3 SERP intent only; {t['data']['keyword']}; task {t['id']}; stage cap $0.008, project cap $0.25"))
    logs.append(json.loads(capture.getvalue()))
with (DEST/'global-cost-log.json').open('x') as f:json.dump({'logged_at_utc':now(),'ledger_path':str(mod.LEDGER_FILE),'actual_cost_logs':logs,'provider_requests_made_for_logging':0},f,indent=2);f.write('\n')
after_ledger=json.loads(mod.LEDGER_FILE.read_text())
assert after_ledger['entries'][:-4]==ledger['entries']
assert sum(Decimal(str(e['cost'])) for e in after_ledger['entries'][-4:])==Decimal('0.008')
changed=[n for scope in ['research','website'] for n,d in before[scope].items() if not Path(n).is_file() or sha(Path(n))!=d]
assert not changed,changed
assert subprocess.check_output(['git','status','--porcelain'],cwd=SITE).decode()==before['git_status']
assert all(sha(p)==sha(DEST/p.name) for p in OUT.iterdir() if p.is_file())
with (DEST/'final-verification.json').open('x') as f:json.dump({'verified_at_utc':now(),'all_prior_research_hashes_unchanged':True,'all_website_hashes_unchanged':True,'git_status_unchanged':True,'raw_text_identical_to_connector_blocks':True,'saved_copy_hashes_match':True,'four_unique_tasks':True,'all_successful':True,'actual_cost_usd':'0.008','spending_helper_logged_each_task_once':True,'previous_global_ledger_entries_unchanged':True,'new_global_ledger_entries':4,'provider_requests_during_finalization':0,'stopped_for_owner_review':True},f,indent=2);f.write('\n')
files={p.name:{'sha256':sha(p),'bytes':p.stat().st_size} for p in sorted(DEST.iterdir()) if p.is_file()}
with (DEST/'artifact-manifest.json').open('x') as f:json.dump({'created_at_utc':now(),'files':files},f,indent=2);f.write('\n')
print(json.dumps({'destination':str(DEST),'artifacts':len(files)+1,'actual_stage_cost_usd':'0.008','remaining_project_cap_usd':'0.218','raw_responses_preserved':4,'prior_research_and_site_unchanged':True,'costs_logged_once':True,'stopped_for_owner_review':True}))
