import { ThemeContext } from "@/pages/ThemeContext";
import { bytestoMb } from "@/utils";
import React, { useContext } from "react";

export default function SongInfo() {
  const { duration, file } = useContext(ThemeContext);

  return (
    <>
      <div className="flex flex-col text-xs">
        <p className="mb-1">Duration</p>
        <p className="text-blur">{duration}</p>
      </div>
      <div className="flex flex-col text-xs">
        <p className="mb-1">Size</p>
        <p className="text-blur">{bytestoMb(file.size)} MB</p>
      </div>
      <div className="flex flex-col text-xs">
        <p className="mb-1">Type</p>
        <p className="text-blur">{file.type}</p>
      </div>
    </>
  );
}
