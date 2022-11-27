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

const view = {
  theme: getLocalTheme(),
  loading: true,
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
};

export const viewAction = {
  turnLightMode: "LIGHT_MODE",
  turnDarkMode: "DARK_MODE",
  startLoading: "START_LOADING",
  stopLoading: "STOP_LOADING",
  openSnackbar: "OPEN_SNACKBAR",
  closeSnackbar: "CLOSE_SNACKBAR",
};

export function viewReducer(state = view, { type, payload }) {
  switch (type) {
    case viewAction.startLoading:
      return { ...state, loading: true };

    case viewAction.stopLoading:
      return { ...state, loading: false };

    case viewAction.openSnackbar:
      return {
        ...state,
        snackbar: {
          open: false,
          message: "",
          severity: "info",
          ...payload,
        },
      };
    case viewAction.closeSnackbar:
      return {
        ...state,
        snackbar: {
          open: false,
          message: "",
          severity: "info",
        },
      };

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
