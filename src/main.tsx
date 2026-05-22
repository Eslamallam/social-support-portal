import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';

import App from '@/App';
import { AppProviders } from '@/app/providers/AppProviders';
import { validateEnv } from '@/shared/config/env';
import '@/shared/localization/i18n';
import '@/shared/styles/globals.css';

validateEnv();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
