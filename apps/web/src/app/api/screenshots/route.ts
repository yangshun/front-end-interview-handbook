import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { generateScreenshots } from '~/components/projects/utils/screenshotUtils';

import { getErrorMessage } from '~/utils/getErrorMessage';

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  if (searchParams.get('api_route_secret') !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json(
      { error: 'You are not authorized to call this API' },
      { status: 401 },
    );
  }
  try {
    const request = await req.json();
    const { submissionId, deploymentUrls } = request;
    const deploymentUrlsWithScreenshots = await generateScreenshots(
      submissionId,
      deploymentUrls,
    );

    return NextResponse.json(deploymentUrlsWithScreenshots);
  } catch (error) {
    return NextResponse.json({ err: getErrorMessage(error) }, { status: 500 });
  }
}
