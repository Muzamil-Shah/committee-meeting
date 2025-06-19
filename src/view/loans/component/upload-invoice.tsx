import { useRef, useState } from "react";

import {
  ChartSpline,
  CloudUpload,
  Layers,
  Upload,
} from "lucide-react";
import { usePostMutation } from "../../../hooks/use-mutation";
import {
  UPLOAD_INVOICE_DOCUMENT,
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
import { extractMatchesAsString } from "../../../lib/utils";
import UploadLoader from "../../../components/loading/upload-loader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { useUser } from "../../../contexts/user-context";

type Props = {
  selectedId: number;
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



function UploadInvoice({
  selectedId,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [file, setFiles] = useState<any>(null);
 const {user} = useUser()

  const fileRef = useRef<HTMLInputElement | null>(null);
  const {
    data,
    isPending: UploadPending,
  } = usePostMutation<MutationResponseUpload>({
    url:`${UPLOAD_INVOICE_DOCUMENT}?projectId=${selectedId}`,
    queryKey: "upload-qutation",
  });

  


  

  async function uploadDocuments(files:any) {
    console.log("upladeeds",files);
    
    const formData = new FormData();
    
    // Add each file to the FormData
    files.forEach((file:any) => {
      formData.append('files', file);
    });
    try {
      const response = await fetch(
        `${UPLOAD_INVOICE_DOCUMENT}?projectId=${selectedId}`,
        {
          method: 'POST',

          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${user?.token}`,
            // Note: Don't set Content-Type header manually when using FormData,
            // the browser will set it automatically with the correct boundary
          },
          body: formData
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        
      }
      
      return await response.json();
    } catch (error:any) {
      console.error('Error uploading documents:', error);
      throw error;
    }
  }
  
  
    

 
  
 




 

 console.log(file);
 

  return (
    <Dialog open={open} onOpenChange={() => {setOpen((pre) => !pre); setFiles(null)}}>
      <DialogTrigger asChild>
        <Button type="button" variant={"secondary"} size={"sm"}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex justify-center items-center gap-2 hover:text-primary">
                  <CloudUpload className="w-5 h-5" /> {"Upload Invoice"}
                </span>
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
            Upload Invoice
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
                          return {
                            documentName: extractMatchesAsString(
                              file.name?.split(".")[0]
                            ),
                            documentExtension: file.name?.split(".")[1],
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

                    // mutate({
                    //   ...validDocuments[0],
                    //   selectedId,
                    // });
                    uploadDocuments(files).then((response) => {
                      console.log({response});
                      
                      toast({
                      bgColor: "bg-green-500",
                      title: response?.message ?? 'Successfully',
                    })
                    setOpen((pre) => !pre); 
                    setFiles(null);
                  }
                  )
                    .catch(error => toast({
                      bgColor: "bg-red-500",
                      title: error.message ?? 'Something went wrong',
                    }));
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
            file && file?.map((item:any) => (
              <div className="flex justify-center items-center gap-2 p-2">
                <div className="rounded-xl p-1 flex justify-start items-center gap-1">
                  <ChartSpline className="w-4 h-4" />{" "}
                  <span className="text-sm font-medium">
                    {item?.documentName +
                      "." +
                      item?.documentExtension}
                  </span>
                  {/* <Button
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
                  </Button> */}
                 
                </div>
              </div>)
            )
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default UploadInvoice;
