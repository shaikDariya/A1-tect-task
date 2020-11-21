import {createMuiTheme} from '@material-ui/core';
import {MAINTHEME_COLORS, WHITE_COLOR} from '../constants/color';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: MAINTHEME_COLORS.primary.main,
      dark: MAINTHEME_COLORS.primary.dark,
      contrastText: WHITE_COLOR,
    },
    divider: MAINTHEME_COLORS.divider,
  },
  typography: {
    allVariants: {
      color: MAINTHEME_COLORS.text,
      fontWeight: 400,
    },
    h4: {
      fontSize: 32,
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    body1: {
      fontSize: 14,
      letterSpacing: '0.05em',
    },
    body2: {
      fontSize: 12,
    },
  },
  spacing: 8,
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: WHITE_COLOR,
        },
        '::-webkit-scrollbar': {
          width: '4px',
          '&-thumb': {
            backgroundColor: MAINTHEME_COLORS.primary.dark,
          },
        },
      },
    },
    MuiButton: {
      root: {
        textTransform: 'capitalize',
        height: 32,
        width: 128,
      },
    },
    MuiLink: {
      button: {
        textTransform: 'capitalize',
        '&:disabled': {
          'pointer-events': 'none',
          color: '#00000042',
        },
      },
    },
    MuiCardContent: {
      root: {
        '&:last-child': {
          paddingBottom: 0,
        },
      },
    },
  },
});
