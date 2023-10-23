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
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const inputContainerRef = useRef();
  const labelRef = useRef();
  const { error, setError, setToastMessage } = useContext(ThemeContext);

  const maxCharacter = useMemo(() => {
    if (label === "Title") {
      return 100;
    }

    if (label === "Slug") {
      return 100;
    }

    if (label === "Description") {
      return 500;
    }
  }, []);

  const statusClassName = useMemo(() => {
    if (error) {
      return "border-primaryRed";
    }

    if (isFocus) {
      return `border-${color}`;
    }

    if (type === "disabled") {
      return "placeholder:text-link placeholder:text-ellipsis";
    }

    if (!!value) {
      return "border-dark";
    }
    return "";
  }, [error, isFocus, inputValue, color]);

  const labelStatusClassName = useMemo(() => {
    if (error) {
      return "text-primaryRed";
    }
    if (isFocus) {
      return `text-${color}`;
    }
    if (!!value) {
      return "text-dark";
    }
    return "";
  }, [error, isFocus, value, color]);

  const handleBlur = () => {
    setIsFocus(false);
    if (!isFocus && required && !value) {
      inputRef.current.style.border = "1px solid #ff4040";
      labelRef.current.style.color = "#ff4040";
    }

    if (!isFocus && value) {
      inputRef.current.style.border = "1px solid black";
      labelRef.current.style.color = "#000";
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
    <div className={`w-92 flex flex-col`}>
      {/* Label */}
      <div
        ref={labelRef}
        className={`${labelStatusClassName} relative text-primaryBlack mb-1 text-xs cursor-pointer`}
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
      <div
        ref={inputContainerRef}
        className={`w-full gap-3 relative ${className}`}
      >
        <input
          id={id}
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          className={`${statusClassName}
              ${disabled ? "bg-disabled text-dark" : ""}
           border w-full h-full  border-primaryGray py-2 pr-14 pl-3 rounded-md placeholder:text-blur text-xs`}
          maxLength={maxCharacter}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocus(true)}
          onBlur={() => handleBlur()}
        />

        {type === "disabled" && copyLink && (
          <FaCopy
            size={18}
            className="absolute right-3 top-2 text-blur cursor-pointer"
            onClick={handleCopy}
          />
        )}
      </div>

      {/* {errorMessage && (
        <p className="text-primaryRed text-xs">{errorMessage}</p>
      )} */}
    </div>
  );
}
