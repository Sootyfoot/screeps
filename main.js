var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleConstructor = require('role.constructor');
var roleRepair = require('role.repair');
var rolePorter = require('role.porter');
var roleScavenger = require('role.scavenger');
var roleColonist = require('role.colonist');

module.exports.loop = function () {

    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
            console.log('Clearing non-existing creep memory:', i);
        }
    }    

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var constructors = _.filter(Game.creeps, (creep) => creep.memory.role == 'constructor');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var porters = _.filter(Game.creeps, (creep) => creep.memory.role == 'porter');
    var scavengers = _.filter(Game.creeps, (creep) => creep.memory.role == 'scavenger');
    var colonists = _.filter(Game.creeps, (creep) => creep.memory.role == 'colonist');

    if((harvesters.length < 2) && (Game.spawns['Home'].room.energyAvailable >= 550)) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Home'].spawnCreep([MOVE,WORK,WORK,WORK,WORK,WORK], newName, 
            {memory: {role: 'harvester', action: 'gather'}});
    }

    if((upgraders.length < 3) && (Game.spawns['Home'].room.energyAvailable >= 1800)) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Home'].spawnCreep([WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE,WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader', action: 'gather'}});
    }
    
    if((constructors.length < 0) && (Game.spawns['Home'].room.energyAvailable >= 1800)) {
        var newName = 'Constructor' + Game.time;
        console.log('Spawning new constructor: ' + newName);
        Game.spawns['Home'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE,WORK,CARRY,CARRY,MOVE,MOVE,WORK,CARRY,CARRY,MOVE,MOVE,WORK,CARRY,CARRY,MOVE,MOVE,WORK,CARRY,CARRY,MOVE,MOVE,,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'constructor', action: 'gather'}});
    }

    if((repairers.length < 1) && (Game.spawns['Home'].room.energyAvailable >= 1500)) {
        var newName = 'Repair' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Home'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE,WORK,CARRY,CARRY,MOVE,MOVE,WORK,CARRY,CARRY,MOVE,MOVE,WORK,CARRY,CARRY,MOVE,MOVE,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'repair', action: 'gather'}});
    }

    if((porters.length < 1) && (Game.spawns['Home'].room.energyAvailable >= 1500)) {
        var newName = 'Porter' + Game.time;
        console.log('Spawning new porter: ' + newName);
        Game.spawns['Home'].spawnCreep([CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY,MOVE], newName, 
            {memory: {role: 'porter', action: 'gather'}});
    }

    if((scavengers.length < 0) && (Game.spawns['Home'].room.energyAvailable >= 550)) {
        var newName = 'Scavenger' + Game.time;
        console.log('Spawning new scavenger: ' + newName);
        Game.spawns['Home'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName, 
            {memory: {role: 'scavenger', action: 'gather'}});
    }

     if((colonists.length < 0) && (Game.spawns['Home'].room.energyAvailable >= 1700)) {
        var newName = 'Colonist' + Game.time;
        console.log('Spawning new colonist: ' + newName);
        Game.spawns['Home'].spawnCreep([TOUGH,TOUGH,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,RANGED_ATTACK], newName, 
            {memory: {role: 'colonist', action: 'colonize'}});
    }

    if(Game.spawns['Home'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Home'].spawning.name];
        Game.spawns['Home'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Home'].pos.x + 1, 
            Game.spawns['Home'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'constructor') {
            roleConstructor.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        if(creep.memory.role == 'porter') {
            rolePorter.run(creep);
        }
        if(creep.memory.role == 'scavenger') {
            roleScavenger.run(creep);
        }
        if(creep.memory.role == 'colonist') {
            roleColonist.run(creep);
        }
    }
    
    // tower behavior
    let myTowers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);
    for(let i in myTowers) {
        //console.log(myTowers[i]);
        let hostile = myTowers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // console.log(hostile);
        if (hostile != null) {
            myTowers[i].attack(hostile);
            console.log('ATTACKING' + hostile + '@ (' + hostile.pos.x + ',' + hostile.pos.y + ').');
        }/* else {
            let damagedStructures = myTowers[i].pos.findInRange(FIND_STRUCTURES, 5, {
                filter: (structure) => {
                    return (structure.hits < structure.hitsMax);
                }
            });
            damagedStructures.sort((a,b) => (((b.hitsMax - b.hits)/b.hitsMax) - ((a.hitsMax - a.hits)/a.hitsMax)));
            //console.log(damagedStructures[0]);
            if (damagedStructures.length != 0) {
                myTowers[i].repair(damagedStructures[0]);
            //console.log('REPAIRING' + damagedStructures[0]);
            }
        }*/
    }
}