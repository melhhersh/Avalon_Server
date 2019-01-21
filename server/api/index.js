const router = require('express').Router();
const {Player, Quest, State, Track} = require('../db/models')
const session = require('express-session');
const gameState = require('../../gameState')
module.exports = router;

router.post('/create', async (req, res, next) => {
    try {
      console.log(req.body, "REQBODY")
      let newGame = await State.create({
          numPlayers: req.body.numPlayers,
          roomName: req.body.roomName
      })
      let newPlayer = await Player.create({
          name: req.body.name,
          sessionID: req.sessionID,
          stateId: newGame.id
      })
      res.status(200).send('New Game Created!')
    } catch (err) {
      next(err)
    }
  })

  router.post('/join', async (req, res, next) => {
    try {
      let game = await State.findOne({
        where:{
          roomName: req.body.roomName
        }
      })
      let newPlayer = await Player.create({
          name: req.body.name,
          sessionID: req.sessionID,
          stateId: game.id
      })
      let players = await Player.findAll({
        where:{
          stateId: game.id
        }
      })
      if(players.length === game.numPlayers){
        let assignment = assignCharacters(players, gameState[game.numPlayers].characters);
        // console.log("assignment", assignment);
        players.forEach(async function (player, index){
            await Player.update({
            ...assignment[index]
          },{
            where:{
              name: player.name
            }
          })
        })
      }
      res.status(200).send('Joined Room!')
    } catch (err) {
      console.log(err)
      res.error("No such room")
    }
  })


  function assignCharacters(players, characters){
    let copy = [...characters]
    let justPlayers = players.map(values => values.dataValues);
    for(let i = 0; i < characters.length; i++){
       let index = Math.floor(Math.random() * copy.length)
       let char = copy.splice(index, 1)[0]
       let gameChar = gameState.characters[char]
       justPlayers[i] = {
         ...justPlayers[i],
         characterTeam: gameChar.team,
         characterUrl: gameChar.image,
         characterName: char
        };
    }
    return justPlayers
}
