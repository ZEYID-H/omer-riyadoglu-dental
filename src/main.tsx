import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
// Self-hosted variable fonts (bundled + hashed by Vite, served same-origin with
// immutable caching) — replaces the render-blocking Google Fonts stylesheet.
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/eb-garamond';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
