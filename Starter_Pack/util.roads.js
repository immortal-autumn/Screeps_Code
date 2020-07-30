var utilRoads = {
    run: function (spawn, rooms) {
        rooms.forEach(room => {
            if(Game.rooms[room]) {
                var sources = Game.rooms[room].find(FIND_SOURCES);
                if (sources) {
                    for (var j = 0; j < sources.length; j++)
                    {
                        var chemin = spawn.room.findPath(spawn.pos, sources[j].pos, {
                            ignoreCreeps: true, ignoreRoads: true
                        });
                        for (var i = 0; i < chemin.length; i++)
                        {
                            Game.rooms[room].createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
                        }
                        x = sources[j].pos.x;
                        y = sources[j].pos.y;
                        for (let m = -1; m <= 1; m++) {
                            for (let n = -1; n <= 1; n++) {
                                Game.rooms[room].createConstructionSite(x + m, y + n, STRUCTURE_ROAD);
                            }
                        }
                    }
                }
            }
        });
    }
};

module.exports = utilRoads;