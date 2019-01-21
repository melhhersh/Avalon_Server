const Sequelize = require('sequelize')
const db = require('../db')

const State = db.define('state', {
  numPlayers: {
    type: Sequelize.INTEGER
  },
  roomName: {
    type: Sequelize.STRING,
    unique: true
  },
  questNum: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'waiting'
  },
  trackVote: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  totalFail: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalSuccess: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = State