CATW.TwitchPlayerControlsUIBehaviour = function(options){
    const CONTROL_BOX_SCALE = 40;
    const CONTROL_BOX_OFFSET = new THREE.Vector3(0,-12,0);
    const CONTROLS_ROTATION = new THREE.Vector3(0, 90, 0);
    const CONTROLS_OFFSET = new THREE.Vector3(0, -500, 150);
    //const CONTROLS_OFFSET = new THREE.Vector3(0, 0, 0);
    const CONTROLS_SCALE = .8;

    var self = this;
    var sim = options.sim;
    var twitchPlayer = options.twitchPlayer;
    var modelLibrary = options.modelLibrary;
    var menu = options.menu;


    this.awake = function(){
        var group = new THREE.Group();
        var controlBox = modelLibrary.getModel('ControlBox');
        group.addBehavior(new CATW.PlayPauseToggleControllerBehavior({sim:sim, modelLibrary: modelLibrary, twitchPlayer: twitchPlayer}));
        group.addBehavior(new CATW.VolumeRockerControllerBehaviour({sim:sim, modelLibrary:modelLibrary, twitchPlayer:twitchPlayer}));
        group.addBehavior(new CATW.MenuButtonControllerBehavior({modelLibrary:modelLibrary, menu:menu}));
        group.add(controlBox);
        controlBox.position.copy(CONTROL_BOX_OFFSET);
        controlBox.scale.multiplyScalar(CONTROL_BOX_SCALE);
        group.position.copy(CONTROLS_OFFSET);
        group.scale.multiplyScalar(CONTROLS_SCALE);
        CATW.ThreeUtil.setRadVector(group.rotation, CONTROLS_ROTATION);
        sim.scene.add(group);
    };
};
