const colyseus = require ('colyseus') 
const gameState = require ('./gameState')

class CreateOrJoinRoom extends colyseus.Room{
    constructor(){
        super()
    }   

    onInit (options) {
        this.maxClients = options.players;
        this.setState({
            gameState: gameState[options.players],
            players:{
                [options.sessionId]:{
                        character: undefined,
                        name: options.name
                }
            },
            numPlayers: options.players,
            name: options.roomName,
            current: {
                quest: 1,
                status: 'waiting',
                trackVote: 1,
                totalFail: 0,
                totalSuccess: 0
            },
            votes: {
                track: {
                    1:[],
                    2:[],
                    3:[],
                    4:[],
                    5:[]
                },
                quest: {
                    1:[],
                    2:[],
                    3:[],
                    4:[],
                    5:[]
                }
            }
        });
    }
    
    onJoin (client, options, auth) {
        this.state.players[client.sessionId] = {
            character: undefined,
            name: options.name
        }
        if(Object.keys(this.state.players).length === this.maxClients){
            this.assignCharacters()
            this.state.current.status = "track"
        }
    }
    
    requestJoin (options, isNewRoom) {
        return (options.create)
            ? (options.create && isNewRoom)
            : this.clients.length > 0;
    }
    
    onMessage (client, vote) {
        if(this.state.current.status === "track"){
            this.state.votes.track[this.state.current.trackVote].push({
                name: this.state.players[client.sessionId].name,
                vote
            })
            if(this.state.votes.track[this.state.current.trackVote].length === this.maxClients){
                let results = this.trackVoteCounter(this.state.votes.track[this.state.current.trackVote])
                if(results === "fail"){
                    if(this.state.current.trackVote === 5){
                        this.state.current.status = "end"
                        return
                    }
                    this.state.current.trackVote++
                } else {
                    this.state.current.trackVote = 1;
                    this.state.current.status = 'quest';
                    this.state.votes.track = {
                        1:[],
                        2:[],
                        3:[],
                        4:[],
                        5:[]
                    }
                }
            }
        } else {
            this.state.votes.quest[this.state.current.quest].push(vote)
            if (this.state.votes.quest[this.state.current.quest].length === this.state.gameState[this.state.current.quest].voters) {
                let results = this.questVoteCounter(this.state.votes.quest[this.state.current.quest])
                if(results === "fail"){
                    this.state.current.totalFail++
                    if(this.state.current.totalFail === 3){
                        this.state.current.status = "end"
                        return
                    }
                } else {
                    this.state.current.totalSuccess++
                    if(this.state.current.totalSuccess === 3){
                        this.state.current.status = "end"
                        return
                    }
                }
                this.state.current.quest++;
                this.state.current.status = 'track';
            }
        }
    }
    
    onLeave (client) {
        console.log("ChatRoom:", client.sessionId, "left!");
    }

    assignCharacters(){
        let copy = [...this.state.gameState.characters]
        let playerIds = Object.keys(this.state.players)

        for(let i = 0; i < this.state.gameState.characters.length; i++){
           let index = Math.floor(Math.random() * copy.length)
           let char = copy.splice(index, 1)
           let gameChar = gameState.characters[char]
           let playerId = playerIds[i]

           this.state.players[playerId].character = gameChar
        }
    }
    
    trackVoteCounter(arr){
        let results = arr.reduce((accum, elem)=>{
            if(elem.vote){
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

    questVoteCounter(arr){
        let questFailNum = this.state.gameState[this.state.current.quest].votesToFail
        let results = arr.reduce((accum, elem)=>{
            if(elem.vote){
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
}


module.exports = {CreateOrJoinRoom}