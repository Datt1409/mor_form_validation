export const genres = [
  "Ballad",
  "Rock",
  "R&B",
  "Acoustic",
  "Jazz",
  "Blues",
  "EDM",
  "Hip hop",
  "Electronic",
  "Popular music",
];

export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const isValidNumber = (number) => {
  const numberRegex =
    /^[-+]?(\d+(\.\d*)?|\.\d+|(\d+)?e\d+(\.\d*)?|\d+(\.\d*)?e\d+)$/;
  return numberRegex.test(number);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateNumberInput = (number) => {
  const numberRegex = /^[0-9e,.\-+]*$/;
  return numberRegex.test(number);
};

export const slugify = (string) => {
  return string
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") //remove diacritics
    .toLowerCase()
    .replace("mp3", "")
    .replace(/\s+/g, "-") //spaces to dashes
    .replace(/&/g, "-and-") //ampersand to and
    .replace(/[^\w\-]+/g, "") //remove non-words
    .replace(/\-\-+/g, "-") //collapse multiple dashes
    .replace(/^-+/, "") //trim starting dash
    .replace(/-+$/, ""); //trim ending dash
};

export const bytestoMb = (bytes) => {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2);
};

export const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return "00:00";
};

export const formatTitle = (str) => {
  return str.replace(".mp3", "");
};
