function towerBehavior ()
{
	let myTowers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);
	for(let i in myTowers) {
        //console.log(myTowers[i]);
        let hostile = myTowers[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // console.log(hostile);
        if (hostile != null) {
            myTowers[i].attack(hostile);
            console.log('ATTACKING' + hostile + '@ (' + hostile.pos.x + ',' + hostile.pos.y + ').');
        }
	}
}

function assessNeed(room)
{ // check for critical repairs
	const minHitsPercent = 10 // percentage value; threshold for critical repairs
	const derelicts = room.find(FIND_STRUCTURES,
	{
		filter: (structure) =>
		(((structure.structureType != STRUCTURE_WALL) && (structure.structureType != STRUCTURE_RAMPART))
		&&
		(structure.hits <= structure.hitsMax*minHitsPercent/100))
	});
	if (derelicts.length != 0)
	{
		console.log('Derelict ' + derelicts[0].structureType + ' found!");
		// assign work
		derelicts.forEach(markTargets);
		room.find(FIND_MY_CREEPS,
		{
			filter: (creep) =>
			((creep.memory.role == 'builder') && (creep.memory.action == 'idle'))
		});
	} else
	{ // check for dropped resources
		const droppedStuff = room.find(FIND_DROPPED_RESOURCES);
		if (droppedStuff.length != 0)
		{
			console.log('Dropped resource ' + droppedStuff[0].resourceType + ' found!");
			// assign work
		} else
		{ // check for non-empty tombstones
			const graves = room.find(FIND_TOMBSTONES,
			{
				filter: (tombstone) =>
				(tombstone.store.getUsedCapacity() > 0)
			});
			if (graves.length != 0)
			{
				console.log('Tombstone with loot found!');
				// assign work
			} else
			{ // check for missing "essential" structures
				{
					// check each source for an adjacent container
					// check for unbuilt extensions
					// check for unbuilt towers
					// check for unbuilt spawns
					// check for unbuilt storage
				} else
				{ // check for construction sites & dismantle flags
					const sites = room.find(FIND_MY_CONSTRUCTION_SITES);
					if (sites.length != 0)
					{
						console.log('Construction site found!');
						// assign work
					}

					const dismantleFlags = room.find(FIND_FLAGS,
					{
						filter: (flag) =>
						(flag.memory.role == 'dismantle') && (flag.memory.assigned == FALSE)
					});
					if (dismantleFlags.length != 0)
					{
						console.log('Dismantle target found!');
						// assign work
					}
				} // end check for construction sites & dismantle flags
			} // end check for missing "essential" structures
		} // end check for non-empty tombstones
	} // end check for dropped resources
} // end check for critical repairs
