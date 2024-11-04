import clsx from 'clsx';
import { RiArrowRightSLine, RiFilterLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

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
}: Readonly<{
  item: StudyListItemsType;
  onChangeStudyList: (value: StudyListItemType) => void;
}>) {
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
              label={<Text size="body2">{studyListItem.name}</Text>}
              onClick={() => {
                onChangeStudyList(studyListItem);
              }}
            />
          ))}
        </ul>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

function DropdownContent({ currentStudyList, onChangeStudyList }: Props) {
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
      items: [studyPlansMap.greatfrontend75, studyPlansMap.blind75],
      key: 'prep-strategy',
      label: intl.formatMessage({
        defaultMessage: 'Recommended prep strategy',
        description: 'Label for recommended prep study list',
        id: 'k+qWwN',
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
    },
    {
      items: studyLists.focusAreas,
      key: 'focus-area',
      label: intl.formatMessage({
        defaultMessage: 'Focus areas',
        description: 'Label for focus areas study list',
        id: 'l714HN',
      }),
    },
    {
      items: studyLists.companies,
      key: 'company',
      label: intl.formatMessage({
        defaultMessage: 'Company guides',
        description: 'Label for company study list',
        id: 'Ekf7hb',
      }),
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
  items: ReadonlyArray<StudyListItemType>;
  key: string;
  label: string;
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
  return (
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
        onChangeStudyList={onChangeStudyList}
      />
    </DropdownMenu>
  );
}
