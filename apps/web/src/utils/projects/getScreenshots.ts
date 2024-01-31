import puppeteer from 'puppeteer';

import type {
  ProjectsChallengeSubmissionDeploymentScreenshotDevice,
  ProjectsChallengeSubmissionDeploymentUrls,
} from '~/components/projects/submissions/types.ts';

import { createSupabaseAdminClientGFE } from '~/supabase/SupabaseServerGFE';

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

async function saveScreenshot(screenshotBuffer: Buffer, path: string) {
  const supabaseAdmin = createSupabaseAdminClientGFE();

  const { error } = await supabaseAdmin.storage
    .from('projects-screenshots')
    .upload(path, screenshotBuffer, {
      cacheControl: '3600',
      contentType: 'image/webp',
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data: imageUrl } = supabaseAdmin.storage
    .from('projects-screenshots')
    .getPublicUrl(path);

  return imageUrl.publicUrl;
}

async function takeScreenshotForViewport(
  submissionId: string,
  device: ProjectsChallengeSubmissionDeploymentScreenshotDevice,
  page: Page,
  url: string,
  viewport: Parameters<Page['setViewport']>[0],
) {
  const urlObj = new URL(url);
  const path = `${submissionId}/${urlObj.pathname.replaceAll(
    '/',
    '_',
  )}.${device}.webp`;

  await page.goto(url, { waitUntil: 'load' });
  await page.setViewport(viewport);

  const screenshotBuffer = await page.screenshot({
    captureBeyondViewport: true,
    type: 'webp',
  });

  const savedScreenshotUrl = await saveScreenshot(screenshotBuffer, path);

  return savedScreenshotUrl;
}

// Returns an object with screenshot URLs for each device type
async function takeScreenshots(
  browser: Browser,
  submissionId: string,
  url: string,
) {
  const page = await browser.newPage();

  const desktopScreenshot = await takeScreenshotForViewport(
    submissionId,
    'desktop',
    page,
    url,
    desktopViewportConfig,
  );
  const mobileScreenshot = await takeScreenshotForViewport(
    submissionId,
    'mobile',
    page,
    url,
    mobileViewportConfig,
  );
  const tabletScreenshot = await takeScreenshotForViewport(
    submissionId,
    'tablet',
    page,
    url,
    tabletViewportConfig,
  );

  const screenshots: Record<
    ProjectsChallengeSubmissionDeploymentScreenshotDevice,
    string
  > = {
    desktop: desktopScreenshot,
    mobile: mobileScreenshot,
    tablet: tabletScreenshot,
  };

  return screenshots;
}

// Returns an array of objects with screenshot URLs for each device type
export async function getScreenshots(
  submissionId: string,
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls,
): Promise<ProjectsChallengeSubmissionDeploymentUrls> {
  const browser = await puppeteer.launch({
    args: [],
    executablePath: exePath,
    headless: 'new',
  });

  const deploymentUrlsWithScreenshots = await Promise.all(
    deploymentUrls.map(async (deploymentUrl) => {
      const screenshots = await takeScreenshots(
        browser,
        submissionId,
        deploymentUrl.href,
      );

      return {
        ...deploymentUrl,
        screenshots,
        updatedAt: new Date(),
      };
    }),
  );

  await browser.close();

  return deploymentUrlsWithScreenshots;
}
