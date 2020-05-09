var roleScavenger = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.action == 'gather') {
	        let targets = creep.pos.findClosestByPath(FIND_TOMBSTONES);
            if (targets != null) {
                if(creep.withdraw(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
            if(creep.store.getFreeCapacity() == 0) {
                creep.memory.action = 'gather';
            }
        }
        if(creep.memory.action == 'supply') {
            let destination = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE);
                }
            })
            if(creep.transfer(destination) == ERR_NOT_IN_RANGE) {
                creep.moveTo(destination);
            }
            if(creep.store.getUsedCapacity() == 0) {
                creep.memory.action = 'gather';
            }
        }
	}
};

module.exports = roleScavenger;