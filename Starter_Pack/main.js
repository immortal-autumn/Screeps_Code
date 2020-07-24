var alert = false;

var cInit = require('init');

var cHarvester = require('init.harv');
var cConstructor = require('init.cons');
var cUpgrader = require('init.upgr');
var cBuild = require('init.build');
var cDef = require('init.def');
var cAtt = require('init.attack');
var cClaim = require('init.claim');
var cCarry = require('init.carry');

var uRoad = require('util.roads');
var uTower = require('util.tower');
var uDeath = require('util.checkDeath');
var uCheckEnemy = require('util.checkEnemy');

var tReset = require('tmp.resetDef');

var myRoom = ['W16S49'];
const rooms = ['W16S49', 'W15S49'];
const targets = ['W15S49', 'W16S49'];

module.exports.loop = function () {
    cInit.run(rooms);
    cConstructor.run(rooms);

    myRoom.forEach(room => {
        uTower.run(room);
        tReset.run(room, alert);
    });

    let target = uCheckEnemy.run(targets);

    for (let i in Game.creeps) {
        let creep = Game.creeps[i];
        // uDeath.run(creep);
        switch (creep.memory.role) {
            case "harvest": {
                cHarvester.run(creep);
                break;
            }
            case "build" : {
                cBuild.run(creep);
                break;
            }
            case "upgrade": {
                cUpgrader.run(creep);
                break;
            }
            case "defend": {
                cDef.run(creep, target);
                break;
            }
            case "attack": {
                cAtt.run(creep, target);
                break;
            }
            case "claim": {
                cClaim.run(creep, rooms[1]);
                break;
            }
            case "carry": {
                cCarry.run(creep);
                break;
            }
            default: {
                console.log("Undefined role for [" + creep.name + "]: " + creep.memory.role);
            }
        }
    }
};