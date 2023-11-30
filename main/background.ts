import path from 'path'
import { app, dialog, ipcMain, ipcRenderer } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import fs from 'fs'

const isProd = process.env.NODE_ENV === 'production'

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
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('convertToBlobURL', async (event, imageDescArray) => {
  let convertedImages = [];
  for (const imageDesc of imageDescArray) {
    try {
      const imageData = fs.readFileSync(imageDesc.url);
      const fileName = path.basename(imageDesc.url);
      convertedImages.push({ file: imageData, desc: imageDesc.desc, url: fileName });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  event.sender.send('convertedImages', convertedImages);
});

ipcMain.on('deleteImages', async (event, imagesToDel) => {
  for (const image of imagesToDel) {
    try {
      fs.unlinkSync(image);
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

ipcMain.on('message', async (event, arg) => {
  event.sender.send('message', arg)
})

ipcMain.on('browseSaveLocation', async (event, defaultPath) => {
  dialog.showOpenDialog({
    title: 'Select a directory to save project photos to',
    defaultPath,
    properties: ['openDirectory', 'createDirectory']
  }).then(result => {
    if (!result.canceled) {
      let destinationPath = result.filePaths[0];
      event.sender.send('saveLocation', destinationPath);
    }
  }).catch(err => {
    console.error('Error selecting directory:', err);
  });
}
)

ipcMain.on('savePhotos', async (event, arg) => {
  let defaultSavePath = arg[0];
  let folderName = arg[1];
  let files = arg[2];
  let returnList = [];
  if (!fs.existsSync(path.join(defaultSavePath, folderName))) {
    fs.mkdirSync(path.join(defaultSavePath, folderName), { recursive: true });
  }
  const destinationPath = path.join(defaultSavePath, folderName);
  files.forEach((fileObject) => {
    const destFilePath = path.join(destinationPath, fileObject.name);
    fs.copyFileSync(fileObject.path, destFilePath);
    returnList.push(destFilePath);
  });
  event.sender.send('returnList', returnList);
});

