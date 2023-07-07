import { useUserPreferences } from '~/components/global/UserPreferencesProvider';

export default function useIsBannerHidden() {
  const { showGlobalBanner } = useUserPreferences();

  return !showGlobalBanner;
}
