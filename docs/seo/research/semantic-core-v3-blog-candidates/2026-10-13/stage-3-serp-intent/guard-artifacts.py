import contextlib, importlib.util, io, json, sys
from pathlib import Path
from types import SimpleNamespace
from decimal import Decimal
from datetime import datetime, timezone
OUT=Path('/tmp/hebrewedu-stage3-serp-intent-2026-10-13')
i=int(sys.argv[1]); assert 1<=i<=4
spec=importlib.util.spec_from_file_location('costs','/Users/kasutaja/.codex/skills/seo/scripts/dataforseo_costs.py'); mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
ledger=json.loads(mod._read_path(mod.LEDGER_FILE,mod.LEGACY_LEDGER_FILE).read_text())
actual=Decimal('0')
for n in range(1,i):
    raw=json.loads((OUT/f'{n:02d}-raw-response.json').read_text())
    actual+=Decimal(str(raw['cost']))
    assert raw['status_code']==20000 and len(raw['tasks'])==1 and raw['tasks'][0]['status_code']==20000, 'Stop on unsuccessful task; no retry'
    ledger['entries'].append({'timestamp':datetime.now().isoformat(),'endpoint':'serp_organic_live_advanced','cost':raw['cost']})
assert actual+Decimal('0.002')*(5-i)<=Decimal('0.008'), 'Remaining expected charges exceed cap'
assert not (OUT/f'{i:02d}-dispatch.json').exists(), 'Request already attempted; no retry'
mod._load_ledger=lambda:ledger
capture=io.StringIO()
with contextlib.redirect_stdout(capture): mod.cmd_check(SimpleNamespace(endpoint='serp_organic_live_advanced',count=1))
guard=json.loads(capture.getvalue()); assert guard['status']=='approved',guard
record={'checked_at_utc':datetime.now(timezone.utc).isoformat(),'helper_check':guard,'stage_spend_before_usd':str(actual),'maximum_remaining_expected_usd':str(Decimal('0.002')*(5-i)),'stage_cap_usd':'0.008','global_ledger_unchanged':True}
with (OUT/f'{i:02d}-cost-guard.json').open('x') as f:json.dump(record,f,indent=2)
print(json.dumps(record))
