var initClaim = {
    run: function (creep, target) {
        let thisRoom = creep.room;
        if (thisRoom.name !== target) {
            creep.moveTo(new RoomPosition(25, 25, target), {visualizePathStyle: {stroke: '#5b3475'}});
            return;
        }
        let controller = creep.room.controller;
        if (controller && !controller.my) {
            if (creep.attack(controller) === ERR_NOT_IN_RANGE
                || creep.attackController(controller) === ERR_NOT_IN_RANGE
                || creep.claimController(controller) === ERR_NOT_IN_RANGE
                || creep.reserveController(controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, {visualizePathStyle: {stroke: '#5b3475'}});
            }
        }
    }
};

module.exports = initClaim;