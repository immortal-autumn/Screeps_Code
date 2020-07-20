var utilCheckDeath = {
    run: function (creep) {
        if (creep.ticksToLive <= 2) {
            Game.notify(creep.name + ' has automatically dropped its recourse.');
            creep.drop(RESOURCE_ENERGY);
        }
    }
};

module.exports = utilCheckDeath;