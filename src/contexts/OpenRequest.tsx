import { createContext, useState, useContext, ReactNode } from "react";
interface OpenRequestContextType {
  isOpenRequest: string | null;
  setIsOpenRequest: React.Dispatch<React.SetStateAction<string | null>>;
}

const OpenRequestContext = createContext<OpenRequestContextType | undefined>(undefined);

export const useOpenRequest = (): OpenRequestContextType => {
  const context = useContext(OpenRequestContext);
  if (!context) {
    throw new Error("useOpenRequest must be used within a OpenRequestProvider");
  }
  return context;
};

export const OpenRequestProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenRequest, setIsOpenRequest] = useState<string | null>(null);


  const value = {
    isOpenRequest,
    setIsOpenRequest,
  };

  return (
    <OpenRequestContext.Provider value={value}>
      {children}
    </OpenRequestContext.Provider>
  );
};
