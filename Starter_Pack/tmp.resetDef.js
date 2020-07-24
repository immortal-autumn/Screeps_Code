var tmpResetWeapons = {
    run: function (room, mask) {
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