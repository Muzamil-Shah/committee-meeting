import { memo, useCallback, useMemo, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import {  MomObservation } from "../my-inbox/type";
import { Plus, View } from "lucide-react";
import { TableView } from "../../../components/table-view";
import {  inboxMembersColumn, inboxMomObservationColumn } from "../my-inbox/columns";
import ReactQuill from "react-quill";
import { useInbox } from "../../../contexts/inbox-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

type Props = {
  inboxId: number;
  title: string;
  open: boolean;
  handleDialogOpen: () => void;
};

function MinutesOFMeetingView({ inboxId, title, handleDialogOpen }: Props) {
  const [comment, setComment] = useState<string>("");
  const [agenda, setAgenda] = useState<string>("");
  const [decision, setDecision] = useState<string>("");
  const { inbox, updateInbox } = useInbox();
  console.log({ inbox });
  const findInboxData = useMemo(() => {
    return inbox.find((item) => item?.id === inboxId);
  }, [inbox, inboxId]);

  const data = useMemo(() => {
    return findInboxData?.mom;
  }, [findInboxData]);

  const agendaOption = useMemo(() => {
    if(findInboxData){
        return findInboxData?.agenda?.map(item => ({label: item?.title,value: item.title})).concat(findInboxData?.nfa?.map(item => ({label: item?.title,value: item?.title})))
    }
  },[findInboxData])

  const handleAddingComment = useCallback(() => {
    const commentObject: MomObservation = {
        id: data?.observation?.length ?? 0 + 1,
        agenda: {title: agenda,subject:findInboxData?.meeting?.subject! },

      decision: decision,
      remarks: comment || "",
    };
    if (findInboxData) {
      const updateAgenda = [...findInboxData?.mom?.observation, commentObject];
      
        updateInbox({ ...findInboxData, mom:{...findInboxData?.mom, observation:updateAgenda} });
      
    }
    setComment("");
  }, [comment, findInboxData,  data, decision,agenda]);
  
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
      <div className="w-full  grid grid-cols-1  gap-2 p-2">
        <div className="flex justify-start items-start gap-1">
          <Label>Subject</Label>
          <p className="text-xs md:text-sm text-muted-foreground">
            Minutes Of {findInboxData?.meeting?.subject} held during the period{" "}
            {findInboxData?.meeting?.timeSchedule[0]?.start_date?.toLocaleString()}{" "}
            to{" "}
            {findInboxData?.meeting?.timeSchedule[0]?.end_date?.toLocaleString()}{" "}
            - Nothing
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <Label>Background:</Label>
          <p className="text-xs md:text-sm text-muted-foreground">
            {data?.background}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <Label>Constitution of the {findInboxData?.meeting?.subject}:</Label>
          <p className="text-xs md:text-sm text-muted-foreground">
            The members & special invitees of the{" "}
            {findInboxData?.meeting?.subject} are as given under:
          </p>
          <div className="w-full grid grid-cols-1 p-3">
            
            <div className="w-full h-full ">
              {/* {isPending ? (
                                    <TableLoader />
                                  ) : ( */}
              <TableView
                data={data?.committeesUser ?? []}
                columns={inboxMembersColumn || []}
                showFilters={false}
              />
              {/* )} */}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <Label>Members Present:</Label>

          <div className="w-full grid grid-cols-1 p-3">
            <div className="w-full h-full ">
              {/* {isPending ? (
                                    <TableLoader />
                                  ) : ( */}
              <TableView
                data={data?.committeesUser ?? []}
                columns={inboxMembersColumn || []}
                showFilters={false}
              />
              {/* )} */}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <Label>Convener:</Label>

          <div className="w-full grid grid-cols-1 p-3">
            <div className="w-full h-full ">
              {/* {isPending ? (
                                    <TableLoader />
                                  ) : ( */}
              <TableView
                data={data?.committeesUser?.slice(0,1) ?? []}
                columns={inboxMembersColumn || []}
                showFilters={false}
              />
              {/* )} */}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <Label>Special Invitees:</Label>

          <div className="w-full grid grid-cols-1 p-3">
            <div className="w-full h-full ">
              {/* {isPending ? (
                                    <TableLoader />
                                  ) : ( */}
              <TableView
                data={data?.committeesUser ?? []}
                columns={inboxMembersColumn || []}
                showFilters={false}
              />
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start ">
        <div className="w-full  p-2 flex justify-between items-center">
          <h3 className="font-bold text-sm md:text-base text-foreground">
            Department Confirmation Regarding Each Agenda Or NFA
          </h3>
        </div>
        <div className="w-full  p-2">
          <div className="w-full flex justify-between items-center">
            <Label htmlFor="name" className="text-right">
              Select NFA / Agenda
            </Label>
            <div className="p-2 flex justify-center items-center gap-2">
              <Select
                value={agenda}
                onValueChange={(value) => {
                  setAgenda(value);
                }}
              >
                <SelectTrigger className="w-40 h-9">
                  <SelectValue placeholder="Select NFA / Agenda" />
                </SelectTrigger>
                <SelectContent>
                  {agendaOption?.map((item) => (
                    <SelectItem key={item?.value} value={item?.value}>
                      {item?.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-full flex justify-between items-center">
              <Label htmlFor="name" className="text-right">
                Remarks
              </Label>
              <div className="p-2 flex justify-center items-center gap-2">
                <Select
                  value={decision}
                  onValueChange={(value) => {
                    setDecision(value);
                  }}
                >
                  <SelectTrigger className="w-40 h-9">
                    <SelectValue placeholder="Select Decision" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      { label: "Approved", value: "Approved" },
                      { label: "Reject", value: "Reject" },
                      { label: "Raise Query", value: "Raise Query" },
                      { label: "Reschedule", value: "Reschedule" },
                    ].map((item) => (
                      <SelectItem key={item?.value} value={item?.value}>
                        {item?.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  disabled={!decision || !comment}
                  onClick={() => handleAddingComment()}
                  size={"sm"}
                  variant={"secondary"}
                  className="flex gap-1"
                >
                  <Plus size={16} />
                  Add
                </Button>
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
            data={data?.observation ?? []}
            columns={inboxMomObservationColumn || []}
            showFilters={false}
          />
          {/* )} */}
        </div>
      </div>

      <div className="w-full flex justify-center items-center gap-2">
        <Button onClick={handleDialogOpen} size={"sm"}>
          Close
        </Button>
        
      </div>
    </div>
  );
}

export default memo(MinutesOFMeetingView);
