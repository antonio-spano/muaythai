const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// --- SPAZIO PER LA TUA LOGICA ---
// Qui scriverai l'algoritmo delle combo
// --------------------------------

// Test Route
app.get('/', (req, res) => {
    res.json({ message: 'Backend connesso con successo!' });
});

app.listen(PORT, () => {
    console.log(`Server attivo su http://localhost:${PORT}`);
});
