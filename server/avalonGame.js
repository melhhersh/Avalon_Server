
const gameState = require ('../gameState')

class AvalonGame{
    
    
    
    onLeave (client) {
        console.log("ChatRoom:", client.sessionId, "left!");
    }
    
}


module.exports = AvalonGame