'use client';

import { RiMoreLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

import Button from '~/components/ui/Button';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Heading from '~/components/ui/Heading';
import Pagination from '~/components/ui/Pagination';
import Spinner from '~/components/ui/Spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/Table';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeTextSuccessColor,
  themeTextWarningColor,
} from '~/components/ui/theme';

import SponsorsAdminFeedbacksListFilters from './filters/SponsorsAdminFeedbackListFilters';
import useSponsorsAdminFeedbackListFilters from './hooks/useSponsorsAdminFeedbackListFilters';

const ITEMS_PER_PAGE = 20;

export default function SponsorsAdminMessagesListPage() {
  const trpcUtils = trpc.useUtils();
  const markFeedbackStatusMutation =
    trpc.feedback.markFeedbackStatus.useMutation();
  // Pagination
  const { setCurrentPage, currentPage } = usePagination({
    deps: [],
    itemsPerPage: ITEMS_PER_PAGE,
    page: 1,
  });
  const {
    query,
    onChangeQuery,
    statusFilterOptions,
    selectedStatus,
    setSortField,
    sortField,
    isAscendingOrder,
    setIsAscendingOrder,
  } = useSponsorsAdminFeedbackListFilters();
  const { data: { feedbacks, totalCount } = {}, isLoading } =
    trpc.feedback.getFeedbacks.useQuery(
      {
        filter: {
          category: 'SPONSORSHIP',
          query,
          status: Array.from(selectedStatus),
        },
        pagination: {
          limit: ITEMS_PER_PAGE,
          page: currentPage,
        },
        sort: { field: sortField, isAscendingOrder },
      },
      {
        keepPreviousData: true,
      },
    );

  const totalPages = Math.ceil((totalCount ?? 0) / ITEMS_PER_PAGE);

  return (
    <div className="relative flex flex-col gap-6">
      <Heading level="heading3">Contact Form Messages</Heading>
      <div className="flex flex-col gap-5">
        <SponsorsAdminFeedbacksListFilters
          isAscendingOrder={isAscendingOrder}
          query={query}
          selectedStatus={selectedStatus}
          setIsAscendingOrder={setIsAscendingOrder}
          setQuery={onChangeQuery}
          setSortField={setSortField}
          sortField={sortField}
          statusFilterOptions={statusFilterOptions}
        />
        <Table>
          <TableHeader>
            <TableRow className={themeBackgroundLayerEmphasized}>
              <TableHead className="w-42">
                <Text size="body2">Email</Text>
              </TableHead>
              <TableHead>
                <Text size="body2">Message</Text>
              </TableHead>
              <TableHead className="w-30">
                <Text size="body2">Status</Text>
              </TableHead>
              <TableHead className="w-40">
                <Text size="body2">Created at</Text>
              </TableHead>
              <TableHead className="w-30">
                <span className="sr-only">Reply</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex h-[150px] items-center justify-center">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : feedbacks?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex h-[150px] items-center justify-center">
                    <Text color="secondary" size="body2">
                      No feedback found!
                    </Text>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              feedbacks?.map((feedback) => (
                <TableRow key={feedback.id}>
                  <TableCell className="font-medium">
                    <Text size="body2">{feedback.email}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size="body2">{feedback.message}</Text>
                  </TableCell>
                  <TableCell>
                    <Text
                      className={
                        feedback.resolved
                          ? themeTextSuccessColor
                          : themeTextWarningColor
                      }
                      color="inherit"
                      size="body2">
                      {feedback.resolved ? 'Resolved' : 'Unresolved'}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text size="body2">
                      {(feedback.createdAt ?? new Date()).toDateString()}
                    </Text>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu
                      align="end"
                      icon={RiMoreLine}
                      showChevron={true}
                      size="sm"
                      trigger={
                        <Button
                          icon={RiMoreLine}
                          isLabelHidden={true}
                          label="Action"
                          size="sm"
                          variant="tertiary"
                        />
                      }>
                      <DropdownMenu.Item
                        href={`mailto:${feedback.email}`}
                        label="Reply"
                      />
                      <DropdownMenu.Item
                        label={
                          feedback.resolved
                            ? 'Mark as unresolved'
                            : 'Mark as resolved'
                        }
                        onClick={async () => {
                          await markFeedbackStatusMutation.mutateAsync({
                            feedbackId: feedback.id,
                            resolved: feedback.resolved ? false : true,
                          });
                          trpcUtils.feedback.getFeedbacks.invalidate();
                        }}
                      />
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {(totalCount ?? 0) > 0 && (
          <div className="flex items-center justify-between gap-2">
            <Text size="body2">
              Showing {feedbacks?.length ?? 0} of {totalCount ?? 0} feedbacks
            </Text>
            {totalPages > 1 && (
              <Pagination
                count={totalPages}
                page={currentPage}
                onPageChange={(value) => {
                  setCurrentPage(value);
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
