import {  BrickWall, FolderRoot, Presentation, Section, User,  } from "lucide-react";
import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { Skeleton } from "../../components/ui/skeleton";

export const masterMDMComponent = [
 
  
  {
    fIcon: <BrickWall />,
    Icon: <BrickWall />,
    name: "builders",
    label: "Builders Master Data",
    component: lazy(() => import("./builder-mdm")),
    roleNames: ["Admin"]
  },
  {
    fIcon: <Presentation />,
    Icon: <Presentation />,
    name: "projects",
    label: "Project Master Data",
    component: lazy(() => import("./project-mdm")),
    roleNames: ["Admin"]
  },
  {
    fIcon: <FolderRoot />,
    Icon: <FolderRoot />,
    name: "folder",
    label: "Folder Location",
    component: lazy(() => import("./folder-mdm")),
    roleNames: ["Admin"]
  },
  {
    fIcon: <Section />,
    Icon: <Section />,
    name: "category",
    label: "HSN/SAC",
    component: lazy(() => import("./hsn-sac-mdm")),
    roleNames: ["Admin"]
  },
  
  
 
  
  {
    fIcon: <User />,
    Icon: <User />,
    name: "users",
    label: "Users",
    component: lazy(() => import("./users")),
    roleNames: ["Admin"]
  },
  

];

const MasterMDMLayout = () => {
  const location = useLocation();
  const ActiveComponent = masterMDMComponent.find((tab) => tab.name === location.pathname?.split("/")[location.pathname?.split("/")?.length - 1])?.component;


  return (
    <Suspense
      fallback={
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      }
    >
      {ActiveComponent && <ActiveComponent />}
    </Suspense>
  );
};

export default MasterMDMLayout;
