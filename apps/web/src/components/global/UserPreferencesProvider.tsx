import { createContext, useContext, useState } from 'react';

type Props = Readonly<{
  children: React.ReactNode;
}>;

type UserPreferencesContextType = Readonly<{
  setShowFeedbackWidget: (collapsed: boolean) => void;
  setShowPromoBanner: (isHidden: boolean) => void;
  setShowSidebar: (collapsed: boolean) => void;
  showFeedbackWidget: boolean;
  showPromoBanner: boolean;
  showSidebar: boolean;
}>;

const DEFAULT_SHOW_SIDEBAR = true;
const DEFAULT_SHOW_FEEDBACK_WIDGET = true;
const DEFAULT_SHOW_PROMO_BANNER = true;

const UserPreferencesContext = createContext<UserPreferencesContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowFeedbackWidget: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowPromoBanner: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowSidebar: () => {},
  showFeedbackWidget: DEFAULT_SHOW_FEEDBACK_WIDGET,
  showPromoBanner: DEFAULT_SHOW_PROMO_BANNER,
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
  const [showPromoBanner, setShowPromoBanner] = useState(
    DEFAULT_SHOW_PROMO_BANNER,
  );

  return (
    <UserPreferencesContext.Provider
      value={{
        setShowFeedbackWidget,
        setShowPromoBanner,
        setShowSidebar,
        showFeedbackWidget,
        showPromoBanner,
        showSidebar,
      }}>
      {children}
    </UserPreferencesContext.Provider>
  );
}
