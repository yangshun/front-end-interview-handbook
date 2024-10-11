import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { GLOBAL_BANNER_STORAGE_KEY } from './banners/GlobalBannerDisplayScript';

type Props = Readonly<{
  children: React.ReactNode;
}>;

type UserPreferencesContextType = Readonly<{
  setShowFeedbackWidget: (collapsed: boolean) => void;
  setShowGlobalBanner: (isHidden: boolean) => void;
  setShowSidebar: (collapsed: boolean) => void;
  showFeedbackWidget: boolean;
  showGlobalBanner: boolean;
  showSidebar: boolean;
}>;

const DEFAULT_SHOW_SIDEBAR = true;
const DEFAULT_SHOW_FEEDBACK_WIDGET = true;
const DEFAULT_SHOW_GLOBAL_BANNER = true;

const UserPreferencesContext = createContext<UserPreferencesContextType>({
  setShowFeedbackWidget: () => {},
  setShowGlobalBanner: () => {},
  setShowSidebar: () => {},
  showFeedbackWidget: DEFAULT_SHOW_FEEDBACK_WIDGET,
  showGlobalBanner: DEFAULT_SHOW_GLOBAL_BANNER,
  showSidebar: DEFAULT_SHOW_SIDEBAR,
});

export function useUserPreferences() {
  return useContext(UserPreferencesContext);
}

export default function UserPreferencesProvider({ children }: Props) {
  const [showSidebar, setShowSidebar] = useState(DEFAULT_SHOW_SIDEBAR);
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
        setShowSidebar,
        showFeedbackWidget,
        showGlobalBanner,
        showSidebar,
      }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
