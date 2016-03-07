CATW.VolumeRockerControllerBehaviour = function(options){

    const ROCKER_OFFSET = new THREE.Vector3(0, 20, -100);
    const ROCKER_SCALE = 10.0;
    const END = new THREE.Vector3(0, 1.62029, 9.77816);
    const START = new THREE.Vector3(0, 1.62029, -9.77816);

    var  self = this;
    var parent;

    var library = options.modelLibrary;
    var twitchPlayer = options.twitchPlayer;
    var sim = options.sim;

    this.awake = function(object3d){
        parent = object3d;
        var nob = library.getModel('VolumeRockerNob');
        var body = library.getModel('VolumeRockerBody');
        this.addScaledObject(body);
        body.add(nob);
        body.position.copy(ROCKER_OFFSET);


        var dragBehaviour = new CATW.VolumeRockerNobDragBehaviour(sim, START, END, this.onDragUpdate);
        twitchPlayer.setVolume(1);
        nob.addBehavior(dragBehaviour);
    };

    this.onDragUpdate = function(percentage){
        twitchPlayer.setVolume(1-percentage);
    };

    this.addScaledObject = function(object){
        parent.add(object);
        object.scale.multiplyScalar(ROCKER_SCALE);
    };

};
