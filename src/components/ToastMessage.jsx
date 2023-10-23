import { ThemeContext } from "@/pages/ThemeContext";
import React, { useContext, useMemo } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsX } from "react-icons/bs";

export default function ToastMessage() {
  const { error, success, toastMessage } = useContext(ThemeContext);
  const backgroundStyle = useMemo(() => {
    if (success) {
      return "rgba(26, 178, 50, 0.05)";
    }

    if (error) {
      return "rgba(255, 64, 64, 0.05)";
    }
  }, [success, error]);

  const ToastStyle = useMemo(() => {
    if (success) {
      return "border-toast_success text-toast_success";
    }

    if (error) {
      return "border-toast_error text-toast_error";
    }
  }, []);
  return (
    <>
      <div
        style={{ background: `${backgroundStyle}` }}
        className={`${ToastStyle} w-[326px] h-10 border flex justify-between items-center rounded-md absolute top-10 right-10 show-toast`}
      >
        <div className="flex items-center gap-2 ml-2">
          <AiFillCheckCircle size={24} />
          <p className="text-[14px] font-medium">{toastMessage}</p>
        </div>
        <BsX size={20} className="text-black mr-2 cursor-pointer" />
      </div>
    </>
  );
}
