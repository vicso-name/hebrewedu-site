import contextlib, copy, csv, hashlib, importlib.util, io, json, subprocess
from pathlib import Path
from datetime import datetime, timezone
from decimal import Decimal
from types import SimpleNamespace

ROOT=Path('/Users/kasutaja/Developer/seo-research/hebrewedu')
SITE=Path('/Users/kasutaja/Developer/web/hebrewedu-site')
OUT=Path('/tmp/hebrewedu-stage3-serp-intent-2026-10-13')
DEST=ROOT/'semantic-core-v3-blog-candidates/2026-10-13/stage-3-serp-intent'
HELPER=Path('/Users/kasutaja/.codex/skills/seo/scripts/dataforseo_costs.py')
KEYWORDS=['hebrew words','hebrew phrases','hebrew text','hebrew alphabet nun']
def now(): return datetime.now(timezone.utc).isoformat()
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def write(name,obj):
    with (OUT/name).open('x') as f: json.dump(obj,f,indent=2,ensure_ascii=False); f.write('\n')
assert not OUT.exists() and not DEST.exists(), 'Stop: stage directory already exists'
matches=[]; inspected=[]; invalid=[]
for p in ROOT.rglob('*.json'):
    if p.name.startswith('account-'): continue
    try: obj=json.loads(p.read_text())
    except Exception: invalid.append(str(p)); continue
    def walk(o):
        if isinstance(o,dict):
            for t in o.get('tasks',[]) if isinstance(o.get('tasks'),list) else []:
                if not isinstance(t,dict): continue
                d=t.get('data') or {}
                if d.get('api')=='serp' or 'serp' in str(t.get('path',[])):
                    inspected.append({'file':str(p),'task_id':t.get('id'),'keyword':d.get('keyword'),'status_code':t.get('status_code')})
                    if d.get('keyword') in KEYWORDS: matches.append({'file':str(p),'task_id':t.get('id'),'data':d,'status_code':t.get('status_code')})
            for k,v in o.items():
                if k!='tasks': walk(v)
        elif isinstance(o,list):
            for v in o: walk(v)
    walk(obj)
assert not matches, 'Exact cached candidates require comparable-result review before new spending'
assert not invalid, invalid
spec=importlib.util.spec_from_file_location('costs',HELPER); mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
ledger_path=mod._read_path(mod.LEDGER_FILE,mod.LEGACY_LEDGER_FILE)
ledger=json.loads(ledger_path.read_text())
assert isinstance(ledger['entries'],list)
for e in ledger['entries']: assert isinstance(e['cost'],(int,float)) and e['cost']>=0
mod._load_ledger=lambda: ledger
capture=io.StringIO()
with contextlib.redirect_stdout(capture): mod.cmd_check(SimpleNamespace(endpoint='serp_organic_live_advanced',count=4))
guard=json.loads(capture.getvalue())
assert guard['status']=='approved' and Decimal(str(guard['total_cost_usd']))<=Decimal('0.008'),guard
stage1=list(csv.DictReader((ROOT/'semantic-core-v3-blog-candidates/2026-10-13/stage-1-keyword-ideas/cost-ledger.csv').open()))
assert sum(Decimal(r['cost_usd']) for r in stage1)==Decimal('0.024')
OUT.mkdir()
write('cache-check.json',{'checked_at_utc':now(),'search_root':str(ROOT),'criteria':{'keyword':'exact string','successful_status':20000,'location_code':2840,'language_code':'en','device':'mobile','os':'android','depth':10,'se':'google','result_type':'organic'},'serp_tasks_inspected':len(inspected),'exact_keyword_matches':matches,'invalid_json_files':invalid,'inspected_tasks':inspected,'reuse_count':0})
write('cost-guard.json',{'checked_at_utc':now(),'helper':str(HELPER),'helper_sha256':sha(HELPER),'config':mod._load_config(),'ledger_path':str(ledger_path),'ledger_sha256':sha(ledger_path),'strict_ledger_read':True,'ledger_read_method':'read-only snapshot; helper loader overridden to avoid lock-file write','helper_check':guard,'configuration_or_installed_table_changed':False,'project_prior_spend_usd':'0.024','stage_cap_usd':'0.008','expected_combined_charge_usd':'0.008'})
write('approval-and-plan.json',{'prepared_at_utc':now(),'method':'POST','endpoint':'/v3/serp/google/organic/live/advanced','noAiMode':True,'exact_keywords':KEYWORDS,'maximum_paid_tasks':4,'stage_cap_usd':'0.008','project_budget_usd':'0.250','project_prior_spend_usd':'0.024','historical_phase3b_spend_excluded_usd':'0.10260','expected_project_remaining_usd':'0.218','retries':0,'endpoint_substitutions':False,'balance_checks':False,'top_ups':False,'optional_paid_features':False,'additional_pages':False,'stop_for_owner_review':True})
write('pricing-evidence.json',{'verified_at_utc':now(),'source':'https://dataforseo.com/pricing/google-serp/google-organic-serp-api','documentation':'https://docs.dataforseo.com/v3/serp/google/organic/live/advanced/','method':'public documentation read through web tool; no provider API pricing or account request','live_price_per_10_result_page_usd':'0.002','requested_depth':10,'device_and_market_surcharge':False,'multipliers_in_payload':[],'expected_four_task_charge_usd':'0.008','live_task_limit_per_request':1})
for i,k in enumerate(KEYWORDS,1): write(f'{i:02d}-request.json',[{'keyword':k,'location_code':2840,'language_code':'en','device':'mobile','os':'android','depth':10}])
research={str(p):sha(p) for p in ROOT.rglob('*') if p.is_file() and p.name!='.DS_Store' and '__pycache__' not in p.parts}
names=subprocess.check_output(['git','ls-files','-z','--cached','--others','--exclude-standard'],cwd=SITE).decode().split('\0')
website={str(SITE/n):sha(SITE/n) for n in names if n and (SITE/n).is_file()}
write('fingerprints-before.json',{'captured_at_utc':now(),'research':research,'website':website,'git_status':subprocess.check_output(['git','status','--porcelain'],cwd=SITE).decode()})
write('execution-state.json',{'state':'prepared_not_submitted','paid_requests_attempted':0,'actual_cost_usd':'0.000','prepared_at_utc':now()})
print(json.dumps({'scratch':str(OUT),'destination':str(DEST),'cache_matches':len(matches),'serp_tasks_inspected':len(inspected),'guard':guard,'preserved_files':len(research)+len(website)}))
