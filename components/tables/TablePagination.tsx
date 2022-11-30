import { Table } from '@tanstack/react-table';
import React from 'react';
import { PaginationContainer } from './TableStyles';

interface TablePaginationProps<T> {
  table: Table<T>;
}

export const TablePagination = <T,>({ table }: TablePaginationProps<T>): JSX.Element => (
  <PaginationContainer>
    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
      {'<'}
    </button>
    <div>
      <div>Page</div>
      <strong>
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </strong>
    </div>
    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
      {'>'}
    </button>
  </PaginationContainer>
);
