
import logo from "../../../assets/logo.png";
import hero from "../../../assets/investing.svg";
import { lazy, Suspense, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import useApi from "../../../hooks/use-api";
import { Skeleton } from "../../../components/ui/skeleton";
const LoginFormCaptcha = lazy(() => import("../component/login-form-captcha"));

export type MutationResponse = {
  data: string;
  message: string;
  responseCode: number;
  status: boolean;
};
// const formSchema = z.object({
//   emailId: z
//     .string()
//     .min(2)
//     .refine((val) => val.length >= 2, {
//       message: "email must be at least 2 characters.",
//     }),
// });

// type FormValues = z.infer<typeof formSchema>;

function LoginUserView() {
  const [switchFormAD, setSwitchFormAD] = useState<boolean>(false);
  // const [email, setEmail] = useState<string>("");
  // const [unVerifiedUser, setUnVerifiedUser] = useState<boolean>(true);
  //api call
  const { data,  isLoading} = useApi<MutationResponse>();

  // const form = useForm<FormValues>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     emailId: "",
  //   },
  // });

  // const onSubmit = (values: FormValues) => {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(values, null, 2)}</code>
  //       </pre>
  //     ),
  //   });
  //   if (values.emailId) {
  //     setEmail(values?.emailId);
  //     // fetchData(VERIFY_USER_EMAIL, "POST", { ...values });
  //     if (
  //       [
  //         "gayatri.bhoi@bpaassolutions.com",
  //         "shashank.tiwari@bpaassolutions.com",
  //         "ashish.tripathy@bpaassolutions.com",
  //         "mayank.tyagi@bpaassolutions.com",
  //         "aman.soni@bpaassolutions.com",
  //       ].includes(values?.emailId)
  //     ) {
  //       setUnVerifiedUser(false);
  //     }
  //   } else {
  //     toast({
  //       title: "You are not able to sign in with diffrenet email!",
  //       status: "error",
  //     });
  //   }
  // };

  useEffect(() => {
    if (data?.status) {
      setSwitchFormAD(true);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen overflow-hidden relative p-6 flex justify-center items-center bg-background">
    
    <div className="w-full h-[calc(100vh-2rem)] justify-center items-center flex flex-col md:flex-row md:gap-3 xl:gap-5">
      <div className="w-full h-[calc(100vh-10vh)]  md:h-[calc(100vh-1.5rem)] flex flex-col justify-center items-center space-y-1 md:space-y-2 bg-blend-luminosity rounded p-3 overflow-hidden">
          <div className="w-full  flex justify-center items-center  ">
            <img
              loading="lazy"
              src={logo}
              alt="Logo"
              className="w-32 h-32"
            />
          </div>

          {switchFormAD ? (
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
              {/* <OTPVerifyForm email={email} code={code?.replace(" ","+")} /> */}
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
              <LoginFormCaptcha  />
            </Suspense>
          )}
        </div>
        <div className="hidden relative  w-full h-[calc(100vh-50vh)] md:h-[calc(100vh-1.5rem)]  md:flex flex-col justify-center items-center">
          <img src={hero} width={835} height={613} alt="background" />
          {/* <div className="animate-in w-8/12 h-36 bg-white absolute top-3 right-6">
          <div className="animate-in w-10 h-2 rotate-45 bg-white -top-4 -left-7 absolute rounded-t-lg"></div>
          </div>
          <div className="animate-in w-[63%] h-36 bg-white absolute top-[18rem] -right-[6rem] rotate-90">
          <div className="animate-in w-10 h-2 rotate-45 bg-white -top-4 -left-7 absolute rounded-t-lg"></div>

          </div>
          <div className="animate-in w-8/12 h-36 bg-white absolute bottom-3 left-6">
          <div className="animate-in w-10 h-2 rotate-45 bg-white -bottom-4 -right-7 absolute rounded-t-lg"></div>
          </div>
          <div className="animate-in w-[63%] h-36 bg-primary absolute top-[8rem] -left-[6rem] rotate-90">
            <div className="animate-in w-10 h-2 rotate-45 bg-white -bottom-4 -right-8 absolute rounded-t-lg"></div>
          </div> */}
          {/* <div className="w-full h-10 bg-white rotate-90"></div>
          <div className="w-full h-10 bg-white"></div>
          <div className="absolute w-80 h-80 bg-white flex justify-center items-center">
            <div className="w-40 h-40 bg-blue-700" />
          </div> */}
        </div>
        {/* <Dialog open={unVerifiedUser}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex justify-start items-center gap-2">
                <div className="rounded-full bg-secondary flex justify-center items-center p-2 text-primary">
                  <Cctv />
                </div>{" "}
                Please Verify your email
              </DialogTitle>
              <DialogDescription className="w-full flex flex-col justify-start items-start gap-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex flex-col justify-center items-center   "
                  >
                    <FormViewComponent
                      name="emailId"
                      label="Email"
                      placeholder="Email Address"
                      type="text"
                      control={form.control}
                    />

                    <Button
                      type="submit"
                      className="w-40 mt-6"
                      disabled={isLoading}
                    >
                      Verify Email
                    </Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
      </div>
    </div>
  );
}

export default LoginUserView;
