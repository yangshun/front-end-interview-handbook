import type { NextApiRequest } from 'next';

import absoluteUrl from '~/lib/absoluteUrl';

export async function fetchProjectsProfileRecalculatePoints(
  req: NextApiRequest,
  projectsProfileId?: string,
) {
  if (!projectsProfileId) {
    return;
  }

  const { origin } = absoluteUrl(req);

  await fetch(
    `${origin}/api/hooks/projects/profile/recalculate?${new URLSearchParams({
      api_route_secret: process.env.API_ROUTE_SECRET ?? '',
    })}`,
    {
      body: JSON.stringify({
        projectsProfileId,
      }),
      method: 'POST',
    },
  );
}
