var uRoad = require('util.roads');

// Spawning creeps based on probability and spawning roads

const nameBefore = 'CN';

var initCons = {
    run: function (rooms) {
        for (let i in Game.spawns) {
            let spawnInfo = Game.spawns[i];
            uRoad.run(spawnInfo, rooms);
            let nextCreep = Math.floor(Math.random() * 10000);
            let randCase = Math.floor(Math.random() * 100);
            let sucSpa;
            let amount = spawnInfo.room.find(FIND_MY_CREEPS).length;
            if (amount >= 10 && spawnInfo.room.find(FIND_MY_CREEPS, {
                filter: function (creep) {
                    return creep.memory.role === 'carry';
                }
            }).length === 0) {
                sucSpa = spawnInfo.spawnCreep([CARRY, CARRY, MOVE, MOVE], nameBefore + nextCreep,
                    {memory: {'belongs': 0, 'role': 'carry'}});
                return;
            }
            if (amount >= 13 && spawnInfo.room.find(FIND_MY_CREEPS, {
                filter: function (creep) {
                    return creep.memory.role === 'claim';
                }
            }).length === 0) {
                sucSpa = spawnInfo.spawnCreep([CLAIM, MOVE], nameBefore + nextCreep,
                    {memory: {'belongs': 0, 'role': 'claim'}});
                return;
            }
            if (amount === 0) {
                sucSpa = spawnInfo.spawnCreep([WORK, WORK, CARRY, MOVE], nameBefore + nextCreep,
                    {memory: {'belongs': 0, 'role': 'harvest'}});
            } else if (amount >= 8 && randCase % 2 === 0) {
                // 470 energy.
                if (randCase < 50) {
                    sucSpa = spawnInfo.spawnCreep([ATTACK, ATTACK, ATTACK, MOVE, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE], nameBefore + nextCreep,
                        {memory: {'belongs': 0, 'role': 'weapon'}});
                } else {
                    sucSpa = spawnInfo.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, MOVE, MOVE, MOVE], nameBefore + nextCreep,
                        {memory: {'belongs': 0, 'role': 'weapon'}});
                }
            } else {
                if (amount <= 10) {
                    sucSpa = spawnInfo.spawnCreep([WORK, CARRY, MOVE], nameBefore + nextCreep);
                } else if (amount <= 20) {
                    sucSpa = spawnInfo.spawnCreep([WORK, WORK, CARRY, MOVE], nameBefore + nextCreep);
                } else {
                    sucSpa = spawnInfo.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE], nameBefore + nextCreep);
                }
            }
        }
    }
};

module.exports = initCons;