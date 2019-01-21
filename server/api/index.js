const router = require('express').Router();
const {Player, Quest, State, Track} = require('../db/models')
const session = require('express-session');
const gameState = require('../../gameState')
module.exports = router;

router.post('/create', async (req, res, next) => {
    try {
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
      console.log(err);
      res.sendStatus(401);
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
        players.forEach(async function (player, index){
            await Player.update({
            ...assignment[index]
          },{
            where:{
              name: player.name
            }
          })
        })
        await State.update({status: "track"},{where:{roomName: req.body.roomName}})
      }
      res.status(200).send('Joined Room!')
    } catch (err) {
      console.log(err)
      res.error("No such room")
    }
  })

router.post('/vote', async (req, res, next) => {
  try{
    console.log(req.body);
    let game = await State.findOne({
      where:{
        id: req.body.id
      }
    })
    if(game.status === "track"){
      let gameTrack = await Track.findOrCreate({
        where: {
          stateId: game.id
        }
      })
      let value = gameTrack[0].dataValues[game.trackVote];
      if(!value){
        value = []
      }
      value.push(`${req.body.vote}&${req.body.name}`)
      await Track.update({[game.trackVote]:value},{
        where:{stateId: game.id}
      })

      console.log(value.length, game.numPlayers);
        if(value.length === game.numPlayers){
          let results = trackVoteCounter(value)
          if(results === "fail"){
            if(game.trackVote === 4){
              await State.update({status: 'end'}, {
                where:{id: req.body.id}}
              )
              return res.send(200);

            }

            let updatedTrackVote = game.trackVote + 1;
            await State.update({trackVote: updatedTrackVote}, {
              where:{id: req.body.id}}
            )
          } else {
            await State.update({trackVote: 1, status: 'quest'}, {
              where:{id: req.body.id}}
            )
            await Track.update({1:[], 2:[], 3:[], 4:[], 5:[]},{where:{stateId: game.id}})
          }
          console.log("results", results)

        }
      } else {
      let gameQuest = await Quest.findOrCreate({
        where: {
          stateId: game.id
        }
      })
      let value = gameQuest[0].dataValues[game.questNum];
      if(!value){
        value = []
      }
      value.push(`${req.body.vote}`)
      await Quest.update({[game.questNum]:value},{
        where:{stateId: game.id}
      })

      if (value.length === gameState[game.numPlayers][game.questNum].voters) {
        let results = questVoteCounter(value, game.numPlayers,
          game.questNum)

        console.log(results);  
        if(results === "fail"){
          let updatedFail = game.totalFail + 1;
          await State.update({totalFail: updatedFail}, {
            where:{id: req.body.id}}
          )
          if(updatedFail === 3){
            await State.update({status: 'end'}, {
              where:{id: req.body.id}})
            return res.send(200);

          }
        } else {
          let updatedSuccess = game.totalSuccess + 1;
          console.log(updatedSuccess);
          await State.update({ totalSuccess: updatedSuccess }, {
            where:{id: req.body.id}})
            if(updatedSuccess === 3){
              await State.update({status: 'end'}, {
                where:{id: req.body.id}})
                return res.send(200);
            }
        }
        let updatedQuestNum = game.questNum + 1;
        await State.update({questNum: updatedQuestNum, status: 'track'},{
          where:{id: req.body.id}
        })
      }
    }

    res.send(200);
  } catch(err){
    console.log(err);
    res.sendStatus(401);
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

function trackVoteCounter(arr){
  let results = arr.reduce((accum, elem)=>{
      if(elem.includes('PASS')){
          accum.pass++;
      } else {
          accum.fail++;
      }
      return accum;
  }, {
      pass: 0,
      fail: 0
  })
  if (results.pass > results.fail){
      return "pass";
  } else {
      return "fail";
  }
}

function questVoteCounter(arr, numPlayers, questNum){
  let questFailNum = gameState[numPlayers][questNum].votesToFail
  let results = arr.reduce((accum, elem)=>{
      if(elem.includes('PASS')){
          accum.pass++;
      } else {
          accum.fail++;
      }
      return accum;
  }, {
      pass: 0,
      fail: 0
  })


  if(results.fail >= questFailNum){
      return "fail";
  } else {
      return "pass";
  }
}
