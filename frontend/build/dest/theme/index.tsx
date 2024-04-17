import { Shadows, createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
    structural: Palette['primary'];
    icons: Palette['primary'];
    stroke: Palette['primary'];
    highEmphasis: Palette['primary'];
    mediumEmphasis: Palette['primary'];
    lowEmphasis: Palette['primary'];
    neutral: Palette['primary'];
    boxShadowCard: Palette['primary'];
    white: Palette['primary'];
    boxShadow: Palette['primary'];
    modalBackground: Palette['primary'];
  }

  interface PaletteOptions {
    accent: PaletteOptions['primary'];
    structural: PaletteOptions['primary'];
    icons: PaletteOptions['primary'];
    stroke: PaletteOptions['primary'];
    highEmphasis: PaletteOptions['primary'];
    mediumEmphasis: PaletteOptions['primary'];
    lowEmphasis: PaletteOptions['primary'];
    neutral: PaletteOptions['primary'];
    boxShadowCard: PaletteOptions['primary'];
    white: PaletteOptions['primary'];
    boxShadow: PaletteOptions['primary'];
    modalBackground: PaletteOptions['primary'];
  }

  interface PaletteColor {
    700: string;
    500: string;
    300: string;
    200: string;
    100: string;
    50: string;
    blue100: string;
    red100: string;
    green100: string;
    green50: string;
    white: string;
  }

  interface SimplePaletteColorOptions {
    700?: string;
    500?: string;
    300?: string;
    100?: string;
    50?: string;
    blue100?: string;
    red100?: string;
    green100?: string;
    green50?: string;
    white?: string;
  }

  interface TypographyVariants {
    body3: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    subtitle3: React.CSSProperties;
    caption3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    body3: React.CSSProperties;
    caption1: React.CSSProperties;
    caption2: React.CSSProperties;
    subtitle3: React.CSSProperties;
    caption3: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3?: true;
    caption1?: true;
    caption2?: true;
    subtitle3?: true;
    caption3?: true;
  }
}

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      '700': '#0055BC',
      '500': '#625AFA',
      '300': '#CFF5F6',
    },
    structural: {
      '100': '#EBEEF1',
      '50': '#F6F8FA',
    },
    icons: {
      '100': '#545969',
      '200': '#30313D',
    },
    stroke: {
      '100': '#C0C8D2',
      '50': '#EBEEF1',
    },
    highEmphasis: {
      main: '#1A1B25',
    },
    mediumEmphasis: {
      main: '#404452',
    },
    lowEmphasis: {
      main: '#687385',
    },
    accent: {
      main: '#fff',
      blue100: '#0196ED',
      red100: '#ED6704',
      green100: '#006908',
      green50: '#D7F7C2',
    },
    neutral: {
      '100': '#E0E6EB',
    },
    boxShadowCard: {
      main: 'rgba(0, 0, 0, 0.17)',
    },
    white: {
      main: '#FFFFFF',
    },
    boxShadow: {
      main: 'rgba(60, 66, 87, 0.12)',
      dark: 'rgba(0, 0, 0, 0.12)',
    },
    modalBackground: {
      main: 'rgba(235, 238, 241, .6)',
      light: 'rgb(237, 239, 240, 0.6)',
    },
  },
  typography: {
    fontFamily: 'Segoe-Regular',
    h1: {
      fontFamily: 'Segoe-Bold',
      fontStyle: 'normal',
      fontSize: '28px',
      fontWeight: '700',
      lineHeight: '40px',
    },
    h2: {
      fontFamily: 'Segoe-Bold',
      fontStyle: 'normal',
      fontSize: '24px',
      fontWeight: '700',
      lineHeight: '40px',
    },
    subtitle1: {
      fontFamily: 'Segoe-Bold',
      fontStyle: 'normal',
      fontSize: '16px',
      fontWeight: '700',
      lineHeight: '21px',
    },
    subtitle2: {
      fontFamily: 'Segoe-SemiBold',
      fontStyle: 'normal',
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '21px',
    },
    subtitle3: {
      fontFamily: 'Segoe-Regular',
      fontStyle: 'normal',
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '20px',
      letterSpacing: '0.16px',
    },
    body1: {
      fontFamily: 'Segoe-Bold',
      fontStyle: 'normal',
      fontSize: '14px',
      fontWeight: '700',
      lineHeight: '19px',
    },
    body2: {
      fontFamily: 'Segoe-SemiBold',
      fontStyle: 'normal',
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '24px',
    },
    body3: {
      fontFamily: 'Segoe-Regular',
      fontStyle: 'normal',
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '19px',
    },
    caption1: {
      fontFamily: 'Segoe-SemiBold',
      fontStyle: 'normal',
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '16px',
    },
    caption2: {
      fontFamily: 'Segoe-Regular',
      fontStyle: 'normal',
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '15.96px',
    },
    caption3: {
      fontFamily: 'Segoe-Regular',
      fontStyle: 'normal',
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '18.62px',
    },
  },

  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#625AFA',
          },
          width: '0.875rem',
          height: '0.875rem',
        },
      },
    },
  },
  shadows: [
    'none',
    '0px 5px 15px 0px rgba(0, 0, 0, 0.12), 0px 15px 35px 0px rgba(60, 66, 87, 0.08)',
    '0px 15px 35px 0px rgba(60, 66, 87, 0.08)',
    ...Array(23).fill('none'),
  ] as Shadows,
});

export default theme;
