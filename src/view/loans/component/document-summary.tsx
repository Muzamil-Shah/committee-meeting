import { memo} from "react";
import { MemoizedFieldComponent } from "../../../components/filter-component-view";
import { User } from "../../../contexts/user-context";
import { buttonVariants } from "../../../components/ui/button";
import { status, subStatus } from "../../../lib/constants";
import {
  useConditionalQuery,
} from "../../../hooks/use-query";
import { GET_UPLOAD_DATA } from "../../../lib/endpoint";
import { cn } from "../../../lib/utils";
import { Link } from "react-router-dom";
import { MutationResponse } from "../platform-design/qcs-crud-form-manager";

type Props<T> = {
  user: User;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  formData: any;
  uniqueNumber: string;
};

function DocumentSummary<T extends Record<string, unknown>>({ setFormData, user, formData, uniqueNumber }: Props<T>) {
  
  const { data: documentData} = useConditionalQuery<MutationResponse>({
    url: GET_UPLOAD_DATA,
    queryKey: "doc-summary",
    params: {
      docType: "dnbReport",
      uniqueNumber: uniqueNumber,
    },
    enabled: uniqueNumber ? 'docType' : ''
  });

 
  return (
    <div className="flex flex-col justify-start items-start gap-2 rounded-xl border p-4">
      <>
        <div className="w-full flex justify-between items-start">
          <h3 className="text-xs font-medium">
            D&B Document <span className="text-red-500">*</span>
          </h3>
          <div className="flex justify-end items-center gap-1">

         
          {documentData?.data?.data && documentData?.data?.data?.length > 0 && documentData?.data?.data ?.map((item:any,i:number) => (<Link

className={cn(buttonVariants({ variant: "default" ,size:'sm'}))}
            target="blank"
            key={i}
            to={item?.docIndex ? `http://apps.bpaassolutions.com:8080/omnidocs/WebApiRequestRedirection?Application=ViewDocument&cabinetName=forbesprod&sessionIndexSet=false&sessionIndexSet&enableDCInfotrue&S=S&DocumentId=${item?.docIndex}`: "#"}
            >
            Download {item?.documentName}
          </Link>))}
        </div>
          </div>
        <div className="w-full flex-col justify-start items-start gap-2 space-y-2">
          {["MRO"]?.includes(user?.role) &&
          formData?.status === status?.dbPending &&
          formData?.subStatus === subStatus?.pendingAtMRO ? (
            <div className="w-full">
              <MemoizedFieldComponent
                field={{
                  name: "mroSummery",
                  label: "Summary",
                  placeholder: "Write your Summary here",
                  fieldType: "text-editor",
                  required:true
                }}
                setFormData={setFormData}
              />
            </div>
          ) : (
            <>
                <MemoizedFieldComponent
                  field={{
                    name: "mroSummery",
                    label: "Summary",
                    placeholder: "Write your Summary here",
                    fieldType: "text-editor",
                    disabled: true,
                  }}
                  setFormData={setFormData}
                />
            </>
          )}
        </div>
      </>
    </div>
  );
}

export default memo(DocumentSummary);
