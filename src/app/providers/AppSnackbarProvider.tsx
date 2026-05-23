import { SnackbarProvider } from 'notistack';

import { type PropsWithChildren } from 'react';

export const AppSnackbarProvider = ({ children }: PropsWithChildren) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      {children}
    </SnackbarProvider>
  );
};
