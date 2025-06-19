import React, { memo } from "react";
import { Button } from "../../../components/ui/button";
import { CircleXIcon } from "lucide-react";
import {
  RenderBasicDetails,
  RenderVendorQuestionnaireDetails,
} from "./vendor-details-view";
import { useConditionalQuery } from "../../../hooks/use-query";
import { QueryResponse } from "../platform-design/request-platform-view";
import { GET_VENDOR_DETAIL_BY_ID } from "../../../lib/endpoint";
import { Separator } from "../../../components/ui/separator";

type Props = {
  uniqueNumber: string;
  title: string;
  setOpenFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  workItem: string;
  isPreCheck:boolean
};

function SwitchFullscreen({
  title,
  workItem,
  uniqueNumber,
  setOpenFullscreen,
  isPreCheck
}: Props) {
  const { data: vendorDetailsData } = useConditionalQuery<QueryResponse>({
    url: GET_VENDOR_DETAIL_BY_ID,
    queryKey: "get_vendor_details_by_id",
    params: {
      uniqueNumber: uniqueNumber,
    },
    enabled: uniqueNumber ? "uniqueNumber" : "",
    staleTime: 0,
  });
  const vData = vendorDetailsData?.data?.data;
  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full  flex flex-col justify-start items-start bg-secondary">
      <div className="w-full h-10 p-2 flex justify-between items-center border-b shadow bg-background ">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Button
          className="p-0"
          onClick={() => setOpenFullscreen((prev) => !prev)}
          variant={"ghost"}
          size={"sm"}
        >
          <CircleXIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-2 bg-background  p-4">
        <div className="w-full flex justify-between items-center">
          <h3>Work-Item: {`(${workItem})`}</h3>
          <h3>Result: {vData?.result}</h3>
        </div>
        <Separator />
        <div className="w-full">
          <div className="w-full bg-gray-200 rounded-lg">
            <h4 className="font-medium px-2 py-1">Basic Details</h4>
          </div>
          <div className="p-[0.2px] bg-gray-400 w-full mb-4 mt-2" />
        </div>
        {RenderBasicDetails(vData)}
        <Separator />
        {isPreCheck &&  RenderVendorQuestionnaireDetails(vData)}
      </div>
    </div>
  );
}

export default memo(SwitchFullscreen);
