var roleConstructor = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.action == 'build') {
	        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                if(creep.store.getUsedCapacity() == 0) {
                    creep.memory.action = 'gather';
                }
            }
        }
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
                creep.memory.action = 'build';
            }
	    }
/*            if((creep.store.getFreeCapacity() == 0) && (creep.pos.findClosestByPath(FIND_FLAGS) == 'undefined'))
            {
                creep.memory.action = 'build';
            } else
            {
                creep.memory.action = 'dismantle';
            }
	    }
*/	    
/*	    if (creep.memory.action == 'dismantle')
	    {
	        const targetFlag = creep.pos.findClosestByPath(FIND_FLAGS);
//	        console.log(targetFlag.pos);
	        const target = targetFlag.pos.findClosestByPath(FIND_STRUCTURES);
	        if (targetFlag.pos == target.pos)
	        {
	        console.log(target);
	        }
            if(creep.dismantle(target) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(target);
            }
            if(creep.store.getUsedCapacity() == 0)
            {
                creep.memory.action = 'gather';
            }
	    }
*/
    }
}

module.exports = roleConstructor;