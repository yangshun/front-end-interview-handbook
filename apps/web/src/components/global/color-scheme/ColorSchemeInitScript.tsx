export const COLOR_SCHEME_STORAGE_KEY = 'gfe:color-scheme:preference';

export default function ColorSchemeInitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
let colorSchemePreference = 'system';
try {
  colorSchemePreference = JSON.parse(
    localStorage['${COLOR_SCHEME_STORAGE_KEY}'],
  );
} catch (_) {}

switch (colorSchemePreference) {
  case 'system': {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.dataset.colorScheme = 'dark';
    } else {
      delete document.documentElement.dataset.colorScheme;
    }
    break;
  }
  case 'light': {
    delete document.documentElement.dataset.colorScheme;
    break;
  }
  case 'dark': {
    document.documentElement.dataset.colorScheme = 'dark';
    break;
  }
}`,
      }}
      id="color-scheme"
    />
  );
}
