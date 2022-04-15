import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronRenderer',{
  openFile: () => ipcRenderer.invoke('dialog:openFile')
})