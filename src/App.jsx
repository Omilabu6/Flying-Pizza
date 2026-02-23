import { useState, useEffect } from "react";
import pizza from "./assets/pizza.png";
import "./App.css";

function App() {
  const [isFlying, setIsFlying] = useState(true);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.toLowerCase();

      console.log("You said:", transcript);

      if (transcript.includes("stop")) {
        setIsFlying(false);
      }

      if (transcript.includes("continue")) {
        setIsFlying(true);
      }
    };

    recognition.start();

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