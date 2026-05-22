import { type PropsWithChildren } from 'react';

import Box from '@mui/material/Box';

import { AppHeader } from './AppHeader';

export { APP_BAR_HEIGHT } from './constants';

export const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <AppHeader />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
