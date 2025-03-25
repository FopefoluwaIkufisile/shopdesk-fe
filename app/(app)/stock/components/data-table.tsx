'use client';

import * as React from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import Sidebar from '@/components/functional/sidebar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedRow, setSelectedRow] = React.useState<TData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleRowClick = (row: TData) => {
    setSelectedRow(row);
    setIsSidebarOpen(true);
  };

  return (
    <div className='flex space-x-4 w-full h-full'>
      {/* Main table container */}
      <div className='flex-1 flex flex-col space-y-4 border border-gray-200 rounded-lg overflow-hidden'>
        <div className='p-4 border-b'>
          <DataTableToolbar table={table} />
        </div>
        
        {/* Table wrapper with scroll */}
        <div className='flex-1 overflow-auto p-2'>
          <Table className='w-full border-collapse'>
            <TableHeader className='bg-gray-50'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className='px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-r border-gray-200 last:border-r-0'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => handleRowClick(row.original)}
                    className='hover:bg-gray-50 cursor-pointer'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell 
                        key={cell.id} 
                        className='px-4 py-3 text-sm text-gray-800 border-b border-r border-gray-200 last:border-r-0'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center text-gray-500 border-b border-gray-200'
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className='sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3'>
          <DataTablePagination table={table} />
        </div>
      </div>
      
      {/* Sidebar */}
      {isSidebarOpen && selectedRow && (
        <Sidebar selectedItem={selectedRow} onClose={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}