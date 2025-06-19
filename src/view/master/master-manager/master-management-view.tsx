//master-management-view

import { CircleCheck, Download, Edit, Filter, Plus, Trash, Trash2 } from "lucide-react";
import BrowserHeader from "../../../components/browser-header";
import { Button } from "../../../components/ui/button";
import { lazy, Suspense, useEffect, useMemo, useReducer, useState } from "react";
import {  cn, handleDownloadFileWithCustomHeader } from "../../../lib/utils";
import FilterView, {
  FieldProps,
} from "../../../components/filter-component-view";
import { TableView } from "../../../components/table-view";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ZodRawShape } from "zod";
import { useQueryGenerator } from "../../../hooks/use-query";
import { DialogFooter, DialogHeader,Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle, } from "../../../components/ui/dialog";
import { useDeleteMutation } from "../../../hooks/use-mutation";
import { toast } from "../../../components/ui/use-toast";
import { format } from "date-fns";
const MasterManagementCrudForm = lazy(
  () => import("./master-management-crud-form")
) as typeof import("./master-management-crud-form").default;

export type FieldData<T extends Record<string, unknown>> = {
  validation: ZodRawShape;
  initialValues: Partial<T>;
  fields: FieldProps<T>[];
  optionalKey?: string;
};

type Props<
  TData extends { id: string | number },
  T extends Record<string, unknown>
> = {
  filterFormFieldData: FieldData<T>;
  setFilterFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  title: string;
  GET_URL: string;
  tableColumns: ColumnDef<TData>[];
  formFieldData: FieldData<T>;
  formData: Partial<T>;
  filterFormData: Partial<T>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  initialData?: TData[];
  isAccess?: boolean;
  ADD_DATA: string;
  UPDATE_DATA: string;
  DELETE_DATA: string;
  queryKey: string;
  showDownloadButton?: boolean;
  excelFile?: {
    title: string;
    name: string;
    columnsHeader: {
      key: string;
      header: string;
    }[];
  };
  setCrudActionValue?: React.Dispatch<React.SetStateAction<string | null>>;

};

