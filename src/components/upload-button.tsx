import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { extractMatchesAsString, getBase64 } from "../lib/utils";
import { usePostMutation } from "../hooks/use-mutation";
import { DELETED_UPLOAD_DATA, UPLOAD_DATA } from "../lib/endpoint";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ChartSpline, Layers, Trash, Upload, UploadCloud } from "lucide-react";
import UploadLoader from "./loading/upload-loader";

type Props = {
  uniqueNumber: string;
  qcsId?: number;
  docType: string;
  queryKey: string;
};

function UploadButton({ qcsId, uniqueNumber, docType, queryKey }: Props) {
  const [files, setFiles] = useState<any>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const { data, mutate, isPending } = usePostMutation<{
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
    queryKey: queryKey,
  });
  const { mutate: DeleteMutate } = usePostMutation<{
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

  const handleDeleteData = (docInx: string | number) => {
    DeleteMutate({ docIndex: docInx });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex justify-center items-center gap-2"
          type="button"
          variant={"secondary"}
          size={"sm"}
        >
          <Upload className="w-5 h-5" /> UPLOAD
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-start items-center gap-2">
            <div className="w-5 h-5 rounded-full shadow flex justify-center items-center">
              <Layers />
            </div>
            Upload File
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
              onClick={() => fileRef.current?.click()}
              disabled={isPending}
            >
              <div className="flex justify-center items-center gap-2">
                <UploadCloud className="w-5 h-5" /> UPLOAD <span>(File)</span>
              </div>
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
                            documentName: extractMatchesAsString(
                              file.name?.split(".")[0]
                            ),
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
          {isPending && <UploadLoader />}
          {data?.data?.status === "error" ? (
            <span className="text-sm text-destructive">
              {data?.data?.msg}, try again.
            </span>
          ) : (
            files &&
            data?.data?.data &&
            files?.length > 0 && (
              <div className="flex justify-center items-center gap-2 p-2">
                {files?.map((item: any) => (
                  <div className="rounded-xl p-1 flex justify-start items-start gap-1">
                    <ChartSpline className="w-4 h-4" />{" "}
                    <span className="text-sm font-medium">
                      {item?.documentName + "." + item?.documentExtension}
                    </span>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className="p-0 m-0 text-destructive"
                      onClick={() =>
                        handleDeleteData(data?.data?.data! as number)
                      }
                    >
                      <Trash className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default UploadButton;
