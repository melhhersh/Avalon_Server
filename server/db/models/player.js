const Sequelize = require('sequelize')
const db = require('../db')

const Player = db.define('player', {
  name: {
    type: Sequelize.STRING
  },
  sessionID: {
    type: Sequelize.STRING,
    unique: true
  },
  characterName: {
      type: Sequelize.STRING
  },
  characterUrl: {
    type: Sequelize.STRING
  },
  characterTeam: {
    type: Sequelize.STRING
  },
})

module.exports = Player
