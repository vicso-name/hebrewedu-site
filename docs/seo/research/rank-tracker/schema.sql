PRAGMA foreign_keys = ON;
PRAGMA user_version = 1;
CREATE TABLE runs (
  id TEXT PRIMARY KEY, started_at TEXT NOT NULL, config_json TEXT NOT NULL,
  comparable_key TEXT NOT NULL, keywords_sha256 TEXT NOT NULL,
  budget_usd TEXT NOT NULL, estimated_usd TEXT NOT NULL, pricing_json TEXT NOT NULL
);
CREATE TABLE run_keywords (
  run_id TEXT NOT NULL REFERENCES runs(id), ordinal INTEGER NOT NULL,
  keyword TEXT NOT NULL, target_url TEXT NOT NULL,
  PRIMARY KEY(run_id, keyword), UNIQUE(run_id, ordinal)
);
CREATE TABLE requests (
  run_id TEXT NOT NULL, keyword TEXT NOT NULL, started_at TEXT NOT NULL,
  request_json TEXT NOT NULL,
  PRIMARY KEY(run_id, keyword),
  FOREIGN KEY(run_id, keyword) REFERENCES run_keywords(run_id, keyword)
);
CREATE TABLE observations (
  run_id TEXT NOT NULL, keyword TEXT NOT NULL, observed_at TEXT NOT NULL,
  actual_url TEXT, organic_rank INTEGER CHECK(organic_rank > 0),
  status TEXT NOT NULL CHECK(status IN ('exact_target','other_hebrewedu_url','not_found','api_failure','missing_data')),
  attempted INTEGER NOT NULL CHECK(attempted IN (0,1)),
  returned_result_count INTEGER CHECK(returned_result_count >= 0),
  returned_organic_count INTEGER CHECK(returned_organic_count >= 0),
  checked_organic_count INTEGER CHECK(checked_organic_count >= 0),
  max_returned_organic_rank INTEGER, pages_count INTEGER,
  api_task_id TEXT, response_status_code INTEGER, task_status_code INTEGER,
  response_cost_usd TEXT, task_cost_usd TEXT, charged_cost_usd TEXT,
  http_status INTEGER, note TEXT NOT NULL,
  provider_response_json TEXT, raw_response_text TEXT,
  PRIMARY KEY(run_id, keyword),
  FOREIGN KEY(run_id, keyword) REFERENCES run_keywords(run_id, keyword),
  CHECK((status IN ('exact_target','other_hebrewedu_url') AND organic_rank IS NOT NULL AND actual_url IS NOT NULL)
     OR (status NOT IN ('exact_target','other_hebrewedu_url') AND organic_rank IS NULL AND actual_url IS NULL))
);
CREATE TABLE run_events (
  id INTEGER PRIMARY KEY, run_id TEXT NOT NULL REFERENCES runs(id),
  recorded_at TEXT NOT NULL, kind TEXT NOT NULL, details_json TEXT NOT NULL
);
CREATE TABLE account_snapshots (
  id INTEGER PRIMARY KEY, run_id TEXT NOT NULL REFERENCES runs(id), phase TEXT NOT NULL,
  recorded_at TEXT NOT NULL, balance_usd TEXT, provider_response_json TEXT NOT NULL
);
CREATE TABLE pilot_observations (
  source_sha256 TEXT PRIMARY KEY, keyword TEXT NOT NULL, target_url TEXT NOT NULL,
  actual_url TEXT NOT NULL, organic_rank INTEGER NOT NULL CHECK(organic_rank > 0),
  observed_at TEXT NOT NULL, config_json TEXT NOT NULL, api_task_id TEXT,
  note TEXT NOT NULL, provider_response_json TEXT NOT NULL
);
CREATE INDEX runs_comparable ON runs(comparable_key, started_at);
