import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter} from "../ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { cn } from "../../lib/utils";

interface CustomDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  children?: ReactNode;
  triggerButtonVariant?: string;
  onSubmit: () => void;
  isOpen: boolean | undefined;
  onClose: () => void;
  textAlign?:string;
  buttonName?:string;
}

export function DialogBox({
  dialogTitle,
  dialogDescription,
  children,
  triggerButtonVariant,
  onSubmit,
  isOpen,
  onClose,
  textAlign,
  buttonName
}: CustomDialogProps) {
  const formMethods = useForm();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[425px]",textAlign)}>
        <div className={textAlign}>
          <h6 className="font-bold text-[17px] dark:text-white">{dialogTitle}</h6>
          <p className="text-[13px] dark:text-white">{dialogDescription}</p>
        </div>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        {children && <div className="w-full">
          {children}
        </div>
        }
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2 mt-5 flex justify-center text-center items-center">
          <Button className={cn("w-100 px-20",triggerButtonVariant)} type="submit">{buttonName ? buttonName:'Submit'}</Button>
        </DialogFooter>
        </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
