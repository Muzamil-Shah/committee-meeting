import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  FieldProps,
  MemoizedFieldComponent,
} from "../../../components/filter-component-view";
import { z, ZodRawShape } from "zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { CircleCheck, Plus } from "lucide-react";
import {
  useDeleteMutation,
  usePostMutation,
  usePutMutation,
} from "../../../hooks/use-mutation";
import { toast } from "../../../components/ui/use-toast";
import { Separator } from "../../../components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import { useUser } from "../../../contexts/user-context";

import { useConditionalQuery } from "../../../hooks/use-query";
import {
  GET_BUILDERS_DETAILS,
  GET_PROJECTS_DETAILS,
} from "../../../lib/endpoint";
import { MutationResponse } from "./qcs-crud-form-manager";
import { useSearchParams } from "react-router-dom";
import { useFormOpening } from "../../../contexts/FormOpening";
import {  ProjectsDataI } from "../meetings/type";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { useCommittees } from "../../../contexts/committee-context";
import { CommitteeData, CommitteeMember } from "../committee/type";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

// type FieldData<T> = {
//   validation: {};
//   initialValues: {};
//   fields: FieldProps<T>[];
//   optionalKey?: string;
// };
type FieldData<T extends Record<string, unknown>> = {
  validation: ZodRawShape;
  initialValues: Partial<T>;
  fields: FieldProps<T>[];
  optionalKey?: string;
};

type Props<T extends Record<string, unknown>> = {
  fields: FieldProps<T>[]; // Changed from Record<string, unknown> to T
  action: string | null;
  ADD_DATA: string;
  UPDATE_DATA: string;
  DELETE_DATA: string;
  selectedId: number | string | null;
  formData: Partial<T>;
  open: boolean;
  handleDraworState: React.DispatchWithoutAction;
  formFieldData: FieldData<T>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  queryKey: string;
  title: string;
};

