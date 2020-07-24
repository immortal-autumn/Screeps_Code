const structureTypes = [STRUCTURE_TOWER, STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_INVADER_CORE];

var initAttack = {
    run: function (creep, target) {
        let currentRoom = creep.room;
        if (currentRoom.name !== target) {
            let exitDir = creep.room.findExitTo(target);
            let exit = creep.pos.findClosestByPath(exitDir);
            creep.moveTo(exit, {visualizePathStyle: {stroke: '#FF0000'}});
            return;
        }
        let enemy = currentRoom.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (enemy.length !== 0) {
            if (creep.attack(enemy[0]) === ERR_NOT_IN_RANGE || creep.rangedAttack(enemy[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(enemy[0], {visualizePathStyle: {stroke: '#FF0000'}});
            }
        } else {
            enemy = currentRoom.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => {
                    return structureTypes.includes(structure.structureType)
                }
            });
            if (enemy.length !== 0) {
                if (creep.attack(enemy[0]) === ERR_NOT_IN_RANGE || creep.rangedAttack(enemy[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemy[0], {visualizePathStyle: {stroke: '#FF2D00'}});
                }
            } else {
                creep.moveTo(25, 25);
            }
        }

    }
};

module.exports = initAttack;