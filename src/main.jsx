import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
// Arabic font; the browser only downloads it once Arabic text is rendered.
import '@fontsource/cairo/400.css';
import '@fontsource/cairo/500.css';
import '@fontsource/cairo/600.css';
import '@fontsource/cairo/700.css';

import './index.css';
import App from './App.jsx';
import DirectionalTheme from './DirectionalTheme.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <DirectionalTheme>
        <App />
      </DirectionalTheme>
    </LanguageProvider>
  </StrictMode>,
);
