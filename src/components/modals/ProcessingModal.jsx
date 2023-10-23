import React, { useContext, useEffect } from "react";
// import hoangdung from "@/assets/avatar.png";
import Image from "next/image";
import Input from "../Input";
import { ThemeContext } from "@/pages/ThemeContext";
import { formatTitle } from "@/utils";

export default function ProcessingModal() {
  const {
    downloadUrl,
    success,
    error,
    file,
    duration,
    inputValue,
    selectGenre,
    setSuccess,
    setError,
    setToastMessage,
    setShowToast,
  } = useContext(ThemeContext);

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadUrl);
    setSuccess(true);
    setShowToast(true);
    setToastMessage("Copied to clipboard");
  };

  useEffect(() => {
    if (success || error) {
      setTimeout(() => {
        setSuccess(false) || setError(false);
        setShowToast(false);
      }, 3000);
    }

    return () => clearTimeout();
  }, [success, error]);

  return (
    <div className="w-[625px] h-[162px] flex flex-row items-center border border-primaryGray rounded-[10px] gap-8">
      <div
        className="w-32 h-32 rounded-md ml-4"
        style={{
          background: "linear-gradient(135deg, #9A8080 0%, #82A8C2 100%)",
        }}
      ></div>

      {/* Info */}
      <div className="flex flex-col gap-2">
        <h4 className="font-medium">
          Congratulations, you've uploaded successfully !
        </h4>
        <p>
          {formatTitle(inputValue.title)} - {inputValue.artist || "N/A"}
        </p>
        <div className="flex flex-row gap-5 items-center">
          <p className="text-blur text-xs">{duration}</p>
          <p className="text-blur text-xs">{selectGenre}</p>
        </div>
        <Input
          type="disabled"
          disabled
          placeholder={downloadUrl}
          label={false}
          copyLink
          handleCopy={handleCopy}
        />
      </div>
    </div>
  );
}
