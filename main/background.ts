import path from 'path'
import { app, ipcMain, ipcRenderer } from 'electron'
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




ipcMain.on('message', async (event, arg) => {
  // fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });
  // let imageData = fs.readFileSync(arg);

  // let destinationPath = `D://Javascript/test-app/images/test2`;

  // if (!fs.existsSync(destinationPath)) {
  //   fs.mkdirSync(destinationPath, { recursive: true });
  // }

  // let fileName = Date.now()

  // fs.writeFile(`${destinationPath}/${fileName}.jpg`, imageData, (err) => {
  //   if (err) throw err;

  //   console.log('The file has been saved!');
  // });
  console.log('arg', typeof arg)
  event.reply('message', arg)
})

// ipcMain.on('save2', async (event, arg) => {
//   let userId = arg[0]
//   let folderName = arg[1]
//   let files = arg[2]
//   let returnList = []
//   console.log('arg', arg)



//   // let imageData = fs.readFileSync(arg);

//   // let destinationPath = `D://Javascript/ebro/images/test2`;

//   // if (!fs.existsSync(destinationPath)) {
//   //   fs.mkdirSync(destinationPath, { recursive: true });
//   // }

//   // let fileName = Date.now()

//   // fs.writeFile(`${destinationPath}/${fileName}.jpg`, imageData, (err) => {
//   //   if (err) throw err;

//   //   console.log('The file has been saved!');
//   // });
//   // console.log('arg', imageData)
//   event.reply('message', arg)
// })

ipcMain.on('save2', async (event, arg) => {
  let userId = arg[0];
  let folderName = arg[1];
  let files = arg[2];
  let returnList = [];
  console.log('arg', arg);
  console.log('files', folderName)
  console.log('files', typeof folderName)

  // Define the destination path
  let destinationPath = path.join('D://Javascript/ebro/images', folderName);

  // Ensure the destination directory exists
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }
  // console.log('destinationPath', destinationPath);

  // Iterate through each file and copy it to the destination
  files.forEach((filePath) => {
    try {
      let fileName = `${Date.now()}.jpg`;
      let destFilePath = path.join(destinationPath, fileName);

      // Read the file and write it to the new destination
      fs.copyFileSync(filePath, destFilePath);
      console.log(`File saved as ${destFilePath}`);

      // Optionally add to return list if needed
      returnList.push(destFilePath);
    } catch (err) {
      console.error('Error copying file:', err);
    }
  });

  // Reply back with the result
  event.reply('message', returnList);
});


ipcMain.on('save', async (event, arg) => {

  let imageData = fs.readFileSync(arg);

  let destinationPath = `D://Javascript/ebro/images/test2`;

  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath, { recursive: true });
  }

  let fileName = Date.now()

  fs.writeFile(`${destinationPath}/${fileName}.jpg`, imageData, (err) => {
    if (err) throw err;

    console.log('The file has been saved!');
  });
  console.log('arg', imageData)
  event.reply('message', `kaka World!`)
})


ipcMain.on('retrieve', async (event, arg) => {
  // window.ipc.send('save', {
  //   userId: userId,
  //   folderName: `${projectName}_project_id}`,
  //   files: uploadedFiles,
  // });

  const readImageAsBase64 = (filePath) => {
    const imageData = fs.readFileSync('D://Javascript/test-app/ebro/test2/1700330576630.jpg');
    return imageData.toString('base64');
  };

  const base64Image = readImageAsBase64(arg);
  // let imageData = fs.readFileSync(arg);
  // ... rest of your code to save the image ...

  // Send the binary data to the front-end

  console.log('arg', base64Image)

  event.reply('retrieve', base64Image);


})

// ipcRenderer.on('imageData', (event, imageData) => {
//   // Convert the Buffer to a Blob
//   let blob = new Blob([imageData], { type: 'image/jpeg' });
//   // Now, 'blob' is a Blob object representing the image
// });
