import InfoModal from "@/components/modals/InfoModal";
import ProcessingModal from "@/components/modals/ProcessingModal";
import ProgressBar from "@/components/ProgressBar";
import { Poppins } from "next/font/google";
import { useContext, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import DragModal from "@/components/modals/DragModal";
import ToastMessage from "@/components/ToastMessage";

const poppins = Poppins({
  weight: ["400", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--poppins-font",
});
const status = ["default", "processing", "completed"];

export default function Home() {
  const [progressStatus, setProgressStatus] = useState(status[0]);
  const { step, success, error, showToast } = useContext(ThemeContext);

  return (
    <main
      className={`flex flex-col h-screen w-screen items-center relative gap-10 ${poppins.className}`}
    >
      <h1 className="font-bold capitalize text-[#0f0f0f] text-4xl mt-12">
        Upload your music
      </h1>
      <ProgressBar
        status={progressStatus}
        setProgressStatus={setProgressStatus}
      />

      {step === 0 && <DragModal />}
      {step === 1 && <InfoModal />}
      {step === 2 && <ProcessingModal />}

      {showToast && success && <ToastMessage />}
      {showToast && error && <ToastMessage />}
    </main>
  );
}
