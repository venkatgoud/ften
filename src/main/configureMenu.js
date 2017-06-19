import edit from './menus/edit'
import file from './menus/file'
import help from './menus/help'
import ften from './menus/ften'
import view from './menus/view'
import preview from './menus/preview'
import windowMenu from './menus/windowMenu'

export default function configureMenu ({app}) {
  let template = process.platform === 'darwin'
    ? [ften({app})]
    : []
  return [
    ...template,
    file,
    edit,
    windowMenu,
    view,
    preview,
    help
  ]
}
