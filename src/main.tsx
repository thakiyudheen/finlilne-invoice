import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import store from './redux/index.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" richColors />
      <App />
    </Provider>
  </StrictMode>,
)
