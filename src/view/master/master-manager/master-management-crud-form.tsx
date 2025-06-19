import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FieldProps,
  MemoizedFieldComponent,
} from "../../../components/filter-component-view";
import { string, z, ZodRawShape } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { CircleCheck, Edit, Plus, Trash } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import {
  useDeleteMutation,
  usePostMutation,
  usePutMutation,
} from "../../../hooks/use-mutation";
import { toast } from "../../../components/ui/use-toast";
import { Confirm } from "../../../components/dialog-popup/confirm";
import { MutationResponse } from "../../loans/platform-design/qcs-crud-form-manager";

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
};

function MasterManagementCrudForm<T extends Record<string, unknown>>({
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
  open,
}: Props<T>) {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [confirmDescription, setConfirmDescription] = useState<string | null>(
    null
  );
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

  const formSchema = useMemo(
    () => z.object(formFieldData.validation),
    [formFieldData.validation]
  );

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formFieldData.initialValues,
  });

  const { reset } = methods;
  useEffect(() => {
    reset({ ...formFieldData.initialValues, ...formData });
  }, [formData, reset, formFieldData.initialValues]);

  const onSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      for (const key in data) {
        if (data[key as keyof typeof string] === "") {
          delete data[key as keyof typeof string];
        }
      }
      console.log("value here");
      
      if (action?.includes("create")) {
        
          addMutation.mutate({ ...data });
        
      } else if (action?.includes("edit") && selectedId) {
        console.log({ UPDATE_DATA, data, selectedId });
        updateMutation.mutate({ id: selectedId, ...data, type: null });
      } else if (action?.includes("delete") && selectedId) {
        console.log({ DELETE_DATA, data, selectedId });
        deleteMutation?.mutate({ id: selectedId });
      }
    },
    [formSchema]
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
    const flagForDuplicateHOD =
      addMutation?.data?.data?.data?.flagForDuplicateHOD! ??
      updateMutation?.data?.data?.data?.flagForDuplicateHOD! ??
      deleteMutation?.data?.data?.data?.flagForDuplicateHOD;
    if (
      addMutation?.isSuccess ||
      updateMutation?.isSuccess ||
      deleteMutation?.isSuccess
    ) {
      if (isSuccess) {
        if (flagForDuplicateHOD) {
          setConfirmDescription(message);
          setOpenConfirm(true);
        } else {
          toast({
            icon: <CircleCheck />,
            bgColor: "bg-green-500",
            title: message ?? "An error occurred",
          });
          handleDraworState();
        }
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
console.log(methods?.formState?.errors);

  return (
    <Sheet open={open} onOpenChange={handleDraworState}>
      <SheetContent side="right" className="pb-7 overflow-auto scroll-main">
        <SheetHeader className="mb-3">
          <SheetTitle>Add/Update Master</SheetTitle>
          <SheetDescription>
            Fill the details to Create/Update Master.
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <div className="grid grid-cols-1 gap-2">
              {formFieldData.fields.map((field) => (
                <MemoizedFieldComponent
                  key={field.name as string}
                  field={field as FieldProps<Record<string, unknown>>}
                  setFormData={setFormData}
                />
              ))}
            </div>
            <div className="flex justify-center space-x-2">
              <Button
                onClick={handleDraworState}
                variant={"outline"}
                className="w-full dark:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                color="success"
                className="flex items-center gap-1 w-full"
              >
                {action?.includes("create") ? (
                  <Plus size={16} />
                ) : action?.includes("edit") ? (
                  <Edit size={16} />
                ) : action?.includes("delete") ? (
                  <Trash size={16} />
                ) : (
                  ""
                )}{" "}
                <span>
                  {action?.includes("create")
                    ? "Create"
                    : action?.includes("edit")
                    ? "Update"
                    : action?.includes("delete")
                    ? "Delete"
                    : ""}
                </span>
              </Button>
            </div>
            {openConfirm && (
              <Confirm
                isOpen={openConfirm}
                dialogTitle={"Think and Confirm"}
                dialogDescription={confirmDescription || ""}
                buttonName="Agree"
                onClose={() => setOpenConfirm(false)}
                triggerButtonVariant="primary"
                onConfirm={() => {onSubmit({ ...formData, addDuplicateHODFlag: "1" })}}
              />
            )}
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}

export default MasterManagementCrudForm;
