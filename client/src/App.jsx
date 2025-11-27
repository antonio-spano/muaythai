import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [combo, setCombo] = useState("Premi il tasto per allenarti");
  const [time, setTime] = useState("");
  const [serverReply, setServerReply] = useState("Awaiting server reply");
  const [isRunning, setIsRunning] = useState(false);
  const [tempo, setTempo] = useState(30 * 1000);
  const [choice, setChoice] = useState("Select difficulty");
  const [difficulty, setDifficulty] = useState([60, 6, 60]);

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

  const sendData = async (diff) => {
    // Prepariamo il pacco
    setChoice(diff);
    const parcel = { difficulty: diff };

    // Spediamo
    const response = await fetch("http://localhost:5000/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parcel),
    });

    // Leggiamo la ricevuta di ritorno
    const data = await response.json();
    //setServerReply(data.combo);
    //setCombo(data.combo);
    setDifficulty(data.difficulty);
  };

  useEffect(() => {
    let idFreq = null;
    let idTimer = null;

    if (!isRunning) return;
    console.log("difficulty: ", difficulty);
    getNewCombo();
    idFreq = setInterval(() => {
      getNewCombo();
    }, difficulty[1] * 1000);
    idTimer = setTimeout(() => {
      clearInterval(idFreq);
      setIsRunning(false);
    }, difficulty[0] * 1000);

    return () => {
      clearInterval(idTimer);
      clearInterval(idFreq);
    };
  }, [isRunning]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Muay Thai</h1>

      <div
        style={{ padding: "20px", border: "1px solid #333", margin: "10px" }}
      >
        <strong>{combo}</strong>
      </div>

      <select
        value={choice} // A. Mostra quello che c'è in memoria
        onChange={(e) => sendData(e.target.value)} // B. Se l'utente cambia, aggiorna la memoria
        style={{ padding: "15px 20px", fontSize: "18px", margin: "10px" }}
      >
        <option value="0">Easy</option>
        <option value="1">Normal</option>
        <option value="2">Hard</option>
        <option value="3">Spartan</option>
      </select>
      <br></br>

      <button
        onClick={() => setIsRunning(!isRunning)}
        style={{ padding: "15px 20px", fontSize: "16px", margin: "10px" }}
      >
        Start workout 🥊
      </button>
    </div>
  );
}

export default App;
