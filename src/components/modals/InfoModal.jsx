import React, { useContext, useEffect, useRef, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Input from "../Input";
import { formatTime, formatTitle, genres, slugify } from "@/utils";
import { ThemeContext } from "@/pages/ThemeContext";
import { storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import FooterButton from "../FooterButton";
import Avatar from "../Avatar";
import SongInfo from "../SongInfo";

export default function InfoModal() {
  const [loading, setLoading] = useState(false);
  const [showGenre, setShowGenre] = useState(false);
  const [progress, setProgress] = useState("");
  const audioRef = useRef(null);
  const [remainText, setRemainText] = useState(500);
  const cancelButtonRef = useRef(null);
  const saveButtonRef = useRef(null);
  const progressRef = useRef(null);
  const listGenreRef = useRef(null);

  const {
    file,
    error,
    setStep,
    setDuration,
    setError,
    setToastMessage,
    setSuccess,
    setDownloadUrl,
    inputValue,
    setInputValue,
    selectGenre,
    setSelectGenre,
    setShowToast,
    setShowPercentage,
    showToast,
    titleMessage,
    slugMessage,
    setTitleMessage,
    setSlugMessage,
    setIsFocus,
  } = useContext(ThemeContext);

  const handleSelectGenre = (value) => {
    setSelectGenre(value);
    setShowGenre(false);
  };

  const handleInputChange = (field, value) => {
    setIsFocus(true);
    if (field === "title") {
      if (!value) {
        setError(true);
        setTitleMessage("This field is required");
      } else {
        setError(false);
        setTitleMessage(null);
      }
    }

    if (field === "slug") {
      if (!value) {
        setError(true);
        setSlugMessage("This field is required");
      } else {
        setError(false);
        setSlugMessage(null);
      }
    }

    if (field === "description") {
      const MAX_DESCRIPTION_LENGTH = 500;
      setRemainText(MAX_DESCRIPTION_LENGTH - value.length);
    }

    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setStep((prev) => prev - 1);
  };

  const handleUpload = async () => {
    if (!inputValue.title || !inputValue.slug) {
      setShowToast(true);
      setError(true);
      setToastMessage("Please fill in required fields");
      return;
    }

    setLoading(true);
    const storageRef = ref(storage, `songs/${inputValue.title}.mp3`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setShowPercentage(true);
        setProgress(progress.toFixed(2) + "%");
        switch (snapshot.state) {
          case "paused":
            if (cancelButtonRef.current?.click()) uploadTask.cancel();
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        setError(true);
        setShowToast(true);
        setToastMessage("Upload failed");
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setDownloadUrl(downloadURL);
        });
        setSuccess(true);
        setShowToast(true);
        setToastMessage("Upload successfully");
        setStep((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    if (file) {
      audioRef.current.src = URL.createObjectURL(file);
      const audioElement = new Audio();
      audioElement.addEventListener("loadedmetadata", () => {
        const duration = audioElement.duration;
        setDuration(formatTime(duration));
      });
      audioElement.src = URL.createObjectURL(file);
    }
  }, [file, setDuration]);

  useEffect(() => {
    // Check if file.name is not empty and inputValue.title is different
    if (file.name) {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        title: formatTitle(file.name),
        slug: slugify(file.name),
      }));
    }
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progress}`;
      progressRef.current.style.background = "#FF6B00";
      progressRef.current.style.transition = "0.1s linear";
    }
  }, [progress, progressRef.current]);

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 8000);
    }
    return () => clearTimeout();
  }, [showToast]);

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        listGenreRef.current &&
        !listGenreRef.current.contains(e.target) &&
        e.target !== listGenreRef.current
      ) {
        setShowGenre(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <>
      <div className="w-[630px] flex flex-col border items-center border-primaryGray rounded-[10px] gap-8">
        <div className="flex w-[94%] flex-row gap-6">
          {/* Avatar box */}
          <Avatar />
          {/* Info box */}
          <div className="w-[373px] flex flex-col justify-between mt-8">
            <div className="mb-4">
              <Input
                id="title"
                label="Title"
                value={inputValue.title}
                placeholder="placeholder"
                required
                type="text"
                className=""
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>
            {/* Song info */}
            <div className="flex flex-row gap-16 mb-4">
              <SongInfo />
            </div>
            <audio ref={audioRef} src="" hidden />
            {/* Slug */}
            <div className="mb-4">
              <Input
                id="slug"
                label="Slug"
                value={inputValue.slug}
                required
                placeholder="placeholder"
                type="text"
                className=""
                onChange={(e) => handleInputChange("slug", e.target.value)}
              />
            </div>

            {/* Genre dropdown */}
            <div className="flex flex-row justify-center items-center mb-4 gap-3">
              <div className="flex flex-col">
                <p className="text-xs text-primaryBlack mb-1">Genre</p>
                <div
                  className="w-[180px] h-[34px] text-xs pl-3 pt-2 border border-primaryGray rounded-md cursor-pointer relative"
                  onClick={() => setShowGenre(!showGenre)}
                >
                  {selectGenre ? selectGenre : "None"}
                  {!showGenre ? (
                    <BsChevronDown
                      size={16}
                      className="absolute right-2 top-2"
                    />
                  ) : (
                    <BsChevronUp size={16} className="absolute right-2 top-2" />
                  )}
                  {showGenre && (
                    <ul
                      ref={listGenreRef}
                      className="w-full h-[130px] text-black border overflow-y-scroll scrollbar border-primaryGray bg-white absolute left-0 top-10 z-10 rounded"
                    >
                      {genres.map((genre) => (
                        <li
                          key={genre}
                          className="h-[24px] pl-3 flex items-center hover:bg-[#F6F6F6]"
                          onClick={() => handleSelectGenre(genre)}
                        >
                          {genre}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <Input
                label="Artist"
                value={inputValue.artist}
                type="text"
                placeholder="Artist"
                onChange={(e) => handleInputChange("artist", e.target.value)}
              />
            </div>
            {/* Description */}
            <div className="relative">
              <Input
                type="textarea"
                id="description"
                label="Description"
                value={inputValue.description}
                className="h-[84px]"
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
              <p
                className={`${
                  remainText === 500 ? "text-blur " : "text-black"
                } absolute text-xs right-0 top-0`}
              >
                {remainText}
              </p>
            </div>
            {/* Button */}
          </div>
        </div>

        <div className="flex w-[95%] flex-row mb-4 items-center justify-between">
          <p className="mb-2 text-xs">
            <span className="text-primary">*</span> Required fields
          </p>

          {/* Percentage progress bar */}
          <div
            className={`w-[150px] rounded-xl border border-primary text-center text-white invisible`}
          >
            <div
              ref={progressRef}
              className={`rounded-xl border-primary bg-primary text-white text-xs text-center`}
            >
              {progress}
            </div>
          </div>

          {/* footer button */}
          <FooterButton
            handleUpload={handleUpload}
            handleCancel={handleCancel}
            loading={loading}
            cancelButtonRef={cancelButtonRef}
            saveButtonRef={saveButtonRef}
          />
        </div>
      </div>
    </>
  );
}
