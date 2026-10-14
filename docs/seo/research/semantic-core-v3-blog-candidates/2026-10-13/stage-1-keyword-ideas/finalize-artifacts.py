import hashlib,json,shutil
from pathlib import Path
from datetime import datetime,timezone
OUT=Path('/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v3-blog-candidates/2026-10-13/stage-1-keyword-ideas')
STAGE=Path('/tmp/hebrewedu-stage1-review-final')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
before=json.loads((OUT/'fingerprints-before.json').read_text())
changed=[name for scope in ['research','website'] for name,digest in before[scope].items() if not Path(name).exists() or sha(Path(name))!=digest]
assert not changed,changed
for p in STAGE.iterdir():
    assert not (OUT/p.name).exists(),p.name
    with (OUT/p.name).open('xb') as f:f.write(p.read_bytes())
for name in ['prepare','preserve','review','finalize']:
    target=OUT/f'{name}-artifacts.py';source=Path(f'/tmp/hebrewedu_stage1_{name}.py')
    with target.open('xb') as f:f.write(source.read_bytes())
state={'state':'stage1_complete_stopped_for_owner_review','paid_requests_attempted':1,'task_id':'10131315-2762-0400-0000-bb153fc85dca','status_code':20000,'actual_cost_usd':0.024,'remaining_project_cap_usd':0.226,'new_measured_candidates':0,'proposed_unmeasured_volume_keywords':5,'held_conditional_keywords':10,'later_stages_authorized':False,'updated_at_utc':datetime.now(timezone.utc).isoformat()}
(OUT/'execution-state.json').write_text(json.dumps(state,indent=2)+'\n')
manifest={p.name:{'sha256':sha(p),'bytes':p.stat().st_size} for p in sorted(OUT.iterdir()) if p.is_file() and p.name!='artifact-manifest.json'}
with (OUT/'artifact-manifest.json').open('x') as f:json.dump({'created_at_utc':datetime.now(timezone.utc).isoformat(),'files':manifest},f,indent=2);f.write('\n')
print(json.dumps({'output':str(OUT),'new_artifacts':len(manifest)+1,'all_original_fingerprints_unchanged':True,'state':state}))
