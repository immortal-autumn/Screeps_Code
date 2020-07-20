var initUpgr = {
    run: function (creep) {
        // 0 upgrade, 1 harvest
        if (creep.memory.stat === 0) {
            if (creep.store[RESOURCE_ENERGY] === 0) {
                creep.say("Harvest!");
                creep.memory.stat = 1;
                return;
            }
            if (creep.room.name !== creep.memory.origin) {
                let exitDir = creep.room.findExitTo(creep.memory.origin);
                let exit = creep.pos.findClosestByPath(exitDir);
                creep.moveTo(exit, {visualizePathStyle: {stroke: '#5041AE'}});
                return;
            }
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
                creep.say("Upgrade!");
                creep.memory.stat = 0;
                return;
            }
            if (creep.room.name !== creep.memory.room) {
                let exitDir = creep.room.findExitTo(creep.memory.room);
                let exit = creep.pos.findClosestByPath(exitDir);
                creep.moveTo(exit, {visualizePathStyle: {stroke: '#5041AE'}});
                return;
            }
            var sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sources[creep.memory.resource]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.resource]);
            }

        }
    }
};

module.exports = initUpgr;