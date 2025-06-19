import lhxLogo from "../../assets/login-side.png";
import logo from "../../assets/logo.png";
import {  useEffect } from "react";
import ExpiredLinkView from "./component/expired-link";
import { VERIFY_MICROSOFT_CODE} from "../../lib/endpoint";
import { CircleX, Loader } from "lucide-react";
import useApi from "../../hooks/use-api";
import { toast } from "../../components/ui/use-toast";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserVendorDetails } from "../../types/Data";
import { useAccess } from "../../contexts/AccessContext";
import { useUser } from "../../contexts/user-context";
import { userRole } from "../../lib/auth-abac";


export type MutationResponse = {
  data: string;
  message: string,
  responseCode: number,
  status: boolean
};


function MicrosoftCallbackView() {
 
  const {setAccessType} = useAccess()
    const {setUser} = useUser()
  
  //api call
  const {data,isLoading,isError,fetchData} = useApi<{
    token:string;
    responseStatus: string;
    loginFlag:string;
}>()
  
const url = new URL(window.location.href);
const codeParams = url?.search?.split("?code=")[1]?.split('&state=')[0]

let timer = 0

if(!codeParams){
  window.location.replace("https://login.microsoftonline.com/312ca928-514b-41d6-9b98-496fe46e422c/oauth2/v2.0/authorize?client_id=5223f95e-afb9-4583-b435-b67550e9b6e7&redirect_uri=https%3A%2F%2Fprocure2pay.in.panasonic.com%2F&scope=User.Read&response_type=code&state=fr08XL5RAcjRKNSY6a5i708JrU44BEddbIw");
  return null
}
  useEffect(() => {
    
    if (codeParams) {
      
      setTimeout(() => {
        fetchData(VERIFY_MICROSOFT_CODE,'GET',{code:codeParams?.replace(" ","+")});
      }, timer);
      timer = 1500;
    }else{
      // navigate("/login")
    }
  }, [codeParams]);


  useEffect(() => {
    if (isError) {
      toast({
        icon: <CircleX />,
        bgColor: "bg-red-500",
        title: isError ?? isError ?? "An error occurred",
      });
      const baseUrl = `${window.location.origin}/#/login`;
          window.location.replace(baseUrl);
      
    } else if (data?.responseStatus === 'success' && data?.token) {
      const tokenRetrieve = data?.token;
      if (tokenRetrieve) {
        localStorage.setItem("token", tokenRetrieve);
        const decodedToken = jwtDecode<
          JwtPayload & { userDetails: UserVendorDetails }
        >(tokenRetrieve);
        const userDetails = decodedToken?.userDetails;
        
        if (userDetails && tokenRetrieve) {
          setAccessType(userDetails.role);
          localStorage.setItem("user", JSON.stringify({...userDetails}));
          setUser({...userDetails,token:tokenRetrieve})
         if ([userRole.user,userRole?.fna,userRole?.dmd,userRole?.hod]?.includes(userDetails?.role)) {
          const baseUrl = `${window.location.origin}/#/dashboard`;
          window.location.replace(baseUrl);
          }else if(["MRO",userRole.app1, userRole.app2]?.includes(userDetails?.role)){
            // navigate("/dashboard/mro", { replace: true });
            const baseUrl = `${window.location.origin}/#/dashboard/mro`;
      window.location.replace(baseUrl);

          }
        }
      }
    }
  }, [data?.responseStatus, isError]);
  
  
  if(isLoading){
    return (<div className="w-full h-screen flex justify-center items-center">
      <Loader className="animate-spin" />

    </div>)
  }
  // if(!code){
   
  //     return <Navigate to="/login" replace />;
   
  // }

  

  return (
    <div className="w-full h-screen overflow-hidden p-6 flex justify-center items-center">
      <div className="w-full h-[calc(100vh-1.5rem)] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 md:gap-3 lg:gap-5">
        <div className="w-full h-[calc(100%-40%)]  md:h-[calc(100vh-1.5rem)] flex flex-col justify-center items-center space-y-3 md:space-y-8  rounded-tr-[70px] p-3 ">
          <div className="w-full md:w-10/12">
            <img
              loading="lazy"
              src={logo}
              alt="Logo"
              className="w-[150.38px] h-[24px] md:w-[209.38px] md:h-[32px]"
            />
          </div>
          {data &&  data?.responseStatus !== 'success' && <ExpiredLinkView />}
         
        </div>
        <div className="w-full h-[calc(100vh-65vh)] md:h-[calc(100vh-1.5rem)] ">
          <img
            loading="lazy"
            src={lhxLogo}
            alt="Logo"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default MicrosoftCallbackView;
