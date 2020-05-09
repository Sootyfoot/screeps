var roleColonist = {

    run: function(creep) {
        const exitPos = creep.room.getPositionAt(32,0);
        const hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostile != null)
        {
            creep.memory.prevAction = creep.memory.action;
            creep.memory.action = 'defend';
        }
        switch (creep.memory.action)
        {
            case 'colonize':
                if (creep.room.name == 'W17S34')
                {
                    creep.moveTo(exitPos);
                } else
                {
                    creep.moveTo(32,48);
                    creep.memory.action = 'gather';
                }
                break;
            case 'gather':
	    if(creep.memory.action == 'gather')
	    {
	        let targets = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES,
	        {
	            filter: (resource) => {
	                return ((resource.resourceType == RESOURCE_ENERGY) && (resource.amount >= creep.store.getFreeCapacity(RESOURCE_ENERGY)))
	            }
	        });
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
                    if(creep.store.getFreeCapacity() == 0)
                    {
                        if (!creep.room.controller.my)
                        {
                            creep.memory.action = 'claim';
                        }
                        else if (creep.room.controller.ticksToDowngrade <= 7500)
                        {
                            creep.memory.action = 'upgrade';
                        }
                        else
                        {
                            creep.memory.action = 'build';
                        }
//                    }
                }
                break;
            case 'claim':
                if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(creep.room.controller);
                }
                if (creep.room.controller.my == TRUE)
                {
                    creep.memory.action = 'upgrade';
                }
                break;
            case 'upgrade':
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(creep.room.controller);
                }
                if (creep.store.getUsedCapacity() == 0) {
                    creep.memory.action = 'gather';
                }
                break;
            case 'build':
                const spawnSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (creep.build(spawnSite) == ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(spawnSite);
                }
                if (creep.store.getUsedCapacity() == 0)
                {
                    creep.memory.action = 'gather';
                }
                break;
            case 'defend':
                if ((creep.rangedAttack(hostile) == ERR_NOT_IN_RANGE) || (creep.attack(hostile) == ERR_NOT_IN_RANGE))
                {
                    creep.moveTo(hostile);
                }
                creep.memory.action = creep.memory.prevAction;
                delete creep.memory.prevAction;
                break;
            default:
                console.log('ERROR: ' + creep.name + ' does not have a role.')
                break;
        }
    }
};

module.exports = roleColonist;