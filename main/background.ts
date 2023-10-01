import { app, contextBridge, ipcMain, ipcRenderer } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import path from 'path'


const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('../dataBase.db');
// db.serialize(() => {
//   db.run("CREATE TABLE foody (name, lastName)");
//   db.run("INSERT INTO foody VALUES (?, ?)", ['foo', 'bar']);
// });

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

; (async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    minWidth: 960,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, '/preload.js'),
    }
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)

  }
})()



app.on('window-all-closed', () => {
  app.quit()
})





