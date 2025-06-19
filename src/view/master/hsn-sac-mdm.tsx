import {  useState } from "react";
import MasterManagementView, {
  FieldData,
} from "./master-manager/master-management-view";
import { z } from "zod";
import {
  ADD_HSN_SAC,
  DELETE_HSN_SAC,
  GET_HSN_LIST
  
} from "../../lib/endpoint";
import { HsnSacCodeColums } from "./component/master-columns-config";

const filterData = {
  validation: {
    builderName: z
        .string({
          message: "Only text is allowed. Please enter a valid string.",
        }),
  },
  initialValues: {
    builderName: "",

  },
  fields: [
    {
      name: "code" as const,
      label: "HSN / SAC",
      placeholder: "Enter HSN / SAC",
      fieldType: "text",
      required: true,
      disabled: false,
    },
  ],
};

type FieldsFormData = {
  code: string,
  description: string,
  mainHeading: string,
  subHeading: string,
  typeOfCode: string
}

function BuildersMDMView() {
  const [filterFormData, setFilterFormData] = useState<
    Partial<FieldsFormData>
  >({
    code: '',
  description: '',
  mainHeading: '',
  subHeading: '',
  typeOfCode: ''
  });

  const [fieldsFormData, setFieldsFormData] = useState<
    Partial<FieldsFormData>
  >({  code: '',
    description: '',
    mainHeading: '',
    subHeading: '',
    typeOfCode: ''
  });

 
  

  const fieldData = {
    validation: {
      
    
      code: z.string({
        message: "Only string is allowed. Please enter a valid number.",
      }),
      description: z.string({
        message: "Only string is allowed. Please enter a valid number.",
      }),
      mainHeading: z.string({
        message: "Only string is allowed. Please enter a valid number.",
      }),
      subHeading: z.string({
        message: "Only string is allowed. Please enter a valid number.",
      }),
      typeOfCode: z.string({
        message: "Only string is allowed. Please enter a valid number.",
      }),
     
    },
    initialValues: {
      code: fieldsFormData?.code ||  '',
      description: fieldsFormData?.description || '',
      mainHeading: fieldsFormData?.mainHeading || '',
      subHeading: fieldsFormData?.subHeading || '',
      typeOfCode: fieldsFormData?.typeOfCode || ''
  
    },
    fields: [
     
      {
        name: "code" as const,
        label: "Code",
        placeholder: "Enter Code",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "description" as const,
        label: "Description",
        placeholder: "Enter Description",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "mainHeading" as const,
        label: "Main Heading",
        placeholder: "Enter Main Heading",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "subHeading" as const,
        label: "Main Sub Heading",
        placeholder: "Enter Main Sub Heading",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "typeOfCode" as const,
        label: "Type Of Code",
        placeholder: "Enter Type Of Code",
        fieldType: "text",
        required: true,
        disabled: false,
        isString: false
      },
    ],
  };

  return (
    <MasterManagementView
      title="HSN Sac"
      formFieldData={
        fieldData as FieldData<Partial<Omit<FieldsFormData, "type">>>
      }
      formData={fieldsFormData as any}
      setFormData={
        setFieldsFormData as React.Dispatch<
          React.SetStateAction<Partial<Omit<FieldsFormData, "type">>>
        >
      }
      tableColumns={HsnSacCodeColums as any}
      initialData={[]}
      isAccess={true}
      ADD_DATA={ADD_HSN_SAC}
      UPDATE_DATA={''}
      DELETE_DATA={DELETE_HSN_SAC}
      GET_URL={GET_HSN_LIST}
      //for filter
      filterFormFieldData={filterData as any}
      setFilterFormData={setFilterFormData}
      filterFormData={filterFormData}
      queryKey="hsnSac"
    />
  );
}

export default BuildersMDMView;
