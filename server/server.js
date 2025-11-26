const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const j = "jab";
const c = "cross";
const h = "hook";
const u = "uppercut";
const r = "roundhouse kick";
const f = "front kick";
const s = "side kick";
const k = "knee strike";
const e = "elbow strike";

const move = [j, c, h, u, r, f, s, k, e];
const side = ["left", "right"];
const bodypart = ["low", "high", "body"];
const combolen = 2;

const delay = 5;
const sessiontime = 90;
const pause = 30;

function generateCombo() {
  let combo = "";

  for (let i = 0; i < combolen; i++) {
    let moverand = Math.floor(Math.random() * move.length);
    let siderand = Math.floor(Math.random() * side.length);
    let bodyrand = Math.floor(Math.random() * bodypart.length);

    combo += side[siderand] + " " + bodypart[bodyrand] + " " + move[moverand];

    if (i < combolen - 1) {
      combo += " - ";
    }
  }

  return combo;
}

function startWorkout() {
}

app.get("/combo", (req, res) => {
  const result = generateCombo();
  console.log("Generata: ", result);
  res.json({ combo: result });
});

app.post("/echo", (req, res) => {
  const input = req.body.delay;
  console.log("Ho ricevuto: ", input);
  const output = startWorkout();
});

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
