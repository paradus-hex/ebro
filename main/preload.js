import { contextBridge, ipcRenderer } from 'electron';
const os = require('os');
contextBridge.exposeInMainWorld('myAPI', {
  send: (channel, data) => {
    console.log(data);
    ipcRenderer.send(channel, data);
  },
  on: (channel, callback) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
});

contextBridge.exposeInMainWorld('os', {
  homedir: 'kaj kore',
});

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
});
