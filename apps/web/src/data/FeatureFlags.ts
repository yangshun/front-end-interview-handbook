import { fromUnixTime } from 'date-fns';

export const JS_COMMUNITY_SOLUTIONS_IS_LIVE =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production';

const epochTime = 1713160800; // Epoch for 15 APR 2024 14:00:00 SGT

export const PROJECT_LAUNCH_DATE = fromUnixTime(epochTime);
export const FEATURE_FLAGS_SHOW_MYSTERY_PRODUCT = true;
export const FEATURE_FLAGS_PROJECTS_LAUNCHED =
  process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production';
// TODO(projects): change it if activation available
export const PROJECT_ACTIVATION_AVAILABLE = false;
