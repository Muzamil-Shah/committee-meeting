import { useMemo, useState } from "react";
import MasterManagementView, {
  FieldData,
} from "./master-manager/master-management-view";
import { z } from "zod";
import { UserColumns } from "./component/master-columns-config";
import {
  ADD_USERS, 
  DELETE_USERS,
  GET_DEPARTMENT,
  GET_ROLE,
  GET_USERS,
  UPDATE_USERS,
} from "../../lib/endpoint";
import { useQueryGenerator } from "../../hooks/use-query";
import { OptionShap } from "../../types/Data";

const filterData = {
  validation: {
    username: z.string({
      message: "Only text is allowed. Please enter a valid string.",
    }),
    firstname: z.string({
      message: "Only text is allowed. Please enter a valid string.",
    }),
    lastname: z.string({
      message: "Only text is allowed. Please enter a valid string.",
    }),
  },
  initialValues: {
    username:"",
    firstname:"",
    lastname:"",
  },
  fields: [
    {
      name: "username" as const,
      label: "Username",
      placeholder: "enter Microsoft 365 username",
      fieldType: "text",
      required: true,
      disabled: false,
    },
    {
      name: "firstname" as const,
      label: "Firstname",
      placeholder: "enter firstname",
      fieldType: "text",
      required: true,
      disabled: false,
    },
    {
      name: "lastname" as const,
      label: "Lastname",
      placeholder: "enter lastname",
      fieldType: "text",
      required: true,
      disabled: false,
    },
  ],
};

type FieldsFormData = {
  categoryId: number | string;
  category: string;
  username: string;
  firstname: string;
  lastname: string;
  roleId: number | string;
  role: string;
  department: string;
  departmentId: number | string; 
};


function UsersMaster() {
  const [crudActionValue, setCrudActionValue] = useState<string | null>(null);
  const [filterFormData, setFilterFormData] = useState<
    Partial<{
      username: string;
      firstname: string;
      lastname: string;
      
    }>
  >({
    username:"",
    firstname:"",
    lastname:"",
  });

  const [fieldsFormData, setFieldsFormData] = useState<
    Partial<{
      username: string;
      firstname: string;
      lastname: string;
      roleId: number | string;
      role: string;
      department: string;
      departmentId: number | string; 
    }>
  >({
    username: "",
    firstname: "",
    lastname: "",
    roleId: "",
    role: "",
    department: "",
    departmentId: "", 
  });

  const { data: departmentData } = useQueryGenerator({
      url: GET_DEPARTMENT,
      queryKey: "department",
      params: {
        pageNo: 0,
        pageSize: 0,
        status: 1,
      },
    });
  const { data: roleData } = useQueryGenerator({
      url: GET_ROLE,
      queryKey: "role",
      params: {
        pageNo: 0,
        pageSize: 0,
      },
    });

  const departmentOptionShap = useMemo(() => {
      const departmentList = departmentData?.data?.data?.content;
      if (departmentList) {
        return departmentList?.map(
          (item: { id: number; departmentName: string }) => ({
            value: item?.departmentName,
            label: item?.departmentName,
          })
        );
      }
    }, [departmentData?.data?.data?.content]);
  
    useMemo(() => {
      const department = fieldsFormData?.department;
      if (department && departmentOptionShap) {
        const findValue = departmentData?.data?.data?.content?.find(
          (item:{ id: number; departmentName: string }) => item?.departmentName === department
        )?.id;
        setFieldsFormData((pre) => ({ ...pre, departmentId: findValue }));
      }
    }, [fieldsFormData?.department, departmentData?.data?.data?.content]);

  const roleOptionShap = useMemo(() => {
      const roleList = roleData?.data?.data?.content;
      if (roleList) {
        return roleList?.map(
          (item: { id: number; roleName: string }) => ({
            value: item?.id,
            label: item?.roleName,
          })
        );
      }
    }, [roleData?.data?.data?.content]);
  
    useMemo(() => {
      const roleId = fieldsFormData?.roleId;
      if (roleId && roleOptionShap) {
        const findValue = roleOptionShap?.find(
          (item: OptionShap) => item?.value === roleId
        )?.label;
        setFieldsFormData((pre) => ({ ...pre, role: findValue }));
      }
    }, [fieldsFormData?.roleId, roleOptionShap]);


    const fieldData = {
      validation: {
        roleId: z.string({
          message: "Only text is allowed. Please enter a valid string.",
        }).or(z.number()),
        role: z.string({
          message: "Only text is allowed. Please enter a valid string.",
        }),
        departmentId: z.string({
          message: "Only text is allowed. Please enter a valid string.",
        }).or(z.number()),
        department: z.string({
          message: "Only text is allowed. Please enter a valid string.",
        }),
        username: z.string({
          message: "Only text is allowed. Please enter a valid string.",
        }),
        firstname: z.string({
          message: "Only text is allowed. Please enter a valid string.",
        }),
        lastname: z.string({
          message: "Only text is allowed. Please enter a valid string.",
        }),
      },
      initialValues: {
        username: fieldsFormData?.username  || "",
        firstname: fieldsFormData?.firstname  || "",
        lastname: fieldsFormData?.lastname  || "",
        roleId: fieldsFormData?.roleId  || "",
        role: fieldsFormData?.role  || "",
        department: fieldsFormData?.department|| "",
        departmentId: fieldsFormData?.departmentId  || "", 
      },
      fields: [
        {
          name: "username" as const,
          label: "Username",
          placeholder: "enter Microsoft 365 username",
          fieldType: "text",
          required: true,
          disabled:  ["create"]?.includes(crudActionValue as string) ? false : true,
        },
        {
          name: "firstname" as const,
          label: "Firstname",
          placeholder: "enter firstname",
          fieldType: "text",
          required: true,
          disabled: false,
        },
        {
          name: "lastname" as const,
          label: "Lastname",
          placeholder: "enter lastname",
          fieldType: "text",
          required: true,
          disabled: false,
        },
        {
          name: "department" as const,
          label: "Department",
          placeholder: "Enter department",
          fieldType: "combobox",
          options: departmentOptionShap ?? [],
          required: true,
          disabled: false,
        },
        {
          name: "roleId" as const,
          label: "Role",
          placeholder: "Enter role",
          fieldType: "combobox",
          options: roleOptionShap ?? [],
          required: true,
          disabled: false,
        },
        
        
      ],
    };

  return (
    <MasterManagementView
      title="Users"
      formFieldData={fieldData as FieldData<Partial< Omit<FieldsFormData, "type">>>}
      formData={fieldsFormData as any}
      setFormData={
        setFieldsFormData as React.Dispatch<
          React.SetStateAction<Partial<Omit<FieldsFormData, "type">>>
        >
      }
      tableColumns={UserColumns as any}
      initialData={[]}
      isAccess={true}
      ADD_DATA={ADD_USERS}
      UPDATE_DATA={UPDATE_USERS}
      DELETE_DATA={DELETE_USERS}
      GET_URL={GET_USERS}
      //for filter
      filterFormFieldData={filterData as any}
      setFilterFormData={setFilterFormData}
      filterFormData={filterFormData}
      queryKey="users"
      setCrudActionValue={setCrudActionValue}
    />
  );
}

export default UsersMaster;
