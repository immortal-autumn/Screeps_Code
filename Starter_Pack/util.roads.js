var utilRoads = {
    run: function (spawn) {
        var sources = Game.spawns[spawn].room.find(FIND_SOURCES);
        for (var j = 0; j < sources.length; j++)
        {
            var chemin = Game.spawns[spawn].pos.findPathTo(sources[j].pos);
            for (var i = 0; i < chemin.length; i++)
            {
                Game.spawns[spawn].room.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
            }
        }
    }
};

module.exports = utilRoads;