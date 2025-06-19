import { useState } from "react";
import { z } from "zod";
import RequestPlatformView, {
  FieldData,
} from "../platform-design/request-platform-view";
import {  columnsHeaderAllRequests, committeeColumns } from "./columns";
import { GET_BUILDERS_DETAILS_LIST } from "../../../lib/endpoint";
import { useFormOpening } from "../../../contexts/FormOpening";
import { CommitteeData } from "./type";
import { DocumentFileSHapZod } from "../../../types/Data";
import { useCommittees } from "../../../contexts/committee-context";

const filterData = {
  validation: {
    search: z.string({
      message: "Only text is allowed. Please enter a valid string.",
    }),
  },
  initialValues: {
    search: "",
  },
  fields: [
    {
      name: "search" as const,
      label: "",
      placeholder: "Search scope, item description, vendor name",
      fieldType: "text",
      required: false,
      disabled: false,
    },
  ],
};

type FieldsFormData = CommitteeData

const initialCommitteeData: Omit<CommitteeData,"id"> = {
  committeeName: "",
  committeeType: "",
  subject: "",
  description: "",
  startDate: "",
  endDate: "", // 1 hour from now
  quorumCheck: false,
  agendaApproval: false,
  momRequiredApproval: false,
  attachments: [],
  composition: [
    {
      role: "",
      user: "",
      emailId: ""
    }
  ],
  quorum: [
    {
      role: "",
      count: 0
    }
  ]
};

const committeeMemberSchema = z.object({
  role: z.string().min(1, "Role is required"),
  user: z.string().min(1, "User name is required"),
  emailId: z.string().email("Invalid email format").min(1, "Email is required")
});



function Committee() {
  const { isFormOpening } = useFormOpening();

  const [filterFormData, setFilterFormData] = useState<
    Partial<{
      search: string;
    }>
  >({
    search: "",
  });

  const [fieldsFormData, setFieldsFormData] = useState<Partial<FieldsFormData>>(
    initialCommitteeData
  );

  const {committees} = useCommittees()

  const fieldData = {
    validation: {
      committeeName: z.string()
        .min(1, "Committee name is required")
        .max(100, "Committee name too long"),
        
      committeeType: z.string()
        .min(1, "Committee type is required")
        .max(50, "Committee type too long"),
        
      subject: z.string()
        .min(1, "Subject is required")
        .max(200, "Subject too long"),
        
      description: z.string()
        .min(1, "Description is required")
        .max(1000, "Description too long"),
        
        startDate: z.string({
          message: "Only text is allowed. Please enter a valid string.",
        }).or(z.undefined()).nullable(),
        
      endDate: z.string({
        message: "Only text is allowed. Please enter a valid string.",
      }).or(z.undefined()).nullable(),
        
      quorumCheck: z.boolean(),
      agendaApproval: z.boolean(),
      momRequiredApproval: z.boolean(),
        
      attachments: z.array(DocumentFileSHapZod,{message: 'Attachment is required!'}).nullable(),
        
      composition: z.array(committeeMemberSchema)
        .min(1, "At least one member required")
        .max(20, "Maximum 20 members allowed"),
       
        
    },
    initialValues: {...initialCommitteeData, composition: fieldsFormData?.composition || []},
    fields: [
      {
        name: "committeeName" as const,
        label: "Committee Name",
        placeholder: "Enter committee name",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "committeeType" as const,
        label: "Committee Type",
        placeholder: "Select committee type",
        fieldType: "combobox",
        options: [
          { value: "Advisory", label: "Advisory" },
          { value: "Governance", label: "Governance" },
          { value: "Internal", label: "Internal" },
          { value: "Executive", label: "Executive" },
          { value: "Other", label: "Other" },
        ],
        required: true,
        disabled: false,
      },
      {
        name: "subject" as const,
        label: "Subject",
        placeholder: "Enter meeting subject",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "description" as const,
        label: "Description",
        placeholder: "Enter detailed description",
        fieldType: "text-editor",
        required: true,
        disabled: false,
      },
      {
        name: "startDate" as const,
        label: "Start Date & Time",
        placeholder: "Select start date and time",
        fieldType: "date-with-year",
        required: true,
        disabled: false,
      },
      {
        name: "endDate" as const,
        label: "End Date & Time",
        placeholder: "Select end date and time",
        fieldType: "date-with-year",
        required: true,
        disabled: false,
      },
      {
        name: "quorumCheck" as const,
        label: "Requires Quorum Check",
        fieldType: "checkbox",
        required: false,
        disabled: false,
      },
      {
        name: "agendaApproval" as const,
        label: "Requires Agenda Approval",
        fieldType: "checkbox",
        required: false,
        disabled: false,
      },
      {
        name: "momRequiredApproval" as const,
        label: "Requires MoM Approval",
        fieldType: "checkbox",
        required: false,
        disabled: false,
      },
      {
        name: "attachments" as const,
        label: "Attachments",
        placeholder: "Attachment",
        fieldType: "file",
        required: true,
        disabled: false,
      },
    ],
  };

  return (
    <RequestPlatformView
      title="Committee"
      formFieldData={fieldData as FieldData<Partial<FieldsFormData>>}
      formData={fieldsFormData}
      setFormData={setFieldsFormData}
      tableColumns={committeeColumns}
      initialData={committees}
      isAccess={true}
      ADD_DATA=""
      UPDATE_DATA=""
      DELETE_DATA=""
      GET_URL={GET_BUILDERS_DETAILS_LIST}
      addBtn={{visible:true,label:"Add Committee"}}
      //for filter
      filterFormFieldData={filterData as FieldData<Partial<{ search: string }>>}
      setFilterFormData={setFilterFormData}
      filterFormData={filterFormData}
      queryKey="builder"
      description="View and manage your builder here."
      openForm={isFormOpening}
      excelFile={{
        title: "All Committee",
        name: "builders",
        columnsHeader: columnsHeaderAllRequests,
      }}
    />
  );
}

export default Committee;
