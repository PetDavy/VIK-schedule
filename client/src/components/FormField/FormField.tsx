import { FC, useState } from "react";
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
  controlText,
}) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  return (
    <div className="form-field">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={isVisiblePassword? 'text' : type}
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
      <span className="form-control" data-type={controlText || name}></span>
      {type === "password" && (
        <i
          // className="form-field-toggler"
          className={classNames('form-field-toggler', {
            visible: isVisiblePassword
          })}
          onClick={() => setIsVisiblePassword(!isVisiblePassword)}
        >

        </i>
      )}
    </div>
  );
};

export default FormField;