function CommitteePlatformCrudCollapsibleForm<T extends Record<string, unknown>>({
  formFieldData,
  setFormData,
  action,
  ADD_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  selectedId,
  formData,
  handleDraworState,
  queryKey,
  title,
  open,
}: Props<T>) {
  const { user } = useUser();
  const { addingCommittee,updateCommittee, committees } = useCommittees();
  const { closeFormOpening } = useFormOpening();
  const [btnStatus, _] = useState<
    "Submit" | "Query Raised" | "Acknowledge" | "Rejected" | "Approved" | null
  >();
  
  

  const addMutation = usePostMutation<MutationResponse>({
    url: ADD_DATA,
    queryKey,
  });
  const updateMutation = usePutMutation<MutationResponse>({
    url: UPDATE_DATA,
    queryKey,
  });
  const deleteMutation = useDeleteMutation<MutationResponse>({
    // url: DELETE_DATA,
    url: `${DELETE_DATA}?id=${selectedId}`,
    queryKey,
  });

  // const qcsData = useQueryGenerator({
  //   url: GET_QCS,
  //   queryKey: "qcs",
  //   params: {
  //   },

  // });

  const { data } = useConditionalQuery<{
    timeStamp: number;
    data: ProjectsDataI & {
      invoices: { content: any | null };
      projects: { content: any | null };
    };
    message: string | null;
    isSuccess: boolean;
    statusCode: number;
  }>({
    url: title === "Builders" ? GET_BUILDERS_DETAILS : GET_PROJECTS_DETAILS,
    queryKey: title === "Builders" ? "builder-details" : "project-details",
    params: {
      id: selectedId,
    },
    enabled: selectedId ? "id" : "",
  });

  console.log("asd", { open });

  //!! get vendor data

  const formSchema = useMemo(
    () =>
      // btnStatus
      //   ? ["Submit", "Acknowledge", "Approved"]?.includes(btnStatus as string)
      //     ? z.object(formFieldData.validation)
      //     : z.object({
      //         remarks: formFieldData?.validation?.remarks
      //           ? formFieldData?.validation?.remarks
      //           : z.string(),
      //       })
      //   :
      z.object(formFieldData.validation),
    [formFieldData.validation, btnStatus]
  );

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formFieldData.initialValues,
    mode: "onBlur",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const { reset, getValues } = methods;
  const { fields } = useFieldArray({
    control: methods?.control,
    name: "composition", // Matches the key in the form's defaultValues
  });
  const values = getValues();

  useEffect(() => {
    reset({ ...formFieldData.initialValues, ...formData });
  }, [formData, reset, formFieldData.initialValues]);

  const FormMessage = ({ name }: { name: string }) => {
    const error = methods.formState.errors;

    // Initialize reduce with error (or an empty object if error is undefined)
    const errorMessage = name
      .split(".")
      .reduce(
        (acc: any, key) => (acc && typeof acc === "object" ? acc[key] : null),
        error
      );

    return errorMessage ? (
      <p className="text-red-500">
        {errorMessage.message ?? "Something went wrong"}
      </p>
    ) : null;
  };
  const onSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      for (const key in data) {
        if (data[key as keyof typeof data] === "") {
          delete data[key as keyof typeof data];
        }
      }
      console.log("onsubmit", { data });

      if (action?.includes("create")) {
        addingCommittee({
          id: committees?.length + 1,
          ...data,
        } as CommitteeData);
        toast({
          icon: <CircleCheck />,
          bgColor: "bg-green-500",
          title: "Committee Create Successfully",
        });
        // // Delete the parameter
        // searchParams.delete("open");

        // // Update the URL
        // setSearchParams(searchParams);
        const formKeys = formFieldData?.initialValues;
        Object.keys(formKeys)?.map((key) =>
          setFormData((pre: Partial<T>) => ({
            ...pre,
            [key]: null,
          }))
        );
        handleDraworState();
      } else if (action?.includes("edit") && selectedId) {
        updateCommittee({
          id:selectedId,
          ...data,
        } as CommitteeData);
        toast({
          icon: <CircleCheck />,
          bgColor: "bg-green-500",
          title: "Committee Updated Successfully",
        });
        // // Delete the parameter
        // searchParams.delete("open");

        // // Update the URL
        // setSearchParams(searchParams);
        const formKeys = formFieldData?.initialValues;
        Object.keys(formKeys)?.map((key) =>
          setFormData((pre: Partial<T>) => ({
            ...pre,
            [key]: null,
          }))
        );
        handleDraworState();
      } else if (action?.includes("delete") && selectedId) {
        deleteMutation?.mutate({ id: selectedId });
      }
    },
    [formSchema, btnStatus, formData]
  );

  useEffect(() => {
    const message =
      addMutation?.data?.message! ??
      updateMutation?.data?.message! ??
      deleteMutation?.data?.message ??
      "";
    const isSuccess =
      addMutation?.data?.isSuccess! ??
      updateMutation?.data?.isSuccess! ??
      deleteMutation?.data?.isSuccess;
    if (
      addMutation?.isSuccess ||
      updateMutation?.isSuccess ||
      deleteMutation?.isSuccess
    ) {
      if (isSuccess) {
        toast({
          icon: <CircleCheck />,
          bgColor: "bg-green-500",
          title: message ?? "An error occurred",
        });
        // Delete the parameter
        searchParams.delete("open");

        // Update the URL
        setSearchParams(searchParams);
        const formKeys = formFieldData?.initialValues;
        Object.keys(formKeys)?.map((key) =>
          setFormData((pre: Partial<T>) => ({
            ...pre,
            [key]: ["builderName", "requestorName", "departmentName"]?.includes(
              key
            )
              ? pre[key]
              : null,
          }))
        );
        handleDraworState();
      } else {
        toast({
          icon: <CircleCheck />,
          bgColor: "bg-red-500",
          title: message ?? "An error occurred",
        });
      }
    }
  }, [
    addMutation?.isSuccess,
    updateMutation?.isSuccess,
    deleteMutation?.isSuccess,
  ]);

  const [isOpen, setIsOpen] = useState<boolean>(true);

  useMemo(() => {
    const apiData = data?.data;
    console.log("1st", apiData, selectedId);

    if (selectedId && apiData) {
      console.log("12st", apiData, selectedId);
      const formKeys = formData;

      const optionalKey = formFieldData?.optionalKey;
      Object.keys(formKeys)?.forEach((key) =>
        setFormData((pre: Partial<T>) => ({
          ...pre,
          [key]:
            Array.isArray(optionalKey) && optionalKey[0] === key
              ? (apiData as Record<string, unknown>)[optionalKey[1]]
              : (apiData as Record<string, unknown>)[key],
        }))
      );
    }
  }, [data?.data, selectedId]);

  console.log({ formData });

  useEffect(() => {
    return () => closeFormOpening();
  }, []);
  console.log({ methods }, methods?.formState?.errors);

  

  const lineItemFeildList = ({ index }: { index: number }) => {
    return [
      {
        name: `composition.${index}.role` as const,
        label: "Role",
        placeholder: "Role",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: `composition.${index}.user` as const,
        label: "User",
        placeholder: "User",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: `composition.${index}.emailId` as const,
        label: "Email",
        placeholder: "Email",
        fieldType: "text",
        required: true,
        disabled: false,
      },
    ];
  };

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleDraworState}>
      <DialogContent className="min-w-[80%] max-h-[80%] overflow-hidden p-10">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full h-96  flex flex-col justify-start space-y-4 pb-4 px-2 overflow-y-scroll"
          >
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full border rounded-xl p-2 space-y-2 z-20"
            >
              <CollapsibleTrigger asChild>
                <div className="w-full flex justify-between items-center gap-2">
                  <div className="flex flex-col justify-start items-start">
                    <h3 className="text-lg font-semibold">{`${title}`}</h3>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-2 print-content">
                <div className="  p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-start">
                  {formFieldData.fields.map((field) => (
                    <MemoizedFieldComponent
                      key={field.name as string}
                      field={
                        {
                          ...field,
                          disabled: action === "view" ? true : field.disabled,
                        } as FieldProps<Record<string, unknown>>
                      }
                      setFormData={setFormData}
                    />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full border rounded-xl p-2 space-y-2 z-20"
            >
              <CollapsibleTrigger asChild>
                <div className="w-full flex justify-between items-center gap-2">
                  <div className="flex flex-col justify-start items-start">
                    <h3 className="text-lg font-semibold">Composition</h3>
                  </div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-2 print-content">
                <div className="w-full flex flex-col gap-3 space-y-1 ">
                  <div className="w-full flex justify-end items-center ">
                    <Button
                      variant={"outline"}
                      type="button"
                      size={"sm"}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          composition:
                            prev.composition &&
                            (prev.composition as CommitteeMember[])?.length > 0
                              ? [
                                  ...(Array.isArray(prev.composition)
                                    ? prev.composition
                                    : []),
                                  {
                                    role: "",
                                    user: "",
                                    userId: "",
                                  },
                                ]
                              : [
                                  {
                                    role: "",
                                    user: "",
                                    userId: "",
                                  },
                                ],
                        }))
                      }
                    >
                      <Plus />
                      <span>Add More Composition</span>
                    </Button>
                  </div>
                  <div className="w-full flex flex-col justify-start items-start  overflow-x-scroll ">
                    <Separator />

                    <div className="w-full grid grid-cols-3 gap-1  justify-end items-center pt-4">
                      {lineItemFeildList({ index: 0 })?.map((field, i) => (
                        <FormLabel
                          key={i}
                          className="dark:text-white font-medium"
                        >
                          {field?.label}
                          {field?.required && (
                            <span className="text-red-500"> *</span>
                          )}
                        </FormLabel>
                      ))}
                    </div>
                    {fields?.map((_, index) => (
                      <div
                        key={index}
                        className="w-full grid grid-cols-3 gap-2  justify-center items-end pb-4"
                      >
                        {lineItemFeildList({ index })?.map((field, i) => (
                          <FormField
                            key={i}
                            name={field?.name}
                            control={methods.control}
                            render={({ field: FormField }) => (
                              <FormItem>
                                <br />
                                <FormControl>
                                  <Input
                                    {...FormField}
                                    inputMode="numeric"
                                    placeholder={field.placeholder}
                                    {...methods.register(field?.name, {
                                      onBlur: (_) => {
                                        setFormData(values as Partial<T>);
                                      },
                                      onChange: (_) => {
                                        // Custom logic for handling onChange event
                                      },
                                    })}
                                    className="h-9"
                                    disabled={field?.disabled}
                                  />
                                </FormControl>

                                <FormMessage name={field?.name} />
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* <div className="w-full">
                            <TableView columns={columns} data={values?.composition} />
                          </div> */}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="space-y-3">
              <Separator />
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => handleDraworState()}
                >
                  Close
                </Button>
               {!action || action === "view" ? null : (
                               <Button>
                                 {action === "edit"
                                   ? "Edit"
                                   : action === "delete"
                                   ? "Delete"
                                   : "Create"}
                               </Button>
                             )}
              </div>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CommitteePlatformCrudCollapsibleForm);
