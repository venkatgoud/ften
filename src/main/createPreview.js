import path from 'path'
import fs from 'fs-plus'
import windowStateKeeper from 'electron-window-state'
import { shell } from 'electron'
import window from './windowManager'


export function createIndianPreview() {    
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  })

  var mainWindow = window.createWindow({
    'x': 10,
    'y': 10,
    'width': 800,
    'height': 800
  })

  var indexPath = process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, 'src/indian.html')
  : path.resolve(__dirname, '..', 'indian.html')
   
  mainWindow.showUrl(indexPath)
  mainWindowState.manage(mainWindow)

  function openExternal (e, url) {
    e.preventDefault()
    shell.openExternal(url)
  }
  mainWindow.webContents.on('new-window', openExternal)
  mainWindow.webContents.on('will-navigate', openExternal)

  return mainWindow
}

export function createHollywoodPreview() {    
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  })

   var mainWindow = window.createWindow({
    'x': 10,
    'y': 10,
    'width': 800,
    'height': 800
  })

  var indexPath = process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, 'src/hollywood.html')
  : path.resolve(__dirname, '..', 'hollywood.html')
   
  mainWindow.showUrl(indexPath)
  mainWindowState.manage(mainWindow)

  function openExternal (e, url) {
    e.preventDefault()
    shell.openExternal(url)
  }
  mainWindow.webContents.on('new-window', openExternal)
  mainWindow.webContents.on('will-navigate', openExternal)

  return mainWindow
}
