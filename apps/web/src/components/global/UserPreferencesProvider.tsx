import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { GLOBAL_BANNER_STORAGE_KEY } from './banners/GlobalBannerDisplayScript';

type Props = Readonly<{
  children: React.ReactNode;
}>;

type UserPreferencesContextType = Readonly<{
  setShowFeedbackWidget: (collapsed: boolean) => void;
  setShowGlobalBanner: (isHidden: boolean) => void;
  setShowSecondarySidebar: (collapsed: boolean) => void;
  showFeedbackWidget: boolean;
  showGlobalBanner: boolean;
  showSecondarySidebar: boolean;
}>;

const DEFAULT_SHOW_SECONDARY_SIDEBAR = false;
const DEFAULT_SHOW_FEEDBACK_WIDGET = true;
const DEFAULT_SHOW_GLOBAL_BANNER = true;

const UserPreferencesContext = createContext<UserPreferencesContextType>({
  setShowFeedbackWidget: () => {},
  setShowGlobalBanner: () => {},
  setShowSecondarySidebar: () => {},
  showFeedbackWidget: DEFAULT_SHOW_FEEDBACK_WIDGET,
  showGlobalBanner: DEFAULT_SHOW_GLOBAL_BANNER,
  showSecondarySidebar: DEFAULT_SHOW_SECONDARY_SIDEBAR,
});

export function useUserPreferences() {
  return useContext(UserPreferencesContext);
}

export default function UserPreferencesProvider({ children }: Props) {
  const [showSecondarySidebar, setShowSecondarySidebar] = useState(
    DEFAULT_SHOW_SECONDARY_SIDEBAR,
  );
  const [showFeedbackWidget, setShowFeedbackWidget] = useState(
    DEFAULT_SHOW_FEEDBACK_WIDGET,
  );
  const [showGlobalBanner, setShowGlobalBanner] = useLocalStorage(
    GLOBAL_BANNER_STORAGE_KEY, // Update when banner contents are changed.
    DEFAULT_SHOW_GLOBAL_BANNER,
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
        setShowSecondarySidebar,
        showFeedbackWidget,
        showGlobalBanner,
        showSecondarySidebar,
      }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
