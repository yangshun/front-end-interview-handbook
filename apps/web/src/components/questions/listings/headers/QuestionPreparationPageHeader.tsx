import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

export default function QuestionPreparationPageHeader() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="col-span-2 grid gap-y-6">
        <Heading level="heading4">
          <FormattedMessage
            defaultMessage="Preparation dashboard"
            description="Preparation dashboard section title"
            id="r0Ddhm"
          />
        </Heading>
      </div>
      <div>
        <Text
          className={clsx(
            'bg-brand-lightest dark:bg-brand-darkest rounded-lg p-3',
          )}
          color="active"
          display="block"
          size="body3">
          <FormattedMessage
            defaultMessage="First time preparing for front end interviews? Find out what to
              expect in our <link>Front End Interview Guidebook</link>"
            description="Link to front end interview guidebook"
            id="MstQla"
            values={{
              link: (chunk) => (
                <Anchor href="/front-end-interview-guidebook" underline={true}>
                  {chunk}
                </Anchor>
              ),
            }}
          />
        </Text>
      </div>
    </div>
  );
}
