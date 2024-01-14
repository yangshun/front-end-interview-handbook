import { RiPushpinLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';

export default function ProjectsChallengeSubmissionHeroPinButton() {
  const intl = useIntl();

  return (
    <Button
      addonPosition="end"
      icon={RiPushpinLine}
      label={intl.formatMessage({
        defaultMessage: 'Pin submission',
        description: 'Label for pin submission button',
        id: 'sm2d2y',
      })}
      size="md"
      variant="secondary"
    />
  );
}
