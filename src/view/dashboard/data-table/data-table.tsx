import {
  ColumnDef,
} from "@tanstack/react-table";

import { TableView } from "../../../components/table-view";

interface DataTableProps<TData> {
  columns:ColumnDef<TData>[];
  data: TData[];
  showFilter: boolean;
}

export function DataTable<TData>({
  columns,
  data,
  showFilter= true
}: DataTableProps<TData>) {
  

  return (
    <div className="w-full h-full rounded-md border-none">
      <TableView data={data} columns={columns} showFilters={showFilter} />
    </div>
  );
}
