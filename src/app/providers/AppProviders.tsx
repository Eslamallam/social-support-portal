import { type PropsWithChildren } from 'react';

import { AppErrorBoundaryProvider } from './AppErrorBoundaryProvider';
import { AppSnackbarProvider } from './AppSnackbarProvider';
import { AppThemeProvider } from './AppThemeProvider';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <AppErrorBoundaryProvider>
      <AppThemeProvider>
        <AppSnackbarProvider>{children}</AppSnackbarProvider>
      </AppThemeProvider>
    </AppErrorBoundaryProvider>
  );
};
