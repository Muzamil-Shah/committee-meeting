import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ChartSpline, CloudUpload, Eye, Layers, Trash, Upload } from "lucide-react";
import { usePostMutation } from "../../../hooks/use-mutation";
import {
  DELETED_UPLOAD_DATA,
  GET_UPLOAD_DATA,
  UPDATE_QCS_GSTIN,
  UPLOAD_DATA,
} from "../../../lib/endpoint";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { toast } from "../../../components/ui/use-toast";
import { extractMatchesAsString, getBase64 } from "../../../lib/utils";
import { useConditionalQuery } from "../../../hooks/use-query";
import { MemoizedFieldComponent } from "../../../components/filter-component-view";
import { MutationResponse } from "../platform-design/qcs-crud-form-manager";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadLoader from "../../../components/loading/upload-loader";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { capitalLettarOnly, gstInNumberRegex } from "../../../lib/Regex";

type Props = {
  uniqueNumber: string;
  qcsId?: number;
  docType: string;
  queryKey: string;
  fileIndex?: number;
  isQuotationUploaded?: boolean;
};

type MutationResponseUpload = {
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
};

const formSchema = z.object({
  gstin: z.string({message:"Only text is allowed. Please enter a valid string."}).regex(
    gstInNumberRegex,
    "the GSTIN you entered is invalid. Please ensure that the GSTIN follows the correct format and try again"
  ),
  quotationDate:z.string({
    message: "Only text is allowed. Please enter a valid string.",
  }).or(z.undefined()).nullable(),
  docIndex: z.string({message:"Only text is allowed. Please enter a valid string."}).or(z.number({message:"Only decimal numbers are allowed. Please enter a valid decimal value (e.g., 1.23)."})),
});

