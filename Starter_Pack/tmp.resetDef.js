var mask = false;

var tmpResetWeapons = {
    run: function (room) {
        if (mask) {
            let defends = Game.rooms[room].find(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return creep.memory.role === 'defend';
                }
            });
            defends.forEach(creep => creep.memory.role = 'weapon')
        }
    }
};

module.exports = tmpResetWeapons;