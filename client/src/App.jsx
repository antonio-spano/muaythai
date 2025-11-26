import { useState } from "react";
import "./App.css";

function App() {
  const [combo, setCombo] = useState("Premi il tasto per allenarti");
  const [time, setTime] = useState("");
  const [serverReply, setServerReply] = useState("Awaiting server reply");
  const [isRunning, setIsRunning] = useState(false);
  const [tempo, setTempo] = useState(30 * 1000);

  const getNewCombo = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/combo");
      const data = await response.json();

      setCombo(data.combo);
    } catch (error) {
      console.error(error);
      setCombo("Errore nel recupero combo");
    }
  };

  const sendData = async () => {
    // Prepariamo il pacco
    const parcel = { numero: time };

    // Spediamo
    const response = await fetch("http://localhost:5000/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parcel),
    });

    // Leggiamo la ricevuta di ritorno
    const data = await response.json();
    //setServerReply(data.combo);
    setCombo(data.combo);
  };

  const startWorkout = () => {
    const timer = setInterval(() => {
      getNewCombo();
    }, time);

    return () => {
      clearInterval(idTimer);
    };
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Muay Thai Combo Caller</h1>

      <div
        style={{ padding: "20px", border: "1px solid #333", margin: "20px" }}
      >
        <strong>{combo}</strong>
      </div>

      <div
        style={{ padding: "20px", border: "1px solid #333", margin: "20px" }}
      >
        <input
          type="number"
          placeholder="Session time (s)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <button
        onClick={startWorkout}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Start workout 🥊
      </button>
    </div>
  );
}

export default App;
