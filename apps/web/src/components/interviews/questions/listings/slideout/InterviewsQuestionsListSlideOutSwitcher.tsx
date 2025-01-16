import clsx from 'clsx';
import { useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useUserProfile from '~/hooks/user/useUserProfile';

import { useQuestionFormatsData } from '~/data/QuestionCategories';

import SidebarPremiumChip from '~/components/global/sidebar/SidebarPremiumChip';
import InterviewsPricingTableDialog from '~/components/interviews/purchase/InterviewsPricingTableDialog';
import type { InterviewsPurchasePremiumFeature } from '~/components/interviews/purchase/InterviewsPurchaseTypes';
import { useIntl } from '~/components/intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import ScrollArea from '~/components/ui/ScrollArea';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

import type { QuestionListTypeData } from '../../common/QuestionsTypes';

export type QuestionListTypeWithLabel = QuestionListTypeData &
  Readonly<{ label: string }>;

function DropdownContent({
  onChangeListType,
  openPricingDialog,
  listType,
}: Readonly<{
  listType: QuestionListTypeWithLabel;
  onChangeListType: (value: QuestionListTypeWithLabel) => void;
  openPricingDialog: (feature: InterviewsPurchasePremiumFeature) => void;
}>) {
  const intl = useIntl();
  const { data: questionLists, isLoading } = trpc.questionLists.get.useQuery();
  const { userProfile } = useUserProfile();
  const formatData = useQuestionFormatsData();

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
      items: questionLists.practice,
      key: 'practice',
      label: intl.formatMessage({
        defaultMessage: 'All practice questions',
        description: 'All front end interview practice questions',
        id: '1wO0TT',
      }),
    },
    {
      items: [
        studyPlansMap.gfe75,
        studyPlansMap.blind75,
        {
          label: formatData['system-design'].label,
          type: 'format',
          value: formatData['system-design'].value,
        },
      ],
      key: 'prep-strategy',
      label: intl.formatMessage({
        defaultMessage: 'Recommended prep strategy',
        description: 'Recommended interview preparation strategy',
        id: 'jCBp3Z',
      }),
    },
    {
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
      premiumFeature: 'study-plans',
    },
    {
      items: questionLists.focusAreas,
      key: 'focus-area',
      label: intl.formatMessage({
        defaultMessage: 'Focus areas',
        description: 'Label for focus areas study list',
        id: 'l714HN',
      }),
      premiumFeature: 'focus-areas',
    },
    {
      items: questionLists.companies,
      key: 'company',
      label: intl.formatMessage({
        defaultMessage: 'Company guides',
        description: 'Label for company study list',
        id: 'Ekf7hb',
      }),
      premiumFeature: 'company-guides',
    },
    {
      items: questionLists.formats,
      key: 'formats',
      label: intl.formatMessage({
        defaultMessage: 'Question formats',
        description: 'Label for question format list',
        id: 'nAM572',
      }),
    },
    {
      items: [
        ...questionLists.frameworks,
        { type: 'divider', value: 'divider-1' },
        ...questionLists.languages,
      ],
      key: 'frameworks-languages',
      label: intl.formatMessage({
        defaultMessage: 'Frameworks / languages',
        description: 'Front end frameworks or language',
        id: 'pHQFA0',
      }),
    },
  ];

  function activeAccordionItem() {
    return categories
      .filter(
        (category) =>
          !!category.items.find((item) => item.value === listType.value),
      )
      .map((section) => section.key);
  }

  return (
    <>
      {/* Accordion for mobile screen */}
      <ScrollArea className="block sm:hidden" viewportClass="max-h-[80vh]">
        <Accordion
          asChild={true}
          className={clsx('flex w-80 flex-col gap-y-1.5', 'divide-none')}
          defaultValue={activeAccordionItem()}
          type="multiple">
          <div>
            {categories.map((category) => (
              <AccordionItem
                key={category.key}
                className="flex flex-col gap-1"
                value={category.key}>
                <AccordionTrigger className="!py-1 px-2">
                  <div className="flex items-center gap-2">
                    <Text color="secondary" size="body3" weight="medium">
                      {category.label}
                    </Text>
                    {category.premiumFeature && <SidebarPremiumChip />}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="!pb-0">
                  <ul className={clsx('flex flex-col gap-y-px')} role="list">
                    {category.items.map((item) =>
                      item.type === 'divider' ? (
                        <Divider key={item.value} />
                      ) : (
                        <DropdownMenu.Item
                          key={item.value}
                          label={
                            <Text
                              className="w-full"
                              color={
                                listType.value === item.value
                                  ? 'active'
                                  : 'default'
                              }
                              size="body2"
                              weight={
                                listType.value === item.value
                                  ? 'bold'
                                  : 'normal'
                              }>
                              {item.label}
                            </Text>
                          }
                          onClick={() => {
                            category.premiumFeature && !userProfile?.premium
                              ? openPricingDialog(category.premiumFeature)
                              : onChangeListType(item);
                          }}
                        />
                      ),
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </ScrollArea>

      {/* DropdownMenu.Sub for screen greater than tablet */}
      <div className="hidden sm:block">
        {categories.map((category) => (
          <DropdownMenu.Sub
            key={category.key}
            endAddOn={
              category.premiumFeature ? <SidebarPremiumChip /> : undefined
            }
            label={category.label}>
            {category.items.map((item) =>
              item.type === 'divider' ? (
                <Divider key={item.value} />
              ) : (
                <DropdownMenu.Item
                  key={item.value}
                  label={item.label}
                  onClick={() => {
                    category.premiumFeature && !userProfile?.premium
                      ? openPricingDialog(category.premiumFeature)
                      : onChangeListType(item);
                  }}
                />
              ),
            )}
          </DropdownMenu.Sub>
        ))}
      </div>
    </>
  );
}

type QuestionListCategories = Readonly<{
  items: ReadonlyArray<
    QuestionListTypeWithLabel | Readonly<{ type: 'divider'; value: string }>
  >;
  key: string;
  label: string;
  premiumFeature?: InterviewsPurchasePremiumFeature;
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
  const [pricingDialogFeature, setPricingDialogFeature] =
    useState<InterviewsPurchasePremiumFeature | null>(null);

  return (
    <>
      <DropdownMenu
        align="start"
        icon={RiFilterLine}
        label={listType.label}
        modal={true}
        showChevron={true}
        size="md"
        triggerClassName="-ml-4"
        variant="tertiary">
        <DropdownContent
          listType={listType}
          openPricingDialog={(feature) => setPricingDialogFeature(feature)}
          onChangeListType={onChangeListType}
        />
      </DropdownMenu>
      <InterviewsPricingTableDialog
        isShown={Boolean(pricingDialogFeature)}
        premiumFeature={pricingDialogFeature || undefined}
        onClose={() => setPricingDialogFeature(null)}
      />
    </>
  );
}
