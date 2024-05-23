import { deepmerge } from 'deepmerge-ts';

export const DefaultThemeOverrides = {
  common: {
    borderRadius: '6px',
    primaryColor: '#f472b6',
    primaryColorHover: '#f472b6', // #f472b6
    primaryColorPressed: '#f472b6', // #f472b6
    primaryColorSuppl: '#f472b6', // #f472b6
    heightTiny: '26px',
    heightSmall: '32px',
    heightMedium: '38px',
    heightLarge: '44px',
    heightHuge: '50px',
    fontFamily: 'Satoshi',
  },
  DataTable: {
    borderRadius: '6px',
  },
  TableHeader: {
    borderRadius: '6px',
  },
  Alert: {
    padding: '5px 8px',
  },
  Tag: {
    borderRadius: '6px',
  },
  LoadingBar: {
    height: '4.5px',
  },
};

const _lightThemeOverrides = {
  common: {
    bodyColor: '#f7f7f7',
  },
};

const _darkThemeOverrides = {
  common: {
    bodyColor: '#242424',
  },
};

export const DarkThemeOverrides = deepmerge(DefaultThemeOverrides, _darkThemeOverrides);
export const LightThemeOverrides = deepmerge(DefaultThemeOverrides, _lightThemeOverrides);
