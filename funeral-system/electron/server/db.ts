import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

let db: Database.Database | null = null;

export function initDb(dbPath: string) {
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // マイグレーション適用
  const migrationsDir = path.join(__dirname, '..', '..', 'electron', 'server', 'migrations');
  // dist-electron 配下に置かれるためrelative調整
  const candidates = [
    migrationsDir,
    path.join(__dirname, 'migrations'),
    path.join(__dirname, '..', 'migrations'),
  ];
  let dir: string | null = null;
  for (const c of candidates) {
    if (fs.existsSync(c)) { dir = c; break; }
  }
  if (!dir) {
    console.warn('[db] migrations dir not found, skipping');
    return db;
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    );
  `);

  const applied = new Set(
    (db.prepare('SELECT version FROM schema_migrations').all() as { version: string }[])
      .map((r) => r.version)
  );

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
  for (const f of files) {
    if (applied.has(f)) continue;
    const sql = fs.readFileSync(path.join(dir, f), 'utf8');
    const tx = db.transaction(() => {
      db!.exec(sql);
      db!.prepare('INSERT INTO schema_migrations(version, applied_at) VALUES(?, ?)').run(
        f,
        new Date().toISOString()
      );
    });
    tx();
    console.log(`[db] migration applied: ${f}`);
  }
  return db;
}

export function getDb(): Database.Database {
  if (!db) throw new Error('DB not initialized');
  return db;
}
