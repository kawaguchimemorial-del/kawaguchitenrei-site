-- 初期スキーマ(02_データベース設計.md 準拠)

CREATE TABLE company_info (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  postal_code TEXT,
  address1 TEXT,
  address2 TEXT,
  tel TEXT,
  fax TEXT,
  email TEXT,
  representative TEXT,
  invoice_no TEXT,
  bank_name TEXT,
  bank_branch TEXT,
  bank_account_type TEXT,
  bank_account_no TEXT,
  bank_account_holder TEXT,
  seal_image BLOB,
  logo_image BLOB,
  updated_at TEXT
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff',
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

CREATE TABLE customers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_kana TEXT,
  postal_code TEXT,
  address1 TEXT,
  address2 TEXT,
  tel TEXT,
  mobile TEXT,
  email TEXT,
  relationship_to_deceased TEXT,
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_customers_kana ON customers(name_kana);

CREATE TABLE deceased (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_kana TEXT,
  gender TEXT,
  birth_date TEXT,
  death_date TEXT,
  death_time TEXT,
  age INTEGER,
  postal_code TEXT,
  address1 TEXT,
  religion TEXT,
  temple_name TEXT,
  posthumous_name TEXT,
  note TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_deceased_kana ON deceased(name_kana);

CREATE TABLE cases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_no TEXT UNIQUE NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  deceased_id INTEGER REFERENCES deceased(id),
  status TEXT NOT NULL DEFAULT '問合せ',
  inquiry_date TEXT,
  wake_date TEXT,
  funeral_date TEXT,
  venue TEXT,
  funeral_plan TEXT,
  staff_user_id INTEGER REFERENCES users(id),
  note TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_cases_status_date ON cases(status, funeral_date);

CREATE TABLE product_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT UNIQUE,
  category_id INTEGER REFERENCES product_categories(id),
  name TEXT NOT NULL,
  unit TEXT,
  unit_price INTEGER NOT NULL DEFAULT 0,
  tax_rate INTEGER NOT NULL DEFAULT 10,
  is_taxable INTEGER NOT NULL DEFAULT 1,
  description TEXT,
  is_active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE estimates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  estimate_no TEXT UNIQUE NOT NULL,
  case_id INTEGER REFERENCES cases(id),
  issued_date TEXT NOT NULL,
  valid_until TEXT,
  title TEXT,
  subtotal INTEGER NOT NULL DEFAULT 0,
  tax_10 INTEGER NOT NULL DEFAULT 0,
  tax_8 INTEGER NOT NULL DEFAULT 0,
  tax_exempt INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  note TEXT,
  status TEXT NOT NULL DEFAULT '下書き',
  created_by INTEGER REFERENCES users(id),
  deleted_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_estimates_case ON estimates(case_id);

CREATE TABLE estimate_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  estimate_id INTEGER NOT NULL REFERENCES estimates(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  product_id INTEGER REFERENCES products(id),
  name TEXT NOT NULL,
  quantity REAL NOT NULL DEFAULT 1,
  unit TEXT,
  unit_price INTEGER NOT NULL DEFAULT 0,
  tax_rate INTEGER NOT NULL DEFAULT 10,
  is_taxable INTEGER NOT NULL DEFAULT 1,
  amount INTEGER NOT NULL DEFAULT 0,
  note TEXT
);
CREATE INDEX idx_estimate_items_eid ON estimate_items(estimate_id);

CREATE TABLE invoices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_no TEXT UNIQUE NOT NULL,
  case_id INTEGER REFERENCES cases(id),
  estimate_id INTEGER REFERENCES estimates(id),
  issued_date TEXT NOT NULL,
  due_date TEXT,
  title TEXT,
  subtotal INTEGER NOT NULL DEFAULT 0,
  tax_10 INTEGER NOT NULL DEFAULT 0,
  tax_8 INTEGER NOT NULL DEFAULT 0,
  tax_exempt INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  paid_amount INTEGER NOT NULL DEFAULT 0,
  paid_date TEXT,
  payment_status TEXT NOT NULL DEFAULT '請求済',
  note TEXT,
  created_by INTEGER REFERENCES users(id),
  deleted_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX idx_invoices_case ON invoices(case_id);

CREATE TABLE invoice_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  invoice_id INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  product_id INTEGER REFERENCES products(id),
  name TEXT NOT NULL,
  quantity REAL NOT NULL DEFAULT 1,
  unit TEXT,
  unit_price INTEGER NOT NULL DEFAULT 0,
  tax_rate INTEGER NOT NULL DEFAULT 10,
  is_taxable INTEGER NOT NULL DEFAULT 1,
  amount INTEGER NOT NULL DEFAULT 0,
  note TEXT
);
CREATE INDEX idx_invoice_items_iid ON invoice_items(invoice_id);

CREATE TABLE receipts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  receipt_no TEXT UNIQUE NOT NULL,
  invoice_id INTEGER REFERENCES invoices(id),
  issued_date TEXT NOT NULL,
  amount INTEGER NOT NULL,
  payee TEXT,
  reason TEXT,
  stamp_required INTEGER NOT NULL DEFAULT 0,
  deleted_at TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE obituaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_id INTEGER REFERENCES cases(id),
  issued_date TEXT,
  layout TEXT NOT NULL DEFAULT 'vertical',
  chief_mourner TEXT,
  relatives TEXT,
  wake_date_text TEXT,
  funeral_date_text TEXT,
  venue_name TEXT,
  venue_address TEXT,
  venue_tel TEXT,
  body_text TEXT,
  note TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  occurred_at TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id),
  action TEXT NOT NULL,
  target_table TEXT,
  target_id INTEGER,
  diff TEXT
);
CREATE INDEX idx_audit_log_at ON audit_log(occurred_at);

-- 自社情報の初期レコード(空)
INSERT INTO company_info(id, name, updated_at)
VALUES (1, '(未設定)', strftime('%Y-%m-%dT%H:%M:%fZ','now'));

-- 商品カテゴリのデフォルト
INSERT INTO product_categories(name, sort_order) VALUES
  ('プラン', 10),
  ('祭壇', 20),
  ('棺', 30),
  ('骨壷', 40),
  ('遺影写真', 50),
  ('料理', 60),
  ('返礼品', 70),
  ('車両', 80),
  ('施設使用料', 90),
  ('式場備品', 100),
  ('寺院費用', 200),
  ('その他', 999);
