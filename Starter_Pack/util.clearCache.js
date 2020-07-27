var utilClearCache = {
    run: function (creep) {
        for (let name in Memory.creeps) {
            if (Game.creeps[name].memory.belongs == null) {
                delete Game.creeps[name].memory.belongs;
                console.log('Rejudging belongings!')
            }
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
};

module.exports = utilClearCache;