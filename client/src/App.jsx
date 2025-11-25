import { useState } from 'react'
import './App.css'

function App() {
  const [status, setStatus] = useState("Server non contattato");

  const testConnection = async () => {
    try {
      // Chiama il backend sulla porta 5000
      const response = await fetch('http://localhost:5000/'); 
      const data = await response.json();
      setStatus(data.message);
      alert("Tutto funziona! Ora puoi scrivere il codice.");
    } catch (error) {
      console.error(error);
      setStatus("Errore: Backend non raggiungibile");
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Template Base Muay Thai</h1>
      <div style={{ padding: '20px', border: '1px solid #333', margin: '20px' }}>
        Status Backend: <strong>{status}</strong>
      </div>
      <button onClick={testConnection} style={{ padding: '10px 20px', fontSize: '16px' }}>
        TEST CONNESSIONE
      </button>
    </div>
  )
}

export default App
