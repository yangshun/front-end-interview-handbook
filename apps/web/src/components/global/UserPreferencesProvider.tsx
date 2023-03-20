import { createContext, useContext, useState } from 'react';

type Props = Readonly<{
  children: React.ReactNode;
}>;

type UserPreferencesContextType = Readonly<{
  setShowFeedbackWidget: (collapsed: boolean) => void;
  setShowSidebar: (collapsed: boolean) => void;
  showFeedbackWidget: boolean;
  showSidebar: boolean;
}>;

const DEFAULT_SHOW_SIDEBAR = true;
const DEFAULT_SHOW_FEEDBACK_WIDGET = true;

const UserProfileContext = createContext<UserPreferencesContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowFeedbackWidget: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowSidebar: () => {},
  showFeedbackWidget: DEFAULT_SHOW_FEEDBACK_WIDGET,
  showSidebar: DEFAULT_SHOW_SIDEBAR,
});

export function useUserPreferences() {
  return useContext(UserProfileContext);
}

export default function UserPreferencesProvider({ children }: Props) {
  const [showSidebar, setShowSidebar] = useState(DEFAULT_SHOW_SIDEBAR);
  const [showFeedbackWidget, setShowFeedbackWidget] = useState(
    DEFAULT_SHOW_FEEDBACK_WIDGET,
  );

  return (
    <UserProfileContext.Provider
      value={{
        setShowFeedbackWidget,
        setShowSidebar,
        showFeedbackWidget,
        showSidebar,
      }}>
      {children}
    </UserProfileContext.Provider>
  );
}
