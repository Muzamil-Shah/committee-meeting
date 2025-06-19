import { useMemo, useState } from "react";
import MasterManagementView, {
  FieldData,
} from "./master-manager/master-management-view";
import { z } from "zod";
import {
  ADD_FOLDERS_MDM,
  DELETE_FOLDERS_MDM,
  GET_PROJECTS_LIST,
  GET_FOLDERS_MDM,
  
} from "../../lib/endpoint";
import { useQueryGenerator } from "../../hooks/use-query";
import { FolderColumns } from "./component/master-columns-config";

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
  allowedExtension: string;
  directoryPath: string;
  docType: string;
  projectId: string | number | null;
};

function FolderMDMView() {
  const [filterFormData, setFilterFormData] = useState<
    Partial<{
      allowedExtension: string;
      directoryPath: string;
      docType: string;
      projectId: string | number | null;
    }>
  >({
    allowedExtension: "",
    directoryPath: "",
    docType: "",
    projectId: null,
  });

  const [fieldsFormData, setFieldsFormData] = useState<
    Partial<{
      allowedExtension: string;
      directoryPath: string;
      docType: string;
      projectId: string | number | null;
    }>
  >({
    allowedExtension: "",
    directoryPath: "",
    docType: "",
    projectId: null,
  });

  const { data: projectsData } = useQueryGenerator({
    url: GET_PROJECTS_LIST,
    queryKey: "projects",
    params: {
      pageNo: 0,
      pageSize: 0,
    },
  });

  const projectOptionShap = useMemo(() => {
    const projectList = projectsData?.data?.content;
    if (projectList) {
      return projectList?.map((item: { id: number; projectName: string }) => ({
        value: item?.id,
        label: item?.projectName,
      }));
    }
  }, [projectsData?.data?.content]);

  const fieldData = {
    validation: {
      allowedExtension: z
        .string({
          message: "Only text is allowed. Please enter a valid string.",
        }),
      directoryPath: z.string({
        message: "Only text is allowed. Please enter a valid string.",
      }),
      docType: z.string({
        message: "Only text is allowed. Please enter a valid string.",
      }),
      projectId: z.number({
        message: "Only digits is allowed. Please enter a valid number.",
      }),
    },
    initialValues: {
      allowedExtension: "",
      directoryPath: "",
      docType: "",
      projectId: null,
    },
    fields: [
      {
        name: "projectId" as const,
        label: "Project",
        placeholder: "Enter Project",
        fieldType: "combobox",
        options: projectOptionShap ?? [],
        required: true,
        disabled: false,
      },
      {
        name: "allowedExtension" as const,
        label: "Allowed Extension",
        placeholder: "Enter Allowed Extension",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "directoryPath" as const,
        label: "Directory Path",
        placeholder: "Enter Directory Path",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: "docType" as const,
        label: "Document Type",
        placeholder: "Enter Document Type",
        fieldType: "text",
        required: true,
        disabled: false,
      },
    ],
  };

  return (
    <MasterManagementView
      title="Folder Location"
      formFieldData={
        fieldData as FieldData<Partial<Omit<FieldsFormData, "type">>>
      }
      formData={fieldsFormData as any}
      setFormData={
        setFieldsFormData as React.Dispatch<
          React.SetStateAction<Partial<Omit<FieldsFormData, "type">>>
        >
      }
      tableColumns={FolderColumns as any}
      initialData={[]}
      isAccess={true}
      ADD_DATA={ADD_FOLDERS_MDM}
      UPDATE_DATA={''}
      DELETE_DATA={DELETE_FOLDERS_MDM}
      GET_URL={GET_FOLDERS_MDM}
      //for filter
      filterFormFieldData={filterData as any}
      setFilterFormData={setFilterFormData}
      filterFormData={filterFormData}
      queryKey="folder"
    />
  );
}

export default FolderMDMView;
