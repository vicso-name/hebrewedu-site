import collections, csv, hashlib, json, re, unicodedata
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path('/Users/kasutaja/Developer/seo-research/hebrewedu')
OUT=ROOT/'semantic-core-v3-blog-candidates/2026-10-13/stage-1-keyword-ideas'
STAGE=Path('/tmp/hebrewedu-stage1-review-final')
STAGE.mkdir(exist_ok=False)
SITE=Path('/Users/kasutaja/Developer/web/hebrewedu-site')
def norm(s):
    s=unicodedata.normalize('NFKC',s).casefold()
    s=re.sub('[\u2019\u2018\u02bc\u0027]','',s)
    return ' '.join(re.sub(r'[^\w\s]',' ',s).split())
def js(name,obj):
    with (STAGE/name).open('x') as f: json.dump(obj,f,indent=2,ensure_ascii=False);f.write('\n')
def csvout(name,rows,fields=None):
    with (STAGE/name).open('x',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields or list(rows[0]));w.writeheader();w.writerows(rows)
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
response=json.loads((OUT/'raw-response.json').read_text()); task=response['tasks'][0]; items=task['result'][0]['items']
aliases=collections.defaultdict(list); sources=[]
fields=['keyword','provider_keyword','returned_volume_keyword','returned_difficulty_keyword','gsc_queries','supporting_gsc_queries','supporting_variants','provider_spell_correction','provider_spell']
for p in sorted(ROOT.rglob('*.csv')):
    if OUT in p.parents: continue
    rows=list(csv.DictReader(p.open()))
    source=str(p.relative_to(ROOT)); sources.append({'path':source,'rows':len(rows),'sha256':sha(p),'fields_used':[k for k in fields if rows and k in rows[0]]})
    for row in rows:
        for k in fields:
            for s in row.get(k,'').split(';'):
                s=s.strip()
                if s: aliases[norm(s)].append({'source':source,'field':k,'value':s,'canonical_keyword':row.get('keyword','')})
