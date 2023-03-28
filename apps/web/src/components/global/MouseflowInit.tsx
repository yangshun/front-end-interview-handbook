'use client';

import Script from 'next/script';

import { useUserProfile } from '~/components/global/UserProfileProvider';

import gdprCountryCodes from '../hiring/gdprCountries';

type Props = Readonly<{
  countryCode: string;
}>;

export default function Mouseflow({ countryCode }: Props) {
  const { userProfile, isUserProfileLoading } = useUserProfile();

  // Don't record for development.
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  // Don't record for GDPR countries.
  if (gdprCountryCodes.has(countryCode)) {
    return null;
  }

  // Don't record if premium.
  if (isUserProfileLoading || userProfile?.isPremium) {
    return null;
  }

  return (
    <Script id="mouseflow" type="text/javascript">
      {`window._mfq = window._mfq || [];
  (function() {
    var mf = document.createElement("script");
    mf.type = "text/javascript"; mf.defer = true;
    mf.src = "//cdn.mouseflow.com/projects/ce83d290-2d2c-4585-8eb3-479458dcd50b.js";
    document.getElementsByTagName("head")[0].appendChild(mf);
  })();`}
    </Script>
  );
}
