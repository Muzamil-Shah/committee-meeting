import { memo, useCallback, useMemo, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { CommentI} from "../my-inbox/type";
import { Plus, View } from "lucide-react";
import { TableView } from "../../../components/table-view";
import { inboxCommentsColumn } from "../my-inbox/columns";
import ReactQuill from "react-quill";
import { format } from "date-fns";
import { useInbox } from "../../../contexts/inbox-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

type Props = {
    inboxId: number;
  title: string;
  fnaOrAgendaId: number;
  open: boolean;
  handleDialogOpen: () => void;
};

function CommentsView({inboxId, title, fnaOrAgendaId,  handleDialogOpen }: Props) {
    const [comment,setComment] = useState<string>("")
    const [decision,setDecision] = useState<string>("")
    const {inbox, updateInbox} = useInbox()
    console.log({inbox});
    const findInboxData = useMemo(() => {
        return inbox.find((item) => item?.id === inboxId)
    },[inbox,inboxId])

    const data = useMemo(() => {
        if(title?.includes("Agenda")){
            return findInboxData?.agenda?.find(item => item?.id === fnaOrAgendaId)
        }else{
            return findInboxData?.nfa?.find(item => item?.id === fnaOrAgendaId)

        }
    },[findInboxData,fnaOrAgendaId])

    const handleAddingComment = useCallback(() => {
        const commentObject:CommentI = {
            name: "Muzamil Shah",
            dateAndTime: new Date().toDateString(),
            decision: decision,
            comment:comment || ''
        }
        if(findInboxData){
          
            const updateAgenda = findInboxData?.agenda?.map(item => item.id === data?.id ? {...item,comments: item?.comments? [...item?.comments,commentObject] : [commentObject]} : item) ?? findInboxData?.agenda
            
            const updateNFA = findInboxData?.nfa?.map(item => item.id === data?.id ? {...item,comments: item?.comments ?[...item?.comments,commentObject] :[commentObject]} : item) ?? findInboxData?.nfa
            if(title?.includes("Agenda")){

                updateInbox({...findInboxData,agenda:updateAgenda})
            }else{
                updateInbox({...findInboxData,nfa: updateNFA})

            }
        } 
        setComment("")
    },[comment,findInboxData,title,data,decision])
    const handleAction = useCallback((action:string) => {
        
        if(findInboxData){
            const updateAgenda = findInboxData?.agenda?.map(item => item.id === data?.id ? {...item,status:action} : item) ?? findInboxData?.agenda
            const updateNFA = findInboxData?.nfa?.map(item => item.id === data?.id ? {...item,status:action} : item) ?? findInboxData?.nfa
            if(title?.includes("Agenda")){
              
              updateInbox({...findInboxData,agenda:updateAgenda})
            }else{
                updateInbox({...findInboxData,nfa: updateNFA})

            }
        } 
        setComment("")
        handleDialogOpen()
    },[comment,findInboxData,title,data])
    return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="w-full bg-secondary p-2 flex justify-between items-center">
        <h3 className="font-bold text-sm md:text-base text-foreground">
          {title}
        </h3>
        <Button variant={"link"} size={"sm"} className="flex gap-1">
          <View />
          View Document
        </Button>
      </div>
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        <div className="flex flex-col justify-start items-start gap-1">
          <Label>Title</Label>
          <p className="text-xs md:text-sm text-muted-foreground">
            {data?.title}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <Label>Department</Label>
          <p className="text-xs md:text-sm text-muted-foreground">
            {data?.department}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <Label>Status</Label>
          <p className="text-xs md:text-sm text-muted-foreground">
            {data?.status}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-2">
          <Label>Time Schedule</Label>
          <p className="text-xs md:text-sm text-muted-foreground">
            {format(data?.dateAndTime!,"dd-MM-yyyy p")}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start ">
        <div className="w-full  p-2 flex justify-between items-center">
          <h3 className="font-bold text-sm md:text-base text-foreground">
            Add Observation
          </h3>
        </div>
        <div className="w-full  p-2">
        <div className="w-full flex flex-col items-start gap-2">
          <div className="w-full flex justify-between items-center">
            <Label htmlFor="name" className="text-right">
            Comment
          </Label>
          <div className="p-2 flex justify-center items-center gap-2">
            <Select
                                value={decision}
                                onValueChange={(value) => {
                                  setDecision(value)
                                }}
                              >
                                <SelectTrigger className="w-40 h-9">
                                  <SelectValue placeholder="Select Decision" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[{label: 'Approved',value:'Approved'},{label: 'Reject', value: 'Reject'},{label: 'Raise Query', value: 'Raise Query'},{label: 'Reschedule', value: 'Reschedule'}].map((item) => (
                                    <SelectItem key={item?.value} value={item?.value}>
                                      {item?.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
            <Button disabled={!decision || !comment} onClick={() => handleAddingComment()} size={'sm'} variant={'secondary'} className="flex gap-1"><Plus size={16} />Add</Button>
        </div>
            </div>
          <ReactQuill
                        placeholder={"Enter you comment here"}
                        
                        theme="snow"
                        value={comment}
                        className="w-full bg-background "
                        onChange={(e) => {
                          const value = e;
                          setComment(value);
                        }}
                        readOnly={false}
                      />
        </div>
        
        </div>
      </div>
      <div className="w-full grid grid-cols-1 p-3">
        <div className="w-full  p-2 flex justify-between items-center">
          <h3 className="font-bold text-sm md:text-base text-foreground">
            Comments
          </h3>
        </div>
        <div className="w-full h-full ">
          {/* {isPending ? (
                                    <TableLoader />
                                  ) : ( */}
          <TableView
            data={data?.comments ?? []}
            columns={inboxCommentsColumn || []}
            showFilters={false}
          />
          {/* )} */}
        </div>
      </div>

      <div className="w-full flex justify-center items-center gap-2">
        <Button onClick={handleDialogOpen} size={'sm'}>Close</Button>
        <div className="flex justify-center items-center gap-2">
        <Button onClick={() => handleAction("Approved")} size={'sm'} variant={'success'} className="bg-green-500">Approved</Button>
            <Button onClick={() => handleAction("Reject")} size={'sm'} variant={'destructive'}>Reject</Button>
            <Button onClick={() => handleAction("Raise Query")} size={'sm'} variant={'outline'}>Raise Query</Button>
            <Button onClick={() => handleAction("Reschedule")} size={'sm'} variant={'secondary'}>Reschedule</Button>
        </div>
      </div>
    </div>
  );
}

export default memo(CommentsView);
