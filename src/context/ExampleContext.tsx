import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface ExampleContextType {
  example: boolean;
  exampleFunction: () => void;
}

// Create the context with default values
const ExampleContext = createContext<ExampleContextType | undefined>(undefined);

// Create the provider component
interface ExampleProviderProps {
  children: ReactNode;
}

/**
 * ===============================================================================
 * Define the ExampleProvider component
 *
 * @param param0
 * @returns
 * ===============================================================================
 */
export const ExampleProvider: React.FC<ExampleProviderProps> = ({
  children,
}) => {
  const [example, setExample] = useState<boolean>(false);

  const exampleFunction = () => {
    setExample((prevState) => !prevState);
  };

  return (
    <ExampleContext.Provider value={{ example, exampleFunction }}>
      {children}
    </ExampleContext.Provider>
  );
};

/**
 *===============================================================================
 *  Custom hook to use the context
 * @returns
 *===============================================================================
 */
export const useExample = (): ExampleContextType => {
  const context = useContext(ExampleContext);
  if (!context) {
    throw new Error("useTheme must be used within a ExampleProvider");
  }
  return context;
};
