import {
  HashRouter,
  Route,
  Routes,
  RouteObject,
} from "react-router-dom";
import Layout from "./view/layout";
import LoginUserView from "./view/login/users";
import {
  Fna,
  Meetings,
} from "./view/loans";
import DashboardView from "./view/dashboard";
import { useEffect, useState } from "react";
import { User, useUser } from "./contexts/user-context";
import { userRole } from "./lib/auth-abac";
import PageNotFound from "./components/PageNotFound";
import LayoutLoader from "./components/loading/layout-loading";
import Empty from "./components/empty";
import MasterMDMLayout, { masterMDMComponent } from "./view/master/master-mdm-layout";
import Committee from "./view/loans/committee";
import MyInbox from "./view/loans/my-inbox";

// Uncomment and implement `PrivateRoute` if needed for authentication

interface PrivateRouteProps {
  children: JSX.Element;
  user: User;
  allowedRoles: string[]; // Define roles that can access this route
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles,
  user,
}) => {
  // const navigate = useNavigate()
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ensure the loading state is reset properly
    setIsLoading(true);

    if (user?.token && user?.role) {
      // Check if the user role is in the allowed roles
      // const isAllowed = allowedRoles.includes(user.role);
      // if(!isAllowed){
      //   localStorage.clear();
      //   navigate("/login")
      // }
      setHasAccess(true);
      setIsLoading(false); // Loading is complete after the check
    } else {
      setHasAccess(false);
      setIsLoading(false); // Even if token/role is missing, loading is complete
    }
  }, [allowedRoles, user]);

  if (isLoading) {
    // Return loading state while waiting for the checks
    return <div>Loading...</div>;
  }

  if (!hasAccess) {
    // Clear local storage and redirect to login if no access
    // localStorage.clear();
    // return <Navigate to="/login" replace />;
  }

  // Render the children if access is granted
  return children;
};

interface AppRoute extends Omit<RouteObject, "children"> {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
  allowedRoles?: string[];
  hasChild?: boolean;
  children?: any;
}

const AppRouter = () => {
  const { user } = useUser();

  const routes: AppRoute[] = [
    {
      path: "*",
      element: <PageNotFound />,
      isPrivate: false,
      hasChild: false,
    },

    {
      path: "/login",
      element: <LoginUserView />,
      isPrivate: false,
      hasChild: false,
    },
    
    {
      path: "/",
      element: <LoginUserView />,
      isPrivate: false,
      hasChild: false,
    },
    
   

    {
      path: "/",
      element: <Layout />,
      isPrivate: false,
      allowedRoles: [...Object.values(userRole)],
      hasChild: true,
      children: [
        {
          path: "dashboard",
          element: <DashboardView />,
          isPrivate: false,
          allowedRoles: ["MRO", userRole?.app1, userRole?.app2,userRole.admin],
        },
        
        {
          path: "mdm-master",
          element: <MasterMDMLayout />,
          isPrivate: false,
          allowedRoles: ["MRO",userRole.admin],
          hasChild: true,
          children: masterMDMComponent?.map((tab) => ({
            path: tab?.name?.split(" ")?.join("-"),
            element: tab.component,
            hasChild: false,
          })),
        },
        {
          path: "committee-meeting/nfa",
          element: <Fna />,
          isPrivate: false,
          allowedRoles: [...Object.values(userRole)],
        },
        {
          path: "committee-meeting/committee",
          element: <Committee />,
          isPrivate: false,
          allowedRoles: [...Object.values(userRole)],
        },
        {
          path: "panasonic-dashboard/viewDocumentImg",
          element: <Empty />,
          isPrivate: false,
          allowedRoles: [...Object.values(userRole)],
        },
        {
          path: "committee-meetings",
          element: <Meetings />,
          isPrivate: false,
          allowedRoles: [...Object.values(userRole)],
        },
        {
          path: "committee-meeting/my-inbox",
          element: <MyInbox />,
          isPrivate: false,
          allowedRoles: [...Object.values(userRole)],
        },
       
        
      ],
    },
  ];

  const renderRoutes = (routesArray: AppRoute[]) =>
    routesArray.map(
      ({ path, element, isPrivate, allowedRoles, hasChild, children }) => (
        <Route
          key={path}
          path={path}
          element={
            isPrivate ? (
              !user ? (
                <LayoutLoader />
              ) : (
              <PrivateRoute allowedRoles={allowedRoles!} user={user!}>
                {element}
              </PrivateRoute>
              )
            ) : (
              element
            )
          }
        >
          {hasChild && children ? renderRoutes(children) : null}
        </Route>
      )
    );

  // const isLocal = window.location.hostname === "localhost";
  // const basename = isLocal ? "" : "/bpaas";
  // "homepage": "/bpaas",

  return (
    <HashRouter>
      <Routes>{renderRoutes(routes)}</Routes>
    </HashRouter>
  );
};

export default AppRouter;
