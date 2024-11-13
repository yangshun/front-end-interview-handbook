import { trpc } from '~/hooks/trpc';

import { useIntl } from '~/components/intl';
import Dialog from '~/components/ui/Dialog';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import InterviewsPricingTableSection from './InterviewsPricingTableSection';
import type { QuestionFeatureType } from '../questions/common/QuestionsTypes';

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
  feature?: QuestionFeatureType;
  isShown?: boolean;
  onClose?: () => void;
  trigger?: React.ReactNode;
}>;

export default function InterviewsPricingTableDialog({
  isShown,
  onClose,
  trigger,
  feature = 'premium-questions',
}: Props) {
  const intl = useIntl();

  const featuresHeading: Record<
    QuestionFeatureType,
    Readonly<{ title: string }>
  > = {
    'company-guides': {
      title: intl.formatMessage({
        defaultMessage: 'Premium is required to access company guides',
        description: 'Title for company guides feature',
        id: 'zVLo8m',
      }),
    },
    'company-tags': {
      title: intl.formatMessage({
        defaultMessage: 'Premium is required to access company tags',
        description: 'Title for company tags feature',
        id: 'Ti1Gle',
      }),
    },
    'focus-areas': {
      title: intl.formatMessage({
        defaultMessage: 'Premium is required to access focus-areas',
        description: 'Title for company guides feature',
        id: 'FiI9XO',
      }),
    },
    'official-solutions': {
      title: intl.formatMessage({
        defaultMessage: 'Premium is required to access official solutions',
        description: 'Title for official solutions feature',
        id: 'Vq8WAa',
      }),
    },
    'premium-questions': {
      title: intl.formatMessage({
        defaultMessage: 'Premium is required to access premium questions',
        description: 'Title for premium questions feature',
        id: '7wfbGH',
      }),
    },
    'study-plans': {
      title: intl.formatMessage({
        defaultMessage: 'Premium is required to access study plans',
        description: 'Title for study plans feature',
        id: '0XJ7cT',
      }),
    },
  };

  const { title } = featuresHeading[feature];

  const subtitle = intl.formatMessage({
    defaultMessage:
      "Your dream job is within reach—just a few months of preparation away. Unlock premium for less than the cost of a day's pay and get there faster.",
    description: 'Subtitle for a premium interviews content',
    id: '5kTIFT',
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
