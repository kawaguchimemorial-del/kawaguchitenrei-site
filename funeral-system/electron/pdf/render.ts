import { BrowserWindow, app } from 'electron';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

type EstimateForPdf = {
  estimate_no: string;
  issued_date: string;
  valid_until?: string | null;
  title?: string | null;
  customer_name?: string | null;
  deceased_name?: string | null;
  items: Array<{
    name: string;
    quantity: number;
    unit?: string | null;
    unit_price: number;
    amount: number;
    tax_rate: number;
    is_taxable: boolean;
  }>;
  subtotal: number;
  tax_10: number;
  tax_8: number;
  tax_exempt: number;
  total: number;
  note?: string | null;
  company: {
    name: string;
    postal_code?: string | null;
    address1?: string | null;
    address2?: string | null;
    tel?: string | null;
    invoice_no?: string | null;
    bank_name?: string | null;
    bank_branch?: string | null;
    bank_account_type?: string | null;
    bank_account_no?: string | null;
    bank_account_holder?: string | null;
  };
  outputPath?: string;
};

Handlebars.registerHelper('yen', (n: number) =>
  '¥' + (n ?? 0).toLocaleString('ja-JP')
);
Handlebars.registerHelper('jpdate', (s: string) => {
  if (!s) return '';
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
});

export async function renderEstimatePdf(payload: EstimateForPdf): Promise<{ filePath: string }> {
  const tplPath = path.join(__dirname, 'templates', 'estimate.html');
  const fallback = path.join(app.getAppPath(), 'electron', 'pdf', 'templates', 'estimate.html');
  const actual = fs.existsSync(tplPath) ? tplPath : fallback;
  const html = Handlebars.compile(fs.readFileSync(actual, 'utf8'))(payload);

  const win = new BrowserWindow({ show: false, webPreferences: { sandbox: true } });
  await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
  const buf = await win.webContents.printToPDF({
    pageSize: 'A4',
    printBackground: true,
    margins: { top: 0.4, bottom: 0.4, left: 0.4, right: 0.4 },
  });
  win.close();

  const outDir = path.join(app.getPath('userData'), 'pdf');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const filePath = payload.outputPath ?? path.join(outDir, `${payload.estimate_no}.pdf`);
  fs.writeFileSync(filePath, buf);
  return { filePath };
}
