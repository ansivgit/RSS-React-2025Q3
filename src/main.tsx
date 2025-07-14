import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app.tsx';

import './index.scss';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('rootElement not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
