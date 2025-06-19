import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  ChartSpline,
  Check,
  ChevronsUpDown,
  Download,
  Eye,
  EyeIcon,
  EyeOffIcon,
  File,
  Search,
  Trash,
  Upload,
  CalendarIcon,
} from "lucide-react";
import React, {
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  cn,
  extractMatchesAsString,
  getBase64,
  handleDownloadFile,
} from "../lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "./ui/use-toast";
import { useUser } from "../contexts/user-context";
import { usePostMutation } from "../hooks/use-mutation";
import {
  DELETED_UPLOAD_DATA,
  GET_UPLOAD_DATA,
  UPLOAD_DATA,
} from "../lib/endpoint";
import { useConditionalQuery } from "../hooks/use-query";
import { MutationResponse } from "../view/loans/platform-design/qcs-crud-form-manager";
import { Link } from "react-router-dom";
import UploadLoader from "./loading/upload-loader";
import CustomCalendar from "./date-calander";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Empty from "./empty";
import { Switch } from "./ui/switch";
import { DocumentFileShap } from "../types/Data";

// Define reusable field types and props
export type FieldProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string | JSX.Element;
  fieldType:
    | "textarea"
    | "radio"
    | "multiSelect"
    | "combobox"
    | "select"
    | "date"
    | "date-with-year"
    | "checkbox"
    | "file"
    | "password"
    | "text"
    | "text-editor"
    | "section"
    | "switch";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
  extraValidation?: (data: any) => boolean;
  queryKey?: string;
  isString?: boolean;
  isUppercase?: boolean;
  pastNotAllow?: boolean;
  action?: string;
  formDataValue?: any;
};

type FilterFieldData<T extends Record<string, unknown>> = {
  validation: z.ZodRawShape;
  initialValues: Partial<T>;
  fields: FieldProps<T>[];
};

type Props<T extends Record<string, unknown>> = Readonly<{
  filterFieldData: FilterFieldData<T>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  initialData?: T[];
  formData: Partial<T>;
  downloadFileName?: string;
  showDownloadButton?: boolean;
  tempFlagForSLA?: boolean;
  GET_SEARCH_URL: string;
  queryKey: string;
}>;

