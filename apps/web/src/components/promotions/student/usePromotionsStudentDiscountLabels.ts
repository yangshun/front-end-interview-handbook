import { STUDENT_DISCOUNT_PERCENTAGE } from '~/data/PromotionConfig';

import { useIntl } from '~/components/intl';

export default function usePromotionsStudentDiscountLabels() {
  const intl = useIntl();

  return {
    subtitle: intl.formatMessage(
      {
        defaultMessage:
          'Existing students with a valid school email get a {discountPercentage}% off the Annual premium plans.',
        description: 'Subtitle of discount promotion card',
        id: 'LTB2j0',
      },
      {
        discountPercentage: STUDENT_DISCOUNT_PERCENTAGE,
      },
    ),
    title: intl.formatMessage({
      defaultMessage: 'Student Discount',
      description: 'Promotion title',
      id: 'xsaQ0d',
    }),
  };
}
