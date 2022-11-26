import { FC } from "react";
import classNames from "classnames";
import { FormField as FormFieldType } from "../../types/formField";

interface FormFieldProps extends FormFieldType {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: FC<FormFieldProps> = ({
  name,
  value,
  placeholder,
  label,
  type,
  required,
  disabled,
  invalid,
  onChange,
}) => {
  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        id={label}
        // style={{ borderColor: invalid ? "red" : "initial" }}
        className={classNames({
          invalid,
          active: value.length
         })}
      />
      <span className="form-control" data-type={name}></span>
    </div>
  );
};

export default FormField;
