import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { type PropsWithChildren } from 'react';

import { Alert, Box, Button, Stack, Typography } from '@mui/material';

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Stack
        spacing={3}
        sx={{ alignItems: 'center', maxWidth: 480, width: '100%' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          <Typography variant="body1">
            Something went wrong. Please try again.
          </Typography>
        </Alert>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={resetErrorBoundary}>
            Try Again
          </Button>

          <Button variant="outlined" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export const AppErrorBoundaryProvider = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};
