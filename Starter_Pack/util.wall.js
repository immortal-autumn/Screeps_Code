var findPos = [FIND_EXIT_RIGHT, FIND_EXIT_LEFT, FIND_EXIT_TOP, FIND_EXIT_BOTTOM];

var utilWall = {
    run: function (creep) {
        for (let s in Game.spawns) {
            let cRoom = Game.spawns[s].room;
            for (let i = 0; i < 4; i++) {
                let site = cRoom.find(findPos[i]);
                for (let n in site) {
                    let nPos = cRoom.getPositionAt(site[n].positionX + 1, site[n].positionY + 1);
                    console.log(nPos);
                }
            }
        }
    }
};

module.exports = utilWall;