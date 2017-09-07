import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import './index.css'
import App from './components/App'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)

registerServiceWorker()
