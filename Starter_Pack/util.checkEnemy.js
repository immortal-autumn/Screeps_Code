var utilCheckEnemy = {
    run: function (targets) {
        for (let i in targets) {
            let roomInfo = Game.rooms[targets[i]];
            if (roomInfo) {
                return targets[i];
            }
        }
    }
};

module.exports = utilCheckEnemy;