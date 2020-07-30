var uRoad = require('util.roads');

// Spawning creeps based on probability and spawning roads

const nameBefore = 'CN';

var initCons = {
    run: function (rooms) {
        for (let i in Game.spawns) {
            let spawnInfo = Game.spawns[i];
            uRoad.run(spawnInfo, rooms);
            if (typeof spawnInfo.memory['nextCreep'] == 'undefined') {
                spawnInfo.memory.nextCreep = Math.floor(Math.random() * 10000);
            }
            let sucSpa;
            let amount = spawnInfo.room.find(FIND_MY_CREEPS).length;

            if (amount >= 10 && spawnInfo.room.find(FIND_MY_CREEPS, {
                filter: function (creep) {
                    return creep.memory.role === 'carry';
                }
            }).length <= 1) {
                sucSpa = spawnInfo.spawnCreep([CARRY, CARRY, MOVE, MOVE],
                    nameBefore + spawnInfo.memory.nextCreep,
                    {memory: {'belongs': 0, 'role': 'carry'}});
            } else if (amount >= 15 && spawnInfo.room.find(FIND_MY_CREEPS,
                {
                filter: function (creep) {
                    return creep.memory.role === 'claim';
                }
            }).length === 0) {
                sucSpa = spawnInfo.spawnCreep([CLAIM, MOVE],
                    nameBefore + spawnInfo.memory.nextCreep,
                    {memory: {'belongs': 0, 'role': 'claim'}});
            } else if (amount === 0) {
                sucSpa = spawnInfo.spawnCreep([WORK, WORK, CARRY, MOVE],
                    nameBefore + spawnInfo.memory.nextCreep,
                    {memory: {'belongs': 0, 'role': 'harvest'}});
            } else if (amount % 6 === 0) {
                if (amount >= 15) {
                    let randCase = Math.floor(Math.random() * 100);
                    // 470 energy.
                    if (randCase < 50) {
                        sucSpa = spawnInfo.spawnCreep([TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK],
                            nameBefore + spawnInfo.memory.nextCreep,
                            {memory: {'belongs': 0, 'role': 'weapon'}});
                    } else {
                        sucSpa = spawnInfo.spawnCreep([TOUGH, TOUGH, MOVE, MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK],
                            nameBefore + spawnInfo.memory.nextCreep,
                            {memory: {'belongs': 0, 'role': 'weapon'}});
                    }
                } else {
                    sucSpa = spawnInfo.spawnCreep([TOUGH, MOVE, ATTACK, ATTACK],
                        nameBefore + spawnInfo.memory.nextCreep,
                        {memory: {'belongs': 0, 'role': 'weapon'}});
                }
            } else {
                if (amount <= 5) {
                    sucSpa = spawnInfo.spawnCreep([WORK, CARRY, MOVE],
                        nameBefore + spawnInfo.memory.nextCreep);
                } else if (amount <= 18) {
                    sucSpa = spawnInfo.spawnCreep([WORK, WORK, CARRY, MOVE],
                        nameBefore + spawnInfo.memory.nextCreep);
                } else {
                    sucSpa = spawnInfo.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                        nameBefore + spawnInfo.memory.nextCreep);
                }
            }
            if (sucSpa === OK || sucSpa === ERR_NAME_EXISTS) {
                delete spawnInfo.memory.nextCreep;
            }
        }
    }
};

module.exports = initCons;