csvout('existing-alias-index.csv',[{'normalized_keyword':k,'source_records_json':json.dumps(v,ensure_ascii=False)} for k,v in sorted(aliases.items())])
pages={
'B':'hebrew-binyanim-explained',
'R':'how-the-hebrew-root-system-works',
'W':'how-many-words-are-in-the-modern-hebrew-language',
'M':'how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently',
'L':'best-hebrew-listening-practice',
'F':'why-hebrew-sounds-so-fast',
'H':'why-hebrew-handwriting-looks-completely-different-from-printed-hebrew',
'V':'meet-the-new-verb-directory'}
def url(code): return 'https://hebrewedu.com/blog/'+pages[code]+'/'
# Manual intent review of all returned wording. No SERP evidence is inferred.
religion={0,3,4,5,6,7,8,10,12,14,15,19,20,22,26,27,29,30,31,33,35,38,39,41,44,45,49,50,51,53,54,57,58,59,60,62,65,66,69,70,75,76,77,78,79,81,85,86,89,90,92,93,94,96,97,99}
named={17,23,24,40,43,48,67,73,87,91,95,98}
geography={11,21,25,28,32,52,64,74,80,83}
lexical={2,13,16,36,37,42,55,56,61,68,72,82,88}
general={1,9,18,34,46,47,63,71,84}
assert set.union(religion,named,geography,lexical,general)==set(range(100))
near={
1:('W','General language overview; does not ask vocabulary size or learner goals.','low','Word Count cannot own general language discovery.'),
13:('W','Word-list/reference intent; no vocabulary-size question.','low','Vocabulary neighbor owns methods/lists; W owns counts only.'),
18:('W','General Modern Hebrew overview; no word-count qualifier.','low','Modern Hebrew scope alone does not establish W ownership.'),
32:('F','Language identity/use query; no perceived-speed question or listening task.','low','F owns perceived speed; L owns practice. Neither owns geography.'),
42:('H','Ambiguous writing/script query; no handwritten/printed comparison modifier.','low','Guide owns general alphabet/script reference. H has no complete writing course or authentic paired forms yet.'),
47:('R','Historical origin query; etymology differs from morphological root identification.','low','Do not transfer language-history scope to R.'),
84:('R','Linguistic language-family classification; differs from roots within words.','low','Language family and word family are different tasks.'),
88:('L','Phrase-list/reference intent; no listening selection or practice modifier.','low','Vocabulary/list neighbor; L is not an audio/phrase inventory.')}
lexical.add(42)
reviews=[]; history=[]; seen={}
for i,x in enumerate(items):
    keyword=x['keyword']; key=norm(keyword); info=x.get('keyword_info') or {}; props=x.get('keyword_properties') or {}; intent=x.get('search_intent_info') or {}; vol=info.get('search_volume'); kd=props.get('keyword_difficulty')
    if i in religion: reason='Biblical/religious/history/translation intent; Modern Hebrew learning article task mismatch.';category='religious_biblical_history'
    elif i in named: reason='Named entity, institution, brand, external publication or external tool intent; not an eight-article task.';category='named_entity_or_external_tool'
    elif i in geography: reason='Language identity/geography/community language use; not vocabulary size or spoken-speed diagnosis.';category='language_identity_geography'
    elif i in lexical: reason='General alphabet/script, names, lexical translation or list/reference intent; not the retained article task.';category='lexical_reference_or_neighbor'
    else: reason='Broad language definition, history or classification; no eight-article task modifier.';category='broad_language_or_history'
    proposed='';confidence='not_applicable';warning='';status='excluded_intent_mismatch'
    if i in near:
        owner,reason,confidence,warning=near[i]; proposed=url(owner);status='rejected_near_topic_mapping_only'
    match=aliases.get(key,[])
    within=seen.get(key,'')
    seen[key]=keyword
    semantic_equiv=''
    if i in {5,16}:semantic_equiv='hebrew alphabet chart / learn hebrew alphabet; broad reference belongs to Guide, not H'
    if i==61:semantic_equiv='nun hebrew letter; existing individual-letter lesson/reference neighborhood, not H'
    if i==90:semantic_equiv='hebrew vowel chart; Nikud neighbor and explicitly Biblical scope, not any of the eight'
    if i==30:semantic_equiv='what does nasa means in hebrew; same translation task as returned item 29'
    if match:status='excluded_existing_normalized_alias'
    if within:status='excluded_within_response_duplicate'
    reviews.append({'result_index':i,'keyword':keyword,'normalized_keyword':key,'location_code':x['location_code'],'language_code':x['language_code'],'volume_status':'provider_null' if vol is None else ('provider_zero' if vol==0 else 'provider_positive'),'us_avg_monthly_search_volume':vol,'volume_last_updated_time':info.get('last_updated_time'),'organic_kd_status':'provider_null' if kd is None else 'provider_value','organic_keyword_difficulty':kd,'kd_specific_updated_time_status':'not_returned','provider_main_intent':intent.get('main_intent'),'intent_last_updated_time':intent.get('last_updated_time'),'monthly_search_history_json':json.dumps(info.get('monthly_searches')),'existing_normalized_alias_matches_json':json.dumps(match,ensure_ascii=False),'within_response_normalized_duplicate':within,'manual_semantic_equivalent_or_neighbor':semantic_equiv,'review_status':status,'intent_category_editorial':category,'decision_reason_editorial':reason,'considered_existing_article_url':proposed,'owner_fit_confidence_editorial':confidence,'ownership_conflict_warning':warning,'ownership_status':'no_assignment_approved','selected_new_candidate':False,'proposed_for_volume':False,'proposed_for_standalone_kd':False,'serp_status':'not_requested','source_task_id':task['id'],'metric_source':'DataForSEO Labs Google Keyword Ideas Live','review_basis':'wording plus local ownership/source evidence; no SERP validation'})
    for m in info.get('monthly_searches') or []: history.append({'keyword':keyword,**m,'source_task_id':task['id']})
