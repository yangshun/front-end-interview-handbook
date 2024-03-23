import type { NextApiRequest, NextApiResponse } from 'next';

import type { ProjectsChallengeSubmissionDeploymentUrls } from '~/components/projects/submissions/types';
import { generateScreenshots } from '~/components/projects/utils/screenshotUtils';

import prisma from '~/server/prisma';

export const config = {
  // Sometimes taking screenshots just take very long.
  maxDuration: 30,
};

export type ProjectsSubmissionScreenshotRequestBody = Readonly<{
  deploymentUrls: ProjectsChallengeSubmissionDeploymentUrls;
  routeSecret: string;
  submissionId: string;
}>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { submissionId, deploymentUrls, routeSecret } =
    req.body as ProjectsSubmissionScreenshotRequestBody;

  if (routeSecret !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send('You are not authorized to call this API');
  }

  const deploymentUrlsWithScreenshots = await generateScreenshots(
    submissionId,
    deploymentUrls,
  );

  // TODO(projects): Delete old screenshots from bucket.
  const submission = await prisma.projectsChallengeSubmission.update({
    data: {
      deploymentUrls: deploymentUrlsWithScreenshots,
    },
    where: {
      id: submissionId,
    },
  });

  return res.json(submission);
}
