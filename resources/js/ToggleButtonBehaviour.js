CATW.ToggleButtonBehaviour = function(options){
    const TOGGLE_TYPES = { UP:1, DOWN:2};

    const TOP_SCALE = new THREE.Vector3(0.705,0.55,0.761);
    const PRESS_DURATION = 200;
    const DESTINATIONS = [];
    DESTINATIONS[TOGGLE_TYPES.UP] = new THREE.Vector3(0,-0.02072, 0);
    DESTINATIONS[TOGGLE_TYPES.DOWN] = new THREE.Vector3(0, -1.07098, 0);

    var self = this;
    var parent;
    var modelLibrary = options.modelLibrary;
    var currentState = options.isDown ? TOGGLE_TYPES.DOWN : TOGGLE_TYPES.UP;
    var onClick = options.onClick;
    var onAwake = options.onAwake;
    var topImage = options.topImage;
    var transitionBehaviour;
    var isAwake = false;

    this.awake = function(object3d){
        parent = object3d;
        var top = modelLibrary.getModel("ButtonTop");
        top.position.copy(DESTINATIONS[currentState]);
        top.scale.copy(TOP_SCALE);
        parent.add(top);

        if(topImage){
            var loader = new THREE.TextureLoader();
            loader.load(topImage, function(texture) {
                var topMesh = top.children[0].children[1];
                topMesh.material = new THREE.MeshPhongMaterial({map:texture});
            });
        }

        var base = modelLibrary.getModel("ButtonBase");
        base.position.set(0,0,0);
        parent.add(base);
        transitionBehaviour = new CATW.PositionTransitionBehavior({
            onAwake: self.onTransitionAwake,
            destinations: DESTINATIONS,
            duration: PRESS_DURATION
        });
        top.addBehavior(transitionBehaviour);
        parent.addEventListener('cursordown', self.onClickDown);
    };

    this.onTransitionAwake = function(){
        isAwake = true;
        if(onAwake){
            onAwake();
        }
    };

    this.isAwake = function(){
        return isAwake;
    };

    this.onClickDown = function(){
        if(isAwake){
            if(onClick){
                onClick(this);
            }
        }
    };

    this.toggle = function(){
        if(isAwake){
            var to = currentState === TOGGLE_TYPES.UP ? TOGGLE_TYPES.DOWN : TOGGLE_TYPES.UP;
            currentState = to;
            transitionBehaviour.transitionTo(to);
        }
    };

    this.setDown = function(isDown){
        if(isAwake){
            var requestedState = isDown ? TOGGLE_TYPES.DOWN : TOGGLE_TYPES.UP;
            if(currentState != requestedState){
                self.toggle();
            }
        }
    }

    this.isDown = function(){
        return currentState === TOGGLE_TYPES.DOWN;
    };
};