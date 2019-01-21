'use strict'
const express = require('express');
const path = require('path');
const http = require("http");
const session = require('express-session');
const app = express();
const morgan = require('morgan');
const createOrJoin = require('./avalonGame');
const socketio = require('socket.io');
const uuidv4 = require('uuid/v4');
const compression = require('compression');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({db});

module.exports = app


const createApp = () => {
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(compression())
    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'my best friend is Austin',
        store: sessionStore,
        resave: false,
        saveUninitialized: true,
        genid: function(req) {
          return uuidv4()
        }
      })
    )
    app.use('/api', require('./api'))
    app.use((req, res, next) => {
        if (path.extname(req.path).length) {
        const err = new Error('Not found')
        err.status = 404
        next(err)
        } else {
            next()
        }
    })
    app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
    })
}

const PORT = 5000

const syncDb = async () => db.sync()

const startListening = () => {
    const server = app.listen(PORT, () =>
      console.log(`Mixing it up on port ${PORT}`)
    )
    // const io = socketio(server)
    // require('./socket')(io)
  }

  async function bootApp() {
    try{
      await sessionStore.sync()
      await syncDb()
      await createApp()
      await startListening()
    } catch(err){
      console.error(err)
    }
    
  }

  if (require.main === module) {
    bootApp()
  } else {
    createApp()
  }