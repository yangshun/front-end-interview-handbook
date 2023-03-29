import { useI18nPathname } from 'next-i18nostic';
import React, { createContext, useContext, useEffect, useState } from 'react';

import useLogEvent from '~/logging/useLogEvent';
import type { Database } from '~/supabase/database.types';
import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

import { useSessionContext, useUser } from '@supabase/auth-helpers-react';

export type UserProfilePlan = 'lifetime' | 'month' | 'quarter' | 'year';
export type UserProfile = Readonly<{
  createdAt: string;
  isPremium: boolean;
  plan: UserProfilePlan | null;
  stripeCustomerID: string | null;
}>;

type UserProfileContextType = Readonly<{
  isUserProfileLoading: boolean;
  userProfile: UserProfile | null;
}>;

const UserProfileContext = createContext<UserProfileContextType>({
  isUserProfileLoading: true,
  userProfile: null,
});

export function useUserProfile() {
  return useContext(UserProfileContext);
}

type Props = Readonly<{
  children: React.ReactNode;
  countryCode: string;
}>;

function convertProfile(
  payload: Database['public']['Tables']['Profile']['Row'],
): UserProfile {
  return {
    createdAt: payload.createdAt,
    isPremium: payload.premium,
    plan: payload.plan as UserProfilePlan | null,
    stripeCustomerID: payload.stripeCustomer,
  };
}

export default function UserProfileProvider({ children, countryCode }: Props) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { isLoading: isUserLoading } = useSessionContext();
  const supabaseClient = useSupabaseClientGFE();
  const user = useUser();
  const [isUserProfileLoading, setIsUserProfileLoading] = useState(true);

  useEffect(() => {
    async function getUserProfile() {
      if (user == null) {
        return;
      }

      const { data: profile } = await supabaseClient
        .from('Profile')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile != null) {
        setUserProfile(convertProfile(profile));
      }

      setIsUserProfileLoading(false);
    }

    // Logged-in case, fetch profile.
    if (user != null && userProfile == null) {
      getUserProfile();
    }

    // Logged-out case, don't need to fetch profile.
    if (user == null && !isUserLoading) {
      setIsUserProfileLoading(false);
    }
  }, [countryCode, isUserLoading, supabaseClient, user, userProfile]);

  const { pathname } = useI18nPathname();
  const logEvent = useLogEvent();

  // Log initial page load.
  useEffect(() => {
    setTimeout(() => {
      logEvent('page_load.initial', {
        pathname,
        url: window.location.href,
      });
    }, 100);
  }, []);

  useEffect(() => {
    // Use logged out, clear user profile.
    if (user == null) {
      setUserProfile(null);
    }
  }, [user]);

  return (
    <UserProfileContext.Provider
      value={{
        isUserProfileLoading,
        userProfile,
      }}>
      {children}
    </UserProfileContext.Provider>
  );
}
