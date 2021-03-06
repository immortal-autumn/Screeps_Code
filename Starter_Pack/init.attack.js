const structureTypes = [STRUCTURE_TOWER, STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_CONTAINER, STRUCTURE_STORAGE, STRUCTURE_INVADER_CORE];

var initAttack = {
    run: function (creep, target) {
        let currentRoom = creep.room;
        if (target === '') {
            target = creep.memory.room;
        }
        if (currentRoom.name !== target) {
            let exitDir = creep.room.findExitTo(target);
            let exit = creep.pos.findClosestByPath(exitDir);
            creep.moveTo(exit, {visualizePathStyle: {stroke: '#FF0000'}});
            return;
        }
        let enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (enemy) {
            if (creep.attack(enemy) === ERR_NOT_IN_RANGE || creep.rangedAttack(enemy) === ERR_NOT_IN_RANGE) {
                creep.moveTo(enemy, {visualizePathStyle: {stroke: '#FF0000'}});
            }
        } else {
            enemy = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                filter: (structure) => {
                    return structureTypes.includes(structure.structureType);
                }
            });
            if (enemy) {
                if (creep.attack(enemy) === ERR_NOT_IN_RANGE || creep.rangedAttack(enemy) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemy, {visualizePathStyle: {stroke: '#FF2D00'}});
                }
            } else {
                creep.moveTo(25,25);
            }
        }

    }
};

module.exports = initAttack;