import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../../components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { BuildterDataI, NFAItem, TopBuildterDataI } from "./type"



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

export const columns: ColumnDef<BuildterDataI>[] = [
  
   
    {
        accessorKey: "builderName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Builder Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("builderName")}</div>,
    },
    {
      accessorKey: "numberOfProjects",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  Number Of Projects
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.getValue("numberOfProjects")}</div>,
  },
    
    
  
    
    
]
export const topBuilderss: ColumnDef<TopBuildterDataI>[] = [
   
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
        )
    },
    cell: ({ row }) => <div>{row.getValue("sNo")}</div>,
},
    {
        accessorKey: "builderName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Builder Name
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("builderName")}</div>,
    },
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
          )
      },
      cell: ({ row }) => <div>{row.getValue("projectName")}</div>,
  },
  {
    accessorKey: "numberOfVendors",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Total Number Of Vendors
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => <div>{row.getValue("numberOfVendors")}</div>,
},
  {
    accessorKey: "numberOfInvoices",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Total Number Of Invoice
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => <div>{row.getValue("numberOfInvoices")}</div>,
},
  {
    accessorKey: "numberOfInvoicesInProcess",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Total Invoice In Process
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => <div>{row.getValue("numberOfInvoicesInProcess")}</div>,
},
  {
    accessorKey: "numberOfInvoicesProcessed",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Total Invoices Processed
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => <div>{row.getValue("numberOfInvoicesProcessed")}</div>,
},
  {
    accessorKey: "numberOfInvoicesInException",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Total Invoices In Exception
                <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
        )
    },
    cell: ({ row }) => <div>{row.getValue("numberOfInvoicesInException")}</div>,
},
    
]


export const nfaColumns: ColumnDef<NFAItem>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title of NFA
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "draftNFANo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            NFA No.
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("draftNFANo")}</div>,
    },
    {
      accessorKey: "dateAndTime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date & Time
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("dateAndTime"));
        return <div>{date.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: "typeOfNFA",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Type of NFA
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("typeOfNFA")}</div>,
    },
    {
      accessorKey: "nfaValueExclGST",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            NFA Value (Excl. GST)
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("nfaValueExclGST"));
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount);
        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "nfaValueInclGST",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            NFA Value (Incl. GST)
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("nfaValueInclGST"));
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount);
        return <div>{formatted}</div>;
      },
    },
    {
      accessorKey: "department",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Department
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("department")}</div>,
    },
    {
      accessorKey: "importance",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Importance
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const importance = row.getValue("importance") as string;
        return (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              importance === "High"
                ? "bg-red-100 text-red-800"
                : importance === "Medium"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {importance}
          </div>
        );
      },
    },
    {
      accessorKey: "natureOfNFA",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nature of NFA
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("natureOfNFA")}</div>,
    },
  ];