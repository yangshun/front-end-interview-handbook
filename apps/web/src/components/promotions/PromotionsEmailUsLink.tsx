import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';

export function PromotionsEmailUsLink() {
  return (
    <Text className="blocktext-right" color="secondary" size="body3">
      <FormattedMessage
        defaultMessage="Facing trouble? <link>Email us</link>"
        description="Section label for seasonal promotion details"
        id="5XwjUN"
        values={{
          link: (chunks) => (
            <Anchor
              className="mx-auto justify-center whitespace-nowrap font-medium"
              href="mailto:contact@greatfrontend.com">
              {chunks}
            </Anchor>
          ),
        }}
      />
    </Text>
  );
}
