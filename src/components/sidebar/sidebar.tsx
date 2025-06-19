import {
  Menu,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  PersonStanding,
  Calendar,
  Group,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../contexts/theme-provider";
import List from "./component/list";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useUser } from "../../contexts/user-context";
import { useNavigate } from "react-router-dom";
import logoWhite from "../../assets/side-logo.svg";
import lhxBigLogo from "../../assets/side-logo.svg";
import bankImage from "../../assets/meeting.svg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DialogBox } from "../dialog-popup/dialog-box";
// import { masterMDMComponent } from "../../view/master/master-mdm-layout";
import { userRole } from "../../lib/auth-abac";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

type MenuItem = {
  id: number;
  name: string;
  icon: JSX.Element;
  path: string;
  roleNames: string[];
  children?: {
    id: number;
    name: string;
    path: string;
    icon: JSX.Element;
    roleNames: string[];
  }[];
};

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/dashboard",
    roleNames: [userRole?.admin,userRole.mro],
  },
  
  {
    id: 2,
    icon: <PersonStanding />,
    name: "My Inbox",
    path: "/committee-meeting/my-inbox",
    roleNames: [...Object.values(userRole)],
  },
  {
    id: 3,
    icon: <PersonStanding />,
    name: "NFA",
    path: "/committee-meeting/nfa",
    roleNames: [...Object.values(userRole)],
  },
  {
    id: 4,
    icon: <Group />,
    name: "Create Committee",
    path: "/committee-meeting/committee",
    roleNames: [...Object.values(userRole)],
  },
  {
    id: 5,
    icon: <Calendar />,
    name: "Meeting",
    path: "/committee-meeting/meetings",
    roleNames: [...Object.values(userRole)],
  },
  
 
  
];

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [isExpanded, setIsExpanded] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setIsExpanded(isExpanded === id ? null : id);
  };

  useEffect(() => {
    if (user?.role?.includes("Admin")) {
      handleToggle(7);
    }
  }, [user]);

  console.log("sidebar",{user});
  

  const logoSrc =
    theme === "dark" || theme === "system" ? logoWhite : lhxBigLogo;

  const filteredMenuItems = useMemo(() => menuItems
    .filter((item) => item.roleNames?.includes(user?.role ?? ""))
    .map((item) => {
      if (item.children) {
        const filteredChildren = item.children.filter((child) =>
          child.roleNames?.includes(user?.role ?? "")
        );
        return { ...item, children: filteredChildren };
      }
      return item;
    }),[menuItems,user])

  // const filteredMenuItemsWithSearch = filteredMenuItems?.filter((item) =>
  //   item.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const handleLogout = () => {
    setTimeout(() => {
      // localStorage.clear();
      setUser(null);
      navigate("/login");
    }, 2000);
    setIsDialogOpen(false);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };


  return (
    <div
      className={cn(
        "fixed h-[calc(100vh-0px)] flex flex-col justify-between z-50 "
      )}
    >
      <div
        className={cn(
          "fixed top-0 left-0 h-full   p-3 z-50 transform transition-transform duration-700",
          isOpen
            ? "sm:translate-x-0 bg-background   shadow-lg sm:static w-[75%] sm:w-[180px] md:w-[200px] lg:w-[240px]"
            : "sm:translate-x-0 bg-transparent  shadow-none sm:shadow-lg sm:bg-background  sm:static w-[0px] sm:w-[65px] lg:w-[65px]"
        )}
      >
        <div
          className={cn(
            "h-[calc(100vh-200px)] md:h-[calc(100vh-90px)]  flex flex-col justify-between relative gap-2"
          )}
        >
          <div className="w-full flex relative h-[calc(100vh-90vh)] ">
            {isOpen && (
              <div className="w-full h-8   overflow-hidden flex justify-center items-center  p-10 ">
                <img
                  src={logoSrc}
                  width={150}
                  height={150}
                  // className="w-[150px] h-20 bg-red-300"
                  alt="Logo"
                />
              </div>
            )}
            <div>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSidebar}
                className={cn(
                  "flex transition-transform mt-[2px] duration-300",
                  isOpen
                    ? "absolute rotate-180 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ml-[-10px] border-none"
                    : ""
                )}
                name="close-button"
              >
                {isOpen ? <ChevronRight className="text-red-500" /> : <Menu />}
              </Button>
            </div>
          </div>
          {/* {isOpen && (
            <div className="sticky  top-3 left-0 bg-white dark:bg-gray-900 p-2 z-50 overflow-visible">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full  p-2 text-[12px] font-semibold bg-background  border-none outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md"
              />
            </div>
          )} */}
          <ul className="flex flex-col gap-4 mt-5 h-[calc(100vh-50vh)]  scroll-main overflow-auto">
            {filteredMenuItems.map((item) => (
              <List
                isOpen={isOpen}
                key={item.id}
                item={item}
                isExpanded={isExpanded === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </ul>
          <div className="w-full h-[calc(100vh-70vh)]  flex justify-center items-center p-6">

          <img src={bankImage} alt="bank" width={914} height={438} />
          </div>
        </div>
        {isOpen ? (
          <div className="w-full h-[calc(100vh-90vh)]  flex justify-between items-center gap-1 overflow-hidden">
            <Avatar className="w-2/12">
              <AvatarImage src="https://github.com/shasdfasdcn.png" />
              <AvatarFallback>
                {user?.username?.charAt(0) ?? "AB"}
              </AvatarFallback>
            </Avatar>
            <div className="w-8/12 flex flex-col justify-start items-start gap-0.5 text-xs">
              <h3 className="font-medium line-clamp-1">
                {user?.fullName}
              </h3>
              <p className="w-full text-xs line-clamp-1">
                {user?.username}
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-1/12 p-0 m-0"
              variant={"ghost"}
              size={"sm"}
            >
              <LogOut />
            </Button>
          </div>
        ) : (
          <div className="w-full h-20 flex justify-center items-center gap-1 overflow-hidden">
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="w-full p-0 m-0"
              variant={"ghost"}
              size={"sm"}
              name="logout"
            >
              <LogOut />
            </Button>
          </div>
        )}
      </div>

      <DialogBox
        dialogTitle="Logout Account"
        dialogDescription="Are you sure you want to logout? Once you logout, you need to login again. Are you sure?"
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleLogout}
        textAlign="text-center"
        triggerButtonVariant={"bg-red-500 hover:bg-red-600"}
        buttonName="Logout"
      ></DialogBox>
    </div>
  );
};

export default Sidebar;
