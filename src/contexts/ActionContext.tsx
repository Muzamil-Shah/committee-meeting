import React, { createContext, useContext, useState } from "react";


type ActionContextType = {
  action: string | null;
  setAction: (action: string | null) => void;
};

const ActionContext = createContext<ActionContextType | undefined>(undefined);

export const useAction = () => {
  const context = useContext(ActionContext);
  if (!context) {
    throw new Error("useAction must be used within an ActionProvider");
  }
  return context;
};

export const ActionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [action, setAction] = useState<string | null>(
    null
  );

  return (
    <ActionContext.Provider value={{ action, setAction }}>
      {children}
    </ActionContext.Provider>
  );
};
