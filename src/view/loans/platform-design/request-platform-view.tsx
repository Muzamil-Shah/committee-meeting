//master-management-view

import {
  CalendarCheck,
  CalendarCogIcon,
  Download,
  Edit,
  Eye,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Suspense, useEffect, useMemo, useReducer, useState } from "react";
import {
  arrayToDate,
  cn,
  extractValueOutOfArrayOfObjects,
  handleDownloadFileWithCustomHeader,
} from "../../../lib/utils";
import { FieldProps } from "../../../components/filter-component-view";
import { TableView } from "../../../components/table-view";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ZodRawShape } from "zod";
import {
  useConditionalQuery,
  useQueryGenerator,
} from "../../../hooks/use-query";
import BrowserHeader from "../../../components/browser-header";
import FilterView from "../component/filter-view";
import { usePostMutation } from "../../../hooks/use-mutation";
import { GET_REQUEST_WITH_ID } from "../../../lib/endpoint";
import { MutationResponse } from "./qcs-crud-form-manager";
import { format } from "date-fns";
import { useFormOpening } from "../../../contexts/FormOpening";
import CommitteePlatformCrudCollapsibleForm from "./committee-platform-crud-collapsible-form";
import MeetingPlatformCrudCollapsibleForm from "./meeting-platform-crud-collapsible-form";
import MyInboxPlatform from "./my-inbox-platform";

export type FieldData<T extends Record<string, unknown>> = {
  validation: ZodRawShape;
  initialValues: Partial<T>;
  fields: FieldProps<T>[];
  optionalKey?: Record<string, string[]>;
};

export type QueryResponse = {
  timeStamp: number;
  data: {
    data: any | null;
    status: boolean | null;
    errorObject: any | null;
    msg: string | null;
  };
  message: string | null;
  isSuccess: boolean;
  statusCode: number;
};
interface IAddButton {
  visible: boolean;
  label: string;
}

type Props<
  TData extends { id: string | number },
  T extends Record<string, unknown>
> = {
  filterFormFieldData: FieldData<{ search: string }>;
  setFilterFormData: React.Dispatch<
    React.SetStateAction<Partial<{ search: string }>>
  >;
  title: string;
  GET_URL: string;
  tableColumns: ColumnDef<TData>[];
  formFieldData: FieldData<T>;
  formData: Partial<T>;
  filterFormData: Partial<{ search: string }>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  initialData?: TData[];
  isAccess?: boolean;
  ADD_DATA: string;
  UPDATE_DATA: string;
  DELETE_DATA: string;
  queryKey: string;
  addBtn?: IAddButton;
  showDownloadButton?: boolean;
  description: string;
  openForm?: boolean;
  setCrudActionValue?: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveField?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  excelFile?: {
    title: string;
    name: string;
    columnsHeader: {
      key: string;
      header: string;
    }[];
  };
};

function RequestPlatformView<
  T extends Record<string, unknown>,
  TData extends { id: string | number }
