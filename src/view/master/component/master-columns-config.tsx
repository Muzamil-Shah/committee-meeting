import {
    ColumnDef,
} from "@tanstack/react-table"
import { CaretSortIcon } from "@radix-ui/react-icons"
import {  Category, FolderI, HsnSacCode, PaymentTermsDataType, Role,  User,   } from "../../../types/Data"
import { Button } from "../../../components/ui/button"
import { formatIndianCurrency } from "../../../lib/utils"
import { status } from "../../../lib/constants"
import { format } from "date-fns"



export const PaymentTermsColumns: ColumnDef<PaymentTermsDataType>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payment Terms
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    
]

export const CategoryHeaderColumns: { key: string; header: string }[] = [
    {
        key: "categoryName",
        header: "Department",
      },
      {
        key: "createdOn",
        header: "Created Date",
      },
      {
        key: "modifiedBy",
        header: "Last Updated By",
      },
      {
        key: "modifiedOn",
        header: "Last Updated Date",
      },
]
export const CategoryColumns: ColumnDef<Category>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "categoryName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("categoryName")}</div>,
    },
    {
        accessorKey: "department",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Department
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("department")}</div>,
    },
    
]
export const RoleColumns: ColumnDef<Role>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("role")}</div>,
    },
    
]
export const FolderColumns: ColumnDef<FolderI>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "allowedExtension",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Allowed Extension
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("allowedExtension")}</div>,
    },
    {
        accessorKey: "directoryPath",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Directory Path
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("directoryPath")}</div>,
    },
    {
        accessorKey: "docType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Document Type
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("docType")}</div>,
    },
    {
        accessorKey: "projectId",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Project Reference
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("projectId")}</div>,
    },
    
]

export const HsnSacCodeColums: ColumnDef<HsnSacCode>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-0 h-4 w-1" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "typeOfCode",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type Of Code
                    <CaretSortIcon className=" ml-0 h-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("typeOfCode")}</div>,
    },
    {
        accessorKey: "code",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    HSN / SAC 
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("code")}</div>,
    },
    {
        accessorKey: "mainHeading",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Main Heading
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("mainHeading")}</div>,
    },
    {
        accessorKey: "subHeading",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sub Heading
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("subHeading")}</div>,
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    
]

export const columnsProjectMDM: ColumnDef<any>[] = [
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
      );
    },
    cell: ({ row }) => <div>{row.getValue("builderName")}</div>,
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

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const statusRow = row.original.status;
      let statusColor = "";
      switch (statusRow) {
        case status?.rejected:
          statusColor =
            "text-red-700 bg-red-300 dark:bg-red-700 dark:text-red-300";
          break;
        case status?.pending:
          statusColor =
            "text-orange-700 bg-orange-300 dark:text-orange-300 dark:bg-orange-700";
          break;
        case status?.new:
          statusColor =
            "text-slate-700 bg-slate-300 dark:text-slate-300 dark:bg-slate-700";
          break;
        case status?.approved:
          statusColor =
            "text-green-700 bg-green-300 dark:bg-green-700 dark:text-green-300";
          break;

        case status?.queryRaised:
          statusColor =
            "text-indigo-500 bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-300";
          break;
        case status?.acknowledged:
          statusColor =
            "text-cyan-700 bg-cyan-300 dark:text-cyan-300 dark:bg-cyan-700";
          break;
        default:
          statusColor =
            "text-orange-500 bg-orange-100 dark:text-orange-300 dark:bg-orange-900";
      }

      const labelChanger = {
        "TPT Approval Pending": "TPT Approval Pending with Legal",
      } as Record<string, string>;
      return (
        <div
          className={`capitalize text-[12px]  rounded-sm w-fit   px-2 ${statusColor}`}
        >
          {labelChanger[statusRow] ? labelChanger[statusRow] : statusRow}
        </div>
      );
    },
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{ row.original.createdOn ? format(row.original.createdOn, "dd-MM-yyyy p") : row.original.createdOn}</div>
    ),
  },
];

export const columnsBuilderMdm: ColumnDef<any>[] = [
  
   
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
          )
      },
      cell: ({ row }) => <div>{row.getValue("loanAmountSanctioned")}</div>,
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
          )
      },
      cell: ({ row }) => <div>{row.getValue("loanAmountUtilized")}</div>,
  },
    
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const statusRow = row.original.status;
      let statusColor = "";
      switch (statusRow) {
        case status?.rejected:
          statusColor = "text-red-700 bg-red-300 dark:bg-red-700 dark:text-red-300";
          break;
        case status?.pending:
          statusColor = "text-orange-700 bg-orange-300 dark:text-orange-300 dark:bg-orange-700";
          break;
        case status?.new:
          statusColor = "text-slate-700 bg-slate-300 dark:text-slate-300 dark:bg-slate-700";
          break;
        case status?.approved:
          statusColor = "text-green-700 bg-green-300 dark:bg-green-700 dark:text-green-300";
          break;
       
        case status?.queryRaised:
          statusColor = "text-indigo-500 bg-indigo-100 dark:bg-indigo-700 dark:text-indigo-300";
          break;
        case status?.acknowledged:
          statusColor = "text-cyan-700 bg-cyan-300 dark:text-cyan-300 dark:bg-cyan-700";
          break;
        default:
          statusColor = "text-orange-500 bg-orange-100 dark:text-orange-300 dark:bg-orange-900";
      }

      const labelChanger = {
        "TPT Approval Pending": "TPT Approval Pending with Legal"
      } as Record<string, string>
      return (
        <div
          className={`capitalize text-[12px]  rounded-sm w-fit   px-2 ${statusColor}`}
        >
          {labelChanger[statusRow] ? labelChanger[statusRow] : statusRow }
        </div>
      );
    },
  },
    {
      accessorKey: "createdOn",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  Created Date
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{ row.original.createdOn ? format(row.original.createdOn, "dd-MM-yyyy p") : row.original.createdOn}</div>,
  },
   
  
    
    
    
]
export const UserColumns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("username")}</div>,
    },
    {
        accessorKey: "firstname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Firstname
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("firstname")}</div>,
    },
    {
        accessorKey: "lastname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Lastname
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("lastname")}</div>,
    },
    {
        accessorKey: "department",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Department
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("department")}</div>,
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("role")}</div>,
    },
    
]
export const TypeOfEntityColumns: ColumnDef<PaymentTermsDataType>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type Of Entity
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    
]
export const UOMColumns: ColumnDef<PaymentTermsDataType>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    UOM
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    
]
export const TypeOfVendorColumns: ColumnDef<PaymentTermsDataType>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type Of Vendor
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    
]
export const DepartmentColumns: ColumnDef<PaymentTermsDataType>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "departmentName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Department
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("departmentName")}</div>,
    },
    // {
    //     accessorKey: "hod",
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 className="px-0"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 HOD
    //                 <CaretSortIcon className="ml-2 h-4 w-4" />
    //             </Button>
    //         )
    //     },
    //     cell: ({ row }) => <div>{row.getValue("hod")}</div>,
    // },
    
]
export const CompanyColumns: ColumnDef<PaymentTermsDataType>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    
]
export const CurrencyColumns: ColumnDef<PaymentTermsDataType>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Currency
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    
]
export const GoodsAndServicesColumns: ColumnDef<PaymentTermsDataType>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
          return (
              <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                  S.No.
                  <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
          )
      },
      cell: ({ row }) => <div>{row.index + 1}</div>,
  },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Goods And Services
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    
]









