export const COLOR_SCHEME_STORAGE_KEY = 'gfe:color-scheme:preference';

export default function ColorSchemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try { if (JSON.parse(localStorage['${COLOR_SCHEME_STORAGE_KEY}']) === 'dark' || (!('${COLOR_SCHEME_STORAGE_KEY}' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) { document.documentElement.dataset.colorScheme='dark' } else { delete document.documentElement.dataset.colorScheme } } catch (_) { document.documentElement.dataset.colorScheme='dark' }`,
      }}
      id="color-scheme"
    />
  );
}
