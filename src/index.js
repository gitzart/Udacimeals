import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import './index.css'
import App from './components/App'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(reducer)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

registerServiceWorker()
