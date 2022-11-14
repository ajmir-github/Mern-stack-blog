// View State Managemnet
// it controlls the theme mode and if the whole website is loading or not

const localThemeKey = "THEME_MODE";
const defaultThemeMode = "light";
function getLocalTheme() {
  return localStorage.getItem(localThemeKey) || defaultThemeMode;
}
function setLocalTheme(themeMode) {
  localStorage.setItem(localThemeKey, themeMode);
}

const initState = {
  theme: getLocalTheme(),
  loading: true,
};

export const viewAction = {
  turnLightMode: "LIGHT_MODE",
  turnDarkMode: "DARK_MODE",
  startLoading: "START_LOADING",
  stopLoading: "STOP_LOADING",
};

export function viewReducer(state = initState, { type }) {
  switch (type) {
    case viewAction.startLoading:
      return { ...state, loading: true };

    case viewAction.stopLoading:
      return { ...state, loading: false };

    case viewAction.turnLightMode:
      setLocalTheme("light");
      return { ...state, theme: "light" };

    case viewAction.turnDarkMode:
      setLocalTheme("dark");
      return { ...state, theme: "dark" };

    default:
      return state;
  }
}
