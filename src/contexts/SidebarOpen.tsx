import { createContext, useState, useContext, ReactNode } from "react";
interface SidebarOpenContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarOpenContext = createContext<SidebarOpenContextType | undefined>(undefined);

export const useSidebarOpen = (): SidebarOpenContextType => {
  const context = useContext(SidebarOpenContext);
  if (!context) {
    throw new Error("useSidebarOpen must be used within a SidebarOpenProvider");
  }
  return context;
};

export const SidebarOpenProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  const value = {
    isSidebarOpen,
    toggleSidebar,
  };

  return (
    <SidebarOpenContext.Provider value={value}>
      {children}
    </SidebarOpenContext.Provider>
  );
};
