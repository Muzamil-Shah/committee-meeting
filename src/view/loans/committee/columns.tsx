import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../../../components/ui/button"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { CommitteeData, CommitteeMember} from "./type";
import { DocumentFileShap } from "../../../types/Data";




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

  export const committeeColumns: ColumnDef<CommitteeData>[] = [
    {
      accessorKey: "committeeName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Committee Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("committeeName")}</div>,
    },
    {
      accessorKey: "committeeType",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Committee Type
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("committeeType")}</div>,
    },
    {
      accessorKey: "subject",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subject
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("subject")}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="max-w-xs truncate" title={row.getValue("description")}>
          {row.getValue("description")}
        </div>
      ),
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("startDate"));
        return <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>;
      },
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("endDate"));
        return <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>;
      },
    },
    {
      accessorKey: "quorumCheck",
      header: "Quorum Check",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("quorumCheck") ? "Yes" : "No"}
        </div>
      ),
    },
    {
      accessorKey: "agendaApproval",
      header: "Agenda Approval",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("agendaApproval") ? "Required" : "Not Required"}
        </div>
      ),
    },
    {
      accessorKey: "momRequiredApproval",
      header: "MoM Approval",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("momRequiredApproval") ? "Required" : "Not Required"}
        </div>
      ),
    },
    {
      accessorKey: "attachments",
      header: "Attachments",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {(row.getValue("attachments") as DocumentFileShap[])?.map((file, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
              {file.documentName}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "composition",
      header: "Composition",
      cell: ({ row }) => (
        <div className="space-y-1">
          {(row.getValue("composition") as CommitteeMember[])?.map((member, index) => (
            <div key={index} className="text-sm">
              <strong>{member.role}:</strong> {member.user} ({member.emailId})
            </div>
          ))}
        </div>
      ),
    },
    
  ];