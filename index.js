'use strict'

const express = require('express')
const path = require('path')

const app = express();
const server = require('http').Server(app);

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))



const io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
  });

// app.get( '/', function (req, res) {
//     res.send('hello world');
// });





const PORT = 5000
// app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))

server.listen(PORT, ()=> {
    console.log(`running on port ${PORT}`);
})