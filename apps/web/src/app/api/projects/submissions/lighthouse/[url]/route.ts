import * as chromeLauncher from 'chrome-launcher';
import lighthouse from 'lighthouse';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { url: string } },
) {
  const { url } = params;
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'html',
    port: chrome.port,
  } as const;

  const decodedURI = decodeURI(url);

  const runnerResult = await lighthouse(
    url.includes('://') ? decodedURI : 'https://' + decodedURI,
    options,
  );

  chrome.kill();

  return NextResponse.json({
    report: runnerResult?.lhr ?? null,
  });
}
