// Initialise the information of screeps, clearing non-existing memory, initialise room structure.
var clearCache = require('util.clearCache');
var defWall = require('util.wall');

var unchangedRole = ['attack', 'defend', 'claim', 'carry', 'weapon'];

var role = ['harvest', 'upgrade', 'build'];
var weapon = ['attack', 'defend'];

const structureTypes = [STRUCTURE_TOWER, STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_CONTAINER, STRUCTURE_STORAGE];

var initer = {
    run: function (rooms) {
        // Clear memory
        clearCache.run();
        // repair wall
        // defWall.run();
        // Initialise screeps' info
        let allCreeps = Game.creeps;
        for (let i in allCreeps) {
            let creep = allCreeps[i];
            if (typeof creep.memory['belongs'] == 'undefined') {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structureTypes.includes(structure.structureType)) &&
                            structure.energy < structure.energyCapacity;
                    }
                });
                creep.memory.belongs = Math.floor(Math.random() * 100) % targets.length;
            }

            // Change the role when no enough screeps exists!
            if (creep.room.find(FIND_MY_CREEPS).length <= 4) {
                if (!unchangedRole.includes(creep.memory.role)) {
                    creep.memory.role = role[0];
                }
            }

            if (creep.memory.role === 'weapon') {
                console.log('Weapon ' + creep.name + 'is registered!');
                creep.memory.role = weapon[Math.floor(Math.random() * 100) % weapon.length];
            }

            if (typeof creep.memory['role'] == 'undefined') {
                creep.memory.role = role[Math.floor(Math.random() * 100) % role.length];
            }

            if (typeof creep.memory['origin'] == 'undefined') {
                creep.memory.origin = creep.room.name;
            }

            if (typeof creep.memory['room'] == 'undefined') {
                let digger = creep.room.find(FIND_MY_CREEPS, {
                    filter: (creep) => {
                        return role.includes(creep.memory['role']);
                    }
                });
                if (digger.length <= 10) {
                    creep.memory.room = creep.room.name;
                } else {
                    creep.memory.room = rooms[Math.floor(Math.random() * 100) % rooms.length]
                }
            }

            if (typeof creep.memory['resource'] == 'undefined') {
                let energies = Game.rooms[creep.memory.room];
                if (energies) {
                    let energyLength = energies.find(FIND_SOURCES_ACTIVE).length;
                    creep.memory.resource = Math.floor(Math.random() * 100) % energyLength;
                }
            }

            if (typeof creep.memory['stat'] == 'undefined') {
                creep.memory.stat = 0;
            }

        }
    }
};

module.exports = initer;