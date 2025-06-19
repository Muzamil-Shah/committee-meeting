import { useMemo, useState } from "react";
import { z } from "zod";
import RequestPlatformView, {
  FieldData,
} from "../platform-design/request-platform-view";
import { columns, columnsHeaderAllRequests } from "./columns";
import { GET_PROJECTS_DETAILS_LIST } from "../../../lib/endpoint";
import { useFormOpening } from "../../../contexts/FormOpening";
import { IMeeting } from "./type";
import { useMeeting } from "../../../contexts/MeetingProvider";
import { DocumentFileSHapZod } from "../../../types/Data";
import { nfaData } from "../fna/data";
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

function Meetings() {
  const { isFormOpening } = useFormOpening();
  const { meetings } = useMeeting();
  const {committees} = useCommittees()
  const [filterFormData, setFilterFormData] = useState<
    Partial<{
      search: string;
    }>
  >({
    search: "",
  });

  const [fieldsFormData, setFieldsFormData] = useState<Partial<IMeeting>>({
    title: "",
    subject: "",
    description: "",
    timeSchedule: [{
      start_date: null,
      end_date: null
    }],
    committee: [],
    nfa: [],
    agenda: [],
    attachment: null,
  });

  const nfaOption = useMemo(() => {
    return nfaData?.map((item) => ({label: item?.title, value: item?.id}))
  },[nfaData])
  const committeeOption = useMemo(() => {
    return committees?.map((item) => ({label: `${item?.committeeName}-${item?.committeeType}`, value: item?.id}))
  },[committees])

  const fieldData = {
    validation: {
      title: z.string({ message: "Title should be a string" }),
      subject: z.string({ message: "Subject should be a string" }),
      description: z.string({ message: "Description should be a string" }),
      // start_date: z.date().nullable(),
      // end_date: z.date().nullable(),
      timeSchedule: z.array(z.object(
        {
          start_date: z.date().nullable(),
      end_date: z.date().nullable(),
        }
      )).nullable(),
      nfa: z.array(z.number()),
      committee: z.array(z.number()),
      agenda: z.array(z.object({
        subject: z.string({ message: "Subject should be a string" }),
      title: z.string({ message: "Title should be a string" }),
      })),
    },
    initialValues: {
      title: fieldsFormData?.title,
      subject: fieldsFormData?.subject,
      description: fieldsFormData?.description,
      // start_date: fieldsFormData.start_date,
      // end_date: new Date(),
      timeSchedule: fieldsFormData?.timeSchedule,
      nfa: fieldsFormData.nfa,
      committee: fieldsFormData.committee,
      agenda: fieldsFormData.agenda,
      attachment: z
        .array(DocumentFileSHapZod, { message: "Attachment is required!" })
        .nullable(),
    },
    fields: [
      {
        name: "title" as const,
        label: "Title",
        placeholder: "Enter Meeting Title",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "subject" as const,
        label: "Subject",
        placeholder: "Enter Meeting Subject",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "description" as const,
        label: "Description",
        placeholder: "Enter Meeting Description",
        fieldType: "textarea",
        required: true,
        disabled: false,
      },
      // {
      //   name: "start_date" as const,
      //   label: "Start Date",
      //   placeholder: "Enter Meeting Start Date",
      //   fieldType: "date",
      //   required: true,
      //   disabled: false,
      // },
      // {
      //   name: "end_date" as const,
      //   label: "End Date",
      //   placeholder: "Enter Meeting End Date",
      //   fieldType: "date",
      //   required: true,
      //   disabled: false,
      // },
      {
        name: "nfa" as const,
        label: "NFA",
        placeholder: "Select NFA",
        fieldType: "multiSelect",
        required: true,
        disabled: false,
        options: nfaOption ?? [],
      },
      {
        name: "committee" as const,
        label: "Committee",
        placeholder: "Select Committee",
        fieldType: "multiSelect",
        required: true,
        disabled: false,
        options: committeeOption ?? [],
      },
      {
        name: "attachment" as const,
        label: "Attachment",
        placeholder: "Select Attachment",
        fieldType: "file",
        required: true,
        disabled: false,
      },
    ],
  };

  console.log({meetings});
  
  return (
    <RequestPlatformView
      title="Meetings"
      formFieldData={fieldData as FieldData<Partial<IMeeting>>}
      formData={fieldsFormData}
      setFormData={setFieldsFormData}
      tableColumns={columns}
      initialData={meetings}
      ADD_DATA=""
      UPDATE_DATA=""
      DELETE_DATA=""
      GET_URL={GET_PROJECTS_DETAILS_LIST}
      //for filter
      filterFormFieldData={filterData as FieldData<Partial<{ search: string }>>}
      setFilterFormData={setFilterFormData}
      filterFormData={filterFormData}
      queryKey="projects"
      description="View and manage your meetings here."
      openForm={isFormOpening}
      excelFile={{
        title: "All Meetings",
        name: "projects",
        columnsHeader: columnsHeaderAllRequests,
      }}
      addBtn={{ label: "Add Meeting", visible: true }}
      isAccess={false}
    />
  );
}

export default Meetings;
