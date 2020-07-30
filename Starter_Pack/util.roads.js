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
                            spawn.room.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
                        }
                        spawn.room.createConstructionSite(sources[j].pos.x+1, sources[j].pos.y+1, STRUCTURE_ROAD);
                        spawn.room.createConstructionSite(sources[j].pos.x, sources[j].pos.y+1, STRUCTURE_ROAD);
                        spawn.room.createConstructionSite(sources[j].pos.x+1, sources[j].pos.y, STRUCTURE_ROAD);
                        spawn.room.createConstructionSite(sources[j].pos.x-1, sources[j].pos.y-1, STRUCTURE_ROAD);
                        spawn.room.createConstructionSite(sources[j].pos.x-1, sources[j].pos.y, STRUCTURE_ROAD);
                        spawn.room.createConstructionSite(sources[j].pos.x, sources[j].pos.y-1, STRUCTURE_ROAD);
                        spawn.room.createConstructionSite(sources[j].pos.x-1, sources[j].pos.y+1, STRUCTURE_ROAD);
                        spawn.room.createConstructionSite(sources[j].pos.x+1, sources[j].pos.y-1, STRUCTURE_ROAD);
                    }
                }
            }
        });
    }
};

module.exports = utilRoads;