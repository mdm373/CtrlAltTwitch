CATW.TwitchFeaturedSelectionMenuItemBehaviour = function(options){

    var self = this;

    var featured = options.featured;
    var sim = options.sim;
    var fontLibrary = options.fontLibrary;
    var menuIndex = options.menuIndex;
    var menuIndexOffset = options.menuIndexOffset;
    var menuPosition = options.menuPosition;
    var transitionDuration = options.transitionDuration;
    var hideOffset = options.hideOffset;
    var onAwake = options.onAwake;
    var onSelectionItemClicked = options.onItemClicked;
    var parent;
    var transitionBehaviour;
    var selectionBehaviour;

    this.awake = function(object3D){
        parent = object3D;
        selectionBehaviour = new CATW.TwitchFeaturedSelectionBehaviour({
            featured:featured,
            sim: sim,
            fontLibrary: fontLibrary,
            onClicked: self.onSelectionItemClicked,
            onAwake: self.onMenuItemAwake
        });
        var hidePosition = hideOffset.clone();
        hidePosition.add(menuPosition);
        var showPosition = new THREE.Vector3();
        showPosition.copy(menuIndexOffset);
        showPosition.multiplyScalar(menuIndex);
        showPosition.add(menuPosition);
        var destinations = [];
        destinations[CATW.MenuStates.TRANSITION_IN] = showPosition;
        destinations[CATW.MenuStates.TRANSITION_OUT] = hidePosition;
        transitionBehaviour = new CATW.PositionTransitionBehavior({
            destinations:destinations,
            onAwake:self.onMenuItemAwake,
            duration:transitionDuration
        });
        parent.addBehavior(transitionBehaviour);
        parent.addBehavior(selectionBehaviour);
        parent.position.copy(hidePosition);
    };

    this.onMenuItemAwake = function(){
        onAwake();
    };

    this.onSelectionItemClicked = function(){
        onSelectionItemClicked(self);
    };

    this.hasArrived = function(){
        return transitionBehaviour.hasArrived();
    };

    this.transitionTo = function(destinationIndex){
      transitionBehaviour.transitionTo(destinationIndex);
    };

    this.setIntractable = function(isIntractable){
        selectionBehaviour.setIntractable(isIntractable);
    }

    this.getFeatured = function(){
        return selectionBehaviour.getFeatured();
    };

    this.isAwake = function(){
        return selectionBehaviour.isAwake() && transitionBehaviour.isAwake();
    }
};