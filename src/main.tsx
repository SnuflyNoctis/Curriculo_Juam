// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app' // <--- Garanta que o caminho está certo
import './index.css'        // <--- ESSENCIAL: Importa o Tailwind e o fundo preto

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)