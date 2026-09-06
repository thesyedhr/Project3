import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Normalize basename from Vite's import.meta.env.BASE_URL for GitHub Pages repository subpaths
const rawBase = import.meta.env.BASE_URL || '/';
const basename = rawBase.endsWith('/') && rawBase !== '/' ? rawBase.slice(0, -1) : (rawBase === '/' ? undefined : rawBase);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
