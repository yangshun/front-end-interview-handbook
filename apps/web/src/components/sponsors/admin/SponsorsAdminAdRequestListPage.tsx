'use client';

import type { SponsorsAdRequestStatus } from '@prisma/client';
import { capitalize } from 'lodash-es';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

import Anchor from '~/components/ui/Anchor';
import type { BadgeVariant } from '~/components/ui/Badge';
import Badge from '~/components/ui/Badge';
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
import { themeBackgroundLayerEmphasized } from '~/components/ui/theme';

import SponsorsAdminAdRequestListFilters from './filters/SponsorsAdminAdRequestListFilters';
import useSponsorsAdminAdRequestFilters from './hooks/useSponsorsAdminAdRequestFilters';

const ITEMS_PER_PAGE = 20;

const StatusBadgeVariant: Record<SponsorsAdRequestStatus, BadgeVariant> = {
  APPROVED: 'info',
  PENDING: 'warning',
  PUBLISHED: 'success',
  REJECTED: 'danger',
};

const formatter = new Intl.DateTimeFormat(undefined, {
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  month: 'short',
  year: 'numeric',
});

export default function SponsorsAdminAdRequestListPage() {
  // Pagination
  const { currentPage, setCurrentPage } = usePagination({
    deps: [],
    itemsPerPage: ITEMS_PER_PAGE,
    page: 1,
  });
  const {
    isAscendingOrder,
    onChangeQuery,
    query,
    selectedStatus,
    setIsAscendingOrder,
    setSortField,
    sortField,
    statusFilterOptions,
  } = useSponsorsAdminAdRequestFilters();
  const { data: { requests, totalCount } = {}, isLoading } =
    trpc.sponsors.adRequests.useQuery(
      {
        filter: {
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
      <Heading level="heading3">Advertisement Requests</Heading>
      <div className="flex flex-col gap-5">
        <SponsorsAdminAdRequestListFilters
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
              <TableHead>
                <Text size="body2">Name</Text>
              </TableHead>
              <TableHead>
                <Text size="body2">Role</Text>
              </TableHead>
              <TableHead>
                <Text size="body2">Company</Text>
              </TableHead>
              <TableHead className="w-[120px]">
                <Text size="body2">Status</Text>
              </TableHead>
              <TableHead>
                <Text size="body2">Created</Text>
              </TableHead>
              <TableHead className="w-[120px]">
                <span className="sr-only">Action</span>
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
            ) : requests?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex h-[150px] items-center justify-center">
                    <Text color="secondary" size="body2">
                      No requests found
                    </Text>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              requests?.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">
                    <Text size="body2">{request.signatoryName}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size="body2">{request.signatoryTitle}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size="body2">{request.legalName}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge
                      label={capitalize(request.status)}
                      size="sm"
                      variant={StatusBadgeVariant[request.status]}
                    />
                  </TableCell>
                  <TableCell>
                    <Text size="body2">
                      {formatter.format(request.createdAt)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Anchor href={`/admin/sponsorships/request/${request.id}`}>
                      View
                    </Anchor>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {(totalCount ?? 0) > 0 && (
          <div className="flex items-center justify-between gap-2">
            <Text size="body2">
              Showing {requests?.length ?? 0} of {totalCount ?? 0} requests
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
