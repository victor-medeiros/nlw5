import express from 'express';

const app = express();

app.get("/", () => console.log("Ola nlw 5"));

app.listen(3333, () => {
  console.log("Rodando na porta 3333");
})