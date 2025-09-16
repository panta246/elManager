import * as electron from "electron";

electron.contextBridge.exposeInMainWorld("electron", {
  subscribeStatistics: (callback: (statistics: any) => void) => {
    electron.ipcRenderer.on("statistics", (_, stats) => {
      console.log(stats);
    });
  },
  getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
});
