CREATE TABLE IF NOT EXISTS words (
  id SERIAL PRIMARY KEY,
  word1_text TEXT NOT NULL,
  word1_url TEXT NOT NULL,
  word2_text TEXT NOT NULL,
  word2_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

INSERT INTO words (word1_text, word1_url, word2_text, word2_url)
VALUES
  ('flee', 'audio/flee.mp3', 'free', 'audio/free.mp3'),
  ('light', 'audio/light.mp3', 'right', 'audio/right.mp3'),
  ('low', 'audio/low.mp3', 'row', 'audio/row.mp3'),
  ('glass', 'audio/glass.mp3', 'grass', 'audio/grass.mp3'),
  ('lack', 'audio/lack.mp3', 'rack','audio/rack.mp3'),
  ('blue', 'audio/alayna/blue.mp3', 'brew', 'audio/alayna/brew.mp3'),
  ('clap', 'audio/alayna/clap.mp3', 'crap', 'audio/alayna/crap.mp3'),
  ('glow', 'audio/alayna/glow.mp3', 'grow', 'audio/alayna/grow.mp3'),
  ('rub', 'audio/alayna/rub.mp3', 'love', 'audio/alayna/love.mp3'),
  ('lip', 'audio/alayna/lip.mp3', 'rip', 'audio/alayna/rip.mp3'),
  ('claw', 'audio/alayna/claw.mp3', 'craw', 'audio/alayna/craw.mp3'),
  ('load', 'audio/alayna/load.mp3', 'road', 'audio/alayna/road.mp3'),
  ('clown', 'audio/alayna/clown.mp3', 'crown', 'audio/alayna/crown.mp3');

-- スコアテーブル
CREATE TABLE IF NOT EXISTS scores (
  id SERIAL PRIMARY KEY,
  player_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- インデックスを作成（ランキング取得を高速化）
CREATE INDEX IF NOT EXISTS idx_scores_score ON scores(score DESC);
CREATE INDEX IF NOT EXISTS idx_scores_created_at ON scores(created_at DESC);