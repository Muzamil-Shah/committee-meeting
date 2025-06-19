import { useEffect, useMemo, useState } from "react";
import { useMeeting } from "../../../contexts/MeetingProvider";
import Empty from "../../../components/empty";
import { IMeeting } from "../../loans/meetings/type";

const formatDate = (date: Date | null) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatDateRange = (start: Date | null, end: Date | null) => {
  if (start && end && start?.toDateString() === end?.toDateString()) {
    return `${formatDate(start)} - ${end.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return `${formatDate(start)} - ${formatDate(end)}`;
};

const now = new Date();

export function IncomingMeetingCards() {
  const { meetings } = useMeeting();
  const [timeLeft, setTimeLeft] = useState<string>("");

  const meetingData = useMemo(() => {
    if (meetings && meetings?.length > 0) {
      let meetingDataList:IMeeting[] = [];
      meetings.map((item) => {
        if(item?.timeSchedule?.length > 1){
          item?.timeSchedule?.map((_ , index) => meetingDataList?.push(({
            ...item,
            start_date: new Date(item?.timeSchedule[index]?.start_date!),
            end_date: new Date(item?.timeSchedule[index]?.end_date!),
          })) )
        }else{

          meetingDataList?.push({
            ...item,
            start_date: new Date(item?.timeSchedule[0]?.start_date!),
            end_date: new Date(item?.timeSchedule[0]?.end_date!),
          });
        }
      });
      return meetingDataList;
    }
    return [];
  }, [meetings]);

  const sortedMeetings = useMemo(
    () => meetingData?.length > 0 ? 
        meetingData
        .filter((meeting) => meeting.start_date && meeting.start_date > now)
        .sort((a, b) =>
          a?.start_date && b?.start_date
            ? a?.start_date?.getTime() - b.start_date.getTime()
            : 0
        ) : [],
    [meetingData]
  );

  const upcomingMeetingIndex = sortedMeetings &&  sortedMeetings.findIndex(
    (meeting) => meeting.start_date && meeting.start_date > now
  );
  useEffect(() => {
    if (upcomingMeetingIndex !== -1) {
      const interval = setInterval(() => {
        const now = new Date();
        const upcomingMeeting = sortedMeetings[upcomingMeetingIndex];
        const diff = upcomingMeeting.start_date
          ? upcomingMeeting.start_date.getTime() - now.getTime()
          : 0;

        if (diff <= 0) {
          clearInterval(interval);
          setTimeLeft("Meeting started");
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [upcomingMeetingIndex]);

  return (
    <div className="w-full h-[80vh] overflow-auto border-b">
        {sortedMeetings?.length ===0  ? <div className="w-full  flex flex-col justify-center items-center gap-2 "><div className="w-20 h-20 object-cover"><Empty/></div>
        <p>No Data</p></div> :
      sortedMeetings.map((meeting, index) => (
        <div
          key={index}
          className={`bg-white dark:bg-gray-800 mx-2 mb-2 shadow-md rounded-xl border p-4 hover:shadow-lg transition-all ${
            index === upcomingMeetingIndex && " "
          } `}
        >
          <h1
            className={`text-lg font-semibold text-[#0a97e6] mb-2  ${
              index === upcomingMeetingIndex && "mb-0"
            } `}
          >
            {meeting.title}
          </h1>
          {index === upcomingMeetingIndex ? (
            <div className="flex justify-between">
              <span className=" text-[#0a97e6] font-medium">
                <span className="text-xs text-gray-600 font-normal">
                  Time Left:
                </span>{" "}
                {timeLeft}
              </span>
            </div>
          ) : (
            <p
              className={`text-gray-500 mb-1 text-xs flex justify-between ${
                index === upcomingMeetingIndex && " "
              }`}
            >
              {formatDateRange(meeting.start_date, meeting.end_date)}
            </p>
          )}
          <p className="text-gray-600 text-xs">
            Agenda: <span className="font-medium">{meeting.agenda.length}</span>{" "}
            items
          </p>
          <p className="text-gray-600 text-xs">
            Committee:{" "}
            <span className="font-medium">{meeting.committee.length}</span>{" "}
            members
          </p>
          <p className="text-gray-600 text-xs">
            NFA: <span className="font-medium">{meeting.nfa.length}</span> items
          </p>
          {/* {index === upcomingMeetingIndex && (
            <div className="flex justify-end">
              <Clock
                className="bg-[#f87e28] w-fit animate-spin rounded-full text-white"
                size={20}
                style={{ animationDuration: "5s" }}
              />
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
}
