var tmpResetWeapons = {
    run: function () {
        for (let i in Game.creeps) {
            let creep = Game.creeps[i];
            if (creep.memory.role === 'defend') {
                delete creep.memory.room;
                creep.memory.role = 'weapon';
            }
            if (creep.memory.role === 'attack') {
                delete creep.memory.room;
            }
        }
    }
};

module.exports = tmpResetWeapons;