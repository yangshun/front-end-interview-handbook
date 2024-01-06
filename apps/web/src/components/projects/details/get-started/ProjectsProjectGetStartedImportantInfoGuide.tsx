import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';

export default function ProjectsProjectGetStartedImportantInfoGuide() {
  return (
    <div className="flex flex-col gap-4">
      <Text color="secondary" size="body2">
        <FormattedMessage
          defaultMessage="Find official guides, reference code from top submissions, and use our discussion forum to ask questions."
          description="Description for Important Info Guide section on Before You Get Started dialog"
          id="iHLvVo"
        />
      </Text>
      {/* TODO(projects): Replace with image/jsx */}
      <div className="h-[124px] rounded-lg self-stretch bg-red" />
    </div>
  );
}
