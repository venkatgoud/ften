import React from 'react'
import App from './App'
import {Provider} from 'react-redux'

const Root = ({store}) => {
  return (
    <Provider store={store}>
      <App indian={true}/>
    </Provider>
  )
}

export default Root
