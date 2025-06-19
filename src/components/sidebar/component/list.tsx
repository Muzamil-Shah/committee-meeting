import { cva } from "class-variance-authority";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

type Props = {
  item: {
    id: number;
    path: string;
    icon: JSX.Element;
    name: string;
    children?: { id: number; name: string; path: string; icon: JSX.Element }[];
  };
  isExpanded: boolean;
  onToggle: () => void;
  isOpen: boolean;
};

const List = ({ item, isExpanded, onToggle, isOpen }: Props) => {
  const location = useLocation();
  // const [searchQuery, setSearchQuery] = useState("");
  const linkStyles = cva(
    "flex justify-between items-center text-[14px] gap-3 p-2 rounded-md transition-colors duration-200",
    {
      variants: {
        isOpen: {
          true: " border-primary",
          false: "border-none m-0 p-0 ",
        },
        active: {
          true: "bg-gray-100 dark:bg-gray-900  font-semibold text-primary",
          false:
            "hover:bg-gray-200 hover:bg-background  font-medium text-[#414651] hover:text-primary",
        },
      },
      defaultVariants: {
        isOpen: false,
        active: false,
      },
    }
  );

  // const filteredChildren = item.children?.filter((child) =>
  //   child.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <li>
      <div onClick={onToggle} className="cursor-pointer">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to={item.path}
                className={linkStyles({
                  isOpen: isOpen,
                  active: location.pathname === item.path,
                })}
              >
                <div className="flex">
                  <span className="text-xs ">{item.icon}</span>
                  {isOpen && (
                    <span className=" flex items-center ml-1 ">
                      {item.name}
                    </span>
                  )}
                </div>
                {item.children && isOpen && (
                  <div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </div>
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {item?.children && isExpanded && (
        <ul
          className={cn(
            " mt-1 bg-gray-50 dark:bg-gray-900 rounded-md ",
            isOpen
              ? "max-h-auto ml-2"
              : "ml-0"
          )}
        >
          {/* {item?.children?.length >= 4 && (
            <div className="sticky top-0 bg-white dark:bg-gray-900 p-2 z-10">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 text-[12px] font-semibold bg-background  border-none outline-none shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-md"
              />
            </div>
          )} */}
          {item.children?.map((child,i) => (
            <TooltipProvider key={i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to={child.path}
                    className={linkStyles({
                      isOpen: isOpen,
                      active: location.pathname === child.path,
                    })}
                  >
                    <div className="flex">
                      <span className="text-xl ">{child.icon}</span>
                      {isOpen && (
                        <span className=" flex items-center ml-1 ">
                          {child.name}
                        </span>
                      )}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{child.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ul>
      )}
    </li>
  );
};

export default List;
