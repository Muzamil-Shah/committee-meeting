import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Form,
  
} from "../../../components/ui/form";
import {  useEffect } from "react";
import FormViewComponent from "../../../components/form-view/form-view-component";

import { toast } from "../../../components/ui/use-toast";
import { SIGN_IN_VENDOR } from "../../../lib/endpoint";
import { CircleX } from "lucide-react";
import useApi from "../../../hooks/use-api";


const formSchema = z.object({
  emailId: z.string({message:"Only text is allowed. Please enter a valid string."})
    .min(2)
    .trim()
    .refine(val => val.length >= 2, { message: "email must be at least 2 characters." }),
  password: z.string({message:"Only text is allowed. Please enter a valid string."})
    .min(5)
    .trim()
    .refine(val => val.length >= 5, { message: "Password must be at least 6 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

// type MutationInput = FormValues


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

const LoginForm = ({setSwitchForm,email,code}:{code:string,email: string,setSwitchForm: React.Dispatch<React.SetStateAction<boolean>>}) => {
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailId: email,
      password: "",
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
    } else if (data?.status) {
      setSwitchForm(true)
      }
    
  }, [data?.status,isError]);

 

  const onSubmit = (values: FormValues) => {
    
    if(email === values.emailId){
      fetchData(SIGN_IN_VENDOR,'POST',{...values,code:code})
    }else{
      toast({title:"You are not able to sign in with diffrenet email!",status: 'error'})
    }
  };

  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-10/12"
      >
        <div className="flex justify-between">
          <div className="flex flex-col justify-start items-start gap-2">
            <h1 className="text-sm md:text-[30px] font-semibold">
            Log in to your account
            </h1>
            <p className="text-sm text-slate-500">
            Welcome back! Please enter your details.
            </p>
          </div>
        </div>

        <FormViewComponent
          name="emailId"
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

    

        

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
