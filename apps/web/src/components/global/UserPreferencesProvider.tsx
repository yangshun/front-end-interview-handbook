import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { useGreatStorageLocal } from '~/hooks/useGreatStorageLocal';

import { GLOBAL_BANNER_STORAGE_KEY } from './banners/GlobalBannerDisplayScript';

type Props = Readonly<{
  children: React.ReactNode;
}>;

type UserPreferencesContextType = Readonly<{
  setShowFeedbackWidget: (collapsed: boolean) => void;
  setShowGlobalBanner: (isHidden: boolean) => void;
  showFeedbackWidget: boolean;
  showGlobalBanner: boolean;
}>;

const DEFAULT_SHOW_FEEDBACK_WIDGET = true;
const DEFAULT_SHOW_GLOBAL_BANNER = true;

const UserPreferencesContext = createContext<UserPreferencesContextType>({
  setShowFeedbackWidget: () => {},
  setShowGlobalBanner: () => {},
  showFeedbackWidget: DEFAULT_SHOW_FEEDBACK_WIDGET,
  showGlobalBanner: DEFAULT_SHOW_GLOBAL_BANNER,
});

export function useUserPreferences() {
  return useContext(UserPreferencesContext);
}

export default function UserPreferencesProvider({ children }: Props) {
  const [showFeedbackWidget, setShowFeedbackWidget] = useState(
    DEFAULT_SHOW_FEEDBACK_WIDGET,
  );
  const [showGlobalBanner, setShowGlobalBanner] = useGreatStorageLocal(
    GLOBAL_BANNER_STORAGE_KEY, // Update when banner contents are changed.
    DEFAULT_SHOW_GLOBAL_BANNER,
    {
      ttl: 5 * 24 * 60 * 60,
    },
  );

  useEffect(() => {
    if (!showGlobalBanner) {
      document.documentElement.dataset.globalBannerHidden = 'true';
    } else {
      document.documentElement.removeAttribute('data-global-banner-hidden');
    }
  }, [showGlobalBanner]);

  return (
    <UserPreferencesContext.Provider
      value={{
        setShowFeedbackWidget,
        setShowGlobalBanner,
        showFeedbackWidget,
        showGlobalBanner,
      }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
