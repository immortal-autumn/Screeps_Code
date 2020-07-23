var uRoad = require('util.roads');

// Spawning creeps based on probability and spawning roads

const nameBefore = 'CN';
var nextCreep = 0;

var initCons = {
    run: function (rooms) {
        for (let i in Game.spawns) {
            let spawnInfo = Game.spawns[i];
            uRoad.run(spawnInfo, rooms);

            let randCase = Math.floor(Math.random() * 10);
            let sucSpa;
            let amount = spawnInfo.room.find(FIND_MY_CREEPS).length;
            if (amount >= 10 && spawnInfo.room.find(FIND_MY_CREEPS, {
                filter: function (creep) {
                    return creep.memory.role === 'carry';
                }
            }).length === 0) {
                sucSpa = spawnInfo.spawnCreep([CARRY, CARRY, MOVE, MOVE], nameBefore + nextCreep,
                    {memory: {'belongs': 0, 'role': 'carry'}});
                if (sucSpa === 0) {
                    nextCreep++;
                } else if (sucSpa === -3) {
                    nextCreep++;
                }
                return;
            }
            if (amount >= 15 && spawnInfo.room.find(FIND_MY_CREEPS, {
                filter: function (creep) {
                    return creep.memory.role === 'claim';
                }
            }).length === 0) {
                sucSpa = spawnInfo.spawnCreep([CLAIM, MOVE], nameBefore + nextCreep,
                    {memory: {'belongs': 0, 'role': 'claim'}});
                if (sucSpa === 0) {
                    nextCreep++;
                } else if (sucSpa === -3) {
                    nextCreep++;
                }
                return;
            }
            if (amount === 0) {
                sucSpa = spawnInfo.spawnCreep([WORK, WORK, CARRY, MOVE], nameBefore + nextCreep,
                    {memory: {'belongs': 0, 'role': 'harvest'}});
            } else if (amount > 10 && amount % 2 === 0) {
                // 470 energy.
                if (randCase < 0.5) {
                    sucSpa = spawnInfo.spawnCreep([ATTACK, ATTACK, ATTACK, MOVE, TOUGH, TOUGH, TOUGH, MOVE, MOVE, MOVE], nameBefore + nextCreep,
                        {memory: {'belongs': 0, 'role': 'weapon'}});
                } else {
                    sucSpa = spawnInfo.spawnCreep([RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, MOVE, MOVE, MOVE], nameBefore + nextCreep,
                        {memory: {'belongs': 0, 'role': 'weapon'}});
                }
            } else {
                if (amount <= 10 && randCase <= 0.01) {
                    sucSpa = spawnInfo.spawnCreep([WORK, CARRY, MOVE], nameBefore + nextCreep);
                } else if (amount <= 20 && randCase > 0.01 && randCase < 0.2) {
                    sucSpa = spawnInfo.spawnCreep([WORK, WORK, CARRY, MOVE], nameBefore + nextCreep);
                } else {
                    sucSpa = spawnInfo.spawnCreep([WORK, WORK, WORK, CARRY, MOVE, MOVE], nameBefore + nextCreep);
                }
            }
            if (sucSpa === 0) {
                nextCreep++;
            } else if (sucSpa === -3) {
                nextCreep++;
            }
        }
    }
};

module.exports = initCons;