"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FormFieldType } from "@/types";

export type FormFieldOrGroup = FormFieldType | FormFieldType[];

type AppContextType = {
  formFields: FormFieldOrGroup[];
  setFormFields: React.Dispatch<React.SetStateAction<FormFieldOrGroup[]>>;
};

// Create the context with a default value of undefined
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component to wrap around parts of the application that need access to form state
export const AppContextWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Local state to store form fields
  const [formFields, setFormFields] = useState<FormFieldOrGroup[]>([]);

  return (
    <AppContext.Provider value={{ formFields, setFormFields }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context value
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  // If context is undefined, it means useFormContext was used outside of a AppContextWrapper
  if (!context) {
    throw new Error("useFormContext must be used within a AppContextWrapper");
  }

  return context;
};
