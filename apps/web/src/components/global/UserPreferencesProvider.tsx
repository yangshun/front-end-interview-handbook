import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import type { QuestionCategory } from '../questions/listings/types';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export type UserPreferencesFilterStateKey =
  | 'codingFormatFilters'
  | 'companyFilters'
  | 'completionStatusFilters'
  | 'difficultyFilters'
  | 'frameworkFilters'
  | 'languageFilters'
  | 'topicFilters';

export type UserPreferencesStateKey =
  `${QuestionCategory}${Capitalize<UserPreferencesFilterStateKey>}`;

type UserPreferencesContextType = Readonly<{
  getKeyedValue: <T>(key: UserPreferencesStateKey, defaultValue: T) => T;
  setKeyedValue: <T>(key: UserPreferencesStateKey, value: T) => void;
  setKeyedValueIfNotPresent: <T>(
    key: UserPreferencesStateKey,
    value: T,
  ) => void;
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

const UserProfileContext = createContext<UserPreferencesContextType>({
  getKeyedValue: (_key, defaultValue) => defaultValue,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setKeyedValue: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setKeyedValueIfNotPresent: () => {},
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

export function useUserPreferencesState<T>(
  key: UserPreferencesStateKey,
  defaultValue: T,
) {
  const { getKeyedValue, setKeyedValue, setKeyedValueIfNotPresent } =
    useUserPreferences();

  const value = useMemo(
    () => getKeyedValue<T>(key, defaultValue),
    [key, getKeyedValue, defaultValue],
  );

  useEffect(() => {
    setKeyedValueIfNotPresent(key, defaultValue);
  }, [key, defaultValue, setKeyedValueIfNotPresent]);

  const setValue = (newValue: T) => {
    setKeyedValue(key, newValue);
  };

  return [value, setValue] as const;
}

export function useUserPreferences() {
  return useContext(UserProfileContext);
}

export default function UserPreferencesProvider({ children }: Props) {
  const [showSidebar, setShowSidebar] = useState(DEFAULT_SHOW_SIDEBAR);
  const [showFeedbackWidget, setShowFeedbackWidget] = useState(
    DEFAULT_SHOW_FEEDBACK_WIDGET,
  );
  const [showPromoBanner, setShowPromoBanner] = useState(
    DEFAULT_SHOW_PROMO_BANNER,
  );
  const [keyedState, setKeyedState] = useState<Record<string, unknown>>({});
  const [keys, setKeys] = useState<Set<string>>(new Set());

  function getKeyedValue<T>(key: string, defaultValue: T): T {
    return keys.has(key) ? (keyedState[key] as T) : defaultValue;
  }

  function setKeyedValue<T>(key: string, value: T) {
    setKeyedState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  function setKeyedValueIfNotPresent<T>(key: string, value: T) {
    if (!keys.has(key)) {
      setKeys((prevState) => new Set([...Array.from(prevState), key]));
      setKeyedValue(key, value);
    }
  }

  return (
    <UserProfileContext.Provider
      value={{
        getKeyedValue,
        setKeyedValue,
        setKeyedValueIfNotPresent,
        setShowFeedbackWidget,
        setShowPromoBanner,
        setShowSidebar,
        showFeedbackWidget,
        showPromoBanner,
        showSidebar,
      }}>
      {children}
    </UserProfileContext.Provider>
  );
}
