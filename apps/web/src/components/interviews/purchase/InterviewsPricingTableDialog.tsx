import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Dialog from '~/components/ui/Dialog';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import InterviewsPricingTableSection from './InterviewsPricingTableSection';

function InterviewsPricingTableDialogTableSectionContainer() {
  const { data: pricingPlans, isLoading } =
    trpc.purchases.interviewsPlans.useQuery();

  if (isLoading || pricingPlans == null) {
    return (
      <div className="py-20">
        <Spinner display="block" />
      </div>
    );
  }

  const { country, plans } = pricingPlans;

  return (
    <InterviewsPricingTableSection
      countryCode={country.code}
      countryName={country.name}
      plans={plans}
      useCurrentPageAsCancelUrl={true}
      view="dialog"
    />
  );
}

type Props = Readonly<{
  isShown?: boolean;
  onClose?: () => void;
  trigger?: React.ReactNode;
}>;

export default function InterviewsPricingTableDialog({
  isShown,
  onClose,
  trigger,
}: Props) {
  const intl = useIntl();

  const title = intl.formatMessage({
    defaultMessage: 'Premium is required to access study plans',
    description: 'Title for interviews pricing plans',
    id: 'Kq19j1',
  });

  const subtitle = intl.formatMessage({
    defaultMessage:
      'Your dream job could be just a few months of prep away. Unlock premium at a fraction of your potential daily salary.',
    description: 'Subtitle for a premium interviews content',
    id: 'Eoiq1B',
  });

  return (
    <Dialog
      isShown={isShown}
      title={title}
      trigger={trigger}
      width="screen-xl"
      onClose={onClose}>
      <div className="flex w-full flex-col gap-8">
        <Text className="block" color="secondary" size="body2">
          {subtitle}
        </Text>
        <InterviewsPricingTableDialogTableSectionContainer />
      </div>
    </Dialog>
  );
}
