import lhxLogo from "../../assets/login-side.png";
import logo from "../../assets/logo.svg";
import { lazy, Suspense, useEffect,  useState } from "react";
import { Skeleton } from "../../components/ui/skeleton";
import ExpiredLinkView from "./component/expired-link";
import { VERIFY_VENDOR_LINK } from "../../lib/endpoint";
import { useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import useApi from "../../hooks/use-api";
const LoginForm = lazy(() => import("./component/login-form"));
const OTPVerifyForm = lazy(() => import("./component/otp-verification"));


export type MutationResponse = {
  data: string;
  message: string,
  responseCode: number,
  status: boolean
};


function LoginView() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const code = queryParams.get("code");
  const [switchForm, setSwitchForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

  //api call
  const {data,isLoading,fetchData} = useApi<MutationResponse>()
  

  useEffect(() => {
    if (code) {
      fetchData(VERIFY_VENDOR_LINK,'POST',{code:code?.replace(" ","+")});
    }
  }, [code]);

  useEffect(() => {
    if (data) {
      setEmail(data?.data)
    }
  }, [data]);
  
  if(isLoading){
    return (<div className="w-full h-screen flex justify-center items-center">
      <Loader className="animate-spin" />

    </div>)
  }
  if(!code){
    return (<div className="w-full h-screen flex justify-center items-center">
      <div className="w-full md:w-10/12">
            <img
              loading="lazy"
              src={logo}
              alt="Logo"
              className="w-[150.38px] h-[24px] md:w-[209.38px] md:h-[32px]"
            />
          </div>

    </div>)
  }

  

  return (
    <div className="w-full h-screen overflow-hidden p-6 flex justify-center items-center bg-secondary">
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
          {!data?.status && <ExpiredLinkView />}
          {data?.status &&
             email && 
            (switchForm  ? (
              <Suspense
                fallback={
                  <div className="flex flex-col justify-center items-center p-2 w-full gap-2">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                  </div>
                }
              >
                <OTPVerifyForm email={email} code={code?.replace(" ","+")} />
              </Suspense>
            ) : (
              <Suspense
                fallback={
                  <div className="flex flex-col justify-center items-center p-2 w-full gap-2">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                  </div>
                }
              >
                <LoginForm email={email} code={code?.replace(" ","+")} setSwitchForm={setSwitchForm} />
              </Suspense>
            ))}
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

export default LoginView;
