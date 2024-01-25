import puppeteer from 'puppeteer';

/**
 * In order to have the function working in both windows and macOS
 * we need to specify the respective path of the Chrome executable for
 * both cases.
 */
const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const desktopViewportConfig = {
  width: 1440,
  height: 1080,
};
const tabletViewportConfig = {
  width: 768,
  height: 1080,
  isMobile: true,
};
const mobileViewportConfig = {
  width: 640,
  height: 1080,
  isMobile: true,
};

type Browser = Awaited<ReturnType<typeof puppeteer.launch>>;
type Page = Awaited<ReturnType<Browser['newPage']>>;

async function takeScreenshotForViewport(
  url: string,
  page: Page,
  viewport: Parameters<Page['setViewport']>[0],
) {
  const urlObj = new URL(url);
  await page.goto(url, { waitUntil: 'load' });
  await page.setViewport(viewport);
  await page?.screenshot({
    type: 'webp',
    path: `screenshots/${urlObj.host}-${urlObj.pathname.replaceAll('/', '_')}-${
      viewport.width
    }x${viewport.height}.webp`,
    captureBeyondViewport: true,
  });
}

async function takePageScreenshotForURL(browser: Browser, url: string) {
  const page = await browser.newPage();

  await takeScreenshotForViewport(url, page, desktopViewportConfig);
  await takeScreenshotForViewport(url, page, tabletViewportConfig);
  await takeScreenshotForViewport(url, page, mobileViewportConfig);
}

async function takeScreenshots(urls: ReadonlyArray<string>) {
  const browser = await puppeteer.launch({
    args: [],
    executablePath: exePath,
    headless: 'new',
  });

  await Promise.all(urls.map((url) => takePageScreenshotForURL(browser, url)));
  await browser.close();
}

takeScreenshots([
  'https://www.astro.build',
  'https://www.docusaurus.io',
  'https://www.yangshuntay.com',
]);
