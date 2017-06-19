import { shell } from 'electron'

export default {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'Learn More',
    click: function () {
      shell.openExternal('https://github.com/venkatgoud/ften')
    }
  }, {
    label: 'Report Issue',
    click: function () {
      shell.openExternal('https://github.com/venkatgoud/ften/issues')
    }
  }, {
    label: 'Source Code on GitHub',
    click: function () {
      shell.openExternal('https://github.com/venkatgoud/ften')
    }
  }, {
    label: 'Fountain syntax',
    click: function () {
      shell.openExternal('https://fountain.io/syntax')
    }
  } ]
}
