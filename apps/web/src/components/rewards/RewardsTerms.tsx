'use client';

import { RiArrowLeftLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import Terms from './terms.mdx';
import Button from '../ui/Button';

export default function RewardsTerms() {
  const intl = useIntl();

  return (
    <Container className="my-20" variant="4xl">
      <div className="mb-20">
        <Button
          addonPosition="start"
          href="/rewards"
          icon={RiArrowLeftLine}
          label={intl.formatMessage({
            defaultMessage: 'Back',
            description: 'Button label for back button',
            id: 'Dq9yul',
          })}
          size="md"
          type="button"
          variant="secondary"
        />
      </div>
      <Prose>
        <Terms />
      </Prose>
    </Container>
  );
}
