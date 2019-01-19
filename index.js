'use strict'
const express = require('express')
const path = require('path')
const colyseus = require("colyseus");
const http = require("http");
const app = express();
const createOrJoin = require('./createOrJoinRoom');

const gameServer = new colyseus.Server({
  server: http.createServer(app)
});

gameServer.register('createOrJoin', createOrJoin);

const PORT = 5000

gameServer.listen(PORT)
    console.log(`running on port ${PORT}`);