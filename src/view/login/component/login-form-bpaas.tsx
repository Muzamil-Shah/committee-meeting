import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "../../../components/ui/button";
import {
  Form,
} from "../../../components/ui/form";
import { useEffect } from "react";
import FormViewComponent from "../../../components/form-view/form-view-component";

import { toast } from "../../../components/ui/use-toast";
import {   SIGN_IN } from "../../../lib/endpoint";
import { CircleX } from "lucide-react";
import useApi from "../../../hooks/use-api";
import {  Link, useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserVendorDetails } from "../../../types/Data";
import { useAccess } from "../../../contexts/AccessContext";
import { useUser } from "../../../contexts/user-context";
import { userRole } from "../../../lib/auth-abac";
import { cn } from "../../../lib/utils";
import microsoft from '../../../assets/microsoft.svg'

const formSchema = z.object({
  username: z
    .string()
    .min(2)
    .trim()
    .refine((val) => val.length >= 2, {
      message: "email must be at least 2 characters.",
    }),
  password: z
    .string()
    .min(5)
    .trim()
    .refine((val) => val.length >= 5, {
      message: "Password must be at least 6 characters.",
    }),
  captchaInput: z.string({message:"Only text is allowed. Please enter a valid string."}).min(5).max(5),
});

type FormValues = z.infer<typeof formSchema>;

// type MutationInput = FormValues;

export type MutationResponse = {
  response: string[];
  status: boolean;
  message: string;
  statusCode: number;
  data?: {
    token?: string;
    message?: string;
  };
  error?: {
    message?: string;
  };
};

export type CustomError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};

const LoginFormBpaas = ({ }: {  }) => {
  // const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  const {setAccessType} = useAccess()
  const {setUser} = useUser()
  const navigate = useNavigate()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: "",
      captchaInput: "p2g28",
    },
  });

  

  const { data, isError, isLoading, fetchData } = useApi<{
    token:string;
    responseStatus: string;
    loginFlag:string;
}>();

  useEffect(() => {
    if (isError) {
      toast({
        icon: <CircleX />,
        bgColor: "bg-red-500",
        title: isError ?? isError ?? "An error occurred",
      });
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
            navigate("/dashboard");
          }else if(["MRO",userRole.app1, userRole.app2]?.includes(userDetails?.role)){
            navigate("/dashboard/mro");

          }
        }
      }
    }
  }, [data?.responseStatus, isError]);

  const onSubmit = (values: FormValues) => {
    
    
      
      fetchData(SIGN_IN, "POST", {
        ...values,
        csrft:
          "Utbr7EJaVx6R9m2gB9C3yaaZb7s/F62lwp+vWjqoRzqax58lUXtRGOEqoCZcVvkL",
        captchaInput: "p2g28",
        encCaptcha: "PFIdacAKFRkNKD5Aw7p23Q==",
        csrf: "1f7186c0-27e3-4f4e-869f-0f78a0b3648d",
        loginFlag: 1,
      });
    
  };


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-10/12 space-y-3"
      >
        <div className="flex justify-between">
          <div className="flex flex-col justify-start items-start gap-2">
            <h1 className="text-sm md:text-[30px] font-semibold">
              Log in to your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Welcome back! Please enter your details.
            </p>
          </div>
        </div>

        <FormViewComponent
          name="username"
          label="Email"
          placeholder="Email Address"
          type="text"
          control={form.control}
        />

        <FormViewComponent
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
          control={form.control}
        />

        
          <div className="flex justify-center items-center py-3">
        {data?.responseStatus === 'failed' && (

                <p className="text-[10px] md:text-sm truncate text-red-500">
                  {data?.token}
                </p>
              )}
              </div>



        <Button type="submit" className="w-full " disabled={isLoading}>
          Login
        </Button>
        <Link to="https://login.microsoftonline.com/312ca928-514b-41d6-9b98-496fe46e422c/oauth2/v2.0/authorize?client_id=5223f95e-afb9-4583-b435-b67550e9b6e7&redirect_uri=https%3A%2F%2Fprocure2pay.in.panasonic.com%2F&scope=User.Read&response_type=code&state=fr08XL5RAcjRKNSY6a5i708JrU44BEddbIw" className={cn(buttonVariants({variant:'outline',className:'w-full flex justify-center items-center gap-2 '}))} >
        <img src={microsoft} className="w-6 h-6" /><span className="text-muted-foreground">Login with Microsoft 365</span>
        </Link>
      </form>
    </Form>
  );
};

export default LoginFormBpaas;
