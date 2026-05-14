import type { FastifyInstance } from 'fastify';
import { getDb } from '../db';

function nextEstimateNo(): string {
  const year = new Date().getFullYear();
  const row = getDb()
    .prepare(`SELECT estimate_no FROM estimates WHERE estimate_no LIKE ? ORDER BY id DESC LIMIT 1`)
    .get(`E-${year}-%`) as { estimate_no?: string } | undefined;
  let n = 1;
  if (row?.estimate_no) {
    const m = row.estimate_no.match(/(\d+)$/);
    if (m) n = Number(m[1]) + 1;
  }
  return `E-${year}-${String(n).padStart(4, '0')}`;
}

type Item = {
  id?: number;
  sort_order?: number;
  product_id?: number | null;
  name: string;
  quantity: number;
  unit?: string | null;
  unit_price: number;
  tax_rate: number;
  is_taxable: boolean;
  note?: string | null;
};

function calcTotals(items: Item[]) {
  let subtotal = 0;
  let tax_10 = 0;
  let tax_8 = 0;
  let tax_exempt = 0;
  for (const it of items) {
    const amount = Math.round(it.quantity * it.unit_price);
    subtotal += amount;
    if (!it.is_taxable) {
      tax_exempt += amount;
    } else if (it.tax_rate === 8) {
      tax_8 += Math.floor(amount * 0.08);
    } else {
      tax_10 += Math.floor(amount * 0.10);
    }
  }
  const total = subtotal + tax_10 + tax_8;
  return { subtotal, tax_10, tax_8, tax_exempt, total };
}

export function registerEstimateRoutes(app: FastifyInstance) {
  app.get('/api/estimates', async () => {
    return getDb().prepare(`
      SELECT e.*, c.case_no, cu.name AS customer_name, d.name AS deceased_name
      FROM estimates e
      LEFT JOIN cases c ON c.id = e.case_id
      LEFT JOIN customers cu ON cu.id = c.customer_id
      LEFT JOIN deceased d ON d.id = c.deceased_id
      WHERE e.deleted_at IS NULL
      ORDER BY e.id DESC LIMIT 200
    `).all();
  });

  app.get('/api/estimates/:id', async (req) => {
    const id = Number((req.params as any).id);
    const head = getDb().prepare('SELECT * FROM estimates WHERE id = ?').get(id);
    if (!head) return { error: 'not found' };
    const items = getDb().prepare('SELECT * FROM estimate_items WHERE estimate_id = ? ORDER BY sort_order, id').all(id);
    return { ...head, items };
  });

  app.post('/api/estimates', async (req) => {
    const b = req.body as any;
    const now = new Date().toISOString();
    const items: Item[] = (b.items ?? []).map((it: any) => ({
      product_id: it.product_id ?? null,
      name: it.name,
      quantity: Number(it.quantity ?? 1),
      unit: it.unit ?? null,
      unit_price: Number(it.unit_price ?? 0),
      tax_rate: Number(it.tax_rate ?? 10),
      is_taxable: it.is_taxable !== false,
      note: it.note ?? null,
    }));
    const totals = calcTotals(items);
    const estimate_no = b.estimate_no ?? nextEstimateNo();

    const db = getDb();
    const tx = db.transaction(() => {
      const r = db.prepare(`
        INSERT INTO estimates(estimate_no, case_id, issued_date, valid_until, title, subtotal, tax_10, tax_8, tax_exempt, total, note, status, created_by, created_at, updated_at)
        VALUES(@estimate_no, @case_id, @issued_date, @valid_until, @title, @subtotal, @tax_10, @tax_8, @tax_exempt, @total, @note, @status, @created_by, @now, @now)
      `).run({
        estimate_no,
        case_id: b.case_id ?? null,
        issued_date: b.issued_date ?? new Date().toISOString().slice(0, 10),
        valid_until: b.valid_until ?? null,
        title: b.title ?? null,
        ...totals,
        note: b.note ?? null,
        status: b.status ?? '下書き',
        created_by: b.created_by ?? null,
        now,
      });
      const eid = Number(r.lastInsertRowid);
      const ins = db.prepare(`
        INSERT INTO estimate_items(estimate_id, sort_order, product_id, name, quantity, unit, unit_price, tax_rate, is_taxable, amount, note)
        VALUES(@estimate_id, @sort_order, @product_id, @name, @quantity, @unit, @unit_price, @tax_rate, @is_taxable, @amount, @note)
      `);
      items.forEach((it, i) => {
        ins.run({
          estimate_id: eid,
          sort_order: i,
          product_id: it.product_id ?? null,
          name: it.name,
          quantity: it.quantity,
          unit: it.unit ?? null,
          unit_price: it.unit_price,
          tax_rate: it.tax_rate,
          is_taxable: it.is_taxable ? 1 : 0,
          amount: Math.round(it.quantity * it.unit_price),
          note: it.note ?? null,
        });
      });
      return eid;
    });
    const eid = tx();
    return { id: eid, estimate_no, ...totals };
  });

  app.put('/api/estimates/:id', async (req) => {
    const id = Number((req.params as any).id);
    const b = req.body as any;
    const now = new Date().toISOString();
    const items: Item[] = (b.items ?? []).map((it: any) => ({
      product_id: it.product_id ?? null,
      name: it.name,
      quantity: Number(it.quantity ?? 1),
      unit: it.unit ?? null,
      unit_price: Number(it.unit_price ?? 0),
      tax_rate: Number(it.tax_rate ?? 10),
      is_taxable: it.is_taxable !== false,
      note: it.note ?? null,
    }));
    const totals = calcTotals(items);
    const db = getDb();
    const tx = db.transaction(() => {
      db.prepare(`
        UPDATE estimates SET
          case_id = @case_id, issued_date = @issued_date, valid_until = @valid_until, title = @title,
          subtotal = @subtotal, tax_10 = @tax_10, tax_8 = @tax_8, tax_exempt = @tax_exempt, total = @total,
          note = @note, status = @status, updated_at = @now
        WHERE id = @id
      `).run({
        id,
        case_id: b.case_id ?? null,
        issued_date: b.issued_date,
        valid_until: b.valid_until ?? null,
        title: b.title ?? null,
        ...totals,
        note: b.note ?? null,
        status: b.status ?? '下書き',
        now,
      });
      db.prepare('DELETE FROM estimate_items WHERE estimate_id = ?').run(id);
      const ins = db.prepare(`
        INSERT INTO estimate_items(estimate_id, sort_order, product_id, name, quantity, unit, unit_price, tax_rate, is_taxable, amount, note)
        VALUES(@estimate_id, @sort_order, @product_id, @name, @quantity, @unit, @unit_price, @tax_rate, @is_taxable, @amount, @note)
      `);
      items.forEach((it, i) => {
        ins.run({
          estimate_id: id,
          sort_order: i,
          product_id: it.product_id ?? null,
          name: it.name,
          quantity: it.quantity,
          unit: it.unit ?? null,
          unit_price: it.unit_price,
          tax_rate: it.tax_rate,
          is_taxable: it.is_taxable ? 1 : 0,
          amount: Math.round(it.quantity * it.unit_price),
          note: it.note ?? null,
        });
      });
    });
    tx();
    return { id, ...totals };
  });
}