function FilterView<T extends Record<string, unknown>>({
  filterFieldData,
  setFormData,
  formData,
  initialData,
  downloadFileName,
  showDownloadButton = true,
  tempFlagForSLA = false,
}: Props<T>) {
  const formSchema = useMemo(
    () => z.object(filterFieldData.validation),
    [filterFieldData.validation]
  );

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...filterFieldData.initialValues, ...formData },
  });

  const { reset } = methods;
  useEffect(() => {
    reset({ ...filterFieldData.initialValues, ...formData });
  }, [formData, reset, filterFieldData.initialValues]);

  const onSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      setFormData((pre) => ({ ...pre, ...data }));
    },
    [formSchema]
  );

  return (
    <div className="w-full bg-background  rounded-2xl shadow-lg p-4">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterFieldData.fields.map((field) => (
              <MemoizedFieldComponent
                key={field.name}
                field={field}
                setFormData={setFormData}
              />
            ))}
          </div>
          <div className="flex justify-center space-x-2">
            <Button
              type="submit"
              variant="outline"
              className="flex items-center gap-1"
            >
              <Search size={16} /> <span>Search</span>
            </Button>
            {showDownloadButton && (
              <Button
                type="button"
                className="flex items-center gap-1"
                onClick={() =>
                  handleDownloadFile({
                    dataToExport: initialData ?? [],
                    title: "Reports",
                    fileName: `${
                      downloadFileName ? downloadFileName : "report"
                    }.xlsx`,
                  })
                }
              >
                <Download size={16} /> <span>Download Excel</span>
              </Button>
            )}
            {tempFlagForSLA && (
              <a
                href="public/report.xlsx"
                download
                className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 flex items-center gap-1"
              >
                <Download size={16} /> <span>Download Excel</span>
              </a>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default FilterView;

// Memoized Field Component to avoid unnecessary re-renders

export const MemoizedFieldComponent = React.memo(
  <T extends Record<string, unknown>>({
    field,
    setFormData,
    formData,
  }: {
    field: FieldProps<T>;
    formData?: Partial<T>;
    setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Render appropriate input based on fieldType
    const renderField = useMemo(() => {
      console.count("form");
      switch (field.fieldType) {
        case "section":
          return <SectionField label={field.label} />;
        case "text-editor":
          return (
            <TextEditorField<T>
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              setFormData={setFormData}
              required={field.required}
              disabled={field.disabled}
            />
          );
        case "text":
          return (
            <InputField<T>
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              setFormData={setFormData}
              required={field.required}
              disabled={field.disabled}
              extraValidation={field?.extraValidation}
              isString={field?.isString}
              isUppercase={field?.isUppercase}
              pastNotAllow={field?.pastNotAllow}
            />
          );
        case "password":
          return (
            <PasswordField<T>
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              setFormData={setFormData}
              required={field.required}
              disabled={field.disabled}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
              pastNotAllow={field?.pastNotAllow}
            />
          );
        case "file":
          return (
            <FileInput<T>
              name={field.name}
              label={field.label}
              required={field.required}
              disabled={field.disabled}
              setFormData={setFormData}
              formData={formData}
              action={field?.action}
            />
          );
        case "checkbox":
          return (
            <CheckboxField<T>
              name={field.name}
              label={field.label}
              setFormData={setFormData}
            />
          );
        case "switch":
          return (
            <SwitchField<T>
              name={field.name}
              label={field.label}
              setFormData={setFormData}
              disabled={field.disabled}
            />
          );
        case "date-with-year":
          return (
            <DateNewField<T>
              name={field.name}
              label={field.label}
              required={field?.required}
              setFormData={setFormData}
              disabled={field.disabled}
              formDataValue={field?.formDataValue}
            />
          );
        case "date":
          return (
            <DateField<T>
              name={field.name}
              label={field.label}
              setFormData={setFormData}
              disabled={field.disabled}
            />
          );
        case "select":
          return (
            <SelectField<T>
              name={field.name}
              label={field.label}
              options={field.options}
              setFormData={setFormData}
            />
          );

        case "combobox":
          return (
            <Combobox<T>
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              setFormData={setFormData}
              required={field.required}
              disabled={field.disabled}
              options={field.options}
              isString={field?.isString}
            />
          );
        case "multiSelect":
          return (
            <ComboboxMultipleSelect<T>
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              setFormData={setFormData}
              required={field.required}
              disabled={field.disabled}
              options={field.options}
            />
          );

        case "radio":
          return (
            <RadioField<T>
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              setFormData={setFormData}
              required={field.required}
              disabled={field.disabled}
            />
          );
        case "textarea":
          return (
            <TextAreaField<T>
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              setFormData={setFormData}
              required={field.required}
              disabled={field.disabled}
            />
          );
        default:
          return null;
      }
    }, [field, setFormData, showPassword]);

    return <>{renderField}</>;
  }
) as <T extends Record<string, unknown>>(props: {
  field: FieldProps<T>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => JSX.Element;

// Individual Field Components
const SectionField = ({ label }: { label: string | JSX.Element }) => {
  return (
    <div className="sticky w-full -top-0 bg-background  h-12 left-0 md:col-span-3 flex flex-col justify-start items-start gap-2  my-2 mt-4 z-50 ">
      <span className=" p-1 font-semibold text-base">{label}</span>
      <Separator />
    </div>
  );
};

const TextEditorField = <T extends Record<string, unknown>>({
  name,
  label,
  placeholder,
  setFormData,
  required,
  disabled,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="col-span-1 sm:col-span-2 lg:col-span-3">
          <FormLabel className=" font-medium   text-xs ">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            <ReactQuill
              placeholder={placeholder}
              {...field}
              theme="snow"
              value={field.value}
              className="bg-background "
              onChange={(e) => {
                const value = e;
                field.onChange(value);
                setFormData((prev) => ({ ...prev, [name]: value }));
              }}
              readOnly={disabled}
            />
          </FormControl>
          <FormMessage className="text-[10px] font-medium" />
        </FormItem>
      )}
    />
  );
};
const InputField = <T extends Record<string, unknown>>({
  name,
  label,
  placeholder,
  setFormData,
  required,
  disabled,
  isString,
  isUppercase,
  pastNotAllow,
  extraValidation,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="dark:text-white font-medium ">
              {label}
              {required && <span className="text-red-500"> *</span>}
            </FormLabel>
          )}
          {/* <br /> */}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              onPaste={(e) => (pastNotAllow ? e.preventDefault() : null)}
              onChange={(e) => {
                const value = isUppercase
                  ? e.target.value.toUpperCase()
                  : e.target.value;
                // Handle potential number conversion
                const parsedValue = isString
                  ? value
                  : value !== ""
                  ? isString
                    ? value
                    : isNaN(Number(value))
                    ? value // Keep as string if not a valid number
                    : Number(value)
                  : value; // Convert to number if it is a valid numeric string

                const isExtraValidation =
                  extraValidation && extraValidation(value);
                if (name?.split(".")?.length > 2) {
                  setFormData((pre) => ({
                    ...pre,
                    [name?.split(".")[0]]: (
                      pre[name?.split(".")[0]] as unknown[]
                    )?.map((item: any, i: number) =>
                      i === Number(name?.split(".")[1])
                        ? {
                            ...item,
                            description: parsedValue,
                          }
                        : item
                    ),
                  }));
                } else {
                  if (extraValidation) {
                    if (isExtraValidation) {
                      field.onChange(parsedValue);
                      setFormData((prev) => ({ ...prev, [name]: parsedValue }));
                    }
                  } else {
                    field.onChange(parsedValue);
                    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
                  }
                }
              }}
              className="h-9"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};

const PasswordField = <T extends Record<string, unknown>>({
  name,
  label,
  placeholder,
  setFormData,
  required,
  disabled,
  showPassword,
  setShowPassword,
  pastNotAllow,
}: Omit<FieldProps<T>, "fieldType"> & {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white font-medium">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
                {...field}
                onPaste={(e) => (pastNotAllow ? e.preventDefault() : null)}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  setFormData((prev) => ({ ...prev, [name]: value }));
                }}
                className="h-9"
                disabled={disabled}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
              >
                {showPassword && !disabled ? (
                  <EyeIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FileInput = <T extends Record<string, unknown>>({
  name,
  label,
  setFormData,
  required,
  disabled,
  queryKey,
  action,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  formData?: Partial<T>;
}) => {
  const { control, resetField, getValues } = useFormContext();
  const { user } = useUser();
  const [docIndexDeleted, setDocIndexDeleted] = useState<
    number | string | null
  >(null);
  const [file, setFile] = useState<{
    documentExtension: string;
    documentName: string;
  } | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const { data, isPending } = usePostMutation<{
    timeStamp: number;
    data: {
      data: number;
      status: string;
      errorObject: null;
      msg: string;
    };
    message: string;
    isSuccess: boolean;
    statusCode: number;
  }>({
    url: UPLOAD_DATA,
    queryKey: queryKey ?? "upload",
  });
  const {
    data: deleteData,
    isPending: isDeleteIde,
    mutate: DeleteMutate,
  } = usePostMutation<{
    timeStamp: number;
    data: {
      data: number;
      status: string;
      errorObject: null;
      msg: string;
    };
    message: string;
    isSuccess: boolean;
    statusCode: number;
  }>({
    url: DELETED_UPLOAD_DATA,
    queryKey: "delete",
  });

  const { data: documentData, refetch } = useConditionalQuery<MutationResponse>(
    {
      url: GET_UPLOAD_DATA,
      queryKey: queryKey ?? "upload",
      params: {
        docType: name,
        uniqueNumber: user?.uniqueNumber,
      },
      enabled: user?.uniqueNumber && getValues(name) ? "uniqueNumber" : "",
    }
  );

  // const { data: documentData, refetch } = useConditionalQuery<MutationResponse>(
  //   {
  //     url: GET_UPLOAD_DATA,
  //     queryKey: queryKey ?? "upload",
  //     params: {
  //       docType: name,
  //       uniqueNumber: user?.uniqueNumber,
  //       docIndex: data?.data?.data,
  //     },
  //     enabled: (data?.data?.data && user?.uniqueNumber) || user?.uniqueNumber ? "uniqueNumber" : "",
  //   }
  // );

  const handleDeleteData = (docInx: string | number) => {
    setDocIndexDeleted(docInx);
    DeleteMutate({ docIndex: docInx });
  };

  useEffect(() => {
    if (data?.data?.status === "success") {
      toast({
        title: data?.data?.msg ?? "Document added successfully",
        bgColor: "bg-green-500",
      });
      refetch();
    } else if (data?.data?.status === "error") {
      toast({
        title: data?.data?.msg ?? "Document is not created",
        bgColor: "bg-red-500",
      });
    }
  }, [data?.data?.status]);

  useMemo(() => {
    if (deleteData?.data?.msg === "success") {
      setFormData((prev: Partial<T>) => ({
        ...prev,
        [name]: prev[name]
          ? Array.isArray(prev[name])
            ? prev[name]?.filter(
                (item: DocumentFileShap) => item?.docIndex !== docIndexDeleted
              )
            : undefined
          : undefined,
      }));
      setFile(null);
      resetField(name);
      toast({
        title: data?.data?.msg ?? "Document Deleted successfully",
        bgColor: "bg-green-500",
      });
      refetch();
    }
  }, [deleteData]);
  // useMemo(() => {
  //   if (user?.uniqueNumber) {
  //     refetch();
  //   }
  // }, [user?.uniqueNumber]);

  useEffect(() => {
    if (data?.data?.data && file) {
      const fileShap: DocumentFileShap = {
        documentName: file?.documentName!,
        documentExtension: file?.documentExtension!,
        docIndex: data?.data?.data,
      };

      setFormData((prev: Partial<T>) => ({
        ...prev,
        [name]: prev[name] ? [...(prev as any)[name], fileShap] : [fileShap],
      }));
    }
  }, [data?.data?.data]);
  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className=" font-medium   ">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            {/* <input
              type="file"
              {...field}
              className="
                            disabled:bg-gray-100 border border-gray-400 dark:disabled:opacity-100 dark:disabled:bg-gray-800"
              disabled={disabled}
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  field.onChange(files[0]);
                  setFormData((pre: Partial<T>) => ({ ...pre, [name]: files[0] }));
                }
              }}
            /> */}
            <div className="relative">
              <Input
                type="input"
                // {...field}
                // value={
                //   field?.value?.length > 0
                //     ? field?.value
                //         ?.map((item: { documentName: string }) => item?.documentName)
                //         ?.join(",")
                //     : ""
                // }
                value={""}
                className=" 
                            disabled:opacity-100 h-8 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800  placeholder:text-slate-900 placeholder:font-thin"
                disabled={true}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                {...field}
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-primary font-semibold"
                onClick={() => fileRef.current?.click()}
                disabled={disabled}
              >
                <Upload className="w-5 h-4" /> UPLOAD
                <input
                  // multiple
                  // {...field}
                  ref={fileRef}
                  hidden
                  type="file"
                  onChange={(e) => {
                    const filesObject = e.target.files;

                    // Ensure filesObject is not null before processing
                    if (!filesObject) {
                      return;
                    }

                    const files = Array.from(filesObject); // Safely convert FileList to an array

                    const maxFileSize = 30 * 1024 * 1024;

                    const processFiles = async () => {
                      const documentList = await Promise.all(
                        files.map(async (file) => {
                          if (file.size > maxFileSize) {
                            toast({
                              bgColor: "bg-red-500",
                              title: "File too large",
                            });
                            return null;
                          }
                          try {
                            const result = (await getBase64(file)) as string;
                            const base64 = result.split(",")[1];
                            return {
                              documentName: extractMatchesAsString(
                                file.name?.split(".")[0]
                              ),
                              documentExtension: file.name?.split(".")[1],
                              encodedBytes: base64,
                              uniqueNumber: user?.uniqueNumber,
                              docType: name,
                            };
                          } catch (err) {
                            console.error(err);
                            return null;
                          }
                        })
                      );

                      const validDocuments = documentList.filter(
                        (doc) => doc !== null
                      );

                      setFile(validDocuments[0]);
                      const fileShap: DocumentFileShap = {
                        documentName: validDocuments[0]?.documentName!,
                        documentExtension: validDocuments[0]?.documentExtension!,
                        docIndex: 1,
                      };
                      setFormData((prev: Partial<T>) => ({
                        ...prev,
                        [name]: prev[name] ? [...(prev as any)[name], fileShap] : [fileShap],
                      }));
                      // mutate(validDocuments[0]);
                    };

                    processFiles();
                    e.target.value = "";
                  }}
                />
              </Button>
            </div>
          </FormControl>
          <div className="w-full flex flex-wrap justify-start items-start gap-1">
            {isPending ? (
              <UploadLoader />
            ) : (
              field?.value?.length > 0 ? <div className="w-full flex justify-between items-center">
                <span>{field?.value?.length} Attachments</span>
                <Dialog>
                  <DialogTrigger>
                    <Button
                      variant={"link"}
                      size={"sm"}
                      type="button"
                      className="flex justify-center items-center gap-1"
                    >
                      <Eye className="text-xs" />{" "}
                      <span className="hidden md:block">View</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex justify-start items-center gap-2">
                        <div className="rounded-full bg-secondary flex justify-center items-center p-2 text-primary">
                          <File />
                        </div>{" "}
                        Document List
                      </DialogTitle>
                      <DialogDescription className="flex flex-col justify-start items-start gap-2">
                        
                        {field?.value
                          ? Array.isArray(field?.value)
                            ? field?.value?.map(
                                (item: any, i: number) => (
                                  <div
                                    key={i}
                                    className="w-full rounded-xl p-1 flex justify-between items-center gap-1 bg-secondary"
                                  >
                                    <span className="flex justify-end items-center gap-2">
                                      <ChartSpline className="w-4 h-4" />{" "}
                                      <span className="text-sm font-medium">
                                        {item?.documentName +
                                          "." +
                                          item?.documentExtension}
                                      </span>
                                    </span>
                                    <span className="flex justify-end items-center gap-2">
                                      {item?.createdBy === user?.username &&
                                        (["create", "query"]?.includes(
                                          action as string
                                        ) ||
                                          !action) && (
                                          <Button
                                            type="button"
                                            variant={"ghost"}
                                            size={"sm"}
                                            className="p-0 m-0 text-destructive"
                                            disabled={
                                              isDeleteIde ||
                                              item?.createdBy !== user?.username
                                            }
                                            onClick={() =>
                                              handleDeleteData(item?.docIndex)
                                            }
                                          >
                                            <Trash className="w-5 h-5" />
                                          </Button>
                                        )}
                                      <Link
                                        target="blank"
                                        to={`http://apps.bpaassolutions.com:8080/omnidocs/WebApiRequestRedirection?Application=ViewDocument&cabinetName=forbesprod&sessionIndexSet=false&sessionIndexSet&enableDCInfotrue&S=S&DocumentId=${item?.docIndex}`}
                                      >
                                        <Eye className="text-blue-500" />
                                      </Link>
                                    </span>
                                  </div>
                                )
                              )
                            : field?.value?.documentName && (
                                <div className="w-full rounded-xl p-1 flex justify-between items-center gap-1 bg-secondary">
                                  <span className="flex justify-end items-center gap-2">
                                    <ChartSpline className="w-4 h-4" />{" "}
                                    <span className="text-sm font-medium">
                                      {field?.value?.documentName +
                                        "." +
                                        field?.value?.documentExtension}
                                    </span>
                                  </span>
                                  <span className="flex justify-end items-center gap-2">
                                    <Button
                                      type="button"
                                      variant={"ghost"}
                                      size={"sm"}
                                      className="p-0 m-0 text-destructive"
                                      disabled={isDeleteIde}
                                      onClick={() =>
                                        handleDeleteData(field?.value?.docIndex)
                                      }
                                    >
                                      <Trash className="w-5 h-5" />
                                    </Button>
                                    <Link
                                      target="blank"
                                      to={`http://apps.bpaassolutions.com:8080/omnidocs/WebApiRequestRedirection?Application=ViewDocument&cabinetName=forbesprod&sessionIndexSet=false&sessionIndexSet&enableDCInfotrue&S=S&DocumentId=${field?.value?.docIndex}`}
                                    >
                                      <Eye className="text-blue-500" />
                                    </Link>
                                  </span>
                                </div>
                              )
                          : documentData?.data?.data?.length > 0 ? 
                            documentData?.data?.data?.map(
                              (item: any, i: number) => (
                                <div
                                  key={i}
                                  className="w-full rounded-xl p-1 flex justify-between items-center gap-1 bg-secondary"
                                >
                                  <span className="flex justify-end items-center gap-2">
                                    <ChartSpline className="w-4 h-4" />{" "}
                                    <span className="text-sm font-medium">
                                      {item?.documentName +
                                        "." +
                                        item?.documentExtension}
                                    </span>
                                  </span>
                                  <span className="flex justify-end items-center gap-2">
                                    <Button
                                      type="button"
                                      variant={"ghost"}
                                      size={"sm"}
                                      className="p-0 m-0 text-destructive"
                                      disabled={
                                        isDeleteIde ||
                                        item?.createdBy !== user?.username
                                      }
                                      onClick={() =>
                                        handleDeleteData(item?.docIndex)
                                      }
                                    >
                                      <Trash className="w-5 h-5" />
                                    </Button>
                                    <Link
                                      target="blank"
                                      to={`http://apps.bpaassolutions.com:8080/omnidocs/WebApiRequestRedirection?Application=ViewDocument&cabinetName=forbesprod&sessionIndexSet=false&sessionIndexSet&enableDCInfotrue&S=S&DocumentId=${item?.docIndex}`}
                                    >
                                      <Eye className="text-blue-500" />
                                    </Link>
                                  </span>
                                </div>
                              )
                            ) :  <div className="w-full h-36 flex flex-col justify-center items-center">
                              <Empty />
                              <p className="font-semibold text-lg text-zinc-500 mb-5">
                                No Documents Uploaded.
                              </p>
                            </div>}
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>: null
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
const CheckboxField = <T extends Record<string, unknown>>({
  name,
  label,
  setFormData,
  required,
  disabled,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white font-medium">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            <Checkbox
              {...field}
              onCheckedChange={(e) => {
                const value = e;
                field.onChange(value);
                setFormData((pre: Partial<T>) => ({ ...pre, [name]: value }));
              }}
              className="dark:text-white
                            disabled:bg-gray-100 border border-gray-400 dark:disabled:opacity-100 dark:disabled:bg-gray-800"
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const DateField = <T extends Record<string, unknown>>({
  name,
  label,
  required,
  disabled,
  setFormData,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();
  const [year, setYear] = React.useState<number | undefined>(
    new Date().getFullYear()
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  React.useEffect(() => {
    if (currentMonth.getFullYear() !== year) {
      setYear(currentMonth?.getFullYear());
    }
  }, [currentMonth, year]);

  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white font-normal">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            <Popover>
              <PopoverTrigger
                asChild
                className="w-full flex justify-start h-10"
              >
                <Button
                  variant={"outline"}
                  className={`${
                    !field?.value
                      ? "focus-visible:outline-gray-400 disabled:opacity-100 disabled:bg-gray-100 border border-gray-400 dark:disabled:opacity-100 dark:disabled:bg-gray-800 focus-visible:border focus-visible:border-gray-400 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-0 w-full flex justify-start h-7"
                      : "border border-gray-400 px-4 py-0 w-full flex justify-start disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800 h-7"
                  }`}
                  disabled={disabled}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 dark:text-white" />
                  <span className="dark:text-white">
                    {field?.value ? (
                      format(field?.value, "PPP")
                    ) : (
                      <span className="dark:text-white">Select Date</span>
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <div className="mb-2 flex justify-between items-center">
                  <span className="font-medium">Year:</span>
                  <Select
                    value={year?.toString()}
                    onValueChange={(yearVal) => {
                      const yearNumber = parseInt(yearVal, 10);
                      setYear(yearNumber);
                      setCurrentMonth(
                        new Date(yearNumber, currentMonth.getMonth(), 1)
                      );
                    }}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((yr) => (
                        <SelectItem key={yr} value={yr.toString()}>
                          {yr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Calendar */}
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(d) => {
                    field.onChange(d);
                    setFormData((pre: Partial<T>) => ({ ...pre, [name]: d }));
                  }}
                  month={currentMonth} // Bind dynamic current month
                  onMonthChange={(newMonth) => {
                    setCurrentMonth(newMonth); // Update state when month changes
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const DateNewField = <T extends Record<string, unknown>>({
  name,
  label,
  required,
  disabled,
  setFormData,
  formDataValue,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      name={name as string}
      control={control}
      disabled={disabled}
      render={({ field }) => {
        console.log("new value", field?.value, new Date(field?.value));

        return (
          <FormItem>
            <FormLabel className="dark:text-white font-medium">
              {label}
              {required && <span className="text-red-500"> *</span>}
            </FormLabel>
            <br />
            <FormControl>
              <CustomCalendar
                props={field}
                value={formDataValue ? new Date(formDataValue) : undefined}
                disabled={disabled}
                onChange={(date: Date | undefined) => {
                  console.log("dd-MM-yyyy p", { date });

                  setFormData((prev) => ({
                    ...prev,
                    [name]: date ? format(date, "dd-MM-yyyy p") : undefined,
                  }));
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

const SelectField = <T extends Record<string, unknown>>({
  name,
  label,
  options,
  required,
  disabled,
  setFormData,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white font-medium">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            <Select
              {...field}
              onValueChange={(e) => {
                const value = e;
                field.onChange(value);
                setFormData((pre: Partial<T>) => ({ ...pre, [name]: value }));
              }}
              value={field.value}
              disabled={disabled}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select"
                  className="dark:text-white border border-gray-400
                            disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800 font-medium h-8"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options?.map((option: { value: string; label: string }) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  )) || null}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const RadioField = <T extends Record<string, unknown>>({
  name,
  label,
  options,
  required,
  disabled,
  setFormData,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white font-medium">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            <RadioGroup
              {...field}
              onValueChange={(e) => {
                const value = e;
                field.onChange(value);
                setFormData((pre: Partial<T>) => ({ ...pre, [name]: value }));
              }}
              value={field.value}
              disabled={disabled}
              className="dark:text-white border border-gray-400
                            disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800 font-medium h-8"
            >
              {options?.map((option: { value: string; label: string }) => (
                <RadioGroupItem key={option.value} value={option.value}>
                  {option.label}
                </RadioGroupItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
const SwitchField = <T extends Record<string, unknown>>({
  name,
  label,
  required,
  disabled,
  setFormData,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field }) => (
        <FormItem className="flex justify-start items-center gap-2">
          <FormLabel className="dark:text-white font-medium pt-2 ">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>

          <FormControl>
            <Switch
              checked={field?.value}
              onCheckedChange={(e) => {
                const value = e;
                field.onChange(value);
                setFormData((pre: Partial<T>) => ({ ...pre, [name]: value }));
              }}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const TextAreaField = <T extends Record<string, unknown>>({
  name,
  label,
  placeholder,
  required,
  disabled,
  setFormData,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name as string}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white font-medium">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value);
                setFormData((pre: Partial<T>) => ({ ...pre, [name]: value }));
              }}
              disabled={disabled}
              className="dark:text-white border border-gray-400
                            disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800 font-medium h-8"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const Combobox = <T extends Record<string, unknown>>({
  name,
  label,
  required,
  disabled,
  placeholder,
  options,
  setFormData,
  isString,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <FormLabel className=" font-medium    ">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  {...field}
                  className="h-9 w-full  overflow-hidden flex justify-between "
                >
                  <p className="line-clamp-1">
                    {field.value
                      ? options?.find(
                          (option: { value: string | number; label: string }) =>
                            option.value === field.value
                        )?.label
                      : placeholder}
                  </p>
                  <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command className="">
                  <CommandInput
                    placeholder={`Search ${(
                      label as string
                    ).toLowerCase()} ...`}
                  />
                  <CommandList>
                    <CommandEmpty>
                      No {(label as string).toLowerCase()} found.
                    </CommandEmpty>
                    <CommandGroup>
                      {options?.map(
                        (option: { value: string | number; label: string }) => (
                          <CommandItem
                            key={option.value}
                            {...field}
                            value={option?.value?.toString()}
                            onSelect={(currentValue) => {
                              const parsedValue = isString
                                ? currentValue
                                : isNaN(Number(currentValue))
                                ? currentValue // Use string if not a number
                                : Number(currentValue); // Convert to number if possible
                              field.onChange(
                                parsedValue === field.value ? "" : parsedValue
                              );

                              if (name?.split(".")?.length === 2) {
                                setFormData((pre: Partial<T>) => {
                                  const key = name?.split(".")[0];
                                  const subKey = name?.split(".")[1];

                                  if (!key || !subKey) return pre; // Fallback in case keys are invalid

                                  return {
                                    ...pre,
                                    [key]: {
                                      ...(pre[key] || {}),
                                      [subKey]:
                                        parsedValue === field.value
                                          ? ""
                                          : parsedValue,
                                    },
                                  };
                                });
                              } else {
                                setFormData((pre: Partial<T>) => ({
                                  ...pre,
                                  [name]:
                                    parsedValue === field.value
                                      ? ""
                                      : parsedValue,
                                }));
                              }
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-5 w-5",
                                field.value === option.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option.label}
                          </CommandItem>
                        )
                      )}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ComboboxMultipleSelect = <T extends Record<string, unknown>>({
  name,
  label,
  required,
  disabled,
  placeholder,
  options,
  setFormData,
}: Omit<FieldProps<T>, "fieldType"> & {
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
}) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white font-medium">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </FormLabel>
          <br />
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className="w-full flex justify-between dark:text-white border border-gray-400 disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800 font-medium  overflow-hidden text-wrap h-auto"
                >
                  {field.value &&
                  Array.isArray(field.value) &&
                  field.value.length > 0
                    ? field.value
                        .map(
                          (value: string | number) =>
                            options?.find((option) => option.value === value)
                              ?.label
                        )
                        .join(", ")
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput
                    placeholder={`Search ${(
                      label as string
                    ).toLowerCase()} ...`}
                  />
                  <CommandList>
                    <CommandEmpty>
                      No {(label as string).toLowerCase()} found.
                    </CommandEmpty>
                    <CommandGroup>
                      {options?.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={String(option.value)} // Ensure value is a string
                          onSelect={() => {
                            const selectedValue = isNaN(Number(option.value))
                              ? option.value
                              : Number(option.value);

                            const newValue = Array.isArray(field.value)
                              ? field.value.includes(selectedValue)
                                ? field.value.filter(
                                    (val: string | number) =>
                                      val !== selectedValue
                                  )
                                : [...field.value, selectedValue]
                              : [selectedValue];

                            field.onChange(newValue);
                            setFormData((prev: Partial<T>) => ({
                              ...prev,
                              [name]: newValue,
                            }));
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-5 w-5",
                              Array.isArray(field.value) &&
                                field.value.includes(option.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
