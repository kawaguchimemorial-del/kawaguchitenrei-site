import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'path';
import { startServer } from './server';
import { renderEstimatePdf } from './pdf/render';

const isDev = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow | null = null;
let serverPort = 8080;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: '葬儀見積管理',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    await mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    await mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }
}

// PDF生成 (renderer → main へIPC経由で依頼)
ipcMain.handle('pdf:renderEstimate', async (_e, payload) => {
  return await renderEstimatePdf(payload);
});

// アプリの保存先(SQLite含む)を返す
ipcMain.handle('app:getDataDir', () => app.getPath('userData'));
// ポート番号を返す(クライアントモード接続先決定用)
ipcMain.handle('app:getServerPort', () => serverPort);

app.whenReady().then(async () => {
  // TODO: 初回起動ウィザードで「サーバー/クライアント」を選択
  // とりあえずホストモードで起動
  serverPort = await startServer({ port: 8080, dataDir: app.getPath('userData') });
  await createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
