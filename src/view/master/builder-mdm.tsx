import {  useState } from "react";
import MasterManagementView, {
  FieldData,
} from "./master-manager/master-management-view";
import { z } from "zod";
import {
  ADD_BUILDER,
  DELETE_BUILDER,
  GET_BUILDERS_LIST,
  
} from "../../lib/endpoint";
import { columnsBuilderMdm } from "./component/master-columns-config";

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
      name: "builderName" as const,
      label: "Builder Name",
      placeholder: "Enter Builder Name",
      fieldType: "text",
      required: true,
      disabled: false,
    },
  ],
};

type FieldsFormData = {
  builderName: string
  loanAmountSanctioned: number | null
  loanAmountUtilized:  number | null
}

function BuildersMDMView() {
  const [filterFormData, setFilterFormData] = useState<
    Partial<FieldsFormData>
  >({
    builderName: "",
    loanAmountSanctioned: null,
    loanAmountUtilized: null,
  });

  const [fieldsFormData, setFieldsFormData] = useState<
    Partial<FieldsFormData>
  >({
    builderName: "",
    loanAmountSanctioned: null,
    loanAmountUtilized: null,
  });

 
  

  const fieldData = {
    validation: {
      
      loanAmountSanctioned: z.number({
        message:  "Only digits is allowed. Please enter a valid number.",
      }),
      loanAmountUtilized: z.number({
        message: "Only digits is allowed. Please enter a valid number.",
      }),
      builderName: z.string({
        message: "Only digits is allowed. Please enter a valid number.",
      }),
     
    },
    initialValues: {
    builderName: "",
    loanAmountSanctioned: null,
    loanAmountUtilized: null,
   
    },
    fields: [
     
      {
        name: "builderName" as const,
        label: "Builder Name",
        placeholder: "Enter Builder Name",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "loanAmountSanctioned" as const,
        label: "Loan Amount Sanctioned",
        placeholder: "Enter Loan Amount Sanctioned",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "loanAmountUtilized" as const,
        label: "Loan Amount Utilized",
        placeholder: "Enter Loan Amount Utilized",
        fieldType: "text",
        required: true,
        disabled: false,
        isString: false
      },
    ],
  };

  return (
    <MasterManagementView
      title="Builders"
      formFieldData={
        fieldData as FieldData<Partial<Omit<FieldsFormData, "type">>>
      }
      formData={fieldsFormData as any}
      setFormData={
        setFieldsFormData as React.Dispatch<
          React.SetStateAction<Partial<Omit<FieldsFormData, "type">>>
        >
      }
      tableColumns={columnsBuilderMdm as any}
      initialData={[]}
      isAccess={true}
      ADD_DATA={ADD_BUILDER}
      UPDATE_DATA={''}
      DELETE_DATA={DELETE_BUILDER}
      GET_URL={GET_BUILDERS_LIST}
      //for filter
      filterFormFieldData={filterData as any}
      setFilterFormData={setFilterFormData}
      filterFormData={filterFormData}
      queryKey="builders-mdm"
    />
  );
}

export default BuildersMDMView;
