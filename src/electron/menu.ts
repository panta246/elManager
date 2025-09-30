import { app, BrowserWindow, Menu } from "electron";
import { ipcWebContentsSend, isDev } from "./util.js";

export function createMenu(mainWindow: BrowserWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === "darwin" ? undefined : "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: app.quit,
          },
          {
            label: "DevTools",
            click: () => {
              mainWindow.webContents.openDevTools();
            },
            visible: isDev(),
          },
        ],
      },
      {
        label: "View",
        type: "submenu",
        submenu: [
          {
            label: "cpu",
            click: () =>
              ipcWebContentsSend("changeView", mainWindow.webContents, "cpu"),
          },
          {
            label: "ram",
            click: () =>
              ipcWebContentsSend("changeView", mainWindow.webContents, "ram"),
          },
          {
            label: "storage",
            click: () =>
              ipcWebContentsSend(
                "changeView",
                mainWindow.webContents,
                "storage"
              ),
          },
        ],
      },
    ])
  );
}
