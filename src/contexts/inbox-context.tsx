import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MyInboxI } from "../view/loans/my-inbox/type";
import { dummyInboxData } from "../view/loans/my-inbox/data";


type InboxContextType = {
  inbox: MyInboxI[];
  addingInbox:(data:MyInboxI) => void ;
  updateInbox:(data:MyInboxI) => void ;
  isLoading: boolean;
};

const InboxContext = createContext<InboxContextType | undefined>(undefined);



export const InboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inbox, setInbox] = useState<MyInboxI[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const inboxData = JSON.parse(localStorage.getItem("inboxes") ?? "{}");
    if (inboxData && inboxData?.length > 0) {
      setInbox((pre) => (pre && [...inboxData ]));
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    if(dummyInboxData){
      localStorage.setItem("inboxes",JSON.stringify(dummyInboxData))
    }
  },[dummyInboxData])

  const addingInbox = useCallback((data:MyInboxI) => {
    console.log({data});
    const newData = [...inbox,data]
    setInbox((pre) => [...pre, data])
    localStorage.setItem("inboxes", JSON.stringify(newData))
  },[inbox])
  const updateInbox = useCallback((data:MyInboxI) => {
    console.log({data});
    const newData = inbox?.map((el) => (el?.id === data?.id ? { ...el, ...data } : el))
    setInbox((prev) =>
      prev?.map((el) => (el?.id === data?.id ? { ...el, ...data } : el)))
    localStorage.setItem("inboxes", JSON.stringify(newData))
  },[inbox])

  // if (isLoading) {
  //   return <div>Loading... me</div>; // Or a spinner/loader
  // }


  return (
    <InboxContext.Provider value={{ inbox,updateInbox, addingInbox,isLoading }}>
      {children}
    </InboxContext.Provider>
  );
};


export const useInbox = () => {
  const context = useContext(InboxContext);
  if (!context) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
};