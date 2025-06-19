import BrowserHeader from "../../components/browser-header";
import { RecentItem } from "../../types/Data";
import { useUser } from "../../contexts/user-context";

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from "date-fns/locale/en-US";
import { IncomingMeetingCards } from "./component/income-meeting-cards";
import { useMeeting } from "../../contexts/MeetingProvider";
import { useMemo } from "react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export type RecentUpdateItem = RecentItem;

function DashboardView() {
  const { user } = useUser();
  const { meetings } = useMeeting();
  console.log({ meetings });

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#0a97e6",
        color: "white",
        borderRadius: "5px",
        border: "none",
      },
    };
  };

  const meetingData = useMemo(() => {
    if (!meetings || meetings.length === 0) return [];

    let meetingDataList: any = [];

    meetings.forEach((item) => {
      if (!item?.timeSchedule || item.timeSchedule.length === 0) return;

      if (item.timeSchedule.length > 1) {
        item.timeSchedule.forEach((schedule) => {
          if (schedule?.start_date && schedule?.end_date) {
            meetingDataList.push({
              ...item,
              start_date: new Date(schedule.start_date),
              end_date: new Date(schedule.end_date),
            });
          }
        });
      } else {
        const schedule = item.timeSchedule[0];
        if (schedule?.start_date && schedule?.end_date) {
          meetingDataList.push({
            ...item,
            start_date: new Date(schedule.start_date),
            end_date: new Date(schedule.end_date),
          });
        }
      }
    });

    return meetingDataList;
  }, [meetings]);

  return (
    <div className="w-full sm:h-[calc(100%-0px)] flex flex-col ">
      <BrowserHeader
        title={`Welcome back, ${user?.fullName ?? ""} `}
        description="Track your meetings and stay organized."
        children={
          <div className="w-full flex items-center justify-end gap-2">
            <div className="hidden md:flex">{/* <ModeToggle /> */}</div>
          </div>
        }
      />
      <div className="grid grid-cols-4 gap-4 ">
        <div className="col-span-3">
          <div className="h-[85vh] bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border">
            <Calendar
              localizer={localizer}
              events={meetingData ?? []}
              startAccessor="start_date"
              endAccessor="end_date"
              style={{ height: "100%" }}
              className="bg-white dark:bg-gray-800"
              eventPropGetter={eventStyleGetter}
            />
          </div>
        </div>

        <div className="col-span-1 ">
          <h1 className="px-4 pb-2 text-lg text-[#0a97e6]">
            Incoming Meetings
          </h1>
          <IncomingMeetingCards />
        </div>
      </div>
    </div>
  );
}

export default DashboardView;
