import { Separator } from "../../../components/ui/separator"

type Props = {
    index: number;
    data: any & { id: number }
}

function VendorInvoice({data,index}: Props) {
  return (
    <div className="w-full rounded-xl border p-2 space-y-3">
        <div className="w-full flex justify-start items-center p-1">
            <h3 className="font-semibold text-sm">#{index} Vendor Details</h3>
        </div>
        <div className="w-full grid grid-cols-2">
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <h3 className="text-sm font-semibold">Supplier Name</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?.supplierName ?? "Muzamil Shah"}</p>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <h3 className="text-sm font-semibold">Commerial Rating</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?.commercialRating ?? "Muzamil Shah"}</p>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <h3 className="text-sm font-semibold">Techical Rating</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?.technicalRating ?? "Muzamil Shah"}</p>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <h3 className="text-sm font-semibold">Payment Terms</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?.paymentTerms ?? "Muzamil Shah"}</p>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <h3 className="text-sm font-semibold">Delivery Day (in Day)</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?.deliveryTime ?? "Muzamil Shah"}</p>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <h3 className="text-sm font-semibold">Quotation Validity</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?.quoteDate ?? "Muzamil Shah"}</p>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-2">
                <h3 className="text-sm font-semibold">Quotation</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?.quotation ?? "Muzamil Shah"}</p>
            </div>

        </div>
        <Separator />
        <div className="w-full flex justify-end items-start">
            <div className="flex flex-col justify-end items-end gap-2">
                {/* <div className="flex justify-between items-center gap-2">
                <h3 className="text-sm font-semibold">Qty :</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?. ?? "Muzamil Shah"}</p>
                </div> */}
                <div className="flex justify-between items-center gap-2">
                <h3 className="text-sm font-semibold">Basic Total :</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?.basicTotal ?? "Muzamil Shah"} ({data?.currency})</p>
                </div>
                <div className="flex justify-between items-center gap-2">
                <h3 className="text-sm font-semibold">Grand total (Excluding Taxes) :</h3>
                <p className="text-sm font-medium text-muted-foreground">{data?.grandTotal ?? "Muzamil Shah"} ({data?.currency})</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VendorInvoice