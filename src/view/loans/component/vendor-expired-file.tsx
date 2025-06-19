import { memo } from "react";

import { useConditionalQuery } from "../../../hooks/use-query";
import { GET_VENDOR_EXPIRED_FILE } from "../../../lib/endpoint";

import { arrayToDate, cn } from "../../../lib/utils";

import { Label } from "../../../components/ui/label";

import { QueryResponse } from "../platform-design/request-platform-view";
import { Separator } from "../../../components/ui/separator";
import { format } from "date-fns";

type Props = {
  gstNumber: string;
};

function VendorExpiredFile({ gstNumber }: Props) {
  const { data: vendorExpiredFile } = useConditionalQuery<QueryResponse>({
    url: GET_VENDOR_EXPIRED_FILE,
    queryKey: "endor-file-expire",
    params: {
      gstin: gstNumber,
    },
    enabled: gstNumber ? "gstin" : "",
  });

  return (
    <div className="w-full grid grid-cols-3 gap-2 items-start rounded-xl border p-4">
      <div className="col-span-12">
        <h5 className="text-xl font-semibold">
          Vendor Agreement File Expire Details
        </h5>
      </div>
      <div className={cn("grid mt-1.5 space-y-3", "")}>
        <Label>Vendor Name</Label>
        <p className="text-sm text-muted-foreground">{vendorExpiredFile?.data?.data?.vendorName ?? "N/A"}</p>
      </div>
      <div className={cn("grid mt-1.5 space-y-3", "")}>
        <Label>GSTIN Number</Label>
        <p className="text-sm text-muted-foreground">{gstNumber ?? "N/A"}</p>
      </div>
      <div className={cn("grid mt-1.5 space-y-3", "")}>
        <Label>PAN Number</Label>
        <p className="text-sm text-muted-foreground">{vendorExpiredFile?.data?.data?.pan ?? "N/A"}</p>
      </div>

      <div className=" col-span-12 flex flex-col justify-start items-start gap-1 ">
          <span className=" p-1 font-semibold text-base">TPT Details</span>
          <Separator />
        </div>
      <div className={cn("grid mt-1.5 space-y-3", "")}>
        <Label>TPT Number</Label>
        <p className="text-sm text-muted-foreground">{vendorExpiredFile?.data?.data?.tpiNumber ?? "N/A"}</p>
      </div>
      <div className={cn("grid mt-1.5 space-y-3", "")}>
        <Label>TPT Expire Date</Label>
        <p className="text-sm text-muted-foreground">
          {format(
            arrayToDate(
              vendorExpiredFile?.data?.data?.tptExpiryDate?.length === 7
                ? vendorExpiredFile?.data?.data?.tptExpiryDate
                : ([2025, 3, 27, 13, 0, 10, 70675000] as number[])
            ),
            "dd-MM-yyyy p"
          )}
        </p>
      </div>
      <div className=" col-span-12 flex flex-col justify-start items-start gap-1 ">
          <span className=" p-1 font-semibold text-base">Agreement Details</span>
          <Separator />
        </div>
      <div className={cn("grid mt-1.5 space-y-3", "")}>
        <Label>Agreement Status</Label>
        <p className="text-sm text-muted-foreground">{vendorExpiredFile?.data?.data?.agreementStatus ?? "N/A"}</p>
      </div>
      <div className={cn("grid mt-1.5 space-y-3", "")}>
        <Label>Agreement From</Label>
        <p className="text-sm text-muted-foreground">
          {format(
            arrayToDate(
              vendorExpiredFile?.data?.data?.agreementValidFromDate?.length ===
                7
                ? vendorExpiredFile?.data?.data?.agreementValidFromDate
                : ([2025, 3, 27, 13, 0, 10, 70675000] as number[])
            ),
            "dd-MM-yyyy p"
          )}
        </p>
      </div>
      <div className={cn("grid mt-1.5 space-y-3", "")}>
        <Label>Agreement To</Label>
        <p className="text-sm text-muted-foreground">
          {format(
            arrayToDate(
              vendorExpiredFile?.data?.data?.agreementValidToDate?.length === 7
                ? vendorExpiredFile?.data?.data?.agreementValidToDate
                : ([2025, 3, 27, 13, 0, 10, 70675000] as number[])
            ),
            "dd-MM-yyyy p"
          )}
        </p>
      </div>
    </div>
  );
}

export default memo(VendorExpiredFile);
