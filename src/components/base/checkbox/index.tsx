import "./style.css";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";

interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassName?: string;
}

export default function Checkbox({
  id,
  label,
  checked,
  onChange,
  className = "",
  labelClassName = "",
}: CheckboxProps) {
  return (
    <div className={`checkbox-container ${className}`}>
      <label htmlFor={id} className="checkbox-label">
        {/* Checkbox Icon */}
        <div className={`checkbox-icon ${checked ? "checked" : "unchecked"}`}>
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className="hidden"
          />
          {checked ? (
            <RiCheckboxFill className="checked" />
          ) : (
            <RiCheckboxBlankLine className="unchecked" />
          )}
        </div>

        {/* Label */}
        <span className={`${labelClassName}`}>{label}</span>
      </label>
    </div>
  );
}
