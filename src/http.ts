import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import { renderFile } from 'ejs';

import "./database";
import { route } from './routes';

const app = express();

// Setando para a aplicação que ela deve renderizar os HTMLs que estão em public
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', renderFile);
app.set('view engine', 'html');

app.get('/pages/client', (request, response) => {
  response.render('html/client.html');
});

const http = createServer(app); // Criando o protocolo HTTP
const io = new Server(http); // Criando o protocolo WS

io.on("connection", (socket: Socket) => {
  console.log("Se conectou!", socket.id);
});

app.get("/", () => console.log("Ola nlw 5"));

app.use(express.json())

app.use(route)

export { http, io }
