export type ProductTheme = 'interviews' | 'projects';

// `withSafeguard` ensures that the theme can only be set once and has to be
// explicitly unset first before being set again. This is to prevent multiple
// places fighting to override the value.
export function setProductTheme(theme: ProductTheme, withSafeguard = true) {
  const currentTheme = document.documentElement.dataset.theme;

  if (withSafeguard && currentTheme && currentTheme !== theme) {
    console.warn(
      `Product theme exists (${currentTheme}) while trying to set new theme (${theme}). Unset before setting a new theme.`,
    );

    return;
  }

  document.documentElement.dataset.theme = theme;
}

export function unsetProductTheme() {
  delete document.documentElement.dataset.theme;
}
