import { FC } from "react";
import { FormField as FormFieldType } from '../../types/formField';

interface FormFieldProps extends FormFieldType {
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: FC<FormFieldProps> = ({ name, value, placeholder, label, type, required, disabled, onChange}) => {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;