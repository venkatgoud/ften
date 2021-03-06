import * as types from '../constants/actionTypes'

function updateMarkdown (markdown = '') {
  return {
    type: types.MARKDOWN_CHANGED,
    payload: {
      markdown
    }
  }
}

export function convertMarkdown (markdown) {
  return updateMarkdown(markdown)
}

export function fileLoaded ({fileName, filePath}) {
  return {
    type: types.FILE_LOADED,
    payload: {
      fileName,
      filePath
    }
  }
}

export function toggleScrolling () {
  return {
    type: types.TOGGLE_SCROLLING
  }
}

export function toggleScriptStyle() {
  return {
    type: types.TOGGLE_SCRIPT_STYLE
  }
}

export function preview(){
  return {
    type: types.TOGGLE_PREVIEW
  }
}

