var cHarvest = require('init.harv');

var initBuild = {
    // 0 build, 1 harvest
    run: function (creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.memory.stat === 0) {
                if (creep.store[RESOURCE_ENERGY] === 0) {
                    creep.say("Harvest!");
                    creep.memory.stat = 1;
                }
                if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
                    creep.say("Build!");
                    creep.memory.stat = 0;
                } else {
                    cHarvest.run(creep);
                }
            }
        } else {
            cHarvest.run(creep);
        }
    }
};

module.exports = initBuild;
