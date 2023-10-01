import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron';
const os = require('os');

import { IPCKeys } from './constants';

// const IPCKeys = {
//   RECEIVE_MESSAGE: 'receiveMessage',
//   SEND_MESSSAGE: 'sendMessage',
// }


ipcRenderer.on(
  'onReceiveMessage',
  (event: IpcRendererEvent, message: string) => {
    console.log(message);
  },
);

contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
});


// note: this assume you have a `ipcMain.handle('do-thing-and-return-promise', ...)` 
// somewhere that return a number.

contextBridge.exposeInMainWorld('electron', {
  send: (channel: string, ...args: any[]) => {
    ipcRenderer.send(channel, ...args);
  },
  on: (
    channel: string,
    listener: (event: IpcRendererEvent, ...args: any[]) => void,
  ) => {
    ipcRenderer.on(channel, listener);
  },
});


contextBridge.exposeInMainWorld('myAPI', {
  // 関数で包んで部分的に公開する
  // renderer -> main
  sendMessage: (message: string) => {
    ipcRenderer.send(IPCKeys.SEND_MESSSAGE, message);
  },
  // main -> renderer
  onReceiveMessage: (listener: (message: string) => void) => {
    ipcRenderer.on(
      IPCKeys.RECEIVE_MESSAGE,
      (event: IpcRendererEvent, message: string) => listener(message),
    );
    return () => {
      ipcRenderer.removeAllListeners(IPCKeys.RECEIVE_MESSAGE);
    };
  },
});


contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title)
})