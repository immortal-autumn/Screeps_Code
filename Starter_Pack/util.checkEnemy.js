var utilCheckEnemy = {
    run: function (targets) {
        for (let i in targets) {
            let roomInfo = Game.rooms[targets[i]];
            if (roomInfo) {
                if (roomInfo.find(FIND_HOSTILE_CREEPS).length === 0) {
                    if (roomInfo.find(FIND_HOSTILE_STRUCTURES, {
                        filter: function (structure) {
                            return structure.structureType !== STRUCTURE_CONTROLLER;
                        }
                    }).length !== 0) {
                        return targets[i];
                    }
                } else {
                    return targets[i];
                }
            }
        }
        return targets[0];
    }
};

module.exports = utilCheckEnemy;