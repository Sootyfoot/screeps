var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.action == 'gather') {
	        let targets = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
	            filter: (resource) => {
	                return ((resource.resourceType == RESOURCE_ENERGY) && (resource.amount >= creep.store.getFreeCapacity(RESOURCE_ENERGY)))
	            }
	        })
            if ((targets == null) || (targets.length == 0)) {
                targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_STORAGE) && (structure.store.getUsedCapacity(RESOURCE_ENERGY) >= creep.store.getFreeCapacity(RESOURCE_ENERGY)));
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
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
//                creep.moveTo(28,37);
                creep.moveTo(creep.room.controller);
            }
            if(creep.store.getUsedCapacity() == 0) {
                creep.memory.action = 'gather';
            }
        }
	}
};

module.exports = roleUpgrader;