// Increment when want to show to everyone again.
export const GLOBAL_BANNER_STORAGE_KEY = 'global-banner-7';

export default function GlobalBannerDisplayScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
try {
  if (JSON.parse(localStorage['gfe:${GLOBAL_BANNER_STORAGE_KEY}']).value === 'false') {
    document.documentElement.dataset.globalBannerHidden = 'true';
  }
} catch {}`,
      }}
      id="global-banner"
    />
  );
}
