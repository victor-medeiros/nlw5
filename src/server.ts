import express from 'express';

import "./database";
import { route } from './routes';

const app = express();

app.get("/", () => console.log("Ola nlw 5"));

app.use(express.json())

app.use(route)
app.listen(3333, () => {
  console.log("Rodando na porta 3333");
})