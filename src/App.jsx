import { useState, useEffect, useRef } from "react";
import pizza from "./assets/pizza.png";
import "./App.css";

function App() {
  const [isFlying, setIsFlying] = useState(true);

  // Keep a reference to the recognition instance
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    // Create recognition only once
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.toLowerCase();

      console.log("You said:", transcript);

      // Start/continue flying
      if (transcript.includes("continue") || transcript.includes("start") || transcript.includes("go")) {
        setIsFlying(true);
      }

      // Stop flying
      if (transcript.includes("stop") || transcript.includes("pause")) {
        setIsFlying(false);
      }
    };

    // Auto-restart recognition if it ends
    recognition.onend = () => {
      console.log("Speech recognition ended, restarting...");
      recognition.start();
    };

    recognition.start();

    // Cleanup on unmount
    return () => recognition.stop();
  }, []);

  return (
    <div className="scene">
      <div className={`clouds clouds-back ${isFlying ? "clouds-move-slow" : ""}`} />
      <div className={`clouds clouds-front ${isFlying ? "clouds-move-fast" : ""}`} />

      <div className={`city ${isFlying ? "city-move" : ""}`} />

      <img
        src={pizza}
        alt="Pizza"
        className={`pizza ${isFlying ? "pizza-float" : ""}`}
        style={{ bottom: isFlying ? "50vh" : "0vh" }}
      />

      <div className={`road ${isFlying ? "road-move" : ""}`} />
    </div>
  );
}

export default App;