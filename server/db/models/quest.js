const Sequelize = require('sequelize')
const db = require('../db')

const Quest = db.define('quest', {
  1: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  2: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  3: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  4: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  5: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Quest
