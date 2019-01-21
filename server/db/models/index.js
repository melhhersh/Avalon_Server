const Player = require('./player')
const Quest = require('./quest')
const State = require('./state')
const Track = require('./track')

State.hasOne(Track)
Track.belongsTo(State)

State.hasOne(Quest)
Quest.belongsTo(State)

State.hasMany(Player)
Player.belongsTo(State)

module.exports = {
  Player,
  Quest,
  State,
  Track
}