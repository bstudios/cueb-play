import { app, BrowserWindow, session, Menu, dialog, ipcMain, MenuItemConstructorOptions } from 'electron';
import "reflect-metadata";
import initialize from './database';
import logger from './logging';
import fs from 'fs';
import path from 'path';

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

logger.info("Initializing electron app");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createMainWindow = (): void => {
  const window = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload-main.js')
    }
  });

  // and load the index.html of the app.
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  window.webContents.openDevTools();

  
  const template: Array<(MenuItemConstructorOptions)> = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click () {
            dialog.showOpenDialog({}).then((response) => {
              if (!response.canceled) {
                createWindow(response.filePaths[0])
              }
            })
          }
        },
        { role: 'quit' },
        { role: 'about' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'self\' \'unsafe-eval\' \'unsafe-inline\';']
      }
    })
  })
};

const createWindow = async (filePath: string): Promise<void> => {
  if (filePath !== null) {
    if (!fs.existsSync(filePath)) {
      throw new Error("Cannot locate requested file");
    }
    const databasePath = `./database.sqlite3`;
    if (fs.existsSync(databasePath)) {
      fs.unlinkSync(databasePath);
    }
    fs.copyFileSync(filePath, databasePath);
    await initialize(databasePath);
  }

  const window = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  
  const template: Array<(MenuItemConstructorOptions)> = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click () {
            dialog.showOpenDialog({}).then((response) => {
              if (!response.canceled) {
                createWindow(response.filePaths[0])
              }
            })
          }
        },
        { role: 'quit' },
        { role: 'about' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { type: 'separator' },
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // and load the index.html of the app.
  window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  window.webContents.openDevTools();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'self\' \'unsafe-eval\' \'unsafe-inline\';']
      }
    })
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  ipcMain.handle('dialog:openFile', (event, title) => {
    dialog.showOpenDialog({}).then((response) => {
      if (!response.canceled) {
        createWindow(response.filePaths[0])
      }
    })
  })
  createMainWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});