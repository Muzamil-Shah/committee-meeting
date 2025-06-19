import React, { memo, useEffect, useMemo } from "react";
import {
  FieldProps,
  MemoizedFieldComponent,
} from "../../../components/filter-component-view";
import { z, ZodRawShape } from "zod";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { CalendarIcon, CircleCheck,  Plus, Trash } from "lucide-react";
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
import { Input } from "../../../components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../../components/ui/form";
import { IMeeting } from "../meetings/type";
import { useMeeting } from "../../../contexts/MeetingProvider";
import { Separator } from "../../../components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Calendar } from "../../../components/ui/calendar";
import { format } from "date-fns";
import { useInbox } from "../../../contexts/inbox-context";
import { nfaData } from "../fna/data";
import { useCommittees } from "../../../contexts/committee-context";
import { CommitteeMember } from "../my-inbox/type";

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

function MeetingPlatformCrudCollapsibleForm<T extends Record<string, unknown>>({
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
  const { setMeetings } = useMeeting();
  const { inbox, addingInbox } = useInbox();
  const { committees } = useCommittees();
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

  const { fields } = useFieldArray({
    control: methods?.control,
    name: "timeSchedule", // Matches the key in the form's defaultValues
  });
  const { fields:agendaFields } = useFieldArray({
    control: methods?.control,
    name: "agenda", // Matches the key in the form's defaultValues
  });
  const { reset, handleSubmit, getValues } = methods;
  const values = getValues();

  const [searchParams, setSearchParams] = useSearchParams();

  

  const handleDeleteAgenda = (ind: number) => {
    setFormData((prev) => ({
      ...prev,
      agenda: (Array.isArray(prev?.agenda) ? prev?.agenda : [])?.filter(
        (_, i) => i !== ind
      ),
    }));
  };
  const handleDeleteTimeSchedule = (ind: number) => {
    setFormData((prev) => ({
      ...prev,
      timeSchedule: (Array.isArray(prev?.timeSchedule)
        ? prev?.timeSchedule
        : []
      )?.filter((_, i) => i !== ind),
    }));
  };

  const handleAddMeeting = (values: Record<string, unknown>) => {
    const meeting = values as any as IMeeting;
    console.log({ formData, meeting });

    if (action === "create") {
      setMeetings((prev) => [
        ...prev,
        { ...meeting, id: prev?.length + 1 },
      ]);
      const nfaDatafilterd = nfaData?.map(item => ({...item ,comments:[],status: "Open"}))?.filter(item => meeting?.nfa?.includes(item?.id));
      let compotition: CommitteeMember[] = []
      const filterCommittee = committees?.filter(item => meeting?.committee?.includes(item?.id))?.map(item => item?.composition?.length > 0 && item.composition?.map(child => child && compotition?.push(child)))
      console.log({filterCommittee});
      
      addingInbox({id:inbox?.length + 1 , meeting: {...meeting,id:1},agenda:[...meeting?.agenda?.map((item,i) => ({...item,id:i+1, status: 'Open',department: 'IT',dateAndTime: '2002',comments:[]}))],nfa:nfaDatafilterd,mom: {
        department: "Finance",
        background: "The meeting was called to review the quarterly budget proposals from all departments",
        committeesUser: compotition,
        attendanceList: compotition,
        observation: []
      }})
      toast({
                icon: <CircleCheck />,
                bgColor: "bg-green-500",
                title: "Meeting and Meeting Inbox Create Successfully",
              });
    } else if (action === "delete") {
      setMeetings((prev) => prev?.filter((el) => el?.id !== selectedId));
    } else if (action === "edit") {
      setMeetings((prev) =>
        prev?.map((el) => (el?.id === selectedId ? { ...el, ...meeting } : el))
      );
      toast({
        icon: <CircleCheck />,
        bgColor: "bg-green-500",
        title: "Meeting and Meeting Inbox Updated Successfully",
      });
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

  const lineItemFieldList = ({ index }: { index: number }) => {
    return [
      {
        name: `timeSchedule.${index}.start_date` as const,
        label: "Start Date",
        placeholder: "Enter Meeting Start Date",
        fieldType: "date",
        required: true,
        disabled: false,
      },
      {
        name: `timeSchedule.${index}.end_date` as const,
        label: "End Date",
        placeholder: "Enter Meeting End Date",
        fieldType: "date",
        required: true,
        disabled: false,
      },
    ];
  };
  const lineItemAgendaFieldList = ({ index }: { index: number }) => {
    return [
      {
        name: `agenda.${index}.title` as const,
        label: "Title",
        placeholder: "Title Of Agenda",
        fieldType: "text",
        required: true,
        disabled: false,
      },
      {
        name: `agenda.${index}.subject` as const,
        label: "Subject",
        placeholder: "Subject Of Agenda",
        fieldType: "text",
        required: true,
        disabled: false,
      },
    ];
  };

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

  return (
    <Dialog open={open} onOpenChange={handleDrawerState}>
      <DialogTitle aria-description="Form">{title}</DialogTitle>
      <DialogContent className="min-w-[80%] max-h-[80%] overflow-y-auto">
        <h1 className="text-xl font-semibold">
          {action === "view"
            ? "View"
            : action === "edit"
            ? "Edit"
            : action === "delete"
            ? "Delete"
            : "Create"}{" "}
          Meeting
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(handleAddMeeting)}
            className="w-full flex flex-col justify-between space-y-4 pb-4"
          >
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-start">
              {formFieldData.fields.map((field) => (
                <MemoizedFieldComponent
                  key={field.name}
                  field={
                    {
                      ...field,
                      disabled: ["view","reschedule"].includes(action as string) ? true : field.disabled,
                    } as FieldProps<Record<string, unknown>>
                  }
                  setFormData={setFormData}
                />
              ))}
              {/* <div className="flex items-end gap-x-2">
                <div className="flex-1">
                  <FormLabel className="dark:text-white font-medium ">
                    Agenda
                  </FormLabel>
                  <Input
                    placeholder="Enter Agenda"
                    className="h-9 mt-2"
                    value={formValues?.agenda}
                    onChange={(e) =>
                      setFormValues((prev) => ({
                        ...prev,
                        agenda: e.target.value,
                      }))
                    }
                  />
                </div>
                <Button onClick={handleAddAgenda} type="button">
                  <Plus />
                </Button>
              </div>
              {agenda && agenda?.length > 0 && (
                <>
                  <h1 className="col-span-1 sm:col-span-2 lg:col-span-3 text-xl font-semibold mt-4">
                    Agendas
                  </h1>
                  {agenda?.map((el: string, ind: number) => (
                    <div className="flex items-end gap-x-2" key={el + ind}>
                      <Input
                        placeholder="Enter Agenda"
                        className="h-9 mt-2 flex-1"
                        defaultValue={el}
                        disabled
                      />
                      <Button
                        onClick={() => handleDeleteAgenda(ind)}
                        type="button"
                        variant="outline"
                      >
                        <Minus />
                      </Button>
                    </div>
                  ))}
                </>
              )} */}
            </div>
            <div className="w-full flex flex-col gap-3 space-y-1 ">
              <div className="w-full flex justify-end items-center ">
                <Button
                  variant={"outline"}
                  type="button"
                  size={"sm"}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      timeSchedule:
                        prev.timeSchedule &&
                        (
                          prev.timeSchedule as {
                            start_date: Date | null;
                            end_date: Date | null;
                          }[]
                        )?.length > 0
                          ? [
                              ...(Array.isArray(prev.timeSchedule)
                                ? prev.timeSchedule
                                : []),
                              {
                                start_date: null,
                                end_date: null,
                              },
                            ]
                          : [
                              {
                                start_date: null,
                                end_date: null,
                              },
                            ],
                    }))
                  }
                >
                  <Plus />
                  <span>Schedule More Same Meeting</span>
                </Button>
              </div>
              <div className="w-full flex flex-col justify-start items-start   ">
                <Separator />

                <div className="w-full grid grid-cols-3 gap-1  justify-end items-center pt-4">
                  {lineItemFieldList({ index: 0 })?.map((field, i) => (
                    <FormLabel key={i} className="dark:text-white font-medium">
                      {field?.label}
                      {field?.required && (
                        <span className="text-red-500"> *</span>
                      )}
                    </FormLabel>
                  ))}
                  <FormLabel key={23} className="dark:text-white font-medium">
                    Action
                  </FormLabel>
                </div>
                {fields?.map((_: any, index: number) => (
                  <div
                    key={index}
                    className="w-full grid grid-cols-3 gap-2  justify-center items-end"
                  >
                    {lineItemFieldList({ index })?.map((field, i) => {
                      let timeValue = values[field.name]
                        ? `${String(values[field.name].getHours()).padStart(
                            2,
                            "0"
                          )}:${String(values[field.name].getMinutes()).padStart(
                            2,
                            "0"
                          )}`
                        : "00:00";

                      return (
                        <FormField
                          key={i}
                          name={field?.name}
                          control={methods.control}
                          render={({ field: FormField }) => (
                            <FormItem>
                              <br />

                              <FormControl>
                                <Popover>
                                  <PopoverTrigger
                                    asChild
                                    className="w-full flex justify-start h-10"
                                  >
                                    <Button
                                      variant={"outline"}
                                      className={"h-9"}
                                      disabled={field?.disabled}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4 dark:text-white" />
                                      <span className="dark:text-white">
                                        {values.timeSchedule[index][
                                          field.name.split(".")[
                                            field.name.split(".")?.length - 1
                                          ]
                                        ] ? (
                                          format(
                                            values.timeSchedule[index][
                                              field.name.split(".")[
                                                field.name.split(".")?.length -
                                                  1
                                              ]
                                            ],
                                            "dd-MM-yyyy p"
                                          )
                                        ) : (
                                          <span className="dark:text-white">
                                            Select Date
                                          </span>
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
                                          const yearNumber = parseInt(
                                            yearVal,
                                            10
                                          );
                                          setYear(yearNumber);
                                          setCurrentMonth(
                                            new Date(
                                              yearNumber,
                                              currentMonth.getMonth(),
                                              1
                                            )
                                          );
                                        }}
                                      >
                                        <SelectTrigger className="w-40">
                                          <SelectValue placeholder="Select Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {years.map((yr) => (
                                            <SelectItem
                                              key={yr}
                                              value={yr.toString()}
                                            >
                                              {yr}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <label className="mb-2 flex justify-between items-center">
                                      <span className="font-medium">Time:</span>
                                      <input
                                        type="time"
                                        value={timeValue}
                                        onChange={(e) => {
                                          const time = e.target.value;
                                          timeValue = time;

                                          // Update the timeSchedule array properly
                                          setFormData((prev: Partial<T>) => {
                                            const newTimeSchedule = [
                                              ...(prev.timeSchedule as any),
                                            ];

                                            if (
                                              newTimeSchedule[index][
                                                field.name.split(".")[
                                                  field.name.split(".")
                                                    ?.length - 1
                                                ]
                                              ]
                                            ) {
                                              const [hours, minutes] = time
                                                .split(":")
                                                .map(Number);
                                              const newDate = new Date(
                                                newTimeSchedule[index][
                                                  field.name.split(".")[
                                                    field.name.split(".")
                                                      ?.length - 1
                                                  ]
                                                ]
                                              );
                                              newDate.setHours(hours, minutes);
                                              newTimeSchedule[index][
                                                field.name.split(".")[
                                                  field.name.split(".")
                                                    ?.length - 1
                                                ]
                                              ] = newDate;
                                            }

                                            return {
                                              ...prev,
                                              timeSchedule: newTimeSchedule,
                                              // Don't add flat properties
                                            };
                                          });
                                        }}
                                        className="border rounded p-1"
                                      />
                                    </label>
                                    {/* Calendar */}
                                    <Calendar
                                      {...FormField}
                                      mode="single"
                                      selected={
                                        values.timeSchedule[index][
                                          field.name.split(".")[
                                            field.name.split(".")?.length - 1
                                          ]
                                        ] || null
                                      }
                                      onSelect={(d) => {
                                        setFormData((prev: Partial<T>) => {
                                          const newTimeSchedule = [
                                            ...(prev.timeSchedule as any),
                                          ];

                                          // Combine with existing time if available
                                          let newDate = d;
                                          if (d && timeValue) {
                                            const [hours, minutes] = timeValue
                                              .split(":")
                                              .map(Number);
                                            newDate = new Date(d);
                                            newDate.setHours(hours, minutes);
                                          }

                                          newTimeSchedule[index][
                                            field.name.split(".")[
                                              field.name.split(".")?.length - 1
                                            ]
                                          ] = newDate;

                                          return {
                                            ...prev,
                                            timeSchedule: newTimeSchedule,
                                            // Don't add flat properties
                                          };
                                        });
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
                              <FormMessage name={field?.name} />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                    <Button
                      type="button"
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => handleDeleteTimeSchedule(index)}
                    >
                      <Trash />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="w-full flex flex-col gap-3 space-y-1 ">
                <div className="w-full flex justify-end items-center ">
                  <Button
                    variant={"outline"}
                    type="button"
                    size={"sm"}
                    disabled={["view","reschedule"].includes(action as string) ? true : false}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        agenda:
                          prev.agenda &&
                          (
                            prev.agenda as {
                              subject: string;
                              title: string;
                            }[]
                          )?.length > 0
                            ? [
                                ...(Array.isArray(prev.agenda)
                                  ? prev.agenda
                                  : []),
                                {
                                  subject: "",
                              title: "",
                                },
                              ]
                            : [
                              {
                                subject: "",
                                title: "",
                              },
                              ],
                      }))
                    }
                  >
                    <Plus />
                    <span>Add More Agenda to Meeting</span>
                  </Button>
                </div>
                <div className="w-full flex flex-col justify-start items-start   ">
                  <Separator />

                  <div className="w-full grid grid-cols-2 gap-1  justify-end items-center pt-4">
                    {lineItemAgendaFieldList({ index: 0 })?.map((field, i) => (
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
                    <FormLabel key={23} className="dark:text-white font-medium">
                      Action
                    </FormLabel>
                  </div>
                  {agendaFields?.map((_: any, index: number) => (
                    <div
                      key={index}
                      className="w-full grid grid-cols-3 gap-2  justify-center items-end"
                    >
                      {lineItemAgendaFieldList({ index })?.map((field, i) => (
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
                                  disabled= {["view","reschedule"].includes(action as string) ? true : field.disabled}
                                />
                              </FormControl>

                              <FormMessage name={field?.name} />
                            </FormItem>
                          )}
                        />
                      ))}
                      <Button
                        type="button"
                        variant={"destructive"}
                        size={"icon"}
                        disabled={["view","reschedule"].includes(action as string) ? true : false}
                        onClick={() => handleDeleteAgenda(index)}
                      >
                        <Trash />
                      </Button>
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
      </DialogContent>
    </Dialog>
  );
}

export default memo(MeetingPlatformCrudCollapsibleForm);
