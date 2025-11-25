import { useState } from "react";
import "./App.css";

function App() {
  const [combo, setCombo] = useState("Premi il tasto per allenarti");

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
        <strong>{combo}</strong>
      </div>

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
