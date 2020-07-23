const structureTypes = [STRUCTURE_TOWER, STRUCTURE_SPAWN, STRUCTURE_EXTENSION];

var initCarry = {
    run: function (creep) {
        // 0 Carry, 1 Transfer
        if (creep.memory.stat === 0) {
            if (creep.store.getFreeCapacity() === 0) {
                creep.memory.stat = 1;
                creep.say('Transfer');
                return;
            }
            if (creep.memory.room !== creep.room.name) {
                let exitDir = creep.room.findExitTo(creep.memory.room);
                let exit = creep.pos.findClosestByPath(exitDir);
                creep.moveTo(exit, {visualizePathStyle: {stroke: '#00aea8'}});
                return;
            }
            let dropRes = Game.rooms[creep.memory.room].find(FIND_DROPPED_RESOURCES);
            if (dropRes.length === 0) {
                dropRes = Game.rooms[creep.memory.room].find(FIND_TOMBSTONES, {
                    filter: function (tombstone) {
                        return tombstone.store[RESOURCE_ENERGY] !== 0;
                    }
                });
                if (dropRes.length === 0) {
                    creep.memory.stat = 1;
                    return;
                }
            }
            if (creep.pickup(dropRes[0]) === ERR_NOT_IN_RANGE || creep.withdraw(dropRes[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(dropRes[0], {visualizePathStyle: {stroke: '#00aea8'}});
            }
        } else {
            if (creep.store[RESOURCE_ENERGY] === 0) {
                creep.memory.stat = 0;
                return;
            }
            if (creep.room.name !== creep.memory.origin) {
                let exitDir = creep.room.findExitTo(creep.memory.origin);
                let exit = creep.pos.findClosestByPath(exitDir);
                creep.moveTo(exit, {visualizePathStyle: {stroke: '#00aea8'}});
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
                creep.moveTo(targets[creep.memory.belongs], {visualizePathStyle: {stroke: '#00aea8'}});
            }
        }

    }
};

module.exports = initCarry;