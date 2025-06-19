import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import { useEffect } from "react";
import FormViewComponent from "../../../components/form-view/form-view-component";

import { toast } from "../../../components/ui/use-toast";
import { CircleX } from "lucide-react";
import useApi from "../../../hooks/use-api";
import {  useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserVendorDetails } from "../../../types/Data";
import { useAccess } from "../../../contexts/AccessContext";
import { useUser } from "../../../contexts/user-context";
import CaptchImg from "../../../assets/captcha.jpg"

const formSchema = z.object({
  username: z
    .string()
    .min(2)
    .trim()
    .refine((val) => val.length >= 2, {
      message: "username must be at least 2 characters.",
    }),
  password: z
    .string()
    .min(5)
    .trim()
    .refine((val) => val.length >= 5, {
      message: "Password must be at least 6 characters.",
    }),
  captchaInput: z
    .string({ message: "Only text is allowed. Please enter a valid string." })
    .min(5)
    .max(8),
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

const LoginFormCaptcha = ({}: {}) => {
  // const [captchaImage, setCaptchaImage] = useState<string | null>(null);
  // const [_, setEncCaptcha] = useState("");
  // const [__, setCImg] = useState("");
  const { setAccessType } = useAccess();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      captchaInput: "",
    },
  });

  const { data, isError, isLoading } = useApi<{
    timeStamp: string;
    data: {
      userId: number;
      username: string;
      roleName: string;
      token: string;
    };
    message: string;
    isSuccess: string;
    statusCode: number;
  }>();
  // const MYCaptcha = async () => {
  //   try {
  //     const response = await getCaptcha();
  //     if (response?.isSuccess) {
  //       setCImg(`data:image/png;base64,${response?.data?.encCaptchaImg}`);
  //       setEncCaptcha(response?.data?.encCaptchaText);
  //     } else {
  //       toast({
  //         icon: <CircleX />,
  //         bgColor: "bg-red-500",
  //         title: response?.message ?? "Server is under maintenance",
  //       });
  //     }
  //   } catch (error: any) {
  //     if (error && error?.message === "Network Error") {
  //       toast({
  //         icon: <CircleX />,
  //         bgColor: "bg-red-500",
  //         title: "Server is under maintenance",
  //       });
  //     } else {
  //       toast({
  //         icon: <CircleX />,
  //         bgColor: "bg-red-500",
  //         title: error?.message ?? "Server is under maintenance",
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   MYCaptcha();
  // }, []);

  useEffect(() => {
    if (isError) {
      toast({
        icon: <CircleX />,
        bgColor: "bg-red-500",
        title: isError ?? isError ?? "An error occurred",
      });
    } else if (data?.isSuccess && data?.data?.token) {
      const tokenRetrieve = data?.data?.token;
      if (tokenRetrieve) {
        localStorage.setItem("token", tokenRetrieve);
        const decodedToken = jwtDecode<
          JwtPayload & { userDetails: UserVendorDetails }
        >(tokenRetrieve);
        const userDetails = decodedToken?.userDetails;

        if (userDetails && tokenRetrieve) {
          setAccessType(userDetails.role);
          localStorage.setItem("user", JSON.stringify({ ...userDetails }));
          setUser({ ...userDetails, token: tokenRetrieve });

          navigate("/dashboard");
        }
      }
    }
  }, [data?.isSuccess, isError]);

  

  const onSubmit = (values: FormValues) => {
    // fetchData(SIGN_IN, "POST", {
    //   ...values,
    //   csrft:
    //     "Utbr7EJaVx6R9m2gB9C3yaaZb7s/F62lwp+vWjqoRzqax58lUXtRGOEqoCZcVvkL",
    //   captchaInput: "p2g28",
    //   encCaptcha: "PFIdacAKFRkNKD5Aw7p23Q==",
    //   csrf: "1f7186c0-27e3-4f4e-869f-0f78a0b3648d",
    //   loginFlag: 1,
    // });
    if(values.username === 'admin@gmail.com' && values.password === 'Admin@123'){
      localStorage.setItem("token", 'alksdjflkewjoifjoiajvkjoiqwejfoijoisjdvoijwoiejfoij');
      setAccessType('Admin');
          localStorage.setItem("user", JSON.stringify({ username:'admin@gmail.com',role: 'Admin' }));
          setUser({ username:'admin@gmail.com',role: 'Admin', token: 'alksdjflkewjoifjoiajvkjoiqwejfoijoisjdvoijwoiejfoij' });

          navigate("/dashboard");
    }
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
            <p className="text-sm text-slate-500">
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

        <div className="w-full  grid grid-cols-2 justify-end items-end gap-1  overflow-hidden">
            <img
              src={CaptchImg}
              alt="captcha img"
              className="captcha-img h-9 w-full object-contain rounded "
            />
            <FormViewComponent
              name="captchaInput"
              label="Captcha"
              placeholder="Captcha"
              type="captchaInput"
              control={form.control}
            />
        </div>

        <div className="flex justify-center items-center py-3">
          {!data?.isSuccess && (
            <p className="text-[10px] md:text-sm truncate text-red-500">
              {data?.data?.token}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full " disabled={isLoading}>
          Login
        </Button>
        {/* <Link
          to="https://login.microsoftonline.com/312ca928-514b-41d6-9b98-496fe46e422c/oauth2/v2.0/authorize?client_id=5223f95e-afb9-4583-b435-b67550e9b6e7&redirect_uri=https%3A%2F%2Fprocure2pay.in.panasonic.com%2F&scope=User.Read&response_type=code&state=fr08XL5RAcjRKNSY6a5i708JrU44BEddbIw"
          className={cn(
            buttonVariants({
              variant: "outline",
              className: "w-full flex justify-center items-center gap-2 ",
            })
          )}
        >
          <img src={microsoft} className="w-6 h-6" /> Microsoft 365
        </Link> */}
      </form>
    </Form>
  );
};

export default LoginFormCaptcha;
