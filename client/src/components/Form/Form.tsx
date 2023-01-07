import { FC, PropsWithChildren, FormEvent } from "react";
import { FormField as FormFieldType } from "../../types/formField";
import { ResponseErrorType } from "../../api/api";

import FormField from "../FormField/FormField";
import Loader from "../Loader/Loader";

interface FormProps extends PropsWithChildren {
  fields: FormFieldType[];
  formObject: Record<string, string>;
  errors: ResponseErrorType;
  buttonText: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (name: string, value: string) => void;
  noButton?: boolean;
  isLoading?: boolean;
}

const Form: FC<FormProps> = ({
  fields,
  formObject,
  errors,
  buttonText,
  onSubmit,
  onChange,
  children,
  noButton,
  isLoading,
}) => {
  function handleUpdateField(
    name: string,
    { target: { value } }: React.ChangeEvent<HTMLInputElement>
  ) {
    onChange(name, value);
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      {errors.messages.map((message) => (
        <div className="form__error" key={message}>
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
          label={filed.label}
          type={filed.type}
          required={filed.required}
          disabled={filed.disabled}
          invalid={!!errors.fields?.includes(filed.name)}
          controlText={filed.controlText}
        />
      ))}
      {children}
      {!noButton && (
        <button type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : buttonText}
        </button>
      )}
    </form>
  );
};

export default Form;
