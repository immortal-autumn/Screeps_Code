const structureTypes = [STRUCTURE_TOWER, STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_CONTAINER, STRUCTURE_STORAGE];

var initHarv = {
    run: function (creep) {
        if (creep.store.getFreeCapacity() > 0) {
            if (creep.room.name !== creep.memory.room) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {visualizePathStyle: {stroke: '#5041AE'}});
                return;
            }
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sources[creep.memory.resource]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.resource]);
            }
        } else {
            if (creep.room.name !== creep.memory.origin) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.origin), {visualizePathStyle: {stroke: '#5041AE'}});
                return;
            }
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structureTypes.includes(structure.structureType)) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (typeof targets[creep.memory.belongs] === 'undefined') {
                delete creep.memory['belongs'];
                return;
            }
            if (targets[creep.memory.belongs].store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                delete creep.memory['belongs'];
                return;
            }
            if (creep.transfer(targets[creep.memory.belongs], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[creep.memory.belongs]);
            }
        }
    }
};

module.exports = initHarv;