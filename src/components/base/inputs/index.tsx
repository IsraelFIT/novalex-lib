"use client";

import { useState } from "react";
import { IoIosEye, IoIosEyeOff, IoIosArrowDown } from "react-icons/io";
import "./style.css";

interface InputProps {
  type: string;
  name?: string;
  inputClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  options?: string[] | { value: string; label: string }[];
  description?: string;
  checked?: boolean;
}

export default function Input({
  type,
  name,
  inputClassName = "",
  labelClassName = "",
  placeholder = "",
  label,
  value,
  onChange,
  options = [],
  description,
  checked,
}: InputProps) {
  const isSelectType = type === "select";
  const isPasswordType = type === "password";
  const isRadioType = type === "radio";
  const isTextareaType = type === "textarea";
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-container">
      {label && !isRadioType && (
        <div className="input-label-wrapper">
          <label htmlFor={name} className={`${labelClassName} input-label`}>
            {label}
          </label>
          {description && (
            <span className="input-tooltip">
              <span className="input-tooltip-icon">?</span>
              <span className="input-tooltip-text">{description}</span>
            </span>
          )}
        </div>
      )}

      {isSelectType ? (
        // Render normal HTML select
        <div className="select-field">
          <select
            name={name}
            id={name}
            className={`input-input input-select ${inputClassName}`}
            onChange={onChange}
            value={value || ""}
          >
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options.map((option, index) => (
              <option
                key={index}
                value={typeof option === "string" ? option : option.value}
              >
                {typeof option === "string" ? option : option.label}
              </option>
            ))}
          </select>
          <IoIosArrowDown className="select-svg" />
        </div>
      ) : isPasswordType ? (
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            id={name}
            name={name}
            className={`input-input input-input-style ${inputClassName}`}
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
          </button>
        </div>
      ) : isRadioType ? (
        // Render radio input
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name={name}
            className={`accent-blue-normal ${inputClassName}`}
            value={value}
            checked={checked}
            onChange={onChange}
          />
          {label}
        </label>
      ) : isTextareaType ? (
        // Render normal textarea
        <textarea
          id={name}
          name={name}
          className={`input-input input-textarea ${inputClassName}`}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
        />
      ) : (
        // Default input
        <input
          type={type}
          id={name}
          name={name}
          className={`input-input input-input-style ${inputClassName}`}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
        />
      )}
    </div>
  );
}
