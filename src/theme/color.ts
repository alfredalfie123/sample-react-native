export const Color = {
  red: {
    normal: '#FF6363',
    dark: '#d74f4f'
  },

  green: {
    darker: '#004225',
    dark: '#055A32',
    normal: '#378F66',
    light: '#40DAB5'
  },

  black: {
    dark: '#000000',
    normal: '#3F3F3F',
    light: '#4F4F4F'
  },

  gray: {
    light: '#BDBDBD',
    normal: '#5E5E5E'
  },

  white: {
    light: '#FFFFFF',
    normal: '#F6F6F6',
    dark: '#E5E5E5'
  },

  blue: {
    dark: '#3B5998',
    darker: '#2980b9',
    normal: '#87b4ff'
  },

  yellow: {
    normal: '#DDBB57'
  },

  transparent: {
    normal: 'transparent'
  }
};

// TODO: ========================== LayoutBackground ==========================
export const LayoutBackground = {
  white: Color.white.light,
  whiteDark: Color.white.dark,
  green: Color.green.dark,
  blue: Color.blue.dark,
  transparent: Color.transparent.normal,
  red: '#e74c3c'
};

// TODO: ========================== TextColor ==========================
export const TextColor = {
  greenDark: Color.green.dark,
  green: Color.green.normal,
  greenLight: Color.green.light,

  white: Color.white.light,

  gray: Color.gray.normal,
  grayLight: Color.gray.light,

  blackLight: Color.black.light,
  black: Color.black.normal,
  blackDark: Color.black.dark,

  yellow: Color.yellow.normal,

  blue: Color.blue.dark
};

// TODO: ========================== IconColor ==========================
export const IconColor = {
  greenDark: Color.green.dark,
  greenLight: Color.green.light,

  white: Color.white.light,

  gray: Color.gray.normal,
  grayLight: Color.gray.light,

  blackLight: Color.black.light,
  black: Color.black.normal,
  blackDark: Color.black.dark,

  yellow: Color.yellow.normal,

  blue: Color.blue.dark
};

// TODO: ========================== ButtonBackgroundColor ==========================
export const ButtonBackground = {
  red: Color.red.normal,
  green: Color.green.dark,
  blue: Color.blue.dark,
  white: Color.white.light,
  transparent: Color.transparent.normal
};

export const ButtonUnderlayColor = {
  red: Color.red.dark,
  green: Color.green.darker,
  blue: Color.blue.darker,
  white: Color.white.normal,
  transparent: Color.transparent.normal
};

// TODO: ========================== ButtonBorderColor ==========================
export const ButtonBorder = {
  gray: Color.gray.light
};
