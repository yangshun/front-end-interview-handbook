import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowRightSLine, RiFilterLine, RiLockLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import { useUserProfile } from '~/components/global/UserProfileProvider';
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

import * as AccordionPrimitive from '@radix-ui/react-accordion';

function StudyListsItems({
  item,
  onChangeStudyList,
  openPricingDialog,
}: Readonly<{
  item: StudyListItemsType;
  onChangeStudyList: (value: StudyListItemType) => void;
  openPricingDialog: (feature: QuestionFeatureType | undefined) => void;
}>) {
  const { userProfile } = useUserProfile();
  const showPremiumLock = item.isPremium && !userProfile?.isInterviewsPremium;

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
          <Text color="secondary" size="body3" weight="medium">
            {item.label}
          </Text>
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
              key={studyListItem.listKey}
              endAddOn={
                showPremiumLock ? (
                  <RiLockLine
                    className={clsx('size-4 shrink-0', themeTextSubtleColor)}
                  />
                ) : undefined
              }
              label={
                <Text className="w-full" size="body2">
                  {studyListItem.name}
                </Text>
              }
              onClick={() =>
                showPremiumLock
                  ? openPricingDialog(item.pricingTableFeature)
                  : onChangeStudyList(studyListItem)
              }
            />
          ))}
        </ul>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

function DropdownContent({
  currentStudyList,
  onChangeStudyList,
  openPricingDialog,
}: Readonly<{
  currentStudyList: StudyListItemType;
  onChangeStudyList: (value: StudyListItemType) => void;
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
        description: 'Label for recommended prep study list',
        id: 'k+qWwN',
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
      .filter((section) => {
        return !!section.items.find(
          (item) => item.listKey === currentStudyList.listKey,
        );
      })
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
              onChangeStudyList={onChangeStudyList}
            />
          ))}
        </ul>
      </AccordionPrimitive.Root>
    </ScrollArea>
  );
}

export type StudyListItemType = Readonly<{
  listKey: string;
  name: string;
}>;

type StudyListItemsType = Readonly<{
  isPremium?: boolean;
  items: ReadonlyArray<StudyListItemType>;
  key: string;
  label: string;
  pricingTableFeature?: QuestionFeatureType;
}>;

function convertToMap(studyLists: ReadonlyArray<StudyListItemType>) {
  return studyLists.reduce((acc: Record<string, StudyListItemType>, item) => {
    acc[item.listKey] = item;

    return acc;
  }, {});
}

type Props = Readonly<{
  currentStudyList: StudyListItemType;
  onChangeStudyList: (value: StudyListItemType) => void;
}>;

export default function InterviewsStudyListSelector({
  currentStudyList,
  onChangeStudyList,
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
        label={currentStudyList.name}
        modal={true}
        showChevron={true}
        size="md"
        variant="tertiary">
        <DropdownContent
          currentStudyList={currentStudyList}
          openPricingDialog={(feature) =>
            setShowPricingDialog({
              feature,
              show: true,
            })
          }
          onChangeStudyList={onChangeStudyList}
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
