CATW.TwitchTvControllerBehaviour = function(options){

    const CUBE_SCALE = 150;

    var library = options.modelLibrary;
    var sim = options.sim;

    this.awake = function(){
        var object = library.getModel("demo");
        object.scale.multiplyScalar(CUBE_SCALE);
        sim.scene.add( object );
    };
};