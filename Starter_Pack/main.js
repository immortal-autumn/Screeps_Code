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
var uCheckDef = require('util.checkDef');
var uManageCons = require('util.manageConSite');

var totalWar = '';
var myRoom = ['E13S49'];
const rooms = ['E13S49', 'E12S49', 'E13S48'];
const targets = ['E12S49', 'E12S48'];
var target;

module.exports.loop = function () {
    // Reduce CPU usage!
    let delayedRunning = function (ticks) {
        return Game.time % ticks === 0;
    };

    if (delayedRunning(10)) {
        cConstructor.run(rooms);
        uCheckDef.run();
        if (totalWar === '') {
            target = uCheckEnemy.run(targets);
        } else {
            target = totalWar;
        }
    }

    cInit.run(rooms);

    myRoom.forEach(room => {
        uTower.run(room);
        if (delayedRunning(5)) uManageCons.run(room);
    });

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
            case "weapon": {
                break;
            }
            default: {
                console.log("Undefined role for [" + creep.name + "]: " + creep.memory.role);
            }
        }
    }
};