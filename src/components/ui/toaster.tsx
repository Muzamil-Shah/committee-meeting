import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"
import { useToast, type ToasterToast } from "./use-toast"

type ExtendedToasterToast = ToasterToast & { bgColor?: string; icon?: React.ReactNode }

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, bgColor, icon, ...props }: ExtendedToasterToast) {
        return (
          <Toast key={id} {...props} className={bgColor || ""}>
            <div className="grid gap-1">
              {title && <ToastTitle className="flex space-x-2">
                {icon??<span className="me-2">{icon}</span>}
                <span>{title}</span></ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
