// Tower repair and attack

var utilTower = {
    run: function (room) {
        var towers = Game.rooms[room].find(
            FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

        // Attack
        var hostiles = Game.rooms[room].find(FIND_HOSTILE_CREEPS);

        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${room}`);
            towers.forEach(tower => tower.attack(hostiles[0]));
        } else {
            // Repair
            let failed = Game.rooms[room].find(FIND_STRUCTURES, {
                filter: function (f) {
                    return f.hits < f.hitsMax;
                }
            }).sort(function (a, b) {
                return (a.hits / a.hitsMax) - (b.hits / b.hitsMax);
            })[0];
            towers.forEach(tower => tower.repair(failed));
        }
    }

};

module.exports = utilTower;