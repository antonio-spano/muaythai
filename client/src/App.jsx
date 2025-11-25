import { useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Server non contattato");
  const [combo, setCombo] = useState("Premi il tasto per allenarti");

  const testConnection = async () => {
    try {
      // Chiama il backend sulla porta 5000
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      setStatus(data.message);
      alert("Tutto funziona! Ora puoi scrivere il codice.");
    } catch (error) {
      console.error(error);
      setStatus("Errore: Backend non raggiungibile");
    }
  };

  const getNewCombo = async () => {
    try {
      const response = await fetch("http://localhost:5000/combo");
      const data = await response.json();

      setCombo(data.combo);
    } catch (error) {
      console.error(error);
      setCombo("Errore nel recupero combo");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Muay Thai Combo Caller</h1>
      <div
        style={{ padding: "20px", border: "1px solid #333", margin: "20px" }}
      >
        Status Backend: <strong>{status}</strong>
      </div>

      <div
        style={{ padding: "20px", border: "1px solid #333", margin: "20px" }}
      >
        Status Backend: <strong>{combo}</strong>
      </div>

      <button
        onClick={testConnection}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Connect
      </button>

      <button
        onClick={getNewCombo}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        Generate Combo
      </button>
    </div>
  );
}

export default App;
