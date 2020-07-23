var initClaim = {
    run: function (creep, target) {
        let thisRoom = creep.room;
        if (thisRoom.name !== target) {
            let exitDir = creep.room.findExitTo(target);
            let exit = creep.pos.findClosestByPath(exitDir);
            creep.moveTo(exit, {visualizePathStyle: {stroke: '#5b3475'}});
            return;
        }
        let controller = creep.room.controller;
        if (controller && !controller.my) {
            if (creep.attackController(controller[0]) === ERR_NOT_IN_RANGE || creep.claimController(controller[0]) === ERR_NOT_IN_RANGE
                || creep.reserveController(controller[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller[0], {visualizePathStyle: {stroke: '#5b3475'}});
            }
        }
    }
};

module.exports = initClaim;