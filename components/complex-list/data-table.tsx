"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import ContentLoading from "@/components/complex-list/content-loading";
import PaginationButtons from "@/components/complex-list/pagination-buttons";
import { Complex } from "@/components/complex-list/types/complex";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransition } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | [];
  currentPage: number;
  totalPages: number;
}

export function DataTable<TData extends Complex, TValue>({
  columns,
  data,
  totalPages,
  currentPage,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    pageCount: totalPages,
    // rowCount: data.length,
    state: {
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: 10,
      },
    },
    manualSorting: true,
    manualPagination: true,
  });

  const [isPending, startTransition] = useTransition();

  function handleRowClick(row: TData) {
    console.log(row.id);
  }

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table className="w-full table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {!isPending ? (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      className="cursor-pointer"
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => handleRowClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center  cursor-pointer"
                  >
                    ЖК не найдены.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          ) : (
            <ContentLoading lastRows={data.length} columns={columns.length} />
          )}
        </Table>
      </div>
      <PaginationButtons table={table} startTransition={startTransition} />
    </div>
  );
}
