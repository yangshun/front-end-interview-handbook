import { useState } from 'react';

import Pagination from './index';
import Divider from '../Divider';
import UIExamplesGroup from '../misc/UIExamplesGroup';

export default function PaginationExamples() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <UIExamplesGroup darkMode="horizontal" gapSize="lg" title="Pagination">
      <div className="flex flex-col flex-wrap gap-y-6">
        <Pagination
          count={10}
          page={currentPage}
          onPageChange={setCurrentPage}
        />
        <Divider />
        <Pagination count={2} page={1} />
        <Pagination count={3} page={1} />
        <Pagination count={10} page={1} />
        <Pagination count={10} page={5} />
        <Pagination count={10} page={9} />
      </div>
    </UIExamplesGroup>
  );
}
