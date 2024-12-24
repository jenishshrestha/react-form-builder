import { FC, useState, useEffect, useCallback } from "react";
import { FormFieldType } from "@/types";
import { fieldTypes, defaultFieldConfig } from "@/constants";
import { useAppContext } from "@/context/AppContextProvider";

/**
 * ======================================================
 * Helper Functions
 * ======================================================
 */
const generateFieldName = (): string =>
  `name_${Math.random().toString().slice(-10)}`;

const getFieldConfig = (variant: string) => {
  return (
    defaultFieldConfig[variant] || {
      label: "",
      description: "",
      placeholder: "",
    }
  );
};

const createNewField = (
  variant: string,
  index: number,
  fieldConfig: Record<string, string>
): FormFieldType => {
  const { label, description, placeholder } = fieldConfig;

  return {
    checked: true,
    description: description || "",
    disabled: false,
    label: label || generateFieldName(),
    name: generateFieldName(),
    onChange: () => {},
    onSelect: () => {},
    placeholder: placeholder || "Placeholder",
    required: true,
    rowIndex: index,
    setValue: () => {},
    type: "",
    value: "",
    variant,
  };
};

/**
 * ======================================================
 * Main Component Function
 * ======================================================
 */
const FieldListings: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const { formFields, setFormFields } = useAppContext();

  // Debounced search term effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    console.log(formFields);
  }, [formFields]);

  // Filter field types based on debounced search term
  const filteredFields = fieldTypes.filter((field) =>
    field.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Add form field to context
  const addFormField = useCallback(
    (variant: string, index: number) => {
      const fieldConfig = getFieldConfig(variant);
      const newField = createNewField(variant, index, fieldConfig);
      setFormFields((prevFields) => [...prevFields, newField]);
    },
    [setFormFields]
  );

  return (
    <div>
      {/* Search input field with debounce */}
      <div className="sticky top-0 z-10 bg-background p-1">
        <input
          type="text"
          placeholder="Search fields..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 flex h-9 w-full rounded-md border border-neutral-800 bg-transparent px-3 py-1 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 transition-all"
          aria-label="Search fields"
        />
      </div>

      {/* Render filtered field buttons */}
      <div className="flex flex-wrap gap-2">
        {filteredFields.map((field, index) => (
          <div key={field.name} className="w-full">
            <button
              className="inline-flex border border-button rounded-full text-xs font-medium px-3 py-2 hover:bg-neutral-800 hover:text-zinc-50 transition-colors"
              onClick={() => addFormField(field.name, index)}
            >
              {field.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldListings;
