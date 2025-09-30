import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import { ipcMainHandler, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getAssetPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import path from "path";
import { createTray } from "./tray.js";
import { createMenu } from "./menu.js";

// Menu.setApplicationMenu(null);
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);

  ipcMainHandler("getStaticData", () => {
    return getStaticData();
  });

  createTray(mainWindow);

  handleCloseEvents(mainWindow);

  createMenu(mainWindow);

  // handleGetStaticData(() => {
  //   return getStaticData();
  // });
});

function handleCloseEvents(mainWindow: BrowserWindow) {
  let willClose = false;
  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
// function handleGetStaticData(callback: () => StaticData) {
//   ipcMain.handle("getStaticData", callback);
// }
