export const APP_THEME_STORAGE_KEY = 'gfe:theme:preference';

export default function AppThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try { if (JSON.parse(localStorage['${APP_THEME_STORAGE_KEY}']) === 'dark' || (!('${APP_THEME_STORAGE_KEY}' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) { document.documentElement.classList.add('dark') } else { document.documentElement.classList.remove('dark') } } catch (_) { document.documentElement.classList.add('dark') }`,
      }}
      id="app-theme"
    />
  );
}
