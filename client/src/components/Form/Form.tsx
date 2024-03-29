import { FC, FormEvent } from "react";
import { FormField as FormFieldType } from "../../types/formField";
import { ResponseErrorType } from "../../api/api";

import FormField from "../FormField/FormField";

interface FormProps {
  fields: FormFieldType[];
  formObject: Record<string, string>;
  errors: ResponseErrorType;
  buttonText: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (name: string, value: string) => void;
}

const Form: FC<FormProps> = ({
  fields,
  formObject,
  errors,
  buttonText,
  onSubmit,
  onChange,
}) => {
  function handleUpdateField(
    name: string,
    { target: { value } }: React.ChangeEvent<HTMLInputElement>
  ) {
    onChange(name, value);
  }

  return (
    <form className="Form" onSubmit={onSubmit}>
      {errors.messages.map((message) => (
        <div className="error" key={message}>
          {message}
        </div>
      ))}
      {fields.map((filed) => (
        <FormField
          key={filed.name}
          onChange={(e) => handleUpdateField(filed.name, e)}
          name={filed.name}
          value={formObject[filed.name]}
          placeholder={filed.placeholder}
          label={filed.name}
          type={filed.type}
          required={filed.required}
          disabled={filed.disabled}
          invalid={!!errors.fields?.includes(filed.name)}
        />
      ))}
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default Form;
