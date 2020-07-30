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
                creep.moveTo(new RoomPosition(25, 25, creep.memory.room), {visualizePathStyle: {stroke: '#00aea8'}});
                return;
            }
            let dropRes;
            let currentPos = creep.pos;
            switch (0) {
                case 0: {
                    dropRes = currentPos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                        filter: structure => {
                            if (structure.store) return structure.store[RESOURCE_ENERGY] !== 0;
                            return false;
                        }
                    });
                    if (dropRes) break;
                }
                case 1: {
                    dropRes = currentPos.findClosestByPath(FIND_DROPPED_RESOURCES);
                    if (dropRes) break;
                }
                case 2: {
                    dropRes = currentPos.findClosestByPath(FIND_TOMBSTONES, {
                        filter: tombstone => {
                            return tombstone.store[RESOURCE_ENERGY] !== 0;
                        }
                    });
                    if (dropRes) break;
                }
                case 3: {
                    dropRes = currentPos.findClosestByPath(FIND_RUINS, {
                        filter: ruin => {
                            return ruin.store[RESOURCE_ENERGY] !== 0;
                        }
                    });
                }
            }
            if (!dropRes) {
                creep.memory.stat = 1;
                return;
            }
            if (creep.pickup(dropRes) === ERR_NOT_IN_RANGE || creep.withdraw(dropRes, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(dropRes, {visualizePathStyle: {stroke: '#00aea8'}});
            }
        } else {
            if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
                creep.memory.stat = 0;
                return;
            }
            if (creep.room.name !== creep.memory.origin) {
                creep.moveTo(new RoomPosition(25, 25, creep.memory.origin), {visualizePathStyle: {stroke: '#00aea8'}});
                return;
            }
            for (let i in creep.store) {
                switch (i) {
                    case RESOURCE_ENERGY: {
                        var targets = creep.room.find(FIND_MY_STRUCTURES, {
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
                        break;
                    }
                    default: {
                        let container = creep.room.findClosestByPath(FIND_MY_STRUCTURES, {
                            filter: (structure) => {
                                return structure.structureType === STRUCTURE_STORAGE;
                            }
                        });
                        if (creep.transfer(container, i) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(container, {visualizePathStyle: {stroke: '#00aea8'}});
                        }
                        break;
                    }
                }
            }
        }

    }
};

module.exports = initCarry;