import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";

import { useEffect } from "react";
import { useUser } from "../../../contexts/user-context";
import { useAccess } from "../../../contexts/AccessContext";
import { OTP_VERIFICATION_VENDOR } from "../../../lib/endpoint";
import { CircleX} from "lucide-react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {  UserVendorDetails } from "../../../types/Data";
import { toast } from "../../../components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../components/ui/input-otp";
import useApi from "../../../hooks/use-api";

const formSchema = z.object({
  otp: z.string({message:"Only text is allowed. Please enter a valid string."}).min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;



export type MutationResponse = {
  status: boolean;
  message: string;
  responseCode: number;
  data?: {
    token?: string; 
    message?: string;
      emailId?: string;
      username?: string;
      expiryDate?: string;
      uniqueNumber?: string;
  };
  token?:string;
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

const OTPVerifyForm = ({email,code}:{email:string,code:string}) => {
  const navigate = useNavigate();
const {setUser} = useUser()
const {setAccessType} = useAccess()
  

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });



  const {data,isError,isLoading,fetchData} = useApi<MutationResponse>()

  
  useEffect(() => {
    if (isError) {
      toast({
        icon: <CircleX />,
        bgColor: "bg-red-500",
        title: isError ?? isError ?? "An error occurred",
      });
    } else if (data?.status && data?.token) {
      const tokenRetrieve = data?.token;
      if (tokenRetrieve) {
        localStorage.setItem("token", tokenRetrieve);
        const decodedToken = jwtDecode<
          JwtPayload & { userDetails: UserVendorDetails }
        >(tokenRetrieve);
        const userDetails = decodedToken?.userDetails;
        
        if (userDetails && tokenRetrieve) {
          setAccessType(userDetails.role);
          localStorage.setItem("user", JSON.stringify({...userDetails,...data?.data}));
          setUser({...userDetails,token:tokenRetrieve,...data?.data})
          if (userDetails?.role?.includes("Vendor")) {
            navigate("/vendor-onboarding");
          }
        }
      }
    }
  }, [data?.status, isError]);

  const onSubmit = (values: FormValues) => {
   
    if(email){
      fetchData(OTP_VERIFICATION_VENDOR,'POST',{...values,code,emailId:email})
    }
  };



  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-10/12 space-y-6">
      <div className="flex justify-between">
          <div>
            <h1 className="text-sm md:text-[30px] font-semibold">
            OTP Verfication
            </h1>
          </div>
        </div>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Enter code sent to your email ID ({email})
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} >
                  <InputOTPGroup >
                    <InputOTPSlot className="bg-background" index={0} />
                    <InputOTPSeparator />
                    <InputOTPSlot className="bg-background" index={1} />
                    <InputOTPSeparator />
                    <InputOTPSlot className="bg-background" index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot className="bg-background" index={3} />
                    <InputOTPSeparator />
                    <InputOTPSlot className="bg-background" index={4} />
                    <InputOTPSeparator />
                    <InputOTPSlot className="bg-background" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" disabled={isLoading}>Verify OTP</Button>
      </form>
    </Form>
  );
};

export default OTPVerifyForm;
