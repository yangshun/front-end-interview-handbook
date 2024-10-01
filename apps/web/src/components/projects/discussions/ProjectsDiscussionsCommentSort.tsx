import { RiSortDesc } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import type { ProjectsDiscussionsCommentSortField } from '~/components/projects/discussions/types';
import DropdownMenu from '~/components/ui/DropdownMenu';

type Props = Readonly<{
  isAscendingOrder: boolean;
  setIsAscendingOrder: (value: boolean) => void;
  setSortField: (value: ProjectsDiscussionsCommentSortField) => void;
  sortField: ProjectsDiscussionsCommentSortField | null;
}>;

export default function ProjectsDiscussionsCommentSort({
  sortField,
  isAscendingOrder,
  setSortField,
  setIsAscendingOrder,
}: Props) {
  const intl = useIntl();

  function makeDropdownItemProps(
    label: string,
    itemField: ProjectsDiscussionsCommentSortField,
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

  return (
    <div>
      <DropdownMenu
        align="end"
        icon={RiSortDesc}
        label={intl.formatMessage({
          defaultMessage: 'Sort by',
          description:
            'Label for sort button for projects discussion post list',
          id: 'NjnYqU',
        })}
        size="md">
        {[
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Popularity: Most to least upvotes',
              description:
                'Sorting option for discussions comment - popularity',
              id: 'ooGnHf',
            }),
            'votes',
            false,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Popularity: Least to most upvotes',
              description:
                'Sorting option for discussions comment - popularity',
              id: 'L33SIl',
            }),
            'votes',
            true,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Created: Newest to oldest',
              description:
                'Sorting option for discussions comment - sort by created',
              id: '87c2KI',
            }),
            'createdAt',
            false,
          ),
          makeDropdownItemProps(
            intl.formatMessage({
              defaultMessage: 'Created: Oldest to newest',
              description:
                'Sorting option for discussions comment - sort by created',
              id: 'G3byny',
            }),
            'createdAt',
            true,
          ),
        ].map((props) => (
          <DropdownMenu.Item key={props.label} {...props} />
        ))}
      </DropdownMenu>
    </div>
  );
}
