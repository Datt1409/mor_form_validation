import { ThemeContext } from "@/pages/ThemeContext";
import Image from "next/image";
import React, { useContext, useRef } from "react";
import { FaCamera } from "react-icons/fa";

export default function Avatar() {
  const { avatar, setAvatar } = useContext(ThemeContext);
  const imageInputRef = useRef(null);

  const onSelectAvatar = (e) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = (readerEvent) => {
      if (readerEvent.target?.result) {
        setAvatar(readerEvent.target.result);
      }
    };
  };

  return (
    <>
      {" "}
      {avatar ? (
        <>
          <div
            className="w-[200px] h-[200px] mt-8 bg-contain rounded-md relative "
            style={{ background: `url(${avatar}) no-repeat center center ` }}
          >
            {/* <Image
              src={avatar}
              width={200}
              height={200}
              alt="avatar"
              className="object-cover rounded-md "
            /> */}
            <button
              className="w-[112px] h-[20px] bg-[#F6F6F6] text-[10px] text-center left-11 bottom-3 absolute z-10 rounded-md block"
              onClick={() => imageInputRef.current?.click()}
            >
              Replace
            </button>
            <input
              ref={imageInputRef}
              type="file"
              hidden
              accept=".jpg, .jpeg, .png"
              onChange={onSelectAvatar}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-between">
          <div
            className="w-[200px] h-[200px] flex flex-row items-end justify-center rounded-md mt-8"
            style={{
              background: "linear-gradient(135deg, #9A8080 0%, #82A8C2 100%)",
            }}
          >
            <button
              className="w-[112px] h-[20px] bg-[#F6F6F6] text-[10px] text-center rounded-md block mb-5"
              onClick={() => imageInputRef.current?.click()}
            >
              <FaCamera size={16} className="inline-block mr-1" />
              Upload image
            </button>
            <input
              ref={imageInputRef}
              type="file"
              hidden
              accept=".jpg, .jpeg, .png"
              onChange={onSelectAvatar}
            />
          </div>
        </div>
      )}
    </>
  );
}
