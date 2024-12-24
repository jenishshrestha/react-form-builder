import * as Locales from "date-fns/locale";

/**
 * =================================================================
 * Represents the configuration for a form field.
 * This type defines the structure and properties of a form field
 * =================================================================
 */
export type FormFieldType = {
  checked: boolean;
  className?: string;
  description?: string;
  disabled: boolean;
  hour12?: boolean;
  label: string;
  locale?: keyof typeof Locales;
  max?: number;
  min?: number;
  name: string;
  onChange: (
    value: string | string[] | boolean | Date | number | number[]
  ) => void;
  onSelect: (
    value: string | string[] | boolean | Date | number | number[]
  ) => void;
  placeholder?: string;
  required?: boolean;
  rowIndex: number;
  setValue: (value: string | boolean) => void;
  step?: number;
  type: string;
  value: string | boolean | Date | number | string[];
  variant: string;
};

/**
 * =================================================================
 * Represents the configuration for a field in a list or form.
 * This type defines the basic attributes of a field.
 *
 * @property {string} name
 * @property {boolean} isNew
 * @property {number} [index]
 * =================================================================
 */
export type FieldType = { name: string; isNew: boolean; index?: number };
