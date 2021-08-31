import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(cors());
app.use(express.json());

const http = require('http').Server(app);

const io = require('socket.io')(http);

app.use('/', (req, res) => {
  res.render('index.html');
});

const messages: any = [];

io.on('connection', (socket: any) => {
  console.log(`Socket conectado: ${socket.id}`);

  socket.emit('previousMessages', messages);

  socket.on('sendMessage', (message: any) => {
    messages.push(message);

    socket.broadcast.emit('receivedMessage', message);
  })
})

http.listen(3000, () => {
  console.log('.:::::::::. Servidor online .:::::::::.');
})