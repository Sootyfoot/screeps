    function assessNeed()
    {
        const derelicts = room.find(FIND_STRUCTURES, {
            filter: (structure) => (structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) &&
            (structure.hits <= structure.hitsMax/10)
        });
    }

	    switch (creep.memory.role)
	    {
	        case 'peon':
	            //
	            break;
    	    case 'harvester':
                //
                break;
    		case 'claimer':
	    		roleClaimer.runPerCreep(creep);
		    	break;
    		case 'builder':
	    		roleBuilder.runPerCreep(creep);
		        break;
    		case 'extractor':
	    		// role.extractor run() takes care of this
		        break;
    		case 'mineral':
	    		// role.lab.run() takes care of this
		        break;
    		case 'melee':
	    		roleAttack.runPerCreep(creep);
		        break;
    		case default:
	    		const msg = "unknown_role " + creep.name + ' ' + creep.memory.role + ' ' + creep.room.href();
		    	log(msg);
    			creep.say("😵");
			    creep.recycle();
		        break;
	    }
	}
}



















        // tower behavior
        let hostile = structure.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (hostile) {
            attack(hostile);
        } else {
            let damagedStructure = structure.pos.findInRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax);
                    }
                }, 5);
            if (damagedStructure.length != 0) {
                repair(damagedStructure[0]);
            }
        }

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
            return ((structure.structureType == STRUCTURE_STORAGE) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0));
        }
    })
}
if(creep.transfer(destination, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo(destination);
}

targets.sort((a,b) => ((((a.hitsMax - a.hits)/a.hitsMax)*100) - (((a.hitsMax - a.hits)/a.hitsMax)*100));