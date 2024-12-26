import * as Tabs from "@radix-ui/react-tabs";

// library
// import { Highlight, themes } from "prism-react-renderer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// context
import { useAppContext } from "@/context/AppContextProvider";

// custom functions
import { generateFormCode } from "@/functions/generateFormCode";
import { useState } from "react";

const Preview: React.FC = () => {
  // Context API
  const { formFields } = useAppContext();

  // state to provide feedback to if copied
  const [copied, setCopied] = useState(false);

  // dynamically generated code
  const generatedCode = generateFormCode(formFields);

  // common classes handle
  const tabsTriggerClass =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium data-[state=active]:bg-neutral-950 data-[state=active]:text-foreground data-[state=active]:shadow";

  // copy to clipboard
  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <Tabs.Root className="h-full" defaultValue="preview">
      <Tabs.List
        className="h-9 items-center rounded-lg bg-neutral-800 p-1 text-neutral-400 flex justify-center w-fit mx-auto"
        aria-label="Manage your account"
      >
        <Tabs.Trigger className={tabsTriggerClass} value="preview">
          Preview
        </Tabs.Trigger>
        <Tabs.Trigger className={tabsTriggerClass} value="json">
          JSON
        </Tabs.Trigger>
        <Tabs.Trigger className={tabsTriggerClass} value="code">
          Code
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="mt-2" value="preview">
        Preview
      </Tabs.Content>
      <Tabs.Content className="mt-2" value="json">
        <pre className="p-4 text-sm bg-neutral-800 rounded-lg overflow-auto">
          {JSON.stringify(formFields, null, 2)}
        </pre>
      </Tabs.Content>
      <Tabs.Content className="mt-2 relative" value="code">
        <button
          className="absolute right-2 top-2 text-xs px-2 py-1 bg-background rounded"
          onClick={() => handleCopy(generatedCode)}
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
        <SyntaxHighlighter
          language="jsx"
          style={oneDark}
          className="!whitespace-normal"
        >
          {generatedCode}
        </SyntaxHighlighter>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Preview;
