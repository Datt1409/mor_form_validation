import { useState, createContext } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [uploadFile, setUploadFile] = useState(null);
  const [file, setFile] = useState([]);
  const [step, setStep] = useState(0);
  const [duration, setDuration] = useState();
  const [avatar, setAvatar] = useState();
  const [toastMessage, setToastMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPercentage, setShowPercentage] = useState(false);
  const [selectGenre, setSelectGenre] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: "",
    slug: "",
    artist: "",
    description: "",
  });

  return (
    <ThemeContext.Provider
      value={{
        uploadFile,
        setUploadFile,
        file,
        setFile,
        step,
        setStep,
        duration,
        setDuration,
        avatar,
        setAvatar,
        inputValue,
        setInputValue,
        toastMessage,
        setToastMessage,
        downloadUrl,
        setDownloadUrl,
        success,
        error,
        setSuccess,
        setError,
        selectGenre,
        setSelectGenre,
        showToast,
        setShowToast,
        showPercentage,
        setShowPercentage,
        isFocus,
        setIsFocus,
        setError,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
