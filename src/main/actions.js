import { dialog, ipcMain, ipcRenderer, BrowserWindow } from 'electron'
import fs from 'fs-plus'
import { extname, basename } from 'path'
import { EXTENSIONS } from '../constants/globals'
import createWindow from './createWindow'
 
ipcMain.on('FTEN::save-file', (e, {data, filePath}) => {
  fs.writeFile(filePath, data, 'utf-8', function (err, file) {
    if (err) return
  })
})

ipcMain.on('FTEN::dropped-file', (e, {filePath}) => {
  openFile(filePath, BrowserWindow.fromWebContents(e.sender))
})

function openFile (filePath, browserWindow) {
  if (EXTENSIONS.indexOf(extname(filePath).slice(1).toLowerCase()) !== -1 || !extname(filePath)) {
    const fileSize = fs.getSizeSync(filePath)
    if (fileSize >= 1048576) { // 1MB
      const confirm = dialog.showMessageBox(browserWindow, {
        type: 'error',
        title: 'Unsupported File',
        message: 'You are trying to load a large file, FTEN will be unresponsive',
        detail: 'Do you still want to load this file?',
        buttons: ['Proceed', 'Cancel']
      })
      if (confirm === 1) return
    }
    fs.readFile(filePath, 'utf-8', function (err, file) {
      if (err) return
      createWindow(filePath)
    })
    return
  }     
  dialog.showMessageBox(browserWindow, {
    type: 'error',
    title: 'Unsupported File',
    message: 'You are trying to load a not supported file',
    detail: 'The supported file extensions are \n\n' + EXTENSIONS.join(' ,'),
    buttons: ['Ok']
  })
}

ipcMain.on('FTEN::save-file-as', (e, {data}) => {   
  const filePath = dialog.showSaveDialog()   
  if (filePath) {
    fs.writeFile(filePath, data, 'utf-8', function (err) {
      if (err) return
      BrowserWindow.fromWebContents(e.sender).setTitle('FTen -- ' + filePath)
      e.sender.send('FTEN::file-loaded', {
        fileName: basename(filePath),
        filePath,
        file: data
      })
    })
  }
})

export function open ({browserWindow}) {
  dialog.showOpenDialog(browserWindow, {
    properties: ['openFile']
  }, (fileNames) => {
    if (fileNames === undefined) return
    openFile(fileNames[0], browserWindow)
  })
}

export function save ({browserWindow}) {   
  browserWindow.webContents.send('FTEN::ask-file-save')
}

export function saveAs ({browserWindow}) {
  browserWindow.webContents.send('FTEN::ask-file-save-as')
}

export function newFile () {
  createWindow()
}

export function previewIndian({browserWindow}) {   
  browserWindow.webContents.send('FTEN::preview-indian')  
}

export function previewHollywood({browserWindow}) {
  browserWindow.webContents.send('FTEN::preview-hollywood')  
}
