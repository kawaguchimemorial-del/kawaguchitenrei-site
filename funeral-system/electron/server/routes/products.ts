import type { FastifyInstance } from 'fastify';
import { getDb } from '../db';

export function registerProductRoutes(app: FastifyInstance) {
  app.get('/api/product-categories', async () => {
    return getDb().prepare('SELECT * FROM product_categories ORDER BY sort_order, id').all();
  });

  app.get('/api/products', async (req) => {
    const q = (req.query as { q?: string; category_id?: string }) || {};
    const where: string[] = ['is_active = 1'];
    const params: Record<string, unknown> = {};
    if (q.q) { where.push('name LIKE @q'); params.q = `%${q.q}%`; }
    if (q.category_id) { where.push('category_id = @cid'); params.cid = Number(q.category_id); }
    const sql = `SELECT * FROM products WHERE ${where.join(' AND ')} ORDER BY sort_order, id`;
    return getDb().prepare(sql).all(params);
  });

  app.post('/api/products', async (req) => {
    const b = req.body as any;
    const r = getDb().prepare(`
      INSERT INTO products(code, category_id, name, unit, unit_price, tax_rate, is_taxable, description, sort_order)
      VALUES(@code, @category_id, @name, @unit, @unit_price, @tax_rate, @is_taxable, @description, @sort_order)
    `).run({
      code: b.code ?? null,
      category_id: b.category_id ?? null,
      name: b.name,
      unit: b.unit ?? null,
      unit_price: Number(b.unit_price ?? 0),
      tax_rate: Number(b.tax_rate ?? 10),
      is_taxable: b.is_taxable === false ? 0 : 1,
      description: b.description ?? null,
      sort_order: Number(b.sort_order ?? 0),
    });
    return getDb().prepare('SELECT * FROM products WHERE id = ?').get(r.lastInsertRowid);
  });

  app.put('/api/products/:id', async (req) => {
    const id = Number((req.params as any).id);
    const b = req.body as any;
    getDb().prepare(`
      UPDATE products SET
        code = @code, category_id = @category_id, name = @name, unit = @unit,
        unit_price = @unit_price, tax_rate = @tax_rate, is_taxable = @is_taxable,
        description = @description, sort_order = @sort_order, is_active = @is_active
      WHERE id = @id
    `).run({
      id,
      code: b.code ?? null,
      category_id: b.category_id ?? null,
      name: b.name,
      unit: b.unit ?? null,
      unit_price: Number(b.unit_price ?? 0),
      tax_rate: Number(b.tax_rate ?? 10),
      is_taxable: b.is_taxable === false ? 0 : 1,
      description: b.description ?? null,
      sort_order: Number(b.sort_order ?? 0),
      is_active: b.is_active === false ? 0 : 1,
    });
    return getDb().prepare('SELECT * FROM products WHERE id = ?').get(id);
  });
}
