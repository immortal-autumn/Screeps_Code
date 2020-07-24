// Defender's Action

var initDef = {
    run: function (creep) {
        let currentRoom = creep.room;
        var enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (enemy.length !== 0) {
            if (enemy.length >= 3) {
                currentRoom.controller.activateSafeMode();
            }
            if (creep.attack(enemy) === ERR_NOT_IN_RANGE || creep.rangedAttack(enemy) === ERR_NOT_IN_RANGE) {
                creep.moveTo(enemy, {visualizePathStyle: {stroke: '#00FF35'}});
            }
        } else {
            creep.moveTo(Game.flags['A1'].pos, {visualizePathStyle: {stroke: '#00FF35'}});
        }
    }
};

module.exports = initDef;