import React, {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { FieldProps } from "../../../components/filter-component-view";
import { z, ZodRawShape } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { CircleCheck, Command, Plus, View } from "lucide-react";
import {
  useDeleteMutation,
  usePostMutation,
  usePutMutation,
} from "../../../hooks/use-mutation";
import { toast } from "../../../components/ui/use-toast";

import { MutationResponse } from "./qcs-crud-form-manager";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";

import { inboxAgendaColumns, inboxNFAColumns } from "../my-inbox/columns";
import { ColumnDef, Row } from "@tanstack/react-table";
import { InboxAgendaI, InboxNFAI } from "../my-inbox/type";
import { useMeeting } from "../../../contexts/MeetingProvider";
import { IMeeting } from "../meetings/type";
import { Label } from "../../../components/ui/label";
import { format } from "date-fns";
import { TableView } from "../../../components/table-view";
import { useInbox } from "../../../contexts/inbox-context";

const MinutesOfMeetingView = lazy(
  () => import("../component/minutes-of-meeting")
);
const CommentDialog = lazy(() => import("../component/comment-dialog"));

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
  handleDrawerState: React.DispatchWithoutAction;
  formFieldData: FieldData<T>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  queryKey: string;
  title: string;
};

function MyInboxPlatformCrudCollapsibleForm<T extends Record<string, unknown>>({
  formFieldData,
  setFormData,
  action,
  ADD_DATA,
  UPDATE_DATA,
  DELETE_DATA,
  selectedId,
  formData,
  handleDrawerState,
  queryKey,
  title,
  open,
}: Props<T>) {
  const { inbox } = useInbox();
  const { setMeetings } = useMeeting();
  const [openComment, handleCommentDialog] = useReducer(
    (state): boolean => !state,
    false
  );
  const [openMOM, handleMOMView] = useReducer(
    (state): boolean => !state,
    false
  );
  const [commentTitle, setCommentTitle] = useState<string>("");
  const [selectedNFAOrAgenda, setSelectedNFAOrAgenda] = useState<number | null>(
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
    mode: "onBlur",
  });

  const { reset, handleSubmit } = methods;

  const [searchParams, setSearchParams] = useSearchParams();

  const handleAddMeeting = (values: Record<string, unknown>) => {
    const meeting = values as any as IMeeting;
    console.log({ formData, meeting });

    if (action === "create") {
      setMeetings((prev) => [...prev, { ...meeting, id: prev?.length + 1 }]);
    } else if (action === "delete") {
      setMeetings((prev) => prev?.filter((el) => el?.id !== selectedId));
    } else if (action === "edit") {
      setMeetings((prev) =>
        prev?.map((el) => (el?.id === selectedId ? { ...el, ...meeting } : el))
      );
    } else if (action === "reschedule") {
      setMeetings((prev) =>
        prev?.map((el) => (el?.id === selectedId ? { ...el, ...meeting } : el))
      );
    }
    reset();
    handleDrawerState();
  };

  console.log({ formData }, methods?.getValues());

  useEffect(() => {
    reset({ ...formFieldData.initialValues, ...formData });
  }, [formData, reset, formFieldData.initialValues]);

  useEffect(() => {
    const message =
      addMutation?.data?.message ??
      updateMutation?.data?.message ??
      deleteMutation?.data?.message ??
      "";
    const isSuccess =
      addMutation?.data?.isSuccess ??
      updateMutation?.data?.isSuccess ??
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
        handleDrawerState();
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

  const inboxData = useMemo(() => {
    return inbox?.find((item) => item.id === selectedId);
  }, [selectedId, inbox]);

  const columnsInboxNFA = useMemo(() => {
    if (inboxNFAColumns?.length > 0) {
      const columnsGenerator: ColumnDef<InboxNFAI>[] = [
        ...(inboxNFAColumns || []),
      ];

      columnsGenerator.push({
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: { row: Row<InboxNFAI> }) => {
          const data = row.original;

          return (
            <div className="w-full  ">
              <div className="flex gap-1">
                <div className="flex items-center justify-center ">
                  <Button
                    type="button"
                    onClick={() => {
                      setCommentTitle("NFA Details");
                      setSelectedNFAOrAgenda(data?.id);
                      handleCommentDialog();
                    }}
                    variant="outline"
                  >
                    <Command /> Take Action
                  </Button>

                  {/* )} */}
                </div>
              </div>
            </div>
          );
        },
      });

      return columnsGenerator;
    }
  }, [inboxNFAColumns]);
  const columnsInboxAgenda = useMemo(() => {
    if (inboxAgendaColumns?.length > 0) {
      const columnsGenerator: ColumnDef<InboxAgendaI>[] = [
        ...(inboxAgendaColumns || []),
      ];

      columnsGenerator.push({
        accessorKey: "action",
        header: "Action",
        cell: ({ row }: { row: Row<InboxAgendaI> }) => {
          const data = row?.original;
          return (
            <div className="w-full  ">
              <div className="flex gap-1">
                <div className="flex items-center justify-center ">
                  <Button
                    type="button"
                    onClick={() => {
                      setCommentTitle("Agenda Details");
                      setSelectedNFAOrAgenda(data?.id);
                      handleCommentDialog();
                    }}
                    variant="outline"
                  >
                    <Command /> Take Action
                  </Button>

                  {/* )} */}
                </div>
              </div>
            </div>
          );
        },
      });

      return columnsGenerator;
    }
  }, [inboxAgendaColumns]);

  return (
    <>
      <Dialog open={open} onOpenChange={handleDrawerState}>
        <DialogTitle aria-description="Form">{title}</DialogTitle>
        <DialogContent className="min-w-[80%] max-h-[90%]  z-50 px-10">
          <div className="w-full max-h-[450px] flex flex-col space-y-2 overflow-y-auto p-2">
            <h1 className="text-xl font-semibold">
              {action === "view"
                ? "View"
                : action === "edit"
                ? "Edit"
                : action === "delete"
                ? "Delete"
                : "Create"}{" "}
              Meeting Inbox
            </h1>
            {!openComment && !openMOM && (
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(handleAddMeeting)}
                  className="w-full flex flex-col justify-between space-y-4 pb-4"
                >
                  <div className="w-full bg-secondary p-2 flex justify-between items-center">
                    <h3 className="font-bold text-sm md:text-base text-foreground">
                      Meeting Details
                    </h3>
                    <Button variant={"link"} size={"sm"} className="flex gap-1">
                      <View />
                      View Document
                    </Button>
                  </div>
                  <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
                    <div className="flex flex-col justify-start items-start gap-1">
                      <Label>Title</Label>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {inboxData?.meeting?.title}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-1">
                      <Label>Subject</Label>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {inboxData?.meeting?.subject}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-1">
                      <Label>Description</Label>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {inboxData?.meeting?.description}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-2">
                      <Label>Time Schedule</Label>
                      <div className="w-full">
                        <div className="w-full grid grid-cols-2">
                          <p className="border rounded-tl p-2">Start Date</p>
                          <p className="border rounded-tr p-2">End Date</p>
                        </div>
                        {inboxData?.meeting?.timeSchedule &&
                          inboxData?.meeting?.timeSchedule?.length > 0 &&
                          inboxData?.meeting?.timeSchedule?.map((time) => (
                            <div className="grid grid-cols-2">
                              <p className="text-xs md:text-sm text-muted-foreground border p-2">
                                {format(time.start_date!, "dd-MM-yyyy p")}
                              </p>
                              <p className="text-xs md:text-sm text-muted-foreground border p-2">
                                {format(time.end_date!, "dd-MM-yyyy p")}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-secondary p-2 flex justify-between items-center">
                    <h3 className="font-bold text-sm md:text-base text-foreground">
                      NFA Details
                    </h3>
                    <Button variant={"link"} size={"sm"} className="flex gap-1">
                      <View />
                      View Document
                    </Button>
                  </div>
                  <div className="w-full grid grid-cols-1 p-3">
                    <div className="w-full h-full ">
                      {/* {isPending ? (
                              <TableLoader />
                            ) : ( */}
                      <TableView
                        data={inboxData?.nfa ?? []}
                        columns={columnsInboxNFA || []}
                        showFilters={true}
                      />
                      {/* )} */}
                    </div>
                  </div>
                  <div className="w-full bg-secondary p-2 flex justify-between items-center">
                    <h3 className="font-bold text-sm md:text-base text-foreground">
                      Agenda Details
                    </h3>
                  </div>
                  <div className="w-full grid grid-cols-1 p-3">
                    <div className="w-full h-full ">
                      {/* {isPending ? (
                              <TableLoader />
                            ) : ( */}
                      <TableView
                        data={inboxData?.agenda ?? []}
                        columns={columnsInboxAgenda || []}
                        showFilters={true}
                      />
                      {/* )} */}
                    </div>
                  </div>
                  <div className="w-full bg-secondary p-2 flex justify-between items-center">
                    <h3 className="font-bold text-sm md:text-base text-foreground">
                      Minutes Of Meeting
                    </h3>
                  </div>
                  <div className="w-full grid grid-cols-1 p-3">
                    <div className="w-full h-full ">
                      <div className="w-full">
                        <div className="w-full grid grid-cols-3">
                          <p className="border rounded-tl p-2">Start Date</p>
                          <p className="border rounded-tr p-2">End Date</p>
                          <p className="border rounded-tr p-2">MoM</p>
                        </div>
                        {inboxData?.meeting?.timeSchedule &&
                          inboxData?.meeting?.timeSchedule?.length > 0 &&
                          inboxData?.meeting?.timeSchedule?.map((time) => (
                            <div className="grid grid-cols-3">
                              <p className="text-xs md:text-sm text-muted-foreground border p-2">
                                {format(time.start_date!, "dd-MM-yyyy p")}
                              </p>
                              <p className="text-xs md:text-sm text-muted-foreground border p-2">
                                {format(time.end_date!, "dd-MM-yyyy p")}
                              </p>
                              <p className="text-xs md:text-sm text-muted-foreground border p-2">
                                <Button
                                  type="button"
                                  onClick={handleMOMView}
                                  size={"sm"}
                                  className="flex gap-1"
                                >
                                  <Plus /> Create MoM
                                </Button>
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDrawerState}
                    >
                      Close
                    </Button>
                    {!action || action === "view" ? null : (
                      <Button>
                        {action === "edit"
                          ? "Edit"
                          : action === "delete"
                          ? "Delete"
                          : action === "reschedule"
                          ? "Reschedule"
                          : "Create"}
                      </Button>
                    )}
                  </div>
                </form>
              </FormProvider>
            )}
            {openComment && !openMOM && selectedId && selectedNFAOrAgenda && (
              <Suspense fallback={<div>loading</div>}>
                <CommentDialog
                  inboxId={selectedId as number}
                  title={commentTitle}
                  fnaOrAgendaId={selectedNFAOrAgenda}
                  open={openComment}
                  handleDialogOpen={handleCommentDialog}
                />
              </Suspense>
            )}
            {openMOM && !openComment && selectedId && (
              <Suspense fallback={<div>loading</div>}>
                <MinutesOfMeetingView
                  inboxId={selectedId as number}
                  title={"Minutes Of Meeting"}
                  open={openMOM}
                  handleDialogOpen={handleMOMView}
                />
              </Suspense>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(MyInboxPlatformCrudCollapsibleForm);
