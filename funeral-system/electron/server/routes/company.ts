import type { FastifyInstance } from 'fastify';
import { getDb } from '../db';

export function registerCompanyRoutes(app: FastifyInstance) {
  app.get('/api/company', async () => {
    return getDb().prepare('SELECT * FROM company_info WHERE id = 1').get();
  });

  app.put('/api/company', async (req) => {
    const b = req.body as Record<string, unknown>;
    const cols = [
      'name','postal_code','address1','address2','tel','fax','email','representative',
      'invoice_no','bank_name','bank_branch','bank_account_type','bank_account_no','bank_account_holder',
    ];
    const sets = cols.map((c) => `${c} = @${c}`).join(', ');
    getDb().prepare(`UPDATE company_info SET ${sets}, updated_at = @updated_at WHERE id = 1`)
      .run({ ...Object.fromEntries(cols.map((c) => [c, b[c] ?? null])), updated_at: new Date().toISOString() });
    return getDb().prepare('SELECT * FROM company_info WHERE id = 1').get();
  });
}
