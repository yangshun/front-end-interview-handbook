import { redirect } from 'next/navigation';

import { PROJECTS_IS_LIVE } from '~/data/FeatureFlags';

// This page is just for hiding the URL of the projects page.
export default async function Page() {
  if (!PROJECTS_IS_LIVE) {
    return redirect('/');
  }

  return redirect('/projects');
}
