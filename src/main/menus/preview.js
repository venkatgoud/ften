import * as actions from '../actions'

let previewMenu = {
  label: 'Preview',
  submenu: [{
    label: 'Indian',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, browserWindow) {       
      actions.previewIndian({browserWindow})   
    }
  }, {
    label: 'Hollywood',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, browserWindow) {
      actions.previewHollywood({browserWindow})   
    }
  }]
}
export default previewMenu
