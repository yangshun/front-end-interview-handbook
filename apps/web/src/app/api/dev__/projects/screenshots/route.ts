import { ProjectsChallengeSubmissionScreenshotStatus } from '@prisma/client';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { generateScreenshots } from '~/components/projects/utils/screenshotUtils';

import prisma from '~/server/prisma';
import { getErrorMessage } from '~/utils/getErrorMessage';

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { apiRouteSecret, submissionId } = request;

    if (apiRouteSecret !== process.env.API_ROUTE_SECRET) {
      return NextResponse.json(
        { error: 'You are not authorized to call this API' },
        { status: 401 },
      );
    }

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 },
      );
    }

    const isShortId = submissionId.length <= 8;

    // Need to separate query because UUID fields can't be compared with short strings
    // Prisma throws "invalid length: expected 32, found 8" error
    const submission = await (isShortId
      ? prisma.projectsChallengeSubmission.findUnique({
          where: { shortId: submissionId },
        })
      : prisma.projectsChallengeSubmission.findUnique({
          where: { id: submissionId },
        }));

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 },
      );
    }

    const deploymentUrlsWithScreenshots = await generateScreenshots(
      submissionId,
      submission.deploymentUrls,
    );

    await prisma.projectsChallengeSubmission.update({
      data: {
        deploymentUrls: deploymentUrlsWithScreenshots,
        screenshotStatus: ProjectsChallengeSubmissionScreenshotStatus.COMPLETED,
      },
      where: {
        id: submission.id,
      },
    });

    return NextResponse.json(deploymentUrlsWithScreenshots);
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 },
    );
  }
}
