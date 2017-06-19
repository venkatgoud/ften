import * as actions from './actions'
import { ipcRenderer } from 'electron'

export default function configureIpcRenderer (store) {
  ipcRenderer.on('FTEN::file-loaded', (e, {file, fileName, filePath}) => {
    store.dispatch(actions.convertMarkdown(file))
    store.dispatch(actions.fileLoaded({fileName, filePath}))
  })

  ipcRenderer.on('FTEN::ask-file-save', (e) => {     
    const data = store.getState().markdown.markdown
    const filePath = store.getState().markdown.filePath     
    if (!filePath) {       
      ipcRenderer.send('FTEN::save-file-as', {
        data
      })
      return
    }
    ipcRenderer.send('FTEN::save-file', {
      data,
      filePath
    })
  })

  ipcRenderer.on('FTEN::ask-file-save-as', (e) => {
    const data = store.getState().markdown.markdown
    ipcRenderer.send('FTEN::save-file-as', {
      data
    })
  })

  ipcRenderer.on('FTEN::preview-indian', (e) => {     
    store.dispatch(actions.previewIndian())   
    // ipcRenderer.send('FTEN::preview-indian')
  })

  ipcRenderer.on('FTEN::preview-hollywood', (e) => {  
    store.dispatch(actions.previewHollywood())   
    // ipcRenderer.send('FTEN::preview-hollywood')      
  })
   
  window.document.addEventListener('drop', (e) => {
    e.preventDefault()
    ipcRenderer.send('FTEN::dropped-file', {
      filePath: e.dataTransfer.files[0].path
    })
  })

  window.document.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
}