>({
  title,
  filterFormFieldData,
  tableColumns,
  formFieldData,
  setFilterFormData,
  filterFormData,
  setFormData,
  formData,
  isAccess = true,
  GET_URL,
  ADD_DATA,
  queryKey,
  showDownloadButton = true,
  description = "View and manage your request here.",
  openForm,
  setCrudActionValue,
  setActiveField,
  excelFile,
  addBtn,
  initialData,
  UPDATE_DATA,
  DELETE_DATA,
}: Props<TData, T>) {
  const tab = localStorage.getItem("tab");
  const { isFormOpening } = useFormOpening();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const openAddNew = queryParams.get("open");
  // const path = location.pathname + location.hash.replace("#", ""); // For hash-based routing
  // const lastSegment = path.split("/").pop();

  // const [showFilter, handleFilterVisibility] = useReducer(
  //   (state) => !state,
  //   false
  // );
  const [open, handleDraworState] = useReducer(
    (state): boolean => !state,
    false
  );
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectUniqueNumber, setSelectUniqueNumber] = useState<string | null>(
    null
  );

  const [action, setAction] = useState<
    | "create"
    | "edit"
    | "delete"
    | "action"
    | "view"
    | "query"
    | "reschedule"
    | null
  >(null);
  const { data } = useQueryGenerator({
    queryKey,
    url: GET_URL,
    params: {},
    headers: {},
  });

  const addMutation = usePostMutation<MutationResponse>({
    url: ADD_DATA,
    queryKey: "first-request",
  });

  const { data: DetailsData, refetch: refetchDetails } =
    useConditionalQuery<QueryResponse>({
      url: GET_REQUEST_WITH_ID,
      queryKey: "request-details",
      params: {
        uniqueNumber: selectUniqueNumber,
      },
      enabled: selectUniqueNumber ? "uniqueNumber" : "",
      // staleTime: 0,
    });

  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  // handle Crud action

  const handleEdit = (data: TData & { uniqueNumber: string }) => {
    setAction("edit");
    setSelectedId(data.id);
    setSelectUniqueNumber(data?.uniqueNumber ?? null);
    const formKeys = formFieldData?.initialValues;
    const optionalKey = formFieldData?.optionalKey;
    const updatedFormData: Record<string, any> = {};
    Object.keys(formKeys)?.forEach((key) => {
      const field = formFieldData.fields.find((field) => field.name === key);
      if (
        optionalKey &&
        Array.isArray(optionalKey[key]) &&
        optionalKey[key]?.length > 0
      ) {
        updatedFormData[key] = extractValueOutOfArrayOfObjects(
          data,
          optionalKey[key]
        );
      } else {
        const value: any = data[key as keyof typeof data];
        updatedFormData[key] = value;
      }
      if (field?.fieldType === "date" && updatedFormData[key]) {
        updatedFormData[key] = new Date(updatedFormData[key]);
      }
    });
    setFormData((prevState) => ({ ...prevState, ...updatedFormData }));
    handleDraworState();
  };
  const handleView = (data: TData & { uniqueNumber: string }) => {
    setAction("view");
    setSelectedId(data.id);
    setSelectUniqueNumber(data?.uniqueNumber ?? null);
    const formKeys = formFieldData?.initialValues;
    const optionalKey = formFieldData?.optionalKey;
    const updatedFormData: Record<string, any> = {};
    Object.keys(formKeys)?.forEach((key) => {
      const field = formFieldData.fields.find((field) => field.name === key);
      if (
        optionalKey &&
        Array.isArray(optionalKey[key]) &&
        optionalKey[key]?.length > 0
      ) {
        updatedFormData[key] = extractValueOutOfArrayOfObjects(
          data,
          optionalKey[key]
        );
      } else {
        const value: any = data[key as keyof typeof data];
        updatedFormData[key] = value;
      }
      if (field?.fieldType === "date" && updatedFormData[key]) {
        updatedFormData[key] = new Date(updatedFormData[key]);
      }
    });
    setFormData((prevState) => ({ ...prevState, ...updatedFormData }));
    handleDraworState();
  };
  const handleReschedule = (data: TData & { uniqueNumber: string }) => {
    setAction("reschedule");
    setSelectedId(data.id);
    setSelectUniqueNumber(data?.uniqueNumber ?? null);
    const formKeys = formFieldData?.initialValues;
    const optionalKey = formFieldData?.optionalKey;
    const updatedFormData: Record<string, any> = {};
    Object.keys(formKeys)?.forEach((key) => {
      const field = formFieldData.fields.find((field) => field.name === key);
      if (
        optionalKey &&
        Array.isArray(optionalKey[key]) &&
        optionalKey[key]?.length > 0
      ) {
        updatedFormData[key] = extractValueOutOfArrayOfObjects(
          data,
          optionalKey[key]
        );
      } else {
        const value: any = data[key as keyof typeof data];
        updatedFormData[key] = value;
      }
      if (field?.fieldType === "date" && updatedFormData[key]) {
        updatedFormData[key] = new Date(updatedFormData[key]);
      }
    });
    setFormData((prevState) => ({ ...prevState, ...updatedFormData }));
    handleDraworState();
  };

  const handleDelete = (data: TData) => {
    setAction("delete");
    setSelectedId(data?.id);
    const formKeys = formFieldData?.initialValues;
    const optionalKey = formFieldData?.optionalKey;
    Object.keys(formKeys)?.map((key) =>
      setFormData((pre: Partial<T>) => ({
        ...pre,
        [key]:
          Array.isArray(optionalKey) && optionalKey[0] === key
            ? (data as Record<string, unknown>)[optionalKey[1]]
            : (data as Record<string, unknown>)[key],
      }))
    );
    handleDraworState();
  };

  console.log({ selectedId });

  const handleAddNew = () => {
    setSelectUniqueNumber(null);
    setAction("create");
    setSelectedId(null);
    setSelectedTab(null);
    const formKeys = formFieldData?.initialValues;
    Object.keys(formKeys)?.map((key) =>
      setFormData((pre: Partial<T>) => ({
        ...pre,
        [key]: ["timeSchedule"]?.includes(key)
          ? [
              {
                start_date: null,
                end_date: null,
              },
            ]
          : null,
      }))
    );
    handleDraworState();
  };

  useMemo(() => {
    const data = DetailsData?.data?.data;

    if (selectUniqueNumber && data) {
      const formKeys = formData;

      const optionalKey = formFieldData?.optionalKey;
      Object.keys(formKeys)?.forEach((key) =>
        setFormData((pre: Partial<T>) => ({
          ...pre,
          [key]:
            Array.isArray(optionalKey) && optionalKey[0] === key
              ? (data as Record<string, unknown>)[optionalKey[1]]
              : ["attachments"]?.includes(key)
              ? JSON.parse((data as Record<string, unknown>)[key] as string)
                  ?.attachments
              : ["remarks"]?.includes(key)
              ? ""
              : (data as Record<string, unknown>)[key],
        }))
      );

      if (setActiveField) {
        setActiveField({
          email: !!data?.vendorEmail,
          contact: !!data?.vendorContactNo,
          typeOfVendor: !!data?.typeOfVendor,
          natureOfService: !!data?.natureOfServices,
        });
      }
    }
  }, [DetailsData?.data?.data, setActiveField]);

  const columns = useMemo(() => {
    if (tableColumns?.length > 0) {
      const columnsGenerator: ColumnDef<TData>[] = [...(tableColumns || [])];

      if (isAccess) {
        columnsGenerator.push({
          accessorKey: "action",
          header: "Action",
          cell: ({ row }: { row: Row<TData> }) => {
            const data: any = row.original;

            return (
              <div className="w-full  ">
                <div className="flex gap-1">
                  {title === "My Inbox" ? (
                    <div className="flex items-center justify-center ">
                      <Button
                        size={"sm"}
                        onClick={() => handleView(data)}
                        variant={"link"}
                        className="flex justify-center items-center gap-2"
                      >
                        <CalendarCheck /> Open Meeting
                      </Button>
                      {/* )} */}
                    </div>
                  ) : (
                    <>
                      <Eye
                        className="text-blue-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleView(data)}
                      />
                      <Edit
                        className="text-gray-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleEdit(data)}
                      />
                      <Trash2
                        className="text-red-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleDelete(data)}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          },
        });
      } else {
        columnsGenerator.unshift({
          accessorKey: "sNo",
          header: "",
          cell: ({ row }: { row: Row<TData> }) => {
            const data: any = row.original;

            return (
              <div className="w-28">
                <div
                  className="w-full text-blue-400 flex justify-start items-center gap-1"
                  // to={
                  //   `/loan-details`
                  // }
                >
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => handleReschedule(data)}
                  >
                    {" "}
                    <CalendarCogIcon />
                  </Button>
                </div>
              </div>
            );
          },
        });
        columnsGenerator.push({
          accessorKey: "action",
          header: "Action",
          cell: ({ row }: { row: Row<TData> }) => {
            const data: any = row.original;

            return (
              <div className="w-full  ">
                <div className="flex gap-1">
                  {data?.status ? (
                    <div className="flex items-center justify-center ">
                      {/* <Eye
                        className="text-blue-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleView(data)}
                      /> */}

                      {/* {user &&
                      hasPermission(user, "builder", "create", data) ? (
                        <Button
                          size={"sm"}
                          onClick={() => handleTakeAction(data)}
                          variant={"link"}
                          className="flex justify-center items-center gap-2"
                        >
                          {data?.id}{" "}
                          <Send
                            className="text-gray-500 h-4 w-4 cursor-pointer"
                            // onClick={() => handleTakeAction(data)}
                          />
                        </Button>
                      ) : (
                        // <Send
                        //   className="text-gray-500 h-4 w-4 cursor-pointer"
                        //   onClick={() => handleTakeAction(data)}
                        // /> */}
                      <Button
                        size={"icon"}
                        onClick={() => handleView(data)}
                        variant={"ghost"}
                        className="flex justify-center items-center gap-2"
                      >
                        <CalendarCogIcon />
                      </Button>
                      {/* )} */}
                    </div>
                  ) : (
                    <>
                      <Eye
                        className="text-blue-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleView(data)}
                      />
                      <Edit
                        className="text-gray-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleEdit(data)}
                      />
                      <Trash2
                        className="text-red-500 h-4 w-4 cursor-pointer"
                        onClick={() => handleDelete(data)}
                      />
                    </>
                  )}
                </div>
              </div>
            );
          },
        });
      }

      return columnsGenerator;
    }
  }, [tableColumns, isAccess]);

  // useEffect(() => mutate({ status: "all" }), []);

  useMemo(() => {
    if (filterFormData?.search) {
      // refetch({
      //   search: filterFormData?.search,
      //   typeOfRequest:
      //     lastSegment === "vendor-creation-request"
      //       ? "Vendor Creation"
      //       : lastSegment === "purchase-indent-request"
      //       ? "Purchase Indent"
      //       : lastSegment === "vendor-renewal-request"
      //       ? "Vendor Renewal"
      //       : null,
      // });
    }
  }, [filterFormData?.search]);

  useMemo(() => {
    if (selectUniqueNumber) refetchDetails();
  }, [selectUniqueNumber]);

  useEffect(() => {
    if (tab) {
      setSelectedTab(tab);
    } else {
      setSelectedTab("all");
    }
  }, [tab]);

  useMemo(() => {
    const isSuccess = addMutation?.data?.isSuccess!;

    if (isSuccess) {
    }
  }, [addMutation?.data?.isSuccess]);
  console.log({ selectUniqueNumber });

  useMemo(async () => {
    // When openForm === "yes", trigger add new

    if (isFormOpening) {
      setTimeout(() => {
        handleAddNew();
      }, 100); // Optional delay
    }
  }, [isFormOpening, openForm]); // Ensure the dependency is correct

  useMemo(() => {
    if (setCrudActionValue) {
      setCrudActionValue(action);
    }
  }, [action]);

  const excelData = useMemo(() => {
    const dataFormat = data?.data?.data?.map((item: any) =>
      Object.keys(item)?.includes("createdOn")
        ? {
            ...item,
            createdOn:
              item.createdOn?.lenght > 0
                ? format(
                    arrayToDate(item.createdOn as number[]),
                    "MM/dd/yyyy :mm"
                  )
                : format(item?.createdOn, "dd-MM-yyyy p"),
          }
        : item
    );

    return dataFormat?.map((item: any) =>
      Object.keys(item)?.includes("modifiedOn")
        ? {
            ...item,
            modifiedOn:
              item.modifiedOn?.lenght > 0
                ? format(
                    arrayToDate(item.modifiedOn as number[]),
                    "dd-MM-yyyy p"
                  )
                : format(item?.modifiedOn, "dd-MM-yyyy p"),
          }
        : Object.keys(item)?.includes("createdOn")
        ? console.log("sel")
        : item
    );
  }, [data?.data?.data]);

  console.log({ open });

  return (
    <>
      <div className="w-full relative  sm:h-[calc(100%-50px)] flex flex-col space-y-2">
        <BrowserHeader
          title={title}
          description={description}
          children={
            <div className="w-full flex items-center    justify-end gap-2">
              <FilterView
                filterFieldData={filterFormFieldData}
                setFormData={setFilterFormData}
                formData={filterFormData}
                queryKey={queryKey}
                GET_SEARCH_URL={ADD_DATA}
              />
              {showDownloadButton && (
                <Button
                  onClick={() =>
                    excelFile &&
                    handleDownloadFileWithCustomHeader({
                      dataToExport: excelData ?? [],
                      title: excelFile.title,
                      fileName: `${selectedTab + "-" + excelFile.name}.xlsx`,
                      headers: excelFile.columnsHeader,
                    })
                  }
                  variant={"outline"}
                  size={"sm"}
                  className="flex justify-center items-center gap-2"
                >
                  <Download size={16} />
                  <span className="hidden md:flex">Export</span>
                </Button>
              )}

              {/* <Button
                  onClick={handleFilterVisibility}
                  variant={"outline"}
                  size={"sm"}
                  className="flex justify-center items-center gap-2"
                >
                  <Filter size={16} />
                  <span className="hidden md:flex">Show Filter</span>
                </Button> */}
              {addBtn?.visible && (
                <Button
                  onClick={handleAddNew}
                  variant={"default"}
                  size={"sm"}
                  className="flex justify-center items-center gap-2"
                >
                  <Plus size={16} />
                  <span className="hidden md:flex">{addBtn?.label}</span>
                </Button>
              )}

              <div className="hidden md:flex">
                {/* <ModeToggle /> */}
              </div>
            </div>
          }
        />

        <div
          className={cn(`w-full  flex flex-col sm:flex-row gap-2 pt-2 h-full`)}
        >
          <div className="w-full  h-full  flex flex-col gap-2 space-y-3">
            <div className="w-full h-full ">
              {/* {isPending ? (
                <TableLoader />
              ) : ( */}
              <TableView
                data={data?.data?.content ?? initialData}
                columns={columns || []}
                showFilters={true}
              />
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Suspense fallback={<div></div>}>
          {title === "My Inbox" ? (
            <MyInboxPlatform
              ADD_DATA={ADD_DATA}
              UPDATE_DATA={UPDATE_DATA}
              DELETE_DATA={DELETE_DATA}
              action={action}
              open={open}
              handleDrawerState={handleDraworState}
              setFormData={setFormData as any}
              selectedId={selectedId}
              formFieldData={formFieldData as any}
              fields={formFieldData.fields as any}
              formData={formData}
              queryKey={queryKey}
              title={
                DetailsData?.data?.data?.workitemNumber
                  ? `${title} (${DetailsData?.data?.data?.workitemNumber})`
                  : title
              }
            />
          ) : title === "Committee" ? (
            <CommitteePlatformCrudCollapsibleForm
              ADD_DATA={ADD_DATA}
              UPDATE_DATA={UPDATE_DATA}
              DELETE_DATA={DELETE_DATA}
              action={action}
              open={open}
              handleDraworState={handleDraworState}
              setFormData={setFormData as any}
              selectedId={selectedId}
              formFieldData={formFieldData as any}
              fields={formFieldData.fields as any}
              formData={formData}
              queryKey={queryKey}
              title={
                DetailsData?.data?.data?.workitemNumber
                  ? `${title} (${DetailsData?.data?.data?.workitemNumber})`
                  : title
              }
            />
          ) : (
            <MeetingPlatformCrudCollapsibleForm
              ADD_DATA={ADD_DATA}
              UPDATE_DATA={UPDATE_DATA}
              DELETE_DATA={DELETE_DATA}
              action={action}
              open={open}
              handleDrawerState={handleDraworState}
              setFormData={setFormData as any}
              selectedId={selectedId}
              formFieldData={formFieldData as any}
              fields={formFieldData.fields as any}
              formData={formData}
              queryKey={queryKey}
              title={
                DetailsData?.data?.data?.workitemNumber
                  ? `${title} (${DetailsData?.data?.data?.workitemNumber})`
                  : title
              }
            />
          )}
        </Suspense>
      )}
    </>
  );
}

export default RequestPlatformView;
