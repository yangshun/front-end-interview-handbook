import clsx from 'clsx';
import { useState } from 'react';
import { RiFilterLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import useUserProfile from '~/hooks/user/useUserProfile';

import {
  QuestionLanguageLabels,
  useQuestionFormatsData,
} from '~/data/QuestionCategories';

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
  listType,
  onChangeListType,
  openPricingDialog,
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
  const categories: ReadonlyArray<QuestionListCategories | QuestionListItem> = [
    {
      label: intl.formatMessage({
        defaultMessage: 'All practice questions',
        description: 'Question list',
        id: 'AbV98R',
      }),
      menuType: 'item',
      tab: 'coding',
      type: 'practice',
      value: 'practice',
    },
    {
      items: [
        { menuType: 'item', ...studyPlansMap.gfe75 },
        { menuType: 'item', ...studyPlansMap.blind75 },
        {
          label: formatData['system-design'].label,
          menuType: 'item',
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
      menuType: 'list',
    },
    {
      items: [
        { menuType: 'item', ...studyPlansMap['one-week'] },
        { menuType: 'item', ...studyPlansMap['one-month'] },
        { menuType: 'item', ...studyPlansMap['three-months'] },
      ],
      key: 'study-plan',
      label: intl.formatMessage({
        defaultMessage: 'Study plans',
        description: 'Label for study plans study list',
        id: 'mKOi1B',
      }),
      menuType: 'list',
      premiumFeature: 'study-plans',
    },
    {
      items: questionLists.focusAreas.map((item) => ({
        menuType: 'item',
        ...item,
      })),
      key: 'focus-area',
      label: intl.formatMessage({
        defaultMessage: 'Focus areas',
        description: 'Label for focus areas study list',
        id: 'l714HN',
      }),
      menuType: 'list',
      premiumFeature: 'focus-areas',
    },
    {
      items: questionLists.companies.map((item) => ({
        menuType: 'item',
        ...item,
      })),
      key: 'company',
      label: intl.formatMessage({
        defaultMessage: 'Company guides',
        description: 'Label for company study list',
        id: 'Ekf7hb',
      }),
      menuType: 'list',
      premiumFeature: 'company-guides',
    },
    {
      items: questionLists.formats.map((item) => ({
        menuType: 'item',
        ...item,
      })),
      key: 'formats',
      label: intl.formatMessage({
        defaultMessage: 'Question formats',
        description: 'Label for question format list',
        id: 'nAM572',
      }),
      menuType: 'list',
    },
    {
      items: [
        {
          label: intl.formatMessage({
            defaultMessage: 'Frameworks',
            description: 'Software frameworks',
            id: 'NS3jrc',
          }),
          menuType: 'label',
          value: 'frameworks',
        },
        ...questionLists.frameworks.map(
          (item) =>
            ({
              menuType: 'item',
              ...item,
            }) as const,
        ),
        { menuType: 'divider', value: 'divider-1' },
        {
          label: intl.formatMessage({
            defaultMessage: 'Languages',
            description: 'Programming languages',
            id: 'yPG5Kr',
          }),
          menuType: 'label',
          value: 'languages',
        },
        ...questionLists.languages.map(
          (item) =>
            ({
              menuType: 'item',
              ...item,
            }) as const,
        ),
      ],
      key: 'frameworks-languages',
      label: intl.formatMessage({
        defaultMessage: 'Frameworks / languages',
        description: 'Front end frameworks or language',
        id: 'pHQFA0',
      }),
      menuType: 'list',
    },
    {
      items: [
        ...questionLists.languages.map(
          (item) =>
            ({
              ...item,
              label: intl.formatMessage(
                {
                  defaultMessage: '{category} Quiz Questions',
                  description: 'Label for Quiz question',
                  id: '3A1yG3',
                },
                {
                  category: QuestionLanguageLabels[item.value],
                },
              ),
              menuType: 'item',
              tab: 'quiz',
              type: 'language',
            }) as const,
        ),
        {
          label: intl.formatMessage(
            {
              defaultMessage: '{category} Quiz Questions',
              description: 'Label for Quiz question',
              id: '3A1yG3',
            },
            {
              category: 'React',
            },
          ),
          menuType: 'item',
          tab: 'quiz',
          type: 'framework',
          value: 'react',
        },
      ],
      key: 'quiz',
      label: intl.formatMessage({
        defaultMessage: 'Quizzes',
        description: 'Tile for quiz question type',
        id: 'QqddKP',
      }),
      menuType: 'list',
    },
  ];

  function activeAccordionItem() {
    return categories
      .flatMap((category) => {
        if (
          category.menuType === 'list' &&
          category.items.find((item) => item.value === listType.value)
        ) {
          return [category];
        }

        return [];
      })
      .map((category) => category.key);
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
            {categories.map((categoryItem) => {
              switch (categoryItem.menuType) {
                case 'list': {
                  return (
                    <AccordionItem
                      key={categoryItem.key}
                      className="flex flex-col gap-1"
                      value={categoryItem.key}>
                      <AccordionTrigger className="!py-1 px-2">
                        <div className="flex items-center gap-2">
                          <Text color="secondary" size="body3" weight="medium">
                            {categoryItem.label}
                          </Text>
                          {categoryItem.premiumFeature && (
                            <SidebarPremiumChip />
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="!pb-0">
                        <ul
                          className={clsx('flex flex-col gap-y-px')}
                          role="list">
                          {categoryItem.items.map((item) => {
                            switch (item.menuType) {
                              case 'divider': {
                                return <Divider key={item.value} />;
                              }
                              case 'label': {
                                return null;
                              }
                              case 'item':
                              default:
                                return (
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
                                      categoryItem.premiumFeature &&
                                      !userProfile?.premium
                                        ? openPricingDialog(
                                            categoryItem.premiumFeature,
                                          )
                                        : onChangeListType(item);
                                    }}
                                  />
                                );
                            }
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
              }
            })}
          </div>
        </Accordion>
      </ScrollArea>
      {/* DropdownMenu for screen greater than tablet */}
      <div className="hidden sm:contents">
        {categories.map((categoryItem) => {
          switch (categoryItem.menuType) {
            case 'item': {
              return (
                <DropdownMenu.Item
                  key={categoryItem.value}
                  label={categoryItem.label}
                  onClick={() => {
                    onChangeListType(categoryItem);
                  }}
                />
              );
            }
            case 'list': {
              return (
                <DropdownMenu.Sub
                  key={categoryItem.key}
                  endAddOn={
                    categoryItem.premiumFeature ? (
                      <SidebarPremiumChip />
                    ) : undefined
                  }
                  label={categoryItem.label}>
                  {categoryItem.items.map((item) => {
                    switch (item.menuType) {
                      case 'divider': {
                        return <Divider key={item.value} />;
                      }
                      case 'label': {
                        return (
                          <DropdownMenu.Label key={item.value}>
                            {item.label}
                          </DropdownMenu.Label>
                        );
                      }
                      default: {
                        return (
                          <DropdownMenu.Item
                            key={item.value}
                            label={item.label}
                            onClick={() => {
                              categoryItem.premiumFeature &&
                              !userProfile?.premium
                                ? openPricingDialog(categoryItem.premiumFeature)
                                : onChangeListType(item);
                            }}
                          />
                        );
                      }
                    }
                  })}
                </DropdownMenu.Sub>
              );
            }
          }
        })}
      </div>
    </>
  );
}

type QuestionListLabel = Readonly<{
  label: string;
  menuType: 'label';
  value: string;
}>;
type QuestionListDivider = Readonly<{ menuType: 'divider'; value: string }>;
type QuestionListItem = QuestionListTypeWithLabel & { menuType: 'item' };

type QuestionListCategories = Readonly<{
  items: ReadonlyArray<
    QuestionListDivider | QuestionListItem | QuestionListLabel
  >;
  key: string;
  label: string;
  menuType: 'list';
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
        label={('title' in listType ? listType.title : null) ?? listType.label}
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
