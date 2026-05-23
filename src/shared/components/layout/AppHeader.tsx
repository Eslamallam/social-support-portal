import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import govIcon from '@/assets/gov.svg';
import { LanguageSwitcher } from '@/shared/localization/components/LanguageSwitcher';

import { APP_BAR_HEIGHT } from './constants';

export const AppHeader = () => {
  return (
    <AppBar
      component="header"
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: APP_BAR_HEIGHT,
          justifyContent: 'space-between',
        }}
      >
        <Box
          component="img"
          src={govIcon}
          alt=""
          aria-hidden="true"
          sx={{
            height: { xs: 26, sm: 40 },
            width: 'auto',
            display: 'block',
          }}
        />

        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};
