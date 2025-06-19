import React, { createContext, useContext, useState } from "react";


type AccessContextType = {
  accessType: string | null;
  setAccessType: (accessType: string | null) => void;
};

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export const useAccess = () => {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error("useAccess must be used within an AccessProvider");
  }
  return context;
};

export const AccessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessType, setAccessType] = useState<string | null>(
    null
  );

  return (
    <AccessContext.Provider value={{ accessType, setAccessType }}>
      {children}
    </AccessContext.Provider>
  );
};
