import type { FastifyInstance } from 'fastify';
import { getDb } from '../db';

function nextCaseNo(): string {
  const year = new Date().getFullYear();
  const row = getDb()
    .prepare(`SELECT case_no FROM cases WHERE case_no LIKE ? ORDER BY id DESC LIMIT 1`)
    .get(`${year}-%`) as { case_no?: string } | undefined;
  let n = 1;
  if (row?.case_no) {
    const m = row.case_no.match(/(\d+)$/);
    if (m) n = Number(m[1]) + 1;
  }
  return `${year}-${String(n).padStart(4, '0')}`;
}

export function registerCaseRoutes(app: FastifyInstance) {
  app.get('/api/cases', async () => {
    return getDb().prepare(`
      SELECT c.*, cu.name AS customer_name, d.name AS deceased_name
      FROM cases c
      LEFT JOIN customers cu ON cu.id = c.customer_id
      LEFT JOIN deceased d ON d.id = c.deceased_id
      ORDER BY c.id DESC LIMIT 200
    `).all();
  });

  app.get('/api/cases/:id', async (req) => {
    const id = Number((req.params as any).id);
    const c = getDb().prepare('SELECT * FROM cases WHERE id = ?').get(id);
    if (!c) return { error: 'not found' };
    const customer = (c as any).customer_id
      ? getDb().prepare('SELECT * FROM customers WHERE id = ?').get((c as any).customer_id)
      : null;
    const deceased = (c as any).deceased_id
      ? getDb().prepare('SELECT * FROM deceased WHERE id = ?').get((c as any).deceased_id)
      : null;
    return { ...c, customer, deceased };
  });

  app.post('/api/cases', async (req) => {
    const b = req.body as any;
    const now = new Date().toISOString();
    const case_no = nextCaseNo();
    const r = getDb().prepare(`
      INSERT INTO cases(case_no, customer_id, deceased_id, status, inquiry_date, wake_date, funeral_date, venue, funeral_plan, staff_user_id, note, created_at, updated_at)
      VALUES(@case_no, @customer_id, @deceased_id, @status, @inquiry_date, @wake_date, @funeral_date, @venue, @funeral_plan, @staff_user_id, @note, @now, @now)
    `).run({
      case_no,
      customer_id: b.customer_id ?? null,
      deceased_id: b.deceased_id ?? null,
      status: b.status ?? '問合せ',
      inquiry_date: b.inquiry_date ?? null,
      wake_date: b.wake_date ?? null,
      funeral_date: b.funeral_date ?? null,
      venue: b.venue ?? null,
      funeral_plan: b.funeral_plan ?? null,
      staff_user_id: b.staff_user_id ?? null,
      note: b.note ?? null,
      now,
    });
    return getDb().prepare('SELECT * FROM cases WHERE id = ?').get(r.lastInsertRowid);
  });
}
