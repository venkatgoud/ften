import path from 'path'
import fs from 'fs-plus'
import windowStateKeeper from 'electron-window-state'
import { shell } from 'electron'
import window from './windowManager'

export default function createWindow (filePath, callback) {
  // Create the browser window.

  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  })

  var mainWindow = window.createWindow({
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    'width': mainWindowState.width,
    'height': mainWindowState.height
  })

  // var indexPath = process.env.NODE_ENV === 'production'
  // ? path.resolve(__dirname, 'src/indian.html')
  // : path.resolve(__dirname, '..', 'indian.html')
  // console.log ('indian:'+ indexPath)

  // indexPath = process.env.NODE_ENV === 'production'
  // ? path.resolve(__dirname, 'src/hollywood.html')
  // : path.resolve(__dirname, '..', 'hollywood.html')
  // console.log ('hollywood:'+ indexPath)

  var indexPath = process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, 'src/index.html')
  : path.resolve(__dirname, '..', 'index.html')

  // console.log ('index:'+ indexPath)
  
  mainWindow.showUrl(indexPath, () => {
    if (filePath) {
      fs.readFile(filePath, 'utf-8', (err, file) => {
        if (err) return
        mainWindow.webContents.send('FTEN::file-loaded', {
          file,
          fileName: path.basename(filePath),
          filePath
        })
        mainWindow.setTitle('FTen -- ' + filePath)
      })
    } else {
      mainWindow.setTitle('FTen -- Untitled Document')
    }
    callback && callback()
  })

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindowState.manage(mainWindow)

  function openExternal (e, url) {
    e.preventDefault()
    shell.openExternal(url)
  }
  mainWindow.webContents.on('new-window', openExternal)
  mainWindow.webContents.on('will-navigate', openExternal)

  return mainWindow
}
