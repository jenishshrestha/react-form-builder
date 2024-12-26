import { FormFieldType } from "@/types";

type FormFieldOrGroup = FormFieldType | FormFieldType[];

import { fieldImports } from "@/constants";
// import { z, ZodTypeAny } from "zod";

/**
 * ========================================================
 * Generate form imports based on selected fields
 * ========================================================
 * @param formFields
 * @returns
 */
export const generateImports = (
  formFields: FormFieldOrGroup[]
): Set<string> => {
  const importSet = new Set([
    '"use client"',
    'import { useState } from "react"',
    'import {toast} from "sonner"',
    'import { useForm } from "react-hook-form"',
    'import { zodResolver } from "@hookform/resolvers/zod"',
    'import * as z from "zod"',
    'import { cn } from "@/lib/utils"',
    'import { Button } from "@/components/ui/button"',
    'import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"',
  ]);

  const processField = (field: FormFieldType) => {
    if (fieldImports[field.variant]) {
      fieldImports[field.variant].forEach((importStmt) =>
        importSet.add(importStmt)
      );
    } else {
      importSet.add(
        `import { ${
          field.variant
        } } from "@/components/ui/${field.variant.toLowerCase()}"`
      );
    }
  };

  formFields.flat().forEach(processField);

  return importSet;
};

/**
 * ========================================================
 * Generate default values for some fields
 * ========================================================
 */

export const generateConstants = (
  formFields: FormFieldOrGroup[]
): Set<string> => {
  const constantSet: Set<string> = new Set();

  // default value for combo box
  const languageConstant = `const languages = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
    { label: "Portuguese", value: "pt" },
    { label: "Russian", value: "ru" },
    { label: "Japanese", value: "ja" },
    { label: "Korean", value: "ko" },
    { label: "Chinese", value: "zh" },
  ] as const;`;

  const constantsMap: Record<string, string> = {
    Combobox: languageConstant,
    // 'File Input': fileInputConstant,
  };

  formFields.flat().forEach((field) => {
    const constant = constantsMap[field.variant];
    if (constant) constantSet.add(constant);
  });

  return constantSet;
};

/**
 * ========================================================
 *  Generating Default Values
 *
 *  This generates
 * ========================================================
 */
export const generateDefaultValuesString = (
  fields: FormFieldOrGroup[]
): string => {
  // default values
  const defaultValues: Record<
    string,
    string | number | boolean | Date | string[] | undefined
  > = {};

  // date field
  const dateFields: string[] = [];

  const variantHandlers: Record<string, (fieldName: string) => void> = {
    "Multi Select": (fieldName) => {
      defaultValues[fieldName] = ["React"];
    },
    "Date Picker": (fieldName) => {
      dateFields.push(fieldName);
      delete defaultValues[fieldName];
    },
  };

  // loop through fields
  fields.flat().forEach(({ name, variant }) => {
    const handler = variantHandlers[variant];
    if (handler) {
      handler(name);
    }
  });

  if (!Object.keys(defaultValues).length && !dateFields.length) {
    return "";
  }

  const regularValuesString = Object.keys(defaultValues).length
    ? JSON.stringify(defaultValues).slice(1, -1)
    : "";

  const dateFieldsString = dateFields
    .map((fieldName) => `"${fieldName}": new Date()`)
    .join(",");

  const combinedString = [regularValuesString, dateFieldsString]
    .filter(Boolean)
    .join(",");

  return `defaultValues: {${combinedString}},`;
};

/**
 * Generation of form schema types for validation
 */

// export const getZodSchemaString = (formFields: FormFieldOrGroup[]): string => {
//   const schema = generateZodSchema(formFields);
//   return "";
// };
/**
 * ========================================================
 * Generate Complete Form Code
 * ========================================================
 * @param formFields
 * @returns
 */

export const generateFormCode = (formFields: FormFieldOrGroup[]): string => {
  // generates all the imports
  const imports = Array.from(generateImports(formFields)).join("\n");

  // generates default values of some fields
  const constants = Array.from(generateConstants(formFields)).join("\n");

  // default values for some fields
  const defaultValuesString = generateDefaultValuesString(formFields);

  // generating react component
  const component = `
export default function App() {
  ${constants}
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    ${defaultValuesString}
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
`;

  // return imports + "\n\n" + schema + "\n" + component;
  return imports + "\n\n" + component;
};
