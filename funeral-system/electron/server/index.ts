import Fastify from 'fastify';
import cors from '@fastify/cors';
import path from 'path';
import fs from 'fs';
import { initDb, getDb } from './db';
import { registerProductRoutes } from './routes/products';
import { registerCustomerRoutes } from './routes/customers';
import { registerCaseRoutes } from './routes/cases';
import { registerEstimateRoutes } from './routes/estimates';
import { registerCompanyRoutes } from './routes/company';

export async function startServer(opts: { port: number; dataDir: string }) {
  // DB初期化
  const dbDir = path.join(opts.dataDir, 'data');
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
  initDb(path.join(dbDir, 'app.db'));

  const fastify = Fastify({ logger: true });
  await fastify.register(cors, { origin: true });

  // ヘルスチェック
  fastify.get('/health', async () => ({ ok: true, time: new Date().toISOString() }));

  // ルート登録
  registerCompanyRoutes(fastify);
  registerProductRoutes(fastify);
  registerCustomerRoutes(fastify);
  registerCaseRoutes(fastify);
  registerEstimateRoutes(fastify);

  await fastify.listen({ port: opts.port, host: '0.0.0.0' });
  return opts.port;
}

export { getDb };
