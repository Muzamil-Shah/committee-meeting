import {  Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";
import { cn } from "../lib/utils";
import { useSidebarOpen } from "../contexts/SidebarOpen";
import ChatComponent from "../components/chat-bot/chat-component";
// import { Loader } from "lucide-react";

const Layout = () => {
  const {isSidebarOpen,toggleSidebar} = useSidebarOpen();
  
  

  // if (isLoading) {
  //   return <div className="w-full h-screen flex justify-center items-center"><Loader className="w-10 h-10 animate-spin" /></div>; // Or a spinner/loader
  // }
 
  

  
  
  return (
    <div className="w-full min-h-screen  bg-background  text-foreground flex">
      <ChatComponent />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={cn(`h-full w-full 
      flex flex-col justify-start items-start p-3 `, isSidebarOpen ? "sm:w-[calc(100%-80px)] lg:w-[calc(100%-260px)] sm:ml-[260px]" : " sm:w-[calc(100%-80px)] sm:ml-[80px]")}>
        {/* <Header/> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
