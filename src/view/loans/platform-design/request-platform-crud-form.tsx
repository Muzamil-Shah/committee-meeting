import { useCallback, useEffect, useMemo } from "react";
import {
  FieldProps,
  MemoizedFieldComponent,
} from "../../../components/filter-component-view";
import { string, z, ZodRawShape } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { CircleCheck, Edit, Eye, Plus, Trash } from "lucide-react";
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
import { MutationResponse } from "../../login/component/login-form";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Separator } from "../../../components/ui/separator";

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

function RequestPlatformCrudForm<T extends Record<string, unknown>>({
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
  title,
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
      if (action?.includes("create")) {
        addMutation.mutate({ id: selectedId, ...data });
      } else if (action?.includes("edit") && selectedId) {
        updateMutation.mutate({ id: selectedId, ...data });
      } else if (action?.includes("delete") && selectedId) {
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
      addMutation?.data?.status! ??
      updateMutation?.data?.status! ??
      deleteMutation?.data?.status;
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

  
  return (
    <Sheet open={open} onOpenChange={handleDraworState}>
      <SheetContent
        side="top"
        className="pb-7 h-screen w-[100%] md:w-[80%] md:ml-[20%] overflow-auto scroll-main bg-secondary"
      >
        <SheetHeader className="mb-3">
          <div className="flex justify-start items-center gap-2">
            <Button variant={"ghost"} className="p-0 m-0" size={"sm"}>
              <ArrowLeftIcon />
            </Button>
            <div className="flex flex-col justify-start items-start">
              <SheetTitle>{`Generate ${title}`}</SheetTitle>
              <SheetDescription>
                {`Generate request for ${title} by filling these fields`}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full h-[calc(100%-4rem)] flex flex-col justify-between space-y-4 pb-4"
          >
            <div className="rounded shadow  p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-end">
              {formFieldData.fields.map((field) =>
                
                  <MemoizedFieldComponent
                    key={field.name as string}
                    field={{...field,disabled:action === 'view' ? true : field.disabled} as FieldProps<Record<string, unknown>>}
                    setFormData={setFormData}
                  />
              )}
            </div>
            <div className="space-y-3">
              <Separator />
              <div className="flex justify-end items-center gap-2 pb-3">
                <Button
                  onClick={handleDraworState}
                  variant={"outline"}
                  size={"sm"}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size={"sm"}
                  className="flex items-center gap-1 "
                  disabled={action === 'view'}
                >
                  {action?.includes("create") ? (
                    <Plus size={16} />
                  ) : action?.includes("edit") ? (
                    <Edit size={16} />
                  ) : action?.includes("delete") ? (
                    <Trash size={16} />
                  ) : action?.includes("view") ? (
                    <Eye size={16} />
                  ) : (
                    ""
                  )}{" "}
                  <span>
                    {action?.includes("create")
                      ? "Submit"
                      : action?.includes("edit")
                      ? "Update"
                      : action?.includes("delete")
                      ? "Delete"
                      : action?.includes("view")
                      ? "View Mode"
                      : ""}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}

export default RequestPlatformCrudForm;
