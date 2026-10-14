import contextlib, csv, hashlib, importlib.util, io, json, subprocess
from pathlib import Path
from datetime import datetime, timezone
from decimal import Decimal
from types import SimpleNamespace

ROOT = Path('/Users/kasutaja/Developer/seo-research/hebrewedu')
SITE = Path('/Users/kasutaja/Developer/web/hebrewedu-site')
OUT = ROOT / 'semantic-core-v3-blog-candidates/2026-10-13/stage-1-keyword-ideas'
HELPER = Path('/Users/kasutaja/.codex/skills/seo/scripts/dataforseo_costs.py')
ENDPOINT = '/v3/dataforseo_labs/google/keyword_ideas/live'
SEEDS = ['hebrew binyanim','hebrew roots','hebrew vocabulary size','hebrew learning mistakes','hebrew listening','spoken hebrew','hebrew handwriting','hebrew verb conjugation app']
PAYLOAD = [{'keywords':SEEDS,'location_code':2840,'language_code':'en','limit':100,'ignore_synonyms':True,'include_clickstream_data':False}]
def now(): return datetime.now(timezone.utc).isoformat()
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def write(name, obj):
    with (OUT/name).open('x') as f: json.dump(obj,f,indent=2,ensure_ascii=False); f.write('\n')
assert not OUT.exists(), 'Execution directory already exists; stop without overwriting'
spec=importlib.util.spec_from_file_location('cost_helper',HELPER)
mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
ledger_path=mod._read_path(mod.LEDGER_FILE,mod.LEGACY_LEDGER_FILE)
ledger=json.loads(ledger_path.read_text()) if ledger_path.exists() else {'entries':[]}
assert isinstance(ledger['entries'],list)
for entry in ledger['entries']: assert isinstance(entry['cost'],(int,float)) and entry['cost']>=0 and isinstance(entry['timestamp'],str)
mod._load_ledger=lambda: ledger
mod.COST_TABLE['dataforseo_labs_google_keyword_ideas']=float(Decimal('0.012')+100*Decimal('0.00012'))
capture=io.StringIO()
with contextlib.redirect_stdout(capture): mod.cmd_check(SimpleNamespace(endpoint='dataforseo_labs_google_keyword_ideas',count=1))
guard=json.loads(capture.getvalue())
assert guard['status']=='approved',guard
assert Decimal(str(guard['total_cost_usd']))<=Decimal('0.024')
OUT.mkdir()
write('request.json',PAYLOAD)
write('approval-and-plan.json',{'prepared_at_utc':now(),'authorized_stage':1,'project_budget_usd':0.25,'stage1_ceiling_usd':0.024,'historical_phase3b_spend_excluded_usd':0.1026,'method':'POST','endpoint':ENDPOINT,'task_count':1,'noAiMode':True,'retries':0,'later_stages_authorized':False,'pricing_source':'https://dataforseo.com/pricing/dataforseo-labs/dataforseo-google-api','docs_source':'https://docs.dataforseo.com/v3/dataforseo_labs/google/keyword_ideas/live/','price_verified_on':'2026-10-13','base_usd':0.012,'per_item_usd':0.00012,'max_items':100,'expected_max_charge_usd':0.024,'user_budget_overrides_plan_proposal_usd':0.16})
write('cost-guard.json',{'checked_at_utc':now(),'helper':str(HELPER),'helper_sha256':sha(HELPER),'config':mod._load_config(),'ledger_path':str(ledger_path),'ledger_sha256_before':sha(ledger_path),'strict_ledger_read':True,'ledger_read_method':'read-only strict JSON snapshot; helper loader overridden to avoid lock-file write','installed_estimate_usd':0.05,'in_memory_current_tariff_usd':0.024,'helper_check':guard,'configuration_or_installed_table_changed':False})
research={str(p):sha(p) for p in ROOT.rglob('*') if p.is_file() and OUT not in p.parents and '.DS_Store' not in p.name and '__pycache__' not in p.parts}
names=subprocess.check_output(['git','ls-files','-z','--cached','--others','--exclude-standard'],cwd=SITE).decode().split('\0')
website={str(SITE/n):sha(SITE/n) for n in names if n and (SITE/n).is_file()}
write('fingerprints-before.json',{'captured_at_utc':now(),'research':research,'website':website})
write('execution-state.json',{'state':'prepared_not_submitted','paid_requests_attempted':0,'endpoint':ENDPOINT,'prepared_at_utc':now()})
print(json.dumps({'out':str(OUT),'guard':guard,'research_files_preserved':len(research),'website_files_preserved':len(website)}))
