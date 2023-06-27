import { useUserPreferences } from '~/components/global/UserPreferencesProvider';
import { useUserProfile } from '~/components/global/UserProfileProvider';

export default function useIsBannerHidden() {
  const { userProfile } = useUserProfile();
  const { showPromoBanner } = useUserPreferences();
  const isPremium = userProfile?.isPremium ?? false;

  return isPremium || !showPromoBanner;
}
