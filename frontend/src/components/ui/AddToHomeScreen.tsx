import { useEffect, useState } from "react";

const AddToHomeScreen = () => {
  const [prompt, setPrompt] = useState<any | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  console.log("add to home screen");

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (prompt) {
      prompt.prompt();
      const choiceResult = await prompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA installation");
      } else {
        console.log("User dismissed the PWA installation");
      }
      setPrompt(null);
      setIsVisible(false);
    }
  };

  return (
    isVisible && (
    <button style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: "100", background: "green", color: "white", padding: "10px", borderRadius: "5px" }} onClick={handleInstallClick}>Adicionar à Tela Inicial</button>
    )
  );
};

export default AddToHomeScreen;
