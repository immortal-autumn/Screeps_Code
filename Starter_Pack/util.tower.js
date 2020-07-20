var utilTower = {
    run: function (room) {
        var hostiles = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${room}`);
            var towers = Game.rooms[room].find(
                FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    }

};

module.exports = utilTower;