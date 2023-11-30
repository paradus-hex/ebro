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
  let message = arg[0];
  event.sender.send('message', 'matha')
})

ipcMain.on('browseSaveLocation', async (event, defaultPath) => {
  dialog.showOpenDialog({
    title: 'Select a directory to save files',
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

ipcMain.on('save2', async (event, arg) => {
  let userId = arg[0];
  let folderName = arg[1];
  let files = arg[2];
  let returnList = [];
  // console.log('arg', arg);
  // console.log('files', folderName)
  // console.log('files', typeof folderName)

  if (!fs.existsSync(path.join(__dirname, `../images`, folderName))) {
    fs.mkdirSync(path.join(__dirname, `../images`, folderName), { recursive: true });
  }
  dialog.showOpenDialog({
    title: 'Select a directory to save files',
    defaultPath: path.join(__dirname, `../images`, folderName),
    properties: ['openDirectory', 'createDirectory']
  }).then(result => {
    if (!result.canceled) {
      let destinationPath = result.filePaths[0];
      files.forEach((fileObject) => {
        let destFilePath = path.join(destinationPath, fileObject.name);
        fs.copyFileSync(fileObject.path, destFilePath);
        returnList.push(destFilePath);
      });
      event.sender.send('returnList', returnList);
    }
  }).catch(err => {
    console.error('Error selecting directory:', err);
  });
});


// ipcMain.on('save', async (event, arg) => {

//   let imageData = fs.readFileSync(arg);

//   let destinationPath = `D://Javascript/ebro/images/test2`;

//   if (!fs.existsSync(destinationPath)) {
//     fs.mkdirSync(destinationPath, { recursive: true });
//   }

//   let fileName = Date.now()

//   fs.writeFile(`${destinationPath}/${fileName}.jpg`, imageData, (err) => {
//     if (err) throw err;

//     console.log('The file has been saved!');
//   });
//   console.log('arg', imageData)
//   event.reply('message', `kaka World!`)
// })

ipcMain.on('retrieve', async (event, arg) => {
  const readImageAsBase64 = (filePath) => {
    const imageData = fs.readFileSync('D://Javascript/test-app/ebro/test2/1700330576630.jpg');
    return imageData.toString('base64');
  };
  const base64Image = readImageAsBase64(arg);
  console.log('arg', base64Image)
  event.reply('retrieve', base64Image);
})

