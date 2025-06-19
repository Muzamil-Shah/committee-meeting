import React, { memo, useMemo } from "react";
import { MemoizedFieldComponent } from "../../../components/filter-component-view";
import UploadButton from "../../../components/upload-button";
import {  useQueryGenerator } from "../../../hooks/use-query";
import {
  DELETED_UPLOAD_DATA,
  GET_QCS_MDM,
  GET_UPLOAD_DATA,
} from "../../../lib/endpoint";
import { Eye, Trash, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "../../../contexts/user-context";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { format } from "date-fns";
import { Label } from "../../../components/ui/label";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostMutation } from "../../../hooks/use-mutation";
import { toast } from "../../../components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import CustomCalendar from "../../../components/date-calander";
import { DocumentFileSHapZod } from "../../../types/Data";

type Props = {
  setTPTStatus: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  uniqueNumber: string;
  user: User;
  tptStatus: any;
  action: string;
};

const formSchema = z.object({
  tptStartDate: z.string(),
  tptExpiryDate: z.string(),
  tptStatus: z.string(),
  typeOfEntity: z.string(),
  tptId: z.string(),
  tptCertificate: z
    .array(DocumentFileSHapZod, { message: "Attachment is required!" })
    .nullable(),
});

type FormValues = z.infer<typeof formSchema>;

function TPTCertificateUpload({
  setTPTStatus,
  uniqueNumber,
  user,
  tptStatus,
  action,
}: Props) {
  const { data: documentData, refetch } = useQueryGenerator({
    url: GET_UPLOAD_DATA,
    queryKey: "upload",
    params: {
      docType: "tptCertificate",
      uniqueNumber: uniqueNumber,
    },
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
  const { data: typeOfEntityData } = useQueryGenerator({
    url: GET_QCS_MDM,
    queryKey: "type-of-entity",
    params: {
      type: "typeOfEntity",
    }
  });

  const today = new Date();
  const tomorrow = new Date(today); // Create a new Date instance
  tomorrow.setDate(today.getDate() + 1); // Add one day

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tptStartDate: tptStatus?.tptStartDate ?? "",
      tptExpiryDate: tptStatus?.tptExpiryDate ?? "",
      tptStatus: tptStatus?.tptStatus ?? "",
      typeOfEntity: tptStatus?.typeOfEntity ?? "",
      tptId: tptStatus?.tptId ?? "",
      tptCertificate: tptStatus?.tptCertificate ?? null,
    },
  });

  const onSubmit = (_: FormValues) => {};

  const handleStartDateChange = (date: Date | undefined) => {
    setTPTStatus((prev) => ({
      ...prev,
      tptStartDate: date ? format(date, "dd-MM-yyyy p") : null,
    }));
  };
  const handleEndDateChange = (date: Date | undefined) => {
    setTPTStatus((prev) => ({
      ...prev,
      tptExpiryDate: date ? format(date, "dd-MM-yyyy p") : null,
    }));
  };

  const typeOfEntityOptionShap = useMemo(() => {
    const typeOfEntityList = typeOfEntityData?.data?.data?.content;
    if (typeOfEntityList) {
      return typeOfEntityList?.map((item: any) => ({
        label: item?.description,
        value: item?.description,
      }));
    }
  }, [typeOfEntityData?.data?.data]);

  const handleDeleteData = (docInx: string | number) => {
    DeleteMutate({ docIndex: docInx });
  };

  useMemo(() => {
    if (deleteData?.data?.msg === "success") {
      toast({
        title: deleteData?.data?.msg ?? "Document Deleted successfully",
        bgColor: "bg-green-500",
      });
      refetch();
    }
  }, [deleteData]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full grid grid-cols-3 gap-2 items-end rounded-xl border p-4">
          <div className={cn("grid mt-1.5 space-y-3", "")}>
            <Label>TPT Start Date</Label>

            <CustomCalendar
              disabled={
                !["MRO"]?.includes(user?.role!) || action?.includes("view") 
                  ? true
                  : false
              }
              value={
                tptStatus.tptStartDate
                  ? new Date(tptStatus.tptStartDate)
                  : undefined
              }
              onChange={handleStartDateChange}
            />
          </div>
          <div className={cn("grid  mt-1.5 space-y-3", "")}>
            <Label>TPT Expire Date</Label>
            <CustomCalendar
              disabled={
                !["MRO"]?.includes(user?.role!) || action?.includes("view")
                  ? true
                  : false
              }
              value={
                tptStatus.tptExpiryDate
                  ? new Date(tptStatus.tptExpiryDate)
                  : undefined
              }
              minDate={
                tptStatus.tptStartDate
                  ? new Date(tptStatus.tptStartDate)
                  : today
              }
              onChange={handleEndDateChange}
            />
          </div>
          <MemoizedFieldComponent
            setFormData={setTPTStatus}
            field={{
              name: "tptStatus",
              fieldType: "combobox",
              placeholder: "Select TPT Status",
              options: [
                { label: "Low", value: "Low" },
                { label: "Medium", value: "Medium" },
                { label: "High", value: "High" },
              ],
              disabled:
                !["MRO"]?.includes(user?.role!) || action?.includes("view")
                  ? true
                  : false,
              label: "TPT Status",
            }}
            key={1}
          />
          <MemoizedFieldComponent
            field={{
              name: "tptId",
              fieldType: "text",
              label: "TPT ID",
              required: false,
              placeholder: "",
              disabled:
                !["MRO"]?.includes(user?.role!) || action?.includes("view")
                  ? true
                  : false,
            }}
            setFormData={setTPTStatus}
            key={2}
          />
          <MemoizedFieldComponent
            field={{
              name: "typeOfEntity",
              fieldType: ["view"]?.includes(action as string) ? 'text' :"combobox",
              label: "Type of Entity",
              options: typeOfEntityOptionShap ?? [],
              required: false,
              placeholder: "",
              disabled:
                !["MRO"]?.includes(user?.role!) || action?.includes("view")
                  ? true
                  : false,
            }}
            setFormData={setTPTStatus}
            key={3}
          />

          {documentData?.data?.data?.length > 0 ? (
            <div className={cn("flex flex-col  mt-1.5 space-y-3", "")}>
              <Label>Uploaded Certification</Label>
              <div className="flex flex-wrap justify-center items-center gap-2 border px-2 rounded-lg h-9">
                {documentData?.data?.data?.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="w-full flex justify-between items-center gap-2 "
                  >
                    <span className="w-11/12 flex justify-start items-center gap-1">
                      <Upload className="w-1/12 h-5" />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className=" w-10/12 line-clamp-1 z-30">
                              {item?.documentName +
                                "." +
                                item?.documentExtension}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {item?.documentName +
                                "." +
                                item?.documentExtension}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </span>
                    <Link
                      className="w-5 h-5"
                      target="blank"
                      to={`http://apps.bpaassolutions.com:8080/omnidocs/WebApiRequestRedirection?Application=ViewDocument&cabinetName=forbesprod&sessionIndexSet=false&sessionIndexSet&enableDCInfotrue&S=S&DocumentId=${item?.docIndex}`}
                    >
                      <Eye className="text-blue-500" />
                    </Link>
                    {["MRO"]?.includes(user?.role!) && action !== "view" && (
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        className="p-0 m-0 text-destructive"
                        disabled={isDeleteIde}
                        onClick={() =>
                          handleDeleteData(item?.docIndex! as number)
                        }
                        type="button"
                      >
                        <Trash className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <UploadButton
              docType="tptCertificate"
              queryKey="upload"
              uniqueNumber={uniqueNumber}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}

export default memo(TPTCertificateUpload);
