import React, { memo, useEffect, useMemo } from "react";
import { string, z, ZodRawShape } from "zod";
import {
  FieldProps,
  MemoizedFieldComponent,
} from "../../../components/filter-component-view";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  useDeleteMutation,
  usePostMutation,
  usePutMutation,
} from "../../../hooks/use-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../../components/ui/use-toast";
import { CircleCheck } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import { Input } from "../../../components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";


export type MutationResponse = {
  timeStamp: number | Date;
  data: {
    data: any;
    status: boolean | string;
    errorObject: null | object;
    msg: null | string;
  };
  message: null;
  isSuccess: boolean;
  statusCode: number;
};

export type FieldData<T extends Record<string, unknown>> = {
  validation: ZodRawShape;
  initialValues: Partial<T>;
  fields: FieldProps<T>[];
  optionalKey?: Record<string, string[]>;
};

type Props<T extends Record<string, unknown>> = {
  action: string | null;
  ADD_DATA: string;
  UPDATE_DATA: string;
  DELETE_DATA: string;
  formFieldData: FieldData<T>;
  formData: Partial<T>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  queryKey: string;
  setShowQCSForm: React.Dispatch<React.SetStateAction<boolean>>;
 
  selectedId: null | number |string;
};

function InvoiceLineItemCrudFormManager<T extends Record<string, unknown>>({
  formFieldData,
  setFormData,
  action,
  ADD_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  formData,
  queryKey,
  setShowQCSForm,
  selectedId
}: Props<T>) {
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
    url: `${DELETE_DATA}?id=${12}`,
    queryKey,
  });

 
  const formSchema = useMemo(
    () => z.object(formFieldData.validation),
    [formFieldData.validation]
  );
