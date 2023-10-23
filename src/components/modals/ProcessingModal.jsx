import React, { useContext, useEffect } from "react";
// import hoangdung from "@/assets/avatar.png";
import Image from "next/image";
import Input from "../Input";
import { ThemeContext } from "@/pages/ThemeContext";
import { formatTitle } from "@/utils";

export default function ProcessingModal() {
  const {
    downloadUrl,
    showToast,
    duration,
    inputValue,
    selectGenre,
    setSuccess,
    setError,
    setToastMessage,
    setShowToast,
    avatar,
  } = useContext(ThemeContext);

  const handleCopy = () => {
    navigator.clipboard.writeText(downloadUrl);
    setSuccess(true);
    setShowToast(true);
    setToastMessage("Copied to clipboard");
  };

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setSuccess(false) || setError(false);
        setShowToast(false);
      }, 8000);
    }
    return () => clearTimeout();
  }, [showToast]);

  return (
    <div className="w-[625px] h-[162px] flex flex-row items-center border border-primaryGray rounded-[10px] gap-8">
      {avatar ? (
        <div className="w-32 h-32 rounded-md overflow-hidden ml-4">
          <Image
            src={avatar}
            width={128}
            height={128}
            alt="avatar"
            className="rounded-md object-cover"
          />
        </div>
      ) : (
        <div
          className="w-32 h-32 rounded-md ml-4"
          style={{
            background: "linear-gradient(135deg, #9A8080 0%, #82A8C2 100%)",
          }}
        ></div>
      )}

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
