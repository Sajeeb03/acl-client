import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './Contexts/AuthProvider';
import { Provider } from 'react-redux';
import { store } from './app/store/store';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
)