function UploadQoutation({ qcsId, uniqueNumber, docType, queryKey,fileIndex ,isQuotationUploaded}: Props) {
  const [open,setOpen] = useState<boolean>(false)
  const [showFrom,setShowForm] = useState<boolean>(false)
  const [_, setFiles] = useState<any>(null);
  const [formData, setFormData] = useState<
    Partial<{ gstin: string; docIndex: string | number; quotationDate: string | undefined; }>
  >({
    gstin: "",
    docIndex: "",
    quotationDate: undefined,
  });

  const fileRef = useRef<HTMLInputElement | null>(null);
  const { data, mutate, isPending:UploadPending } = usePostMutation<MutationResponseUpload>({
    url: UPLOAD_DATA,
    queryKey: 'upload-qutation',
  });
  const {data:deleteData, mutate: DeleteMutate ,isPending } = usePostMutation<MutationResponseUpload>({
    url: DELETED_UPLOAD_DATA,
    queryKey: "delete",
  });

  const updateGSTIN = usePostMutation<MutationResponse>({
    url: UPDATE_QCS_GSTIN,
    queryKey: queryKey,
  });

  const { data: documentData ,refetch} = useConditionalQuery<MutationResponse>({
    url: GET_UPLOAD_DATA,
    queryKey: queryKey,
    params: {
      docType: docType,
      uniqueNumber: uniqueNumber,
      docIndex: data?.data?.data || fileIndex,
    },
    enabled: data?.data?.data || fileIndex ? "docIndex" : "",
  });

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gstin: "",
      docIndex: "",
      quotationDate: undefined,
    },
  });

  const { reset } = methods;
  useEffect(() => {
    reset({ ...methods?.formState?.defaultValues, ...formData });
  }, [formData, reset]);

  const onSubmit = useCallback((data: z.infer<typeof formSchema>) => {
    // for (const key in data) {
    //   if (data[key as keyof typeof string] === "") {
    //     delete data[key as keyof typeof string];
    //   }
    // }
    updateGSTIN?.mutate({ ...data, qcsId: qcsId });
  }, []);
  const handleDeleteData = (docInx: string | number) => {
    DeleteMutate({ docIndex: docInx });
  };

  const findDocument = useMemo(() => {
    return documentData?.data?.data?.find(
      (item: any) => item?.docIndex === data?.data?.data
    );
  }, [documentData?.data?.data, data?.data?.data]);

  useMemo(() => {

    if (findDocument) {
      setShowForm(true)
      setFormData((pre) => ({
        ...pre,
        gstin: findDocument?.gstin,
        docIndex: findDocument?.docIndex
      }));
    }
  }, [findDocument]);

  useMemo(() => {
      if(deleteData?.data?.msg === 'success'){
        setShowForm(false)
        refetch()
      }
    },[deleteData?.data?.msg])

  useMemo(() => {
      if(updateGSTIN?.data?.data?.msg === 'success'){
        setOpen(false)
      }
    },[updateGSTIN?.data?.data?.msg])

  return (
    <Dialog open={open} onOpenChange={() => setOpen(pre => !pre)}>
      <DialogTrigger asChild>
        <Button type="button" variant={"secondary"} size={"sm"}>
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
          <span className="flex justify-center items-center gap-2 hover:text-primary"><CloudUpload className="w-5 h-5" /> {!isQuotationUploaded && "Quotation"}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Special characters not allowed in file name.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
          
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full shadow flex justify-center items-center">
              <Layers />
            </div>
            Upload Quotation
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="rounded-xl h-64 border flex flex-col justify-center items-center gap-1">
          <div className="w-5 h-5 rounded-full shadow flex justify-center items-center">
            <Layers />
          </div>
          <div>
            <Button
              type="button"
              variant="link"
              size="sm"
              className=""
              disabled={UploadPending}
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="w-5 h-5" />
              UPLOAD
              <input
                // multiple
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
                            documentName: extractMatchesAsString(file.name?.split(".")[0]),
                            documentExtension: file.name?.split(".")[1],
                            encodedBytes: base64,
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
                    setFiles(validDocuments);

                    mutate({
                      ...validDocuments[0],
                      docType,
                      uniqueNumber,
                      qcsId,
                    });
                  };

                  processFiles();
                  e.target.value = "";
                }}
              />
            </Button>
            
          </div>
          {UploadPending && <UploadLoader />}
          {data?.data?.status === "error" ? (
            <span className="text-sm text-destructive">
              {data?.data?.msg}, try again.
            </span>
          ) : (
            findDocument && (
              <div className="flex justify-center items-center gap-2 p-2">
                  <div className="rounded-xl p-1 flex justify-start items-center gap-1">
                    
                    <ChartSpline className="w-4 h-4" />{" "}
                    <span className="text-sm font-medium">
                      {findDocument?.documentName + "." + findDocument?.documentExtension}
                    </span>
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"sm"}
                      className="p-0 m-0 text-destructive"
                      disabled={isPending}
                      onClick={() =>
                        handleDeleteData(data?.data?.data! as number)
                      }
                    >
                      <Trash className="w-5 h-5" />
                    </Button>
                    <Link target="blank" to={`http://apps.bpaassolutions.com:8080/omnidocs/WebApiRequestRedirection?Application=ViewDocument&cabinetName=forbesprod&sessionIndexSet=false&sessionIndexSet&enableDCInfotrue&S=S&DocumentId=${findDocument?.docIndex}`}>
                    <Eye className="text-blue-500" />
                    </Link>
                  </div>
              </div>
            )
          )}

          {data?.data?.data && showFrom && <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full grid grid-cols-2 md:grid-cols-3 justify-center items-end gap-2 p-2"
            >
              <MemoizedFieldComponent
                key={"quotationDate"}
                setFormData={setFormData}
                field={{
        name: "quotationDate" as const,
        label: "Quotation Validity",
        placeholder: "Quotation Validity",
        fieldType: "date-with-year",
        required: false,
       
      }}
      />
              <div className="md:col-span-2">

              <MemoizedFieldComponent
                key={"gstin"}
                setFormData={setFormData}
                field={{
                  name: "gstin",
                  label: "GSTIN No",
                  disabled: false,
                  required: true,
                  placeholder: "Enter your GSTIN",
                  fieldType: "text",
                  isUppercase: true,
                  extraValidation: (value: any) => capitalLettarOnly.test(value),
                  isString: true
                }}
                />
                </div>
              <Button type="submit">Submit</Button>
            </form>
          </FormProvider>}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default UploadQoutation;