csvout('discovery-review.csv',reviews);csvout('monthly-volume-history.csv',history)
csvout('measured-candidates.csv',[],['keyword','us_avg_monthly_search_volume','organic_keyword_difficulty','proposed_existing_article_url','confidence','ownership_conflict_warning'])
csvout('rejected-near-topic-mappings.csv',[r for r in reviews if r['considered_existing_article_url']])
shortlist=[
('N01','how to identify hebrew binyanim','B','A','high','Recognition procedure; reviewed worked form identification required.','R owns root structure; V owns product feature discovery.'),
('N02','hebrew binyanim exercises','B','C','medium','Hold: reviewed static tasks/answers and workbook/tool expectation need approval.','B is an explainer, not a full workbook or conjugator.'),
('N03','hebrew root letters vs prefixes','R','A','high','Root/prefix identification pitfall; use a reviewed worked example.','Nikud/Unpointed own reading instruction; B owns patterns.'),
('N04','four letter hebrew roots','R','C','medium','Hold: grammar-reviewed limit-case note; no specialist inventory promise.','Root-system overview, not exhaustive dictionary/tool.'),
('N05','how many hebrew words do native speakers know','W','C','medium','Hold: defensible source or honest uncertainty explanation required.','Do not invent native-speaker counts or promote to Vocab methods.'),
('N06','how many hebrew words to read a newspaper','W','C','medium','Hold: sourced/qualified goal answer without a fabricated threshold.','Comprehension owns reading instruction; W only vocabulary-goal question.'),
('N07','hebrew listening practice with transcripts','L','C','medium','Hold: transcript workflow versus hosted inventory expectation unresolved.','L cannot promise a hosted audio/transcript library.'),
('N08','hebrew listening practice for intermediate learners','L','A','high','Stage-specific selection hypothesis; supporting candidate only.','F owns perceived speed; no additive audience claim with broad listening practice.'),
('N09','how to understand fast spoken hebrew','F','C','low','Hold: action/training intent could favor L; owner review required.','No automatic transfer from F to L; F explains speed, L owns practice.'),
('N10','spoken hebrew contractions','F','C','medium','Hold: lexical/phonetic verification and reviewed reductions required.','Do not infer colloquial reductions from query wording.'),
('N11','how to read hebrew handwriting','H','C','medium','Hold: authentic visual forms/solutions and decoding expectation unresolved.','Guide owns broad charts; lessons own individual-letter teaching.'),
('N12','hebrew handwriting examples','H','C','medium','Hold: authentic annotated note and format review required.','No full workbook, stroke-order course or whole-alphabet chart promise.'),
('N13','how to stay motivated learning hebrew','M','A','high','Motivation/restart hypothesis; retain habits-diagnosis scope.','Plan owns alphabet study progression; Difficulty owns learning time.'),
('N14','why am i not making progress in hebrew','M','A','medium','Diagnostic plateau hypothesis; owner remains provisional.','Hold later promotion if time, reading comprehension or vocabulary methods dominate.'),
('N15','hebrew verb conjugation app with root search','V','C','medium','Hold: verify released root-search feature and generic app-selection fit.','Home owns generic app discovery; Story owns brand queries; V support only.')]
planned=[]
for ident,keyword,owner,gate,confidence,requirement,warning in shortlist:
    assert norm(keyword) not in aliases, (keyword,aliases.get(norm(keyword)))
    assert norm(keyword) not in seen, keyword
    planned.append({'candidate_id':ident,'keyword':keyword,'origin':'approved_opportunity_plan_unmeasured_hypothesis','proposed_existing_article_url':url(owner),'article_code':owner,'fit_confidence_editorial':confidence,'gate':gate,'review_state':'proposed_next_volume_batch' if gate=='A' else 'held_owner_review','volume_status':'not_requested','organic_kd_status':'not_requested','serp_status':'not_requested','next_kd_eligibility':'only after positive volume and selection' if gate=='A' else 'held','content_requirement_or_gate':requirement,'ownership_conflict_warning':warning,'owner_status':'proposal_only_no_reassignment'})
