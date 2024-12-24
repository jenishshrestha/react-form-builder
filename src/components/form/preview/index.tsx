import * as Tabs from "@radix-ui/react-tabs";
import { useAppContext } from "@/context/AppContextProvider";

import { generateImports } from "@/utils/generateFormCode";

const Preview: React.FC = () => {
  const { formFields } = useAppContext();

  // get all imports
  const imports = Array.from(generateImports(formFields)).join("\n");

  const tabsTriggerClass =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium data-[state=active]:bg-neutral-950 data-[state=active]:text-foreground data-[state=active]:shadow";

  return (
    <Tabs.Root className="TabsRoot" defaultValue="preview">
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
      <Tabs.Content className="mt-2" value="code">
        <pre className="p-4 text-sm bg-neutral-800 rounded-lg overflow-auto">
          {imports}
        </pre>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Preview;
