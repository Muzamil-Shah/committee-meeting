import { useMemo, useState } from "react";
import MasterManagementView, {
  FieldData,
} from "./master-manager/master-management-view";
import { z } from "zod";
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  GET_BUILDERS_LIST,
  GET_PROJECTS_LIST,
  
} from "../../lib/endpoint";
import { useQueryGenerator } from "../../hooks/use-query";
import { columnsProjectMDM } from "./component/master-columns-config";

const filterData = {
  validation: {
    allowedExtension: z
        .string({
          message: "Only text is allowed. Please enter a valid string.",
        }),
  },
  initialValues: {
    allowedExtension: "",

  },
  fields: [
    {
      name: "allowedExtension" as const,
      label: "Allowed Extension",
      placeholder: "Enter Allowed Extension",
      fieldType: "text",
      required: true,
      disabled: false,
    },
  ],
};

type FieldsFormData = {
  builderId: number | null
  builderName: string
  loanAmountSanctioned: number | null
  loanAmountUtilized:  number | null
  projectName: string
}

function ProjectMDMView() {
  const [filterFormData, setFilterFormData] = useState<
    Partial<FieldsFormData>
  >({
    builderId: null,
    builderName: "",
    loanAmountSanctioned: null,
    loanAmountUtilized: null,
    projectName: ""
  });

  const [fieldsFormData, setFieldsFormData] = useState<
    Partial<FieldsFormData>
  >({
    builderId: null,
    builderName: "",
    loanAmountSanctioned: null,
    loanAmountUtilized: null,
    projectName: ""
  });

  const { data: buildersData } = useQueryGenerator({
    url: GET_BUILDERS_LIST,
    queryKey: "builders",
    params: {
      pageNo: 0,
      pageSize: 0,
    },
  });

  const builderOptionShap = useMemo(() => {
    const projectList = buildersData?.data?.content;
    if (projectList) {
      return projectList?.map((item: { id: number; builderName: string }) => ({
        value: item?.id,
        label: item?.builderName,
      }));
    }
  }, [buildersData?.data?.content]);

  useMemo(() =>{
    const findBuilderName = builderOptionShap?.find((item: {value: number, label: string}) => item?.value === fieldsFormData?.builderId)?.label
    setFieldsFormData((prev) => ({...prev,builderName: findBuilderName}))
  }, [builderOptionShap,fieldsFormData?.builderId])

  const fieldData = {
    validation: {
      
      projectName: z.string({
        message: "Only text is allowed. Please enter a valid string.",
      }),
      loanAmountSanctioned: z.number({
        message:  "Only digits is allowed. Please enter a valid number.",
      }),
      loanAmountUtilized: z.number({
        message: "Only digits is allowed. Please enter a valid number.",
      }),
      builderName: z.string({
        message: "Only text is allowed. Please enter a valid string.",
      }),
      builderId: z.number({
        message: "Only digits is allowed. Please enter a valid number.",
      }),
    },
    initialValues: {
      builderId: fieldsFormData?.builderId || null,
    builderName: fieldsFormData?.builderName ||  "",
    loanAmountSanctioned: fieldsFormData?.loanAmountSanctioned || null,
    loanAmountUtilized: fieldsFormData?.loanAmountUtilized ||  null,
    projectName: fieldsFormData?.projectName || ""
    },
    fields: [
      {
        name: "builderId" as const,
        label: "Builder",
        placeholder: "Enter Builder",
        fieldType: "combobox",
        options: builderOptionShap ?? [],
        required: true,
        disabled: false,
      },
      {
        name: "projectName" as const,
        label: "Project Name",
        placeholder: "Enter Project Name",
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
      title="Projects"
      formFieldData={
        fieldData as FieldData<Partial<Omit<FieldsFormData, "type">>>
      }
      formData={fieldsFormData as any}
      setFormData={
        setFieldsFormData as React.Dispatch<
          React.SetStateAction<Partial<Omit<FieldsFormData, "type">>>
        >
      }
      tableColumns={columnsProjectMDM as any}
      initialData={[]}
      isAccess={true}
      ADD_DATA={ADD_PROJECT}
      UPDATE_DATA={''}
      DELETE_DATA={DELETE_PROJECT}
      GET_URL={GET_PROJECTS_LIST}
      //for filter
      filterFormFieldData={filterData as any}
      setFilterFormData={setFilterFormData}
      filterFormData={filterFormData}
      queryKey="projects-mdm"
    />
  );
}

export default ProjectMDMView;