csvout('next-stage-proposed-keywords.csv',planned)
ready=[r['keyword'] for r in planned if r['gate']=='A']
csvout('next-volume-exact-list.csv',[r for r in planned if r['gate']=='A'])
js('next-stage-proposal.json',{'status':'proposal_only_owner_review_required_not_authorized','market':{'search_engine':'Google','location_code':2840,'language_code':'en'},'novel_measured_discovery_additions':[],'proposed_volume_exact_keywords':ready,'volume_settings_if_later_authorized':{'search_partners':False},'proposed_kd_existing_control':['hebrew root system'],'proposed_kd_new_keywords_conditional_on_positive_volume_and_selection':ready,'kd_exclusions':'reuse every discovery KD including null; no rerun of any five Phase 3B KDs; do not refresh v2 values','held_conditional_keywords':[r['keyword'] for r in planned if r['gate']=='C'],'no_dispatch_payload_authorized':True})
metrics={'returned_items':len(items),'provider_positive_volume':sum(r['volume_status']=='provider_positive' for r in reviews),'provider_null_volume':sum(r['volume_status']=='provider_null' for r in reviews),'provider_zero_volume':sum(r['volume_status']=='provider_zero' for r in reviews),'normalized_matches_existing_aliases':sum(bool(r['existing_normalized_alias_matches_json']!='[]') for r in reviews),'within_response_normalized_duplicates':sum(bool(r['within_response_normalized_duplicate']) for r in reviews),'volume_10_to_40_items':[{'keyword':r['keyword'],'volume':r['us_avg_monthly_search_volume'],'kd':r['organic_keyword_difficulty'],'reason':r['decision_reason_editorial']} for r in reviews if r['us_avg_monthly_search_volume'] is not None and 10<=r['us_avg_monthly_search_volume']<=40],'viable_new_measured_candidates':0,'rejected_near_topic_mappings':len(near),'ready_unmeasured_plan_hypotheses':len(ready),'held_plan_hypotheses':len(planned)-len(ready),'alias_index_normalized_phrases':len(aliases),'existing_csv_sources_checked':sources,'normalization':'Unicode NFKC, casefold, apostrophe removal, other punctuation to spaces, whitespace collapse; manual task-equivalence review in discovery-review.csv','returned_unique_normalized_keywords':len(seen)}
js('review-summary.json',metrics)
before=json.loads((OUT/'fingerprints-before.json').read_text())
changed=[]
for scope in ['research','website']:
    for name,digest in before[scope].items():
        p=Path(name)
        if not p.exists() or sha(p)!=digest:changed.append(name)
assert not changed,changed
ledger=json.loads(Path('/Users/kasutaja/.config/codex-seo/dataforseo-ledger.json').read_text())
matches=[e for e in ledger['entries'] if task['id'] in e.get('note','')]
assert len(matches)==1 and matches[0]['cost']==response['cost']
js('verification.json',{'verified_at_utc':datetime.now(timezone.utc).isoformat(),'preserved_research_files':len(before['research']),'preserved_website_files':len(before['website']),'changed_or_missing_preexisting_files':changed,'raw_text_matches_tool_envelope':json.loads((OUT/'tool-response.json').read_text())['content'][0]['text']==(OUT/'raw-response.json').read_text(),'single_task':response['tasks_count']==1,'single_local_ledger_entry':len(matches)==1,'charge_usd':response['cost'],'project_remaining_usd':0.226,'new_candidates_not_in_existing_alias_index':True,'later_stage_requests':0})
js('deduplication-sources.json',{'existing_sources':sources,'semantic_equivalence_authority':['docs/seo-eight-articles-keyword-opportunity-plan.md','docs/seo-eight-articles-semantic-audit.md','keyword-to-url-map.md'],'phase3b_checked_rows':5,'semantic_core_v2_checked_rows':309,'v2_candidate_control_companion_rows':197})
print(json.dumps({k:v for k,v in metrics.items() if k!='existing_csv_sources_checked'},indent=2))
