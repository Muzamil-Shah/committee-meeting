import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

interface CustomDialogProps {
  dialogTitle: string;
  dialogDescription: string;
  children?: ReactNode;
  triggerButtonVariant?: string;
  isOpen: boolean;
  onClose: () => void;
  textAlign?: string;
  buttonName?: string;
  path?: string;
  onConfirm?: () => void
}

export function Confirm({
  dialogTitle,
  dialogDescription,
  children,
  triggerButtonVariant,
  isOpen,
  onClose,
  textAlign,
  buttonName,
  path,
  onConfirm
}: CustomDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn("sm:max-w-[500px]", textAlign)}>
        <div className={textAlign}>
          <h6 className="font-bold text-[17px] dark:text-white">
            {dialogTitle}
          </h6>
          <p className="text-[13px] dark:text-white">{dialogDescription}</p>
        </div>

        {children && <div className="w-full">{children}</div>}
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-center sm:space-x-2 mt-5 flex justify-center text-center items-center">
          <Button
            onClick={onClose}
            className="w-full mt-2 sm:mt-0 md:mt-0 lg:mt-0 px-20 bg-transparent text-red-500 border border-red-500 hover:bg-transparent"
            type="button"
          >
            Cancel
          </Button>
          {path ? (
            <Link to={path ?? "/dashboard"} className="w-full ">
              <Button
                className={cn("w-full px-20", triggerButtonVariant)}
                type="submit"
              >
                {buttonName ? buttonName : "Submit"}
              </Button>
            </Link>
          ) : (
            <Button
              className={cn("w-full px-20", triggerButtonVariant)}
              type="submit"
              onClick={() => {
                console.log('im here')
                if(onConfirm){
                    console.log('im here onConfirm')
                    onConfirm()
                }
            }}
            >
              {buttonName ? buttonName : "Submit"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
