import { createContext, useState, useContext, ReactNode } from "react";
interface FormOpeningContextType {
  isFormOpening: boolean;
  closeFormOpening: () => void;
  openFormOpening: () => void;
}

const FormOpeningContext = createContext<FormOpeningContextType | undefined>(undefined);

export const useFormOpening = (): FormOpeningContextType => {
  const context = useContext(FormOpeningContext);
  if (!context) {
    throw new Error("useFormOpening must be used within a FormOpeningProvider");
  }
  return context;
};

export const FormOpeningProvider = ({ children }: { children: ReactNode }) => {
  const [isFormOpening, setIsFormOpening] = useState<boolean>(false);

  const closeFormOpening = () => {
    setIsFormOpening(false);
  };
  const openFormOpening = () => {
    setIsFormOpening(true);
  };

  const value = {
    isFormOpening,
    closeFormOpening,
    openFormOpening,
  };

  return (
    <FormOpeningContext.Provider value={value}>
      {children}
    </FormOpeningContext.Provider>
  );
};
