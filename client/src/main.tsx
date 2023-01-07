import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './index.css'
import { Provider } from 'react-redux';

import { store } from './state/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
      <App />
    {/* <React.StrictMode>
    </React.StrictMode> */}
  </Provider>
)
