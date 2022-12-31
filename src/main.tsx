import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import App from './components/App'
import { reducers } from './reducers'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
