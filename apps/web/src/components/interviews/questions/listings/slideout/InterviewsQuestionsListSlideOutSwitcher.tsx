import { useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useUserProfile from '~/hooks/user/useUserProfile';

import SidebarPremiumChip from '~/components/global/sidebar/SidebarPremiumChip';
import InterviewsPricingTableDialog from '~/components/interviews/purchase/InterviewsPricingTableDialog';
import type { QuestionFeatureType } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Spinner from '~/components/ui/Spinner';

import type { QuestionListTypeData } from '../../common/questionHref';

export type QuestionListTypeWithLabel = QuestionListTypeData &
  Readonly<{ label: string }>;

function DropdownContent({
  onChangeListType,
  openPricingDialog,
}: Readonly<{
  onChangeListType: (value: QuestionListTypeWithLabel) => void;
  openPricingDialog: (feature: QuestionFeatureType | undefined) => void;
}>) {
  const intl = useIntl();
  const { data: questionLists, isLoading } = trpc.questionLists.get.useQuery();
  const { userProfile } = useUserProfile();

  if (isLoading || !questionLists) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner size="sm" />
      </div>
    );
  }

  const studyPlansMap = convertToMap(questionLists.studyPlans);
  const categories: ReadonlyArray<QuestionListCategories> = [
    {
      items: [studyPlansMap.gfe75, studyPlansMap.blind75],
      key: 'prep-strategy',
      label: intl.formatMessage({
        defaultMessage: 'Recommended prep strategy',
        description: 'Recommended interview preparation strategy',
        id: 'jCBp3Z',
      }),
    },
    {
      isPremium: true,
      items: [
        studyPlansMap['one-week'],
        studyPlansMap['one-month'],
        studyPlansMap['three-months'],
      ],
      key: 'study-plan',
      label: intl.formatMessage({
        defaultMessage: 'Study plans',
        description: 'Label for study plans study list',
        id: 'mKOi1B',
      }),
      pricingTableFeature: 'study-plans',
    },
    {
      isPremium: true,
      items: questionLists.focusAreas,
      key: 'focus-area',
      label: intl.formatMessage({
        defaultMessage: 'Focus areas',
        description: 'Label for focus areas study list',
        id: 'l714HN',
      }),
      pricingTableFeature: 'focus-areas',
    },
    {
      isPremium: true,
      items: questionLists.companies,
      key: 'company',
      label: intl.formatMessage({
        defaultMessage: 'Company guides',
        description: 'Label for company study list',
        id: 'Ekf7hb',
      }),
      pricingTableFeature: 'company-guides',
    },
    {
      isPremium: false,
      items: questionLists.formats,
      key: 'formats',
      label: intl.formatMessage({
        defaultMessage: 'Question formats',
        description: 'Label for question format list',
        id: 'nAM572',
      }),
    },
    {
      isPremium: false,
      items: questionLists.frameworks,
      key: 'frameworks',
      label: intl.formatMessage({
        defaultMessage: 'Frameworks',
        description: 'Label for question framework list',
        id: 'Lel52s',
      }),
    },
    {
      isPremium: false,
      items: questionLists.languages,
      key: 'languages',
      label: intl.formatMessage({
        defaultMessage: 'Languages',
        description: 'Label for question languages list',
        id: 'hUENEC',
      }),
    },
  ];

  return (
    <>
      {categories.map((category) => (
        <DropdownMenu.Sub
          key={category.key}
          endAddOn={category.isPremium ? <SidebarPremiumChip /> : undefined}
          label={category.label}>
          {category.items.map((item) => (
            <DropdownMenu.Item
              key={item.value}
              label={item.label}
              onClick={() => {
                category.isPremium && !userProfile?.premium
                  ? openPricingDialog(category.pricingTableFeature)
                  : onChangeListType(item);
              }}
            />
          ))}
        </DropdownMenu.Sub>
      ))}
    </>
  );
}

type QuestionListCategories = Readonly<{
  isPremium?: boolean;
  items: ReadonlyArray<QuestionListTypeData & Readonly<{ label: string }>>;
  key: string;
  label: string;
  pricingTableFeature?: QuestionFeatureType;
}>;

function convertToMap(studyLists: ReadonlyArray<QuestionListTypeWithLabel>) {
  return studyLists.reduce(
    (acc: Record<string, QuestionListTypeWithLabel>, item) => ({
      ...acc,
      [item.value]: item,
    }),
    {},
  );
}

type Props = Readonly<{
  listType: QuestionListTypeWithLabel;
  onChangeListType: (value: QuestionListTypeWithLabel) => void;
}>;

export default function InterviewsQuestionsListSlideOutSwitcher({
  listType,
  onChangeListType,
}: Props) {
  const [showPricingDialog, setShowPricingDialog] = useState<{
    feature: QuestionFeatureType | undefined;
    show: boolean;
  }>({
    feature: undefined,
    show: false,
  });

  return (
    <>
      <DropdownMenu
        align="start"
        icon={RiFilterLine}
        label={listType.label}
        modal={true}
        showChevron={true}
        size="md"
        variant="tertiary">
        <DropdownContent
          openPricingDialog={(feature) =>
            setShowPricingDialog({
              feature,
              show: true,
            })
          }
          onChangeListType={onChangeListType}
        />
      </DropdownMenu>
      <InterviewsPricingTableDialog
        feature={showPricingDialog.feature}
        isShown={showPricingDialog.show}
        onClose={() =>
          setShowPricingDialog({
            feature: undefined,
            show: false,
          })
        }
      />
    </>
  );
}
