import { type Direction, createTheme } from '@mui/material/styles';

export const createAppTheme = (direction: Direction) =>
  createTheme({
    direction,
    palette: {
      primary: {
        main: '#1565c0',
      },
      background: {
        default: '#f5f7fa',
      },
    },
    typography: {
      fontFamily: ['Roboto', 'Cairo', 'system-ui', 'sans-serif'].join(','),
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
      },
    },
  });
