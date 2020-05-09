var roleRepair = {
    run: function(creep) {
	    if(creep.memory.action == 'gather') {
	        let targets = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,
	        {
	            filter: (resource) => {
	                return ((resource.resourceType == RESOURCE_ENERGY) && (resource.amount >= creep.store.getFreeCapacity(RESOURCE_ENERGY)))
	            }
	        });
            if ((targets == null) || (targets.length == 0)) {
                targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (((structure.structureType == STRUCTURE_CONTAINER) || (structure.structureType == STRUCTURE_STORAGE)) && (structure.store.getUsedCapacity(RESOURCE_ENERGY) >= creep.store.getFreeCapacity(RESOURCE_ENERGY)));
                    }
                })
                if ((targets != null) && (targets.length != 0)) {
                    if(creep.withdraw(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets);
                    }
                }
            } else {
                if(creep.pickup(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            if(creep.store.getFreeCapacity() == 0) {
                creep.memory.action = 'repair';
            }
	    }
        if(creep.memory.action == 'repair') {
            if(creep.store.getUsedCapacity() == 0) {
                creep.memory.action = 'gather';
                creep.memory.target = false;
            } else {
//                const targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
//                    filter: (structure) => {
//                        return ((structure.structureType != STRUCTURE_WALL) && (structure.hits < structure.hitsMax));
//                    }
//                });
//                targets.sort((a,b) => a.hits - b.hits);
//                console.log(targets + 'repair');
                if (!(creep.memory.target) || (Game.getObjectById(creep.memory.target).hits == Game.getObjectById(creep.memory.target).hitsMax)) {
                    const targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (((structure.structureType != STRUCTURE_WALL) && (structure.structureType != STRUCTURE_RAMPART)) && (structure.hits < structure.hitsMax));
                        }
                    })
                    targets.sort((a,b) => (((b.hitsMax - b.hits)/b.hitsMax) - ((a.hitsMax - a.hits)/a.hitsMax)));
//                    console.log(targets[0] + 'repair');
/*                    if((targets != null) && (targets.length > 0)) {*/
                    creep.memory.target = targets[0].id;
//                    console.log(targets[0]);
//                    console.log(creep.memory.target);
                }
                if(creep.repair(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.target));
/*                        }*/
                }
            }
        }
    }
}

module.exports = roleRepair;