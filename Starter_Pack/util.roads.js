var utilRoads = {
    run: function (spawn) {
        var sources = spawn.room.find(FIND_SOURCES);
        for (var j = 0; j < sources.length; j++)
        {
            var chemin = spawn.pos.findPathTo(sources[j].pos);
            for (var i = 0; i < chemin.length; i++)
            {
                spawn.room.createConstructionSite(chemin[i].x,chemin[i].y, STRUCTURE_ROAD);
            }
        }
    }
};

module.exports = utilRoads;