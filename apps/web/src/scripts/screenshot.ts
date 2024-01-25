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
  height: 1080,
  width: 1440,
};
const tabletViewportConfig = {
  height: 1080,
  isMobile: true,
  width: 768,
};
const mobileViewportConfig = {
  height: 1080,
  isMobile: true,
  width: 640,
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
    captureBeyondViewport: true,
    path: `screenshots/${urlObj.host}-${urlObj.pathname.replaceAll('/', '_')}-${
      viewport.width
    }x${viewport.height}.webp`,
    type: 'webp',
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
