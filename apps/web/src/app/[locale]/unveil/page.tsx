import { redirect } from 'next/navigation';

import { FEATURE_FLAGS_PROJECTS_LAUNCHED } from '~/data/FeatureFlags';

// This page is just for hiding the URL of the projects page.
export default async function Page() {
  if (!FEATURE_FLAGS_PROJECTS_LAUNCHED) {
    return redirect('/');
  }

  return redirect('/projects');
}
