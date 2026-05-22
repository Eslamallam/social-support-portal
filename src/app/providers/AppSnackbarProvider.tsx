import { SnackbarProvider } from 'notistack';

import { type PropsWithChildren } from 'react';

export const AppSnackbarProvider = ({ children }: PropsWithChildren) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {children}
    </SnackbarProvider>
  );
};
