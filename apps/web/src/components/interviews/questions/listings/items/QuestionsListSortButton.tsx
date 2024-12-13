import { RiSortDesc } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import DropdownMenu from '~/components/ui/DropdownMenu';
import FilterButton from '~/components/ui/FilterButton/FilterButton';

import useQuestionCodingSorting from '../filters/hooks/useQuestionCodingSorting';
import type { QuestionListTypeData } from '../../common/QuestionHrefUtils';
import type { QuestionSortField } from '../../common/QuestionsTypes';

type Props = Readonly<{
  isLabelHidden?: boolean;
  listType?: QuestionListTypeData;
}>;

export default function QuestionsListSortButton({
  listType,
  isLabelHidden,
}: Props) {
  const intl = useIntl();
  const { isAscendingOrder, setIsAscendingOrder, sortField, setSortField } =
    useQuestionCodingSorting({ listType });

  function makeDropdownItemProps(
    label: string,
    itemField: QuestionSortField,
    isItemAscendingOrder: boolean,
  ) {
    return {
      isSelected:
        sortField === itemField && isAscendingOrder === isItemAscendingOrder,
      label,
      onClick: () => {
        setSortField(itemField), setIsAscendingOrder(isItemAscendingOrder);
      },
    };
  }

  const isActive = sortField !== 'default';

  return (
    <DropdownMenu
      align="end"
      icon={RiSortDesc}
      showChevron={true}
      size="sm"
      trigger={
        <FilterButton
          icon={RiSortDesc}
          isLabelHidden={isLabelHidden}
          label={intl.formatMessage({
            defaultMessage: 'Sort by',
            description: 'Label for sorting button',
            id: 'vegaR1',
          })}
          selected={isActive}
          size="sm"
          tooltip={
            isLabelHidden
              ? intl.formatMessage({
                  defaultMessage: 'Sort by',
                  description: 'Label for sorting button',
                  id: 'vegaR1',
                })
              : undefined
          }
        />
      }>
      {[
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Default',
            description: 'Default sorting',
            id: 'vcnpme',
          }),
          'default',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Title: A to Z',
            description:
              'Sorting option for question list - sort titles from A to Z',
            id: 'tsVEh8',
          }),
          'title',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Title: Z to A',
            description:
              'Sorting option for question list - sort titles from Z to A',
            id: 'jblvez',
          }),
          'title',
          false,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Difficulty: Easy to Hard',
            description:
              'Sorting option for question list - sort by difficulty from easy to hard',
            id: 'oNMAi3',
          }),
          'difficulty',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Difficulty: Hard to Easy',
            description:
              'Sorting option for question list - sort by difficulty from hard to easy',
            id: 'tDJ0XN',
          }),
          'difficulty',
          false,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Importance: High to Low',
            description:
              'Sorting option for question list - sort by importance from high to low',
            id: 'Tt86gs',
          }),
          'importance',
          false,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Importance: Low to High',
            description:
              'Sorting option for question list - sort by importance from low to high',
            id: 'MYNtBs',
          }),
          'importance',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Duration: Low to High',
            description:
              'Sorting option for question list - sort by duration from low to high',
            id: 'JJ0V4Y',
          }),
          'duration',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Duration: High to Low',
            description:
              'Sorting option for question list - sort by duration from high to low',
            id: 'KjD2cI',
          }),
          'duration',
          false,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Created: Newest to Oldest',
            description:
              'Sorting option on question list page to sort by creation time, from newest to oldest',
            id: 'A+qESm',
          }),
          'created',
          true,
        ),
        makeDropdownItemProps(
          intl.formatMessage({
            defaultMessage: 'Created: Oldest to Newest',
            description:
              'Sorting option on question list page to sort by creation time, from oldest to newest',
            id: 'HEQbsp',
          }),
          'created',
          false,
        ),
      ]
        .flatMap((item) => (item ? [item] : []))
        .map((props) => (
          <DropdownMenu.Item key={props.label} {...props} />
        ))}
    </DropdownMenu>
  );
}