console.log("invoice",formFieldData.initialValues);

  const methodsQCS = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formFieldData.initialValues,
    mode: "onChange",
    shouldUnregister: false,
  });

  const { fields } = useFieldArray({
    control: methodsQCS?.control,
    name: "lineItems", // Matches the key in the form's defaultValues
  });

  const { reset, getValues } = methodsQCS;
  useEffect(() => {
    reset({ ...formFieldData.initialValues, ...formData });
  }, [formData, reset, formFieldData.initialValues]);

  const onSubmit =
    // useCallback(
    (data: z.infer<typeof formSchema>) => {
      for (const key in data) {
        if (data[key as keyof typeof string] === "") {
          delete data[key as keyof typeof string];
        }
      }
      if (action?.includes("create")) {
        
       
        setFormData(values as Partial<T>);
        addMutation.mutate({
          qcsList: [data],
        });
      } else if (action?.includes("edit") && selectedId) {
        addMutation.mutate({
          qcsList: [{ id: selectedId, ...data }],
        });
      } else if (action?.includes("delete") && selectedId) {
        deleteMutation?.mutate({ id: selectedId });
      }
    };
  //   ,
  //   []
  // );

  const FormMessage = ({ name }: { name: string }) => {
    const error = methodsQCS.formState.errors;

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
        setShowQCSForm(pre=> !pre)
        reset({ ...formFieldData.initialValues});
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

  const values = getValues();

  



  

  const lineItemFeildList = ({ index }: { index: number }) => {
    return [
      {
        name: `lineItems.${index}.serialNo` as const,
        label: "Sr No",
        placeholder: "Sr No",
        fieldType: "text",
        required: true,
        disabled: true,
      },
      {
        name: `lineItems.${index}.itemDescription` as const,
        label: "Description",
        placeholder: "Description",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: `lineItems.${index}.hsnSacCode` as const,
        label: "Hsn/Sac Code",
        placeholder: "Hsn/Sac Code",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      
      {
        name: `lineItems.${index}.uom` as const,
        label: "UOM",
        placeholder: "UOM",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: `lineItems.${index}.quantity` as const,
        label: "Qty",
        placeholder: "Qty",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: `lineItems.${index}.unitRate` as const,
        label: "Unit Rate",
        placeholder: "Unit Rate",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: `lineItems.${index}.amount` as const,
        label: "Amount",
        placeholder: "Amount",
        fieldType: "text",
        required: true,
        disabled: true,
      },
      
    ];
  };

  console.log({methodsQCS}, methodsQCS?.formState?.errors);
  

  return (
    <FormProvider {...methodsQCS}>
      <form
        onSubmit={methodsQCS.handleSubmit(onSubmit)}
        className="w-full h-full flex flex-col justify-start items-start space-y-3"
      >
        
        <div className={"w-[100%]  space-y-3 relative"}>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 p-2 justify-end items-center ">
            {formFieldData.fields.map((field) => (
              <MemoizedFieldComponent
                key={field.name as string}
                field={field as FieldProps<Record<string, unknown>>}
                setFormData={setFormData}
              />
            ))}
          </div>
          <div className="w-full flex flex-col gap-3 space-y-1 ">
            <div className="w-full flex justify-between items-center ">
              <h3 className="text-lg font-semibold">Item Line</h3>

              {/* <Button
                variant={"outline"}
                type="button"
                size={"sm"}
                onClick={() =>
                  append({
                    srNo: fields.length + 1,
                    description: "",
                    qty: 0,
                    uom: "",
                    quotedPrice: 0,
                    quotedAmount: 0,
                    finalPrice1: 0,
                    // finalPrice2: 0,
                    // noRegretPrice: 0,
                    total: 0,
                  })
                }
              >
                <Plus />
                <span>Add More Line Item</span>
              </Button> */}
            </div>
            <div className="w-full flex flex-col justify-start items-start  overflow-x-scroll ">
              <Separator />

              <div className="w-[1000px] grid grid-cols-9 gap-1  justify-end items-center pt-4">
                {lineItemFeildList({ index: 0 })?.map((field,i) => (
                  <FormLabel key={i} className="dark:text-white font-medium">
                    {field?.label}
                    {field?.required && (
                      <span className="text-red-500"> *</span>
                    )}
                  </FormLabel>
                ))}
              </div>
              {fields?.map((_, index) => (
                <div key={index} className="w-[1000px] grid grid-cols-9 gap-2  justify-center items-end">
                  {lineItemFeildList({ index })?.map((field,i) =>
                    
                      <FormField
                        key={i}
                        name={field?.name}
                        control={methodsQCS.control}
                        render={({ field: FormField }) => (
                          <FormItem>
                            <br />
                            <FormControl>
                              <Input
                                {...FormField}
                                inputMode="numeric"
                                placeholder={field.placeholder}
                                {...methodsQCS.register(field?.name, {
                                  onBlur: (_) => {
                                    setFormData(values as Partial<T>);
                                  },
                                  onChange: (_) => {
                                    // Custom logic for handling onChange event
                                  

                                    
                                    if (
                                      field?.name.includes("quotedPrice") ||
                                      field?.name.includes("qty")
                                    ) {
                                      const fieldIndex = parseInt(
                                        field?.name.split(".")[1]
                                      ); // Extract index from field name
                                      const qty =
                                        methodsQCS.getValues(
                                          `lineItems.${fieldIndex}.qty`
                                        ) || 0;
                                      const quotedPrice =
                                        methodsQCS.getValues(
                                          `lineItems.${fieldIndex}.quotedPrice`
                                        ) || 0;
  
                                      methodsQCS.setValue(
                                        `lineItems.${fieldIndex}.quotedAmount`,
                                        qty * quotedPrice
                                      );
                                    }
                                    if (
                                      field?.name.includes("finalPrice1") ||
                                      field?.name.includes("qty")
                                    ) {
                                      const fieldIndex = parseInt(
                                        field?.name.split(".")[1]
                                      ); // Extract index from field name
                                      const qty =
                                        methodsQCS.getValues(
                                          `lineItems.${fieldIndex}.qty`
                                        ) || 0;
                                      const finalPrice =
                                        methodsQCS.getValues(
                                          `lineItems.${fieldIndex}.finalPrice1`
                                        ) || 0;
  
                                      methodsQCS.setValue(
                                        `lineItems.${fieldIndex}.total`,
                                        qty * finalPrice
                                      );
                                    }

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
                    
                  )}
                </div>
              ))}
            </div>
            {/* <div className="w-full">
              <TableView columns={columns} data={values?.lineItems} />
            </div> */}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default memo(InvoiceLineItemCrudFormManager);
