var utilManageConSite = {
    run: function (room) {
        let roomInfo = Game.rooms[room];
        if (roomInfo) {
            let sites = roomInfo.find(FIND_MY_CONSTRUCTION_SITES, {
                filter: (site) => {
                    return site.structureType !== STRUCTURE_ROAD;
                }
            });
            if (sites.length !== 0) {
                roomInfo.find(FIND_MY_CONSTRUCTION_SITES, {
                    filter: (site) => {
                        return site.structureType === STRUCTURE_ROAD && site.progress === 0;
                    }
                }).forEach(site => site.remove());
            }
        }
    }
};

module.exports = utilManageConSite;