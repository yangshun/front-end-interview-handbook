import { useSessionContext, useUser } from '@supabase/auth-helpers-react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import logEvent from '~/logging/logEvent';
import { useI18nPathname } from '~/next-i18nostic/src';
import type { Database } from '~/supabase/database.types';
import { useSupabaseClientGFE } from '~/supabase/SupabaseClientGFE';

export type InterviewsProfileSubscriptionPlan =
  | 'lifetime'
  | 'month'
  | 'quarter'
  | 'year';
export type UserProfile = Readonly<{
  createdAt: string;
  isInterviewsPremium: boolean;
  plan: InterviewsProfileSubscriptionPlan | null;
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
}>;

function convertProfile(
  payload: Database['public']['Tables']['Profile']['Row'],
): UserProfile {
  return {
    createdAt: payload.createdAt,
    isInterviewsPremium: payload.premium,
    plan: payload.plan as InterviewsProfileSubscriptionPlan | null,
    stripeCustomerID: payload.stripeCustomer,
  };
}

export default function UserProfileProvider({ children }: Props) {
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
  }, [isUserLoading, supabaseClient, user, userProfile]);

  const { pathname } = useI18nPathname();

  useEffect(() => {
    // Only log pageview after we know if the user is premium or not.
    if (isUserProfileLoading) {
      return;
    }

    logEvent('pageview', {
      namespace: 'general',
      user: {
        interviewsPremium: userProfile?.isInterviewsPremium ?? false,
      },
    });
  }, [pathname, isUserProfileLoading, userProfile?.isInterviewsPremium]);

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
