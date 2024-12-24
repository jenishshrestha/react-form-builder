import { FormFieldType } from "@/types";

type FormFieldOrGroup = FormFieldType | FormFieldType[];

import { fieldImports } from "@/constants";

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
