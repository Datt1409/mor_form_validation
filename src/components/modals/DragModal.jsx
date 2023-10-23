import { ThemeContext } from "@/pages/ThemeContext";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

export default function DragModal() {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(false);
  const selectFileRef = useRef(null);
  const audioRef = useRef(null);
  const { setFile, setStep } = useContext(ThemeContext);

  const borderClassName = useMemo(() => {
    if (dragActive) {
      return "border-dashed border-primary";
    }

    if (error) {
      return "border-primaryRed";
    }
  }, [dragActive, error]);

  const handleDragOver = (e) => {
    console.log("12324");
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    // Fetch the files
    const droppedFiles = Array.from(e.dataTransfer.files);
    // Use FileReader to read file content
    droppedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setFile(file);
        setStep((prev) => prev + 1);
      };

      reader.onerror = () => {
        console.error("There was an issue reading the file.");
      };

      reader.readAsDataURL(file);
      return reader;
    });
  };

  const handleOnChange = (e) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(e.target.files?.[0]);
        setStep((prev) => prev + 1);
      };

      reader.onerror = () => {
        console.error("There was an issue reading the file.");
      };

      reader.readAsDataURL(e.target.files?.[0]);
      return reader;
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div
        className={`${borderClassName} w-[625px] h-[340px] flex border border-primaryGray rounded-[10px] flex-col items-center justify-center`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!dragActive && (
          <>
            <h2 className="text-[#0f0f0f] text-2xl font-medium leading-5">
              Drag & Drop your track here
            </h2>
            <button
              className="w-[271px] h-[36px] py-2 bg-primary text-white rounded-md mt-8"
              onClick={() => selectFileRef.current?.click()}
            >
              or choose file to upload
            </button>
            <input
              multiple={false}
              ref={selectFileRef}
              type="file"
              hidden
              accept=".mp3, .wav"
              maxfilesize="100000000"
              onChange={handleOnChange}
            />
            <audio ref={audioRef} hidden />
            <p className="text-blur text-center mt-3">
              Only accept types mp3, wav <br />
              Max size: 100mb
            </p>
          </>
        )}
        {dragActive && (
          <p className="text-2xl text-primaryGray">Drop file here...</p>
        )}
      </div>

      {error && (
        <p className="text-xs text-primaryRed">
          Your uploaded file is invalid. Type must be mp3 or wav and the max
          size is 100mb
        </p>
      )}
    </>
  );
}
