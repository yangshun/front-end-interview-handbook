'use client';

import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import usePagination from '~/hooks/usePagination';

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
import TextInput from '~/components/ui/TextInput';
import { themeBackgroundLayerEmphasized } from '~/components/ui/theme';

const ITEMS_PER_PAGE = 20;

export default function SponsorsAdminInquiryListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = trpc.sponsors.adRequestInquiries.useQuery();

  const filteredItems = data?.filter((inquiry) =>
    inquiry.emails.join(', ').toLowerCase().includes(searchQuery.toLowerCase()),
  );
  // Pagination
  const { setCurrentPage, currentPage, totalPages, currentPageItems } =
    usePagination({
      deps: [searchQuery],
      itemsPerPage: ITEMS_PER_PAGE,
      page: 1,
      totalList: filteredItems ?? [],
    });
  const totalCount = data?.length;

  return (
    <div className="relative flex flex-col gap-6">
      <Heading level="heading3">Advertisement Enquiries</Heading>
      <div className="flex flex-col gap-5">
        <TextInput
          isLabelHidden={true}
          label="Search"
          placeholder="Search by email"
          startIcon={RiSearchLine}
          type="text"
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
          }}
        />
        <Table>
          <TableHeader>
            <TableRow className={themeBackgroundLayerEmphasized}>
              <TableHead>
                <Text size="body2">Email</Text>
              </TableHead>
              <TableHead className="w-40">
                <Text size="body2">Created at</Text>
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
            ) : currentPageItems?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex h-[150px] items-center justify-center">
                    <Text color="secondary" size="body2">
                      No request found!
                    </Text>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentPageItems?.map((inquiry) => (
                <TableRow key={inquiry.time.toString()}>
                  <TableCell className="font-medium">
                    <Text size="body2">{inquiry.emails.join(', ')}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size="body2">{inquiry.time.toDateString()}</Text>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {(totalCount ?? 0) > 0 && (
          <div className="flex items-center justify-between gap-2">
            <Text size="body2">
              Showing {currentPageItems.length} of {totalCount ?? 0} enquiries
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
