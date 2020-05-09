var rolePorter = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.action == 'gather') {
	        let targets = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
	            filter: (resource) => {
	                return ((resource.resourceType == RESOURCE_ENERGY) && (resource.amount >= 50));
	            }
	        })
/*            if ((targets == null) || (targets.length == 0)) {
                targets = creep.pos.findClosestByPath(FIND_TOMBSTONES);
                    if ((targets != null) && (targets.store.getUsedCapacity() > 0)) {
                        if(creep.withdraw(targets) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets);
                        }
                    }
                }
*/            if ((targets == null) || (targets.length == 0)) {
                targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store.getUsedCapacity(RESOURCE_ENERGY) >= creep.store.getFreeCapacity(RESOURCE_ENERGY)));
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
//            console.log(targets);
            if(creep.store.getFreeCapacity() == 0) {
                creep.memory.action = 'supply';
            }
	    }
        if(creep.memory.action == 'supply') {
	    // prioritized porter destinations
            let destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0));
                }
            })
            if (destination == null) {
                destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_SPAWN) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0));
                    }
                })
            }
            if (destination == null) {
                destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_TOWER) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0));
                    }
                })
            }
            if (destination == null) {
                destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_STORAGE) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0));
                    }
                })
            }
            if(creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(destination);
            }
            if(creep.store.getUsedCapacity() == 0) {
                creep.memory.action = 'gather';
            }
        }
	}
};

module.exports = rolePorter;