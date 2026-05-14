import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('funeralAPI', {
  // PDF生成
  renderEstimatePdf: (payload: unknown) => ipcRenderer.invoke('pdf:renderEstimate', payload),
  // アプリ情報
  getDataDir: () => ipcRenderer.invoke('app:getDataDir'),
  getServerPort: () => ipcRenderer.invoke('app:getServerPort'),
});

export type FuneralAPI = {
  renderEstimatePdf: (payload: unknown) => Promise<{ filePath: string }>;
  getDataDir: () => Promise<string>;
  getServerPort: () => Promise<number>;
};
