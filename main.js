// requirements
var roleColonist = require('role.colonist');

// main game loop
module.exports.loop = function () {

    // remove absent friends
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
            console.log('Clearing non-existing creep memory:', i);
        }
    }    

    var colonists = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonist');

    for(var name in Game.creeps)
    {
        var creep = Game.creeps[name];
        switch (creep.memory.role)
        {
            case 'colonist':
                roleColonist.run(creep);
                break;
            default:
                console.log('ERROR: No role found for ' + creep + '.');
                break;
        } // end switch (creep.memory.role)
    } // end for(var name in Game.creeps)
} // end module.exports.loop = function ()
