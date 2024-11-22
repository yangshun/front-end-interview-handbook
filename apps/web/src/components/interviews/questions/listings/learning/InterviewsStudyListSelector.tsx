import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightSLine, RiFilterLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import SidebarPremiumChip from '~/components/global/sidebar/SidebarPremiumChip';
import InterviewsPricingTableDialog from '~/components/interviews/purchase/InterviewsPricingTableDialog';
import type { QuestionFeatureType } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';
import ScrollArea from '~/components/ui/ScrollArea';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import type { QuestionListTypeData } from '../../common/questionHref';

import * as AccordionPrimitive from '@radix-ui/react-accordion';

function StudyListsItems({
  item,
  onChangeListType,
  openPricingDialog,
}: Readonly<{
  item: StudyListItemsType;
  onChangeListType: (value: QuestionListTypeData) => void;
  openPricingDialog: (feature: QuestionFeatureType | undefined) => void;
}>) {
  const showPremiumLock = item.isPremium;

  return (
    <AccordionPrimitive.Item className="flex flex-col gap-1" value={item.key}>
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
          className={clsx(
            'flex items-center justify-between',
            'w-full p-2',
            'rounded-md',
            'group',
            'select-none outline-none',
            [
              themeOutlineElement_FocusVisible,
              themeOutlineElementBrandColor_FocusVisible,
            ],
            'transition-colors',
            themeBackgroundElementEmphasizedStateColor_Hover,
          )}>
          <div className="flex items-center gap-2">
            <Text color="secondary" size="body3" weight="medium">
              {item.label}
            </Text>
            {showPremiumLock && <SidebarPremiumChip />}
          </div>
          <RiArrowRightSLine
            aria-hidden={true}
            className={clsx(
              'size-4 shrink-0 transition-transform group-data-[state=open]:rotate-90',
              themeTextSubtleColor,
            )}
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        className={clsx(
          'overflow-hidden transition-all',
          'data-[state=open]:animate-accordion-down',
          'data-[state=closed]:animate-accordion-up overflow-hidden',
        )}>
        <ul className={clsx('flex flex-col gap-y-px')} role="list">
          {item.items.map((studyListItem) => (
            <DropdownMenu.Item
              key={studyListItem.value}
              label={
                <Text className="w-full" size="body2">
                  {studyListItem.value}
                </Text>
              }
              onClick={() =>
                showPremiumLock
                  ? openPricingDialog(item.pricingTableFeature)
                  : onChangeListType(studyListItem)
              }
            />
          ))}
        </ul>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

function DropdownContent({
  listType,
  onChangeListType,
  openPricingDialog,
}: Readonly<{
  listType: QuestionListTypeData;
  onChangeListType: (value: QuestionListTypeData) => void;
  openPricingDialog: (feature: QuestionFeatureType | undefined) => void;
}>) {
  const intl = useIntl();
  const { data: studyLists, isLoading } =
    trpc.questionLists.getStudyListsSelectorData.useQuery();

  if (isLoading || !studyLists) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Spinner size="sm" />
      </div>
    );
  }

  const studyPlansMap = convertToMap(studyLists.studyPlans);
  const items: ReadonlyArray<StudyListItemsType> = [
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
      items: studyLists.focusAreas,
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
      items: studyLists.companies,
      key: 'company',
      label: intl.formatMessage({
        defaultMessage: 'Company guides',
        description: 'Label for company study list',
        id: 'Ekf7hb',
      }),
      pricingTableFeature: 'company-guides',
    },
  ];

  function activeAccordionItem() {
    return items
      .filter(
        (section) =>
          !!section.items.find((item) => item.value === listType.value),
      )
      .map((section) => section.key);
  }

  return (
    <ScrollArea viewportClass="max-h-[80vh]">
      <AccordionPrimitive.Root
        asChild={true}
        className={clsx('flex w-80 flex-col gap-y-1.5')}
        defaultValue={activeAccordionItem()}
        type="multiple">
        <ul>
          {items.map((item) => (
            <StudyListsItems
              key={item.key}
              item={item}
              openPricingDialog={openPricingDialog}
              onChangeListType={onChangeListType}
            />
          ))}
        </ul>
      </AccordionPrimitive.Root>
    </ScrollArea>
  );
}

type StudyListItemsType = Readonly<{
  isPremium?: boolean;
  items: ReadonlyArray<QuestionListTypeData>;
  key: string;
  label: string;
  pricingTableFeature?: QuestionFeatureType;
}>;

function convertToMap(studyLists: ReadonlyArray<QuestionListTypeData>) {
  return studyLists.reduce(
    (acc: Record<string, QuestionListTypeData>, item) => {
      acc[item.value] = item;

      return acc;
    },
    {},
  );
}

type Props = Readonly<{
  listType: QuestionListTypeData;
  onChangeListType: (value: QuestionListTypeData) => void;
}>;

export default function InterviewsStudyListSelector({
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
        label={listType.value}
        modal={true}
        showChevron={true}
        size="md"
        variant="tertiary">
        <DropdownContent
          listType={listType}
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
