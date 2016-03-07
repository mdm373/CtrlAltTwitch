CATW.PositionTransitionBehavior = function(options){

    var self = this;
    var onAwakeCallback = options.onAwake;
    var destinations = options.destinations;
    var duration = options.duration;
    var isAwake;
    var parent;
    var hasArrived = true;
    var currentDestinationId;
    var priorDestination;
    var elapsedTime;

    this.awake = function(object3D){
        parent = object3D;
        isAwake = true;
        onAwakeCallback(self);
    };

    this.update = function(deltaTime){
        if(!hasArrived){
            elapsedTime += deltaTime;
            var toPosition = destinations[currentDestinationId];
            var alpha = elapsedTime / duration;
            parent.position.lerpVectors(priorDestination, toPosition, alpha);
            hasArrived = alpha >=1;
        } else {
            if(toPosition){
                parent.position.copy(toPosition);
            }
        }

    };

    this.transitionTo = function(destinationId){
        currentDestinationId = destinationId;
        priorDestination = parent.position.clone();
        elapsedTime = 0;
        hasArrived = false;
    };

    this.getParent = function(){
        return parent;
    };

    this.hasArrived = function(){
        return hasArrived;
    };

    this.isAwake = function(){
      return isAwake;
    };
};