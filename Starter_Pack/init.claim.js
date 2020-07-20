var target = 'W5S27';

var initClaim = {
    run: function (creep) {
        let thisRoom = creep.room;
        if (thisRoom.name !== target) {
            let exitDir = creep.room.findExitTo(target);
            let exit = creep.pos.findClosestByPath(exitDir);
            creep.moveTo(exit, {visualizePathStyle: {stroke: '#5b3475'}});
            return;
        }
        let controller = creep.room.find(FIND_HOSTILE_STRUCTURES, {
            filter: function (structure) {
                return structure.structureType === STRUCTURE_CONTROLLER;
            }
        });
        if (controller.length !== 0) {
            if (creep.attackController(controller[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller[0], {visualizePathStyle: {stroke: '#5b3475'}});
            }
        }
    }
};

module.exports = initClaim;