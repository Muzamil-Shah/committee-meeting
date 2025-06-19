import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import Empty from "./empty";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ListFilter, Search } from "lucide-react";
import { DatePickerWithRange } from "./date-pickup-range";
import { columnsKeyValue } from "../view/loans/fna/data";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  showFilters?: boolean;
  rowSelection?: Record<string, boolean>; // Optional for row selection
  setRowSelection?: OnChangeFn<RowSelectionState>;
  // setRowSelection?: (
  //   updater: (old: Record<string, boolean>) => Record<string, boolean>
  // ) => void; // Function to set row selection
}

export function TableView<TData>({
  columns,
  data,
  showFilters,
  rowSelection = {}, // Default empty object if undefined
  setRowSelection,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    enableMultiRowSelection: true,
   
    globalFilterFn: (row, columnId, filterValue) => {
      const rowValue = row.getValue(columnId);
      return String(rowValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    },
  });

  return (
    <div className="w-full h-full space-y-3">
      {showFilters && (
        <div className="w-full flex flex-col md:flex-row justify-between h-[75px] md:h-[50px] items-center  ">
          <div className="relative w-full md:w-[30%]">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            >
              <Search
                className="h-4 w-4 text-secondary-foreground"
                aria-hidden="true"
              />

              <span className="sr-only">Search</span>
            </Button>
            <Input
              placeholder={"Search"}
              type={"text"}
              value={globalFilter}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className=" pl-9 
                            disabled:opacity-100 h-8 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800  placeholder:text-slate-900 placeholder:font-thin"
            />
          </div>
          <div className="w-full md:w-[50%] flex justify-end items-center gap-2">
            <DatePickerWithRange className="w-[70%]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size={"sm"}
                  variant="outline"
                  className="ml-auto w-[30%]"
                >
                  Filter <ListFilter className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  ?.getAllColumns()
                  ?.filter((column) => column.getCanHide())
                  ?.map((column, i) => (
                    <DropdownMenuCheckboxItem
                      key={i}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnsKeyValue[column.id]}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      <div className="w-full  rounded-xl shadow bg-background  overflow-hidden">
        {table.getRowModel()?.rows?.length > 0 ? (
          <Table className="w-full border-none ">
            <TableHeader>
              {table.getHeaderGroups()?.map((headerGroup, i) => (
                <TableRow className="bg-secondary" key={i}>
                  {headerGroup.headers.map((header, i) => (
                    <TableHead
                      className="text-muted-foreground h-8 md:h-auto"
                      key={i}
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
            <TableBody className="w-full h-full ">
              {table.getRowModel().rows.map((row, i) => (
                <TableRow
                  className="h-8"
                  key={i}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <TableCell key={i} className="py-[3px] text-start">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Empty />
            <p className="font-semibold text-lg text-zinc-500 mb-5">
              No results.
            </p>
          </div>
        )}
      </div>

      {table.getRowModel().rows?.length > 0 ? (
        <div className="flex items-center justify-between space-x-2 py-4 px-4 h-[40px]">
          <div className="flex justify-start items-center gap-1 text-sm text-muted-foreground">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
          {/* <div className="flex-1 text-sm text-muted-foreground">
            Total Record&nbsp; <span className="font-bold">{table.getFilteredRowModel().rows.length}</span>
          </div> */}

          <div className="flex items-center space-x-2 w-100 overflow-x-auto whitespace-nowrap">
            <span className="text-sm">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>

            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              First
            </Button> */}

            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last
            </Button> */}

            {/* <span className="text-sm">
              Go to page:
              <input
                type="text"
                min={1}
                maxLength={table.getPageCount()}
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = Math.min(Math.max(1, Number(e.target.value)), table.getPageCount()) - 1;
                  table.setPageIndex(page);
                }}
                onBlur={(e) => {
                  const value = Number(e.target.value);
                  if (value < 1 || value > table.getPageCount() || isNaN(value)) {
                    e.target.value = String(table.getState().pagination.pageIndex + 1);
                  }
                }}
                className="ml-2 w-8 border rounded px-2 py-1 text-center dark:bg-black"
              />
            </span>

              <ShadTooltip content="Select Show Data">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="ml-4 border rounded px-2 py-1 dark:bg-black"
            >
              {[5, 10, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            </ShadTooltip> */}
          </div>
          {/* <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
