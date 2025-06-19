import { memo,  useMemo} from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import { Button } from "../../../components/ui/button";
import { ChevronDown } from "lucide-react";
import {  format } from "date-fns";
import { useConditionalQuery } from "../../../hooks/use-query";
import { GET_COMMENT_HISTORY_BY_UNINO } from "../../../lib/endpoint";
import { MutationResponse } from "../platform-design/qcs-crud-form-manager";
import { Badge } from "../../../components/ui/badge";
import { ScrollArea } from "../../../components/ui/scroll-area";
import CommentLoader from "../../../components/loading/comment-loader";
import Empty from "../../../components/empty";

type Props = {
  uniqueNumber: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, isOpen:boolean
};
type CommentHistoryType = {
  id: number;
  remarks: string;
  role: string;
  createdBy: string;
  createdOn: number[];
  fullName: string;
};
// const commentHistoryData:CommentHistoryType[]= [
//     {
//         id: 1,
//         comment: 'I found out this vendor was not proper vendor for our induestury',
//         createdBy: "Muzamil",
//         createdOn: new Date(),
//         departement: 'IT'
//     },
//     {
//         id: 2,
//         comment: 'I found out this vendor was not proper vendor for our induestury',
//         createdBy: "Ashish T",
//         createdOn: new Date(),
//         departement: 'HOD'
//     },
//     {
//         id: 3,
//         comment: 'I found out this vendor was not proper vendor for our induestury',
//         createdBy: "Gaytri",
//         createdOn: new Date(),
//         departement: 'BUSINESS'
//     },
// ]

function CommentHistory({ uniqueNumber,isOpen,setIsOpen}: Props) {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data ,refetch, isPending } = useConditionalQuery<MutationResponse>({
    url: GET_COMMENT_HISTORY_BY_UNINO,
    queryKey: "comment-history",
    params: {
      uniqueNumber: uniqueNumber,
    },
    enabled: isOpen && uniqueNumber ? "uniqueNumber" : "",
  });

  useMemo(() => {
    if(isOpen){
refetch()
    }
  },[isOpen])

  // useEffect(() => {
  //   refetch()
  // },[])

  // if (isPending) {
  //   return <div>loading ...</div>;
  // }
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full border rounded-xl p-2 space-y-2 z-20"
    >
      <CollapsibleTrigger asChild>
        <div className="w-full flex justify-between items-center gap-2">
          <div className="flex flex-col justify-start items-start">
            <h3>Comment History / Audit Trail</h3>
          </div>
          <Button
            type="button"
            variant={"ghost"}
            className="p-0 m-0"
            size={"sm"}
          >
            <ChevronDown />
          </Button>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="space-y-2">
        <ScrollArea className="w-full max:h-[1000px] grid grid-cols-1 gap-2  pr-4">
          
          {isPending ? (<CommentLoader />) : data?.data?.data?.length > 0 ?
            data?.data?.data?.map((item: CommentHistoryType) => (
              <div
                key={item?.id}
                className="w-full bg-background  flex flex-col justify-start items-start p-2 gap-1 rounded-xl border mb-2"
              >
                <div className="w-full flex justify-between items-center">
                  <div className=" h-auto flex flex-col justify-start items-start gap-0.5">
                    <h3 className="text-foreground font-semibold text-sm">
                      {item?.fullName} - <Badge className="text-[10px] px-2 py-0">{item?.role === 'NFA' ? "F&A" : item?.role}</Badge>
                    </h3>
                    <p className="text-muted-foreground font-medium text-xs">
                      {item?.createdBy}
                    </p>
                  </div>
                  <span className="text-foreground font-semibold text-xs flex flex-col justify-start items-start gap-1">
                    {/* <span> */}
                      {/* {formatDistance(
                        new Date(
                          item?.createdOn[0], // year
                          item?.createdOn[1] - 1, // month (0-indexed)
                          item?.createdOn[2], // day
                          item?.createdOn[3], // hour
                          item?.createdOn[4], // minute
                          item?.createdOn[5], // second
                          Math.floor(item?.createdOn[6] / 1_000_000) // milliseconds (convert nanoseconds to ms)
                        ),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )} */}
                      
                    {/* </span> */}
                    <span>
                      {format(
                        new Date(
                          item?.createdOn[0], // year
                          item?.createdOn[1] - 1, // month (0-indexed)
                          item?.createdOn[2], // day
                          item?.createdOn[3], // hour
                          item?.createdOn[4], // minute
                          item?.createdOn[5], // second
                          Math.floor(item?.createdOn[6] / 1_000_000) // milliseconds (convert nanoseconds to ms)
                        ),
                        "dd-MM-yyyy p"
                      )}
                    </span>
                  </span>
                </div>
                <p className="text-secondary-foreground text-sm">
                  Remarks: {item?.remarks}
                </p>
              </div>
            )) : <Empty />}
            
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default memo(CommentHistory);
