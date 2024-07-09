import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeContextProvider } from './commons/components/store/themeContext.tsx'
import { SidebarContextProvider } from './commons/components/store/sidebarContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <SidebarContextProvider>
          <App />
      </SidebarContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
)


