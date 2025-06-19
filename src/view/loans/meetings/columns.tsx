import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "../../../components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { BuilderDetailsOfProjectDataI, IMeeting, InvoiceI } from "./type";
import { formatIndianCurrency } from "../../../lib/utils";
import { format } from "date-fns";
import { Calendar } from "lucide-react";

export const columnsHeaderAllRequests: { key: string; header: string }[] = [
  {
    key: "workitemNumber",
    header: "Workitem Number",
  },
  {
    key: "typeOfRequest",
    header: "Request Type",
  },
  {
    key: "status",
    header: "Status",
  },
  {
    key: "requestorName",
    header: "Requester Name",
  },
  {
    key: "createdOn",
    header: "Created Date",
  },
  {
    key: "departmentName",
    header: "Department",
  },
  {
    key: "category",
    header: "Category",
  },
  {
    key: "subCategory",
    header: "Sub - Category",
  },

  {
    key: "pendingOn",
    header: "Assigned to",
  },
  {
    key: "modifiedBy",
    header: "Last Updated By",
  },
  {
    key: "modifiedOn",
    header: "Last Updated Date",
  },
];

export const columns: ColumnDef<IMeeting>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("subject")}</div>,
  },

  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  // {
  //   accessorKey: "start_date",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Start Date
  //         <CaretSortIcon className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const date = row.getValue("start_date") as Date | null;
  //     return <div>{date ? format(date, "dd-MMM-yyyy") : "-"}</div>;
  //   },
  // },
  // {
  //   accessorKey: "end_date",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         End Date
  //         <CaretSortIcon className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const date = row.getValue("end_date") as Date | null;
  //     return <div>{date ? format(date, "d-MMM-yyyy") : "-"}</div>;
  //   },
  // },
    {
    accessorKey: "timeSchedule",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Meeting Schedule
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("timeSchedule") as {
        start_date: Date | null;
    end_date: Date | null;
      }[];
      return <div className="flex flex-col justify-center items-center gap-1">{date && date?.map((item:{
        start_date: Date | null;
    end_date: Date | null;
      }) => <span className={buttonVariants({variant:'outline'})}><Calendar className="mr-1" />{item.start_date ? format(item.start_date, "dd-MM-yyyy p"): "-"} - {item.end_date ? format(item.end_date, "dd-MM-yyyy p") : "-"}</span>)}</div>;
    },
  },
];

export const projectColnumDetails: ColumnDef<BuilderDetailsOfProjectDataI>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("projectName")}</div>,
  },

  {
    accessorKey: "loanAmountSanctioned",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loan Amount Sanctioned
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{formatIndianCurrency(row.getValue("loanAmountSanctioned"))}</div>
    ),
  },
  {
    accessorKey: "loanAmountUtilized",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Loan Amount Utilized
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{formatIndianCurrency(row.getValue("loanAmountUtilized"))}</div>
    ),
  },
];

export const invoiceColumns: ColumnDef<InvoiceI>[] = [
  {
    accessorKey: "sNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          S/No
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("sNo")}</div>,
  },
  {
    accessorKey: "vendorName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Vendor Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("vendorName")}</div>,
  },

  {
    accessorKey: "invoiceNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice Ref No
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("invoiceNo")}</div>,
  },
  {
    accessorKey: "invoiceDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Invoice Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.invoiceDate}</div>,
  },
  {
    accessorKey: "totalInvoiceAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Invoice Amount
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.totalInvoiceAmount}</div>,
  },
];