function MasterManagementView<
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
  UPDATE_DATA,
  DELETE_DATA,
  queryKey,
  showDownloadButton,
  excelFile,
  setCrudActionValue

}: Props<TData, T>) {
  const [showFilter, handleFilterVisibility] = useReducer(
    (state) => !state,
    false
  );
  const [open, handleDraworState] = useReducer(
    (state): boolean => !state,
    false
  );
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  const [action, setAction] = useState<string | null>(null);
  const { data } = useQueryGenerator({
    queryKey,
    url: GET_URL,
    params: { ...filterFormData },
    headers: {},
  });
  const deleteMutation = useDeleteMutation<any>({
    // url: DELETE_DATA,
    url: `${DELETE_DATA}?id=${selectedId}`,
    queryKey,
  });
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  //   // state point
  //   const [pagination, setPagination] = useState({
  //     pageNo: 0,
  //     size: 0,
  //   });

  // handle Crud action
  const handleEdit = (data: TData) => {
    setAction("edit");
    setSelectedId(data.id);
    const formKeys = formFieldData?.initialValues;
    const optionalKey = formFieldData?.optionalKey;
    Object.keys(formKeys)?.forEach((key) =>
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

  const handleDelete = (id: null | number | string) => {
    setSelectedId(id);
    setOpenDeleteConfirm((pre) => !pre);
    // setAction("delete");
    // const formKeys = formFieldData?.initialValues;
    // const optionalKey = formFieldData?.optionalKey;
    // Object.keys(formKeys)?.map((key) =>
    //   setFormData((pre: Partial<T>) => ({
    //     ...pre,
    //     [key]:
    //     Array.isArray(optionalKey) && optionalKey[0] === key
    //     ? (data as Record<string, unknown>)[optionalKey[1]]
    //     : (data as Record<string, unknown>)[key],
    //   }))
    // );
    // handleDraworState();
  };
  const handleDeleteConfirm = () => {
    deleteMutation?.mutate({});
  };

  const handleAddNew = () => {
    setAction("create");
    setSelectedId(null);
    const formKeys = formFieldData?.initialValues;
    Object.keys(formKeys)?.map((key) =>
      setFormData((pre: Partial<T>) => ({
        ...pre,
        [key]: key === "type" ? pre[key] : null,
      }))
    );
    handleDraworState();
  };

  //   const handleRefetch = () => {
  //     fetchData(GET_URL, "GET", pagination);
  //   }
  //   useMemo(() => {
  //     fetchData(GET_URL, "GET", pagination);
  //   }, [GET_URL, pagination]);

  useEffect(() => {
      const message =  deleteMutation?.data?.message ?? '';
      const isSuccess =  deleteMutation?.data?.isSuccess;
      if( deleteMutation?.isSuccess){
        if(isSuccess){
  
          toast({
            icon: <CircleCheck />,
            bgColor: "bg-green-500",
            title: message ?? "An error occurred",
          });
          setOpenDeleteConfirm(false)
        }else{
          toast({
            icon: <CircleCheck />,
            bgColor: "bg-red-500",
            title: message ?? "An error occurred",
          });
        }
      }
    },[ deleteMutation?.isSuccess])

  const columns = useMemo(() => {
    if (tableColumns?.length > 0) {
      const columnsGenerator: ColumnDef<TData>[] = [...(tableColumns || [])];

      if (isAccess) {
        columnsGenerator.unshift({
          accessorKey: "action",
          header: "Action",
          cell: ({ row }: { row: Row<TData> }) => {
            const data = row.original;

            return (
              <div className="w-full">
                <div className="flex gap-1">
                  <Edit
                    className="text-gray-500 h-4 w-4 cursor-pointer"
                    onClick={() => handleEdit(data)}
                  />
                  <Trash2
                    className="text-red-500 h-4 w-4 cursor-pointer"
                    onClick={() => handleDelete(data?.id)}
                  />
                </div>
              </div>
            );
          },
        });
      }

      return columnsGenerator;
    }
  }, [tableColumns, isAccess]);

  const excelData = useMemo(() => {
    

    const dataFormat =data?.data?.content?.length > 0 ? data?.data?.content?.map((item: any) =>
      Object.keys(item)?.includes("createdOn")
        ? {
            ...item,
            createdOn: item.createdOn ? format(item.createdOn,
              "dd-MM-yyyy p"
            ) : item.createdOn,
          }
          : item
    ) : []
    
    return dataFormat?.map((item: any) =>
      Object.keys(item)?.includes("modifiedOn")
        ? {
            ...item,
            modifiedOn: item.modifiedOn ? format(item.modifiedOn ,
              "dd-MM-yyyy p"
            ) : item.modifiedOn,
          }
        : Object.keys(item)?.includes("createdOn")
        ? console.log('sel')
        
        : item
     ) || data?.data?.content;
  }, [data?.data?.content]);

  useMemo(() => {
    if (setCrudActionValue) {
      setCrudActionValue(action);
    }
  }, [action]);

  return (
    <div className="w-full  sm:h-[calc(100%-50px)] flex flex-col">
      <BrowserHeader
        title={title}
        description=""
        children={
          <div className="flex justify-end">
            {showDownloadButton && (
                  <Button
                    onClick={() =>
                      excelFile &&
                      handleDownloadFileWithCustomHeader({
                        dataToExport: excelData ?? [],
                        title: excelFile.title,
                        fileName: `${excelFile.name}.xlsx`,
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
            <Button
              onClick={handleFilterVisibility}
              className=" me-2"
              variant={"outline"}
            >
              <Filter size={16} />
              <span className="hidden md:flex">Filter</span>
            </Button>
            {isAccess && (
              <Button onClick={handleAddNew} className="flex items-center">
                <Plus /> <span className="hidden md:flex">Add New</span>
              </Button>
            )}
          </div>
        }
      />
      <div
        className={cn(`w-full  flex flex-col sm:flex-row gap-2 pt-2 h-full`)}
      >
        <div className="w-full  h-full  flex flex-col gap-2">
          {showFilter && (
            <FilterView
              filterFieldData={filterFormFieldData}
              setFormData={setFilterFormData}
              formData={filterFormData}
              queryKey={queryKey}
              GET_SEARCH_URL={ADD_DATA}
            />
          )}
          <div className="w-full h-full ">
            <div className="">
              <TableView
                data={data?.data?.content ?? []}
                columns={columns || []}
                showFilters={true}
              />
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Suspense fallback={<div>loading...</div>}>
          <MasterManagementCrudForm<T>
            ADD_DATA={ADD_DATA}
            UPDATE_DATA={UPDATE_DATA}
            DELETE_DATA={DELETE_DATA}
            action={action}
            open={open}
            handleDraworState={handleDraworState}
            setFormData={setFormData}
            selectedId={selectedId}
            formFieldData={formFieldData}
            fields={formFieldData.fields}
            formData={formData}
            queryKey={queryKey}
          />
        </Suspense>
      )}
      
        <Dialog
          open={openDeleteConfirm}
          onOpenChange={() => setOpenDeleteConfirm((pre) => !pre)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex justify-start items-center gap-1"><Trash /> Delete Confirm</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Are you sure you want to delete data permenatly ?
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => handleDelete(null)} variant={"outline"}>
                Cancel
              </Button>
              <Button variant={'destructive'} onClick={handleDeleteConfirm}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      
    </div>
  );
}

export default MasterManagementView;
