import clsx from 'clsx';
import { useState } from 'react';

import { FormattedMessage } from '~/components/intl';
import Banner from '~/components/ui/Banner';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardNoAlphaColor,
  themeTextColor,
} from '~/components/ui/theme';

export default function CodingWorkspaceMobileExperienceBanner() {
  const [showMobileExperienceMessage, setShowMobileExperienceMessage] =
    useState(true);

  if (!showMobileExperienceMessage) {
    return null;
  }

  return (
    <div className="z-fixed fixed inset-x-0 bottom-12">
      <Banner
        className={clsx(themeBackgroundCardNoAlphaColor, themeTextColor)}
        size="xs"
        truncate={true}
        variant="custom"
        onHide={() => {
          setShowMobileExperienceMessage(false);
        }}>
        <Text color="subtitle" size="body3" weight="medium">
          <FormattedMessage
            defaultMessage="For the best experience, switch to desktop."
            description="Coding workspace mobile experience message"
            id="tvSiGC"
          />
        </Text>
      </Banner>
    </div>
  );
}
