import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IMeeting } from "../view/loans/meetings/type";

type MeetingContextType = {
  meetings: IMeeting[];
  setMeetings: Dispatch<SetStateAction<IMeeting[]>>;
};

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error("useMeeting must be used within an MeetingProvider");
  }
  return context;
};

const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [meetings, setMeetings] = useState<IMeeting[]>([]);

  const value = useMemo(() => ({ meetings, setMeetings }), [meetings]);

  useEffect(() => {
    const localMeetings = localStorage.getItem("meetings");

    if (localMeetings) {
      setMeetings(JSON.parse(localMeetings));
    }
  }, []);

  useEffect(() => {
    if (meetings?.length > 0) {
      localStorage.setItem("meetings", JSON.stringify(meetings));
    }
  }, [meetings]);

  return (
    <MeetingContext.Provider value={value}>{children}</MeetingContext.Provider>
  );
};

export default MeetingProvider;
