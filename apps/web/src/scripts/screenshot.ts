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
  submissionId: string,
  device: 'desktop' | 'mobile' | 'tablet',
  page: Page,
  url: string,
  viewport: Parameters<Page['setViewport']>[0],
) {
  const urlObj = new URL(url);

  await page.goto(url, { waitUntil: 'load' });
  await page.setViewport(viewport);
  await page?.screenshot({
    captureBeyondViewport: true,
    path: `tmp/${submissionId}.${urlObj.pathname.replaceAll(
      '/',
      '_',
    )}.${device}.webp`,
    type: 'webp',
  });
}

async function takePageScreenshotForURL(browser: Browser, url: string) {
  const page = await browser.newPage();
  const submissionId = '1580867e-04e3-44ab-ac08-b2841348de14';

  await takeScreenshotForViewport(
    submissionId,
    'desktop',
    page,
    url,
    desktopViewportConfig,
  );
  await takeScreenshotForViewport(
    submissionId,
    'tablet',
    page,
    url,
    tabletViewportConfig,
  );
  await takeScreenshotForViewport(
    submissionId,
    'mobile',
    page,
    url,
    mobileViewportConfig,
  );
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

takeScreenshots(['https://www.astro.build', 'https://astro.build/showcase/']);
