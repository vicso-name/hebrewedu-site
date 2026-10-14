import csv, hashlib, json, subprocess
from pathlib import Path
from datetime import datetime, timezone
OUT=Path('/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v3-blog-candidates/2026-10-13/stage-1-keyword-ideas')
def save(name,value):
    with (OUT/name).open('x') as f: json.dump(value,f,indent=2); f.write('\n')
env=json.loads(Path('/tmp/hebrewedu-stage1-tool-response.json').read_text())
texts=[x['text'] for x in env['content'] if x['type']=='text']
assert len(texts)==1
raw=texts[0]
response=json.loads(raw)
assert response['tasks_count']==1 and len(response['tasks'])==1
task=response['tasks'][0]
with (OUT/'raw-response.json').open('x') as f: f.write(raw)
with (OUT/'tool-response.json').open('x') as f: f.write(Path('/tmp/hebrewedu-stage1-tool-response.json').read_text())
timing=json.loads(Path('/tmp/hebrewedu-stage1-request-timing.json').read_text())
timing['preserved_at_utc']=datetime.now(timezone.utc).isoformat()
save('request-timing.json',timing)
save('task-metadata.json',{'envelope':{k:v for k,v in response.items() if k!='tasks'},'task':{k:v for k,v in task.items() if k!='result'},'result_summary':[{k:v for k,v in r.items() if k!='items'} for r in task.get('result') or []],'raw_sha256':hashlib.sha256(raw.encode()).hexdigest(),'timestamps':timing})
assert response['cost']==task['cost'] and response['cost']<=0.024
cost=response['cost']
save('budget-reconciliation.json',{'project_cap_usd':0.25,'stage1_cap_usd':0.024,'stage1_actual_cost_usd':cost,'project_spent_usd':cost,'remaining_project_cap_usd':round(0.25-cost,6),'historical_phase3b_cost_excluded_usd':0.1026,'envelope_and_task_cost_are_same_charge':True,'further_spending_authorized':False})
with (OUT/'cost-ledger.csv').open('x',newline='') as f:
    w=csv.writer(f); w.writerow(['dispatch_at_utc','received_at_utc','endpoint','task_id','cost_usd','project_scope']); w.writerow([timing['dispatch_at_utc'],timing['received_at_utc'],'/v3/dataforseo_labs/google/keyword_ideas/live',task['id'],f'{cost:.5f}','eight_article_keyword_research_stage1'])
log=subprocess.check_output(['python3','/Users/kasutaja/.codex/skills/seo/scripts/dataforseo_costs.py','log','dataforseo_labs_google_keyword_ideas',str(cost),'--note',f"HebrewEdu eight-article Stage 1 only; task {task['id']}; project cap $0.25; 100 items"],text=True)
save('local-cost-log.json',json.loads(log))
state={'state':'response_preserved_local_review_pending','paid_requests_attempted':1,'task_id':task['id'],'status_code':task['status_code'],'actual_cost_usd':cost,'later_stages_authorized':False,'updated_at_utc':datetime.now(timezone.utc).isoformat()}
(OUT/'execution-state.json').write_text(json.dumps(state,indent=2)+'\n')
print(json.dumps({'task_id':task['id'],'cost':cost,'items_count':task['result'][0]['items_count'],'raw_sha256':hashlib.sha256(raw.encode()).hexdigest(),'logged_once':True}))
