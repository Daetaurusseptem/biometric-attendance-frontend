const {app, BrowserWindow} = require('electron')
const url = require("url");
const path = require("path");
const ZKJUBAER = require("zk-jubaer");

const { ipcMain } = require('electron');
const { runMachine } = require('./biometricService');

let mainWindow




ipcMain.on('get-biometric-logs', async (event) => {
  try {
    const logs = await runMachine();
    event.reply('biometric-logs-response', logs);
  } catch (error) {
    console.log(error);
  }
});





function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    darkTheme:true,
    icon:'./assets/img/cconor-logo-no-text.png',
    autoHideMenuBar:true,
    webPreferences: {
      nodeIntegration: true
    }
  })



  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/sistema-asistencias/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}


app.on('ready', createWindow)


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow(err=>{console.log(err);})
})