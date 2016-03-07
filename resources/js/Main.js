CATW.TwitchConfig = {
    modelLocation:"../models/",
    fontLocation:"../fonts/",
    corsproxy:"http://localhost:43111/"
};

CATW.Main = function(){
    var modelLibrary = new CATW.ModelLibrary({modelRoot:CATW.TwitchConfig.modelLocation});
    var fontLibrary = new CATW.FontLibrary({fontRoot:CATW.TwitchConfig.fontLocation});

    var sim = altspace.utilities.Simulation();
    var twitchApi = new CATW.TwitchApi();
    var twitchPlayer = new CATW.TwitchPlayer({twitchApi:twitchApi, sim:sim});

    var behaviors = [];
    var menu = new CATW.TwitchFeaturedSelectionMenuBehaviour({sim:sim, modelLibrary:modelLibrary, twitchPlayer:twitchPlayer, twitchApi:twitchApi, fontLibrary:fontLibrary});
    behaviors.push(new CATW.TwitchTvControllerBehaviour({sim:sim, modelLibrary:modelLibrary, twitchPlayer:twitchPlayer}));
    behaviors.push(new CATW.TwitchPlayerControlsUIBehaviour({sim:sim, modelLibrary:modelLibrary, twitchPlayer:twitchPlayer, menu:menu}));
    behaviors.push(menu);

    var sceneManagerBehaviour = new CATW.SceneManagerBehavior({sim:sim, modelLibrary:modelLibrary, behaviours:behaviors, fontLibrary:fontLibrary});

    var scene = sim.scene;
    scene.addBehavior(sceneManagerBehaviour);
};


CATW.DebugModel = function(){
    var modelLibrary = new CATW.ModelLibrary({modelRoot:"../models/"});
    modelLibrary.load(function(){
        var controlBox = modelLibrary.getModel('ControlBox');
        controlBox.position.set(0, 0, 0);
        controlBox.scale.multiplyScalar(40);
        altspace.utilities.Simulation().scene.add(controlBox);
    })
};

(function() {
    //CATW.DebugModel();
    CATW.Main();

})();


