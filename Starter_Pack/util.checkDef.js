var tReset = require('tmp.resetDef');

var utilCheckDef = {
    run: function () {
        for (let i in Game.spawns) {
            if (Game.spawns[i].room.find(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return creep.memory.role === 'defend';
                }
            }).length >= 5) {
                tReset.run();
                return;
            }
        }
    }
};

module.exports = utilCheckDef;