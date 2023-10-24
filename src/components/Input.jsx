import { ThemeContext } from "@/pages/ThemeContext";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";

export default function Input({
  type = "text",
  disabled = false,
  onChange,
  label = "Label",
  required = false,
  color = "primaryBlue",
  placeholder = "Placeholder",
  className = "",
  copyLink,
  value,
  handleCopy,
  id,
  maxLength,
  error,
  errorMessage,
}) {
  const inputRef = useRef();
  const inputContainerRef = useRef();
  const labelRef = useRef();
  const { isFocus, setIsFocus} = useContext(ThemeContext);

  const statusClassName = useMemo(() => {
    if (error && required && !value) {
      return "border-primaryRed";
    }

    if (type === "disabled") {
      return "placeholder:text-link placeholder:text-ellipsis";
    }

    if (!!value) {
      return "border-dark";
    }
    return "";
  }, [error, isFocus, value, color]);

  const handleBlur = () => {
    setIsFocus(false);
    if (!isFocus && required && !value) {
      inputRef.current.style.border = "1px solid #ff4040";
    }

    if (!isFocus && value) {
      inputRef.current.style.border = "1px solid black";
    }
  };

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(e.target) &&
        e.target !== labelRef.current
      ) {
        setIsFocus(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div className={`w-92 flex flex-col gap-1`}>
      {/* Label */}
      <div
        ref={labelRef}
        className="text-primaryBlack relative text-xs cursor-pointer"
        onClick={() => {
          if (!disabled) {
            setIsFocus(true);
            inputRef.current?.focus();
          }
        }}
      >
        {label}
        <span
          className={`${
            required ? "inline-block absolute text-primaryRed ml-1" : "hidden"
          }`}
        >
          *
        </span>
      </div>

      {/* Input */}
      <div ref={inputContainerRef} className={`w-full relative ${className}`}>
        {type === "textarea" ? (
          <textarea
            id={id}
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            className={`${statusClassName}
              ${disabled ? "bg-disabled text-dark" : ""}
              border w-full h-full  border-primaryGray py-2 px-3 rounded-md placeholder:text-blur text-xs`}
            maxLength={maxLength}
            onChange={onChange}
            disabled={disabled}
            required={required}
            onFocus={() => setIsFocus(true)}
            onBlur={() => handleBlur()}
          />
        ) : (
          <input
            id={id}
            ref={inputRef}
            type="text"
            value={value}
            placeholder={placeholder}
            className={`${statusClassName}
              ${disabled ? "bg-disabled text-dark" : ""}
           border w-full h-full  border-primaryGray py-2 pr-14 pl-3 rounded-md placeholder:text-blur text-xs`}
            maxLength={maxLength}
            onChange={onChange}
            disabled={disabled}
            required={required}
            onFocus={() => setIsFocus(true)}
            onBlur={() => handleBlur()}
          />
        )}

        {type === "disabled" && copyLink && (
          <FaCopy
            size={18}
            className="absolute right-3 top-2 text-blur cursor-pointer"
            onClick={handleCopy}
          />
        )}
      </div>

      <p className={`${error ? "text-xs text-primaryRed" : "hidden"}`}>
        {errorMessage}
      </p>
    </div>
  );
}
