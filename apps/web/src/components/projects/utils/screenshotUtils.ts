/* eslint-disable @typescript-eslint/no-require-imports */
import type { Puppeteer } from 'puppeteer-core';

import {
  type ProjectsImageBreakpointCategory,
  ProjectsImageBreakpointDimensions,
} from '~/components/projects/common/ProjectsImageBreakpoints';
import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types.ts';

import { createSupabaseAdminClientGFE_SERVER_ONLY } from '~/supabase/SupabaseServerGFE';

// In order to have the function working on various operating systems.
const localExecutablePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const desktopViewportConfig = ProjectsImageBreakpointDimensions.desktop;
const tabletViewportConfig = {
  ...ProjectsImageBreakpointDimensions.tablet,
  isMobile: true,
};
const mobileViewportConfig = {
  ...ProjectsImageBreakpointDimensions.mobile,
  isMobile: true,
};

type Browser = Awaited<ReturnType<Puppeteer['connect']>>;
type Page = Awaited<ReturnType<Browser['newPage']>>;

async function saveScreenshot(screenshotBuffer: Buffer, path: string) {
  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

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

function createStoragePath(
  submissionId: string,
  url: string,
  device: ProjectsImageBreakpointCategory,
): string {
  const urlObj = new URL(url);

  return `${submissionId}/${(urlObj.host + urlObj.pathname).replaceAll(
    '/',
    '_',
  )}/${device}.webp`;
}

async function takeScreenshotForViewport(
  submissionId: string,
  device: ProjectsImageBreakpointCategory,
  page: Page,
  url: string,
  viewport: Parameters<Page['setViewport']>[0],
) {
  await page.setViewport(viewport);
  /** *
   *  Ref: https://pptr.dev/api/puppeteer.puppeteerlifecycleevent
   *  WaitUntil for network has two options:
   * `networkidle0` : Waits till there are no more than 0 network connections for at least `500` ms
   * `networkidle2` : Waits till there are no more than 2 network connections for at least `500` ms
   */
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    function hideElement(selector: string) {
      const elements: NodeListOf<HTMLElement> =
        document.querySelectorAll(selector);

      for (const element of Array.from(elements)) {
        element.style.display = 'none';
      }
    }

    hideElement('.credits');
    hideElement('[data-gfe-screenshot-exclude]');
  });

  const screenshotBuffer = await page.screenshot({
    fullPage: true,
    quality: 100, // TODO(projects): lower for non-premium.
    type: 'webp',
  });

  const path = createStoragePath(submissionId, url, device);

  return await saveScreenshot(Buffer.from(screenshotBuffer), path);
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
  const tabletScreenshot = await takeScreenshotForViewport(
    submissionId,
    'tablet',
    page,
    url,
    tabletViewportConfig,
  );
  const mobileScreenshot = await takeScreenshotForViewport(
    submissionId,
    'mobile',
    page,
    url,
    mobileViewportConfig,
  );

  const screenshots: Record<ProjectsImageBreakpointCategory, string> = {
    desktop: desktopScreenshot,
    mobile: mobileScreenshot,
    tablet: tabletScreenshot,
  };

  return screenshots;
}

// Returns an array of objects with screenshot URLs for each device type
export async function generateScreenshots(
  submissionId: string,
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls,
): Promise<ProjectsChallengeSubmissionDeploymentUrls> {
  const chromium = require('@sparticuz/chromium');
  const puppeteer = require('puppeteer-core');

  const browser = await puppeteer.launch({
    args: process.env.NODE_ENV === 'development' ? [] : chromium.args,
    executablePath:
      process.env.NODE_ENV === 'development'
        ? localExecutablePath
        : await chromium.executablePath(),
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
        images: screenshots,
        updatedAt: new Date(),
      };
    }),
  );

  await browser.close();

  return deploymentUrlsWithScreenshots;
}

export async function deleteScreenshot(submissionId: string, url: string) {
  const supabaseAdmin = createSupabaseAdminClientGFE_SERVER_ONLY();

  await supabaseAdmin.storage
    .from('projects-screenshots')
    .remove(
      (['desktop', 'tablet', 'mobile'] as const).map((device) =>
        createStoragePath(submissionId, url, device),
      ),
    );
}
