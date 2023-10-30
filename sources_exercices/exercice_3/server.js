import express from "express";
import bodyParser from "body-parser";
import { arrowCount } from './dist/arrow.js';


const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Is working !');
});


app.post("/arrows", (req, res) => {
  const { arrowSentence } = req.body;

  if (!arrowSentence || typeof arrowSentence !== "string") {
    return res
      .status(400)
      .json({
        error:
          'L\'objet JSON doit contenir une propriété "arrowSentence" de type string.'
      });
  }

  const score = arrowCount(arrowSentence);

  res.json({ score });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
