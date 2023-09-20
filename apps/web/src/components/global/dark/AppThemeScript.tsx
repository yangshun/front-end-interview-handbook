export const APP_THEME_STORAGE_KEY = 'gfe:theme:preference';

export default function AppThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try { if (JSON.parse(localStorage['${APP_THEME_STORAGE_KEY}']) === 'dark' || (!('${APP_THEME_STORAGE_KEY}' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) { document.documentElement.dataset.mode='dark' } else { document.documentElement.removeAttribute('data-mode') } } catch (_) { document.documentElement.dataset.mode='dark' }`,
      }}
      id="app-theme"
    />
  );
}
