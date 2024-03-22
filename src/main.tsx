import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'virtual:uno.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="gray" grayColor="sand" radius="none" scaling="110%">
      <App />
    </Theme>
  </React.StrictMode>,
)
