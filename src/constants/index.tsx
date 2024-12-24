import { FieldType } from "@/types";

/**
 * =================================================
 * Used to display the list of form elements
 * =================================================
 */
export const fieldTypes: FieldType[] = [
  { name: "Checkbox", isNew: false },
  { name: "Combobox", isNew: false },
  { name: "Date Picker", isNew: false },
  { name: "Select", isNew: false },
  { name: "Input", isNew: false },
  { name: "Input OTP", isNew: false },
];

/**
 * =================================================
 * Used to display the default setting of form elements
 * =================================================
 */
export const defaultFieldConfig: Record<
  string,
  { label: string; description: string; placeholder?: string }
> = {
  Checkbox: {
    label: "Use different settings for my mobile devices",
    description:
      "You can manage your mobile notifications in the mobile settings page.",
  },
  Combobox: {
    label: "Language",
    description: "This is the language that will be used in the dashboard.",
  },
  "Date Picker": {
    label: "Date of birth",
    description: "Your date of birth is used to calculate your age.",
  },
  Select: {
    label: "Email",
    description: "You can manage email addresses in your email settings.",
    placeholder: "Select a verified email to display",
  },
  Input: {
    label: "Username",
    description: "This is your public display name.",
    placeholder: "shadcn",
  },
  "Input OTP": {
    label: "One-Time Password",
    description: "Please enter the one-time password sent to your phone.",
  },
};

/**
 * ============================================
 * Additional Imports for each fields
 * ============================================
 */

export const fieldImports: { [key: string]: string[] } = {
  Combobox: [
    'import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"',
    'import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"',
    'import { Check, ChevronsUpDown } from "lucide-react"',
  ],
  "Date Picker": [
    'import { format } from "date-fns"',
    'import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"',
    'import { Calendar } from "@/components/ui/calendar"',
    'import { Calendar as CalendarIcon } from "lucide-react"',
  ],
  "Input OTP": [
    'import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"',
  ],
  Select: [
    'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"',
  ],
};
