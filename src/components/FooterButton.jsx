import { ThemeContext } from "@/pages/ThemeContext";
import React, { useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function FooterButton({ handleUpload, loading, handleCancel }) {
  return (
    <div className="flex flex-row justify-center items-center gap-1">
      <button
        className="w-[52px] rounded-md text-xs p-1"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button
        className="w-[52px] rounded-md text-xs text-center bg-primary text-white p-1"
        onClick={handleUpload}
      >
        {loading ? (
          <AiOutlineLoading3Quarters
            size={10}
            className="mx-auto animate-spin"
          />
        ) : (
          <p>Save</p>
        )}
      </button>
    </div>
  );
}
