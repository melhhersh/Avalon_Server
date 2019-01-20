const colyseus = require ('colyseus') 

class CreateOrJoinRoom extends colyseus.Room{
    constructor(){
        super()
    }   

    onInit (options) {
        this.maxClients = options.players;
        this.setState({
            players:[options.name],
            numPlayers: options.players,
            name: roomName
        });
    }
    
    onJoin (client, options, auth) {
        console.log("JOINING ROOM");
    }
    
    requestJoin (options, isNewRoom) {
        return (options.create)
            ? (options.create && isNewRoom)
            : this.clients.length > 0;
    }
    
    onMessage (client, message) {
    
    }
    
    onLeave (client) {
        console.log("ChatRoom:", client.sessionId, "left!");
    }
}

module.exports = {CreateOrJoinRoom}