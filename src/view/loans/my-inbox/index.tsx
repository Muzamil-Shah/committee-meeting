import { useState } from "react";
import { z } from "zod";
import RequestPlatformView, {
  FieldData,
} from "../platform-design/request-platform-view";
import { columns, columnsHeaderAllRequests } from "./columns";
import { GET_PROJECTS_DETAILS_LIST } from "../../../lib/endpoint";
import { useFormOpening } from "../../../contexts/FormOpening";
import {  MyInboxI } from "./type";
import { useInbox } from "../../../contexts/inbox-context";

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

function MyInbox() {
  const { isFormOpening } = useFormOpening();
  const { inbox } = useInbox();

  const [filterFormData, setFilterFormData] = useState<
    Partial<{
      search: string;
    }>
  >({
    search: "",
  });

  const [fieldsFormData, setFieldsFormData] = useState<Partial<MyInboxI>>({
    
  });

  const fieldData = {
    validation: {
      
    },
    initialValues: {
     
    },
    fields: [
      
    ],
  };

  console.log({inbox});
  
  return (
    <RequestPlatformView
      title="My Inbox"
      formFieldData={fieldData as FieldData<Partial<MyInboxI>>}
      formData={fieldsFormData}
      setFormData={setFieldsFormData}
      tableColumns={columns}
      initialData={inbox ?? []}
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
        title: "All My Inbox",
        name: "projects",
        columnsHeader: columnsHeaderAllRequests,
      }}
      addBtn={{ label: "Add Meeting", visible: true }}
      isAccess={true}
    />
  );
}

export default MyInbox;
