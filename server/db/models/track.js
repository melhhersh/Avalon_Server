const Sequelize = require('sequelize')
const db = require('../db')

const Track = db.define('track', {
  1: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  2: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  3: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  4: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  5: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

module.exports = Track
