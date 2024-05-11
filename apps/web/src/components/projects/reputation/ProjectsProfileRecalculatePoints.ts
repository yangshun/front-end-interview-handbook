import type { NextApiRequest } from 'next';
import url from 'url';

import absoluteUrl from '~/lib/absoluteUrl';

export async function fetchProjectsProfileRecalculatePoints(
  req: NextApiRequest,
  projectsProfileId?: string,
) {
  if (!projectsProfileId) {
    return;
  }

  const { origin } = absoluteUrl(req);
  const href = url.format({
    pathname: '/api/hooks/projects/profile/recalculate',
    query: {
      api_route_secret: process.env.API_ROUTE_SECRET ?? '',
    },
  });

  await fetch(new URL(href, origin).toString(), {
    body: JSON.stringify({
      projectsProfileId,
    }),
    method: 'POST',
  });
}
