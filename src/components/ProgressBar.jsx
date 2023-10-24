import { ThemeContext } from "@/pages/ThemeContext";
import React, { useContext, useMemo } from "react";
import { BiSolidCircle } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

export default function ProgressBar() {
  const { step } = useContext(ThemeContext);

  return (
    <div className="w-[50%] flex items-center text-center justify-center">
      <div className="w-[60%] flex flex-row items-center justify-center">
        <div className="bg-primary w-[16px] h-[16px] flex items-center justify-center rounded-full text-center">
          {step === 0 ? (
            <BiSolidCircle size={8} className="text-white" />
          ) : (
            <FaCheck size={8} className="text-white font-bold" />
          )}
        </div>
        <div
          className={`${
            step === 0 ? "bg-primaryGray " : "bg-primary"
          } w-48 h-[2px]`}
        ></div>
        <div
          className={`${
            step === 0 ? "bg-transparent" : "bg-primary"
          } w-[16px] h-[16px] flex items-center justify-center rounded-full text-center`}
        >
          {step == 0 && <BiSolidCircle size={8} className="text-primaryGray" />}
          {step === 1 && <BiSolidCircle size={8} className="text-white" />}
          {step === 2 && <FaCheck size={8} className="text-white" />}
        </div>
        <div
          className={`${
            step === 2 ? "bg-primary" : "bg-primaryGray"
          } w-48 h-[2px] `}
        ></div>
        <div
          className={`${
            step === 2 ? "bg-primary " : "bg-transparent"
          } w-[16px] h-[16px] flex items-center justify-center rounded-full text-center`}
        >
          {step === 2 ? (
            <FaCheck size={8} className="text-white" />
          ) : (
            <BiSolidCircle size={8} className="text-primaryGray" />
          )}
        </div>
      </div>
    </div>
  );
}
