CATW.DriftBehaviour = function(options){

    var self = this;
    var object3D;

    var location = options.location || new THREE.Vector3();
    var distance = options.distance || 20;
    var speed = options.speed || .01;
    var arrivalDistance = options.arrivalDistance || 30;
    var responseFactor = options.reponseFactor || .001;
    var isEnabled =  options.isEnabled;
    var driftLocation;
    var oldDirection = new THREE.Vector3();
    var isAwake = false;

    this.awake = function(aObject3D){
        object3D = aObject3D;
        isAwake = true;
    };

    this.update = function(deltaTime){
        if(isEnabled && isAwake){
            driftLocation = driftLocation || object3D.position.clone();
            var direction = new THREE.Vector3().subVectors(driftLocation, object3D.position);
            if(direction.lengthSq() < arrivalDistance){
                driftLocation.set(Math.random() -.5, Math.random() -.5, Math.random() -.5);
                driftLocation.normalize();
                driftLocation.multiplyScalar(distance);
                driftLocation.add(location);
                direction.subVectors(driftLocation, object3D.position);
            }
            direction.normalize();
            oldDirection.lerp(direction, deltaTime * responseFactor);
            var offset = oldDirection.clone();
            oldDirection.normalize();
            offset.normalize().multiplyScalar(speed * deltaTime);
            object3D.position.add(offset);
        }
    };

    this.setDriftEnabled = function(aIsEnabled){
        isEnabled = aIsEnabled;
    }


};