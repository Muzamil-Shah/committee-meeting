import React, { createContext, useContext, useEffect, useState } from "react";
import { CommitteeData } from "../view/loans/committee/type";


type CommitteesContextType = {
  committees: CommitteeData[];
  addingCommittee:(data:CommitteeData) => void ;
  updateCommittee:(data:CommitteeData) => void ;
  isLoading: boolean;
};

const CommitteesContext = createContext<CommitteesContextType | undefined>(undefined);



export const CommitteesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [committees, setCommittees] = useState<CommitteeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const committeesData = JSON.parse(localStorage.getItem("committees") ?? "{}");
    if (committeesData && committeesData?.length > 0) {
      setCommittees((pre) => (pre && [...committeesData ]));
      setIsLoading(false)
    }
  }, []);

  

  const addingCommittee = (committee:CommitteeData) => {
    console.log({committee});
    const newData = [...committees,committee]
    setCommittees((pre) => [...pre, committee])
    localStorage.setItem("committees", JSON.stringify(newData))
  }
  const updateCommittee = (committee:CommitteeData) => {
    console.log({committee});
    const newData = committees?.map((el) => (el?.id === committee?.id ? { ...el, ...committee } : el))
    setCommittees((prev) =>
      prev?.map((el) => (el?.id === committee?.id ? { ...el, ...committee } : el)))
    localStorage.setItem("committees", JSON.stringify(newData))
  }

  // if (isLoading) {
  //   return <div>Loading... me</div>; // Or a spinner/loader
  // }


  return (
    <CommitteesContext.Provider value={{ committees,updateCommittee, addingCommittee,isLoading }}>
      {children}
    </CommitteesContext.Provider>
  );
};


export const useCommittees = () => {
  const context = useContext(CommitteesContext);
  if (!context) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
};