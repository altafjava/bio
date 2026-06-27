-- Profile visibility settings — controls what shows on the public biodata page.
-- Run this once in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS biodata_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT 'false',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Defaults: both off. Admin enables them when ready.
INSERT INTO biodata_settings (key, value) VALUES
  ('show_ctc',  'false'),
  ('show_plot', 'false')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE biodata_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_read"  ON biodata_settings FOR SELECT USING (true);
CREATE POLICY "anon_write" ON biodata_settings FOR ALL    USING (true);
