import { useState } from "react";
import { z } from "zod";
import RequestPlatformView, {
  FieldData,
} from "../platform-design/request-platform-view";
import {  columnsHeaderAllRequests, nfaColumns } from "./columns";
import {  nfaData } from "./data";
import { GET_BUILDERS_DETAILS_LIST } from "../../../lib/endpoint";
import { useFormOpening } from "../../../contexts/FormOpening";
import { NFAItem } from "./type";

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

type FieldsFormData = NFAItem

function Fna() {
  const { isFormOpening } = useFormOpening();

  const [filterFormData, setFilterFormData] = useState<
    Partial<{
      search: string;
    }>
  >({
    search: "",
  });

  const [fieldsFormData, setFieldsFormData] = useState<Partial<FieldsFormData>>(
    {
     
      
    }
  );

  const fieldData = {
    validation: {
    
    },
    initialValues: {
     
    },
    fields: [
      
    ],
  };

  return (
    <RequestPlatformView
      title="NFA"
      formFieldData={fieldData as FieldData<Partial<FieldsFormData>>}
      formData={fieldsFormData}
      setFormData={setFieldsFormData}
      tableColumns={nfaColumns}
      initialData={nfaData}
      isAccess={true}
      ADD_DATA=""
      UPDATE_DATA=""
      DELETE_DATA=""
      GET_URL={GET_BUILDERS_DETAILS_LIST}
      //for filter
      filterFormFieldData={filterData as FieldData<Partial<{ search: string }>>}
      setFilterFormData={setFilterFormData}
      filterFormData={filterFormData}
      queryKey="builder"
      description="View and manage your builder here."
      openForm={isFormOpening}
      excelFile={{
        title: "All Fna",
        name: "builders",
        columnsHeader: columnsHeaderAllRequests,
      }}
    />
  );
}

export default Fna;
