import AccountBalanceOutlined from '@mui/icons-material/AccountBalanceOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { LanguageSwitcher } from '@/shared/localization/components/LanguageSwitcher';

import { APP_BAR_HEIGHT } from './constants';

export const AppHeader = () => {
  return (
    <AppBar
      component="header"
      position="static"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Toolbar
        sx={{
          px: { xs: 2, md: 4 },
          minHeight: APP_BAR_HEIGHT,
          justifyContent: 'space-between',
        }}
      >
        <AccountBalanceOutlined color="primary" sx={{ fontSize: 36 }} />

        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};
