import type { FastifyInstance } from 'fastify';
import { getDb } from '../db';

export function registerCustomerRoutes(app: FastifyInstance) {
  app.get('/api/customers', async (req) => {
    const q = (req.query as { q?: string })?.q;
    const sql = q
      ? 'SELECT * FROM customers WHERE name LIKE @q OR name_kana LIKE @q ORDER BY id DESC LIMIT 100'
      : 'SELECT * FROM customers ORDER BY id DESC LIMIT 100';
    return getDb().prepare(sql).all(q ? { q: `%${q}%` } : {});
  });

  app.get('/api/customers/:id', async (req) => {
    const id = Number((req.params as any).id);
    return getDb().prepare('SELECT * FROM customers WHERE id = ?').get(id);
  });

  app.post('/api/customers', async (req) => {
    const b = req.body as any;
    const now = new Date().toISOString();
    const r = getDb().prepare(`
      INSERT INTO customers(name, name_kana, postal_code, address1, address2, tel, mobile, email, relationship_to_deceased, note, created_at, updated_at)
      VALUES(@name, @name_kana, @postal_code, @address1, @address2, @tel, @mobile, @email, @relationship_to_deceased, @note, @now, @now)
    `).run({
      name: b.name,
      name_kana: b.name_kana ?? null,
      postal_code: b.postal_code ?? null,
      address1: b.address1 ?? null,
      address2: b.address2 ?? null,
      tel: b.tel ?? null,
      mobile: b.mobile ?? null,
      email: b.email ?? null,
      relationship_to_deceased: b.relationship_to_deceased ?? null,
      note: b.note ?? null,
      now,
    });
    return getDb().prepare('SELECT * FROM customers WHERE id = ?').get(r.lastInsertRowid);
  });
}
