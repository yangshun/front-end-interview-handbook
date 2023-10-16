export const GLOBAL_BANNER_STORAGE_KEY = 'gfe:global-banner-0';

export default function GlobalBannerDisplayScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `try {
          if (JSON.parse(localStorage['${GLOBAL_BANNER_STORAGE_KEY}']) === false) {
            document.documentElement.dataset.globalBannerHidden = 'true'
          }
        }  catch {}`,
      }}
      id="global-banner"
    />
  );
}
