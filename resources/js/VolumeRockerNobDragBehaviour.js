CATW.VolumeRockerNobDragBehaviour = function(sim, aStart, aEnd, aOnDragUpdate){

    var onDragUpdate = aOnDragUpdate;
    var start = aStart;
    var end = aEnd;
    var median;
    var halfLength;

    var direction;
    var object3D = null;
    var isClicked = false;
    var rayCaster;
    var offset;
    var intersected;

    this.awake = function(aObject3D){
        rayCaster = new THREE.Raycaster();
        object3D = aObject3D;
        object3D.addEventListener('cursordown', this.onClickDown);
        sim.scene.addEventListener('cursorup', this.onClickUp);
        sim.scene.addEventListener('cursormove', this.onMouseMove);
        direction = end.clone();
        direction.sub(start);
        median = end.clone();
        median.add(start);
        median.multiplyScalar(0.5);
        halfLength = direction.length() * 0.5;
        direction.normalize();
        object3D.position.copy(end);
    };

    this.onClickDown = function(){
        var intersects = rayCaster.intersectObject(object3D, true);
        if(intersects.length > 0){
            intersected = intersects[0].object;
            var intersectionPoint = intersects[0].point.clone();
            object3D.worldToLocal(intersectionPoint);
            offset = intersectionPoint;
            isClicked = true;
        }
    };

    this.onClickUp = function(){
        isClicked = false;
        offset = undefined;
    };

    this.onMouseMove = function(event){
        rayCaster.set(event.ray.origin, event.ray.direction);
        if(isClicked) {
            var intersects = rayCaster.intersectObject(object3D, true);
            var castPoint = undefined;
            for (var objIndex = 0; objIndex < intersects.length; objIndex++) {
                if (intersects[objIndex].object === intersected) {
                    sim.scene.updateMatrixWorld();
                    castPoint = intersects[objIndex].point.clone();
                    object3D.worldToLocal(castPoint);
                    castPoint.sub(offset);
                    var dot = direction.dot(castPoint);
                    var dirClone = direction.clone();
                    dirClone.multiplyScalar(dot);
                    object3D.position.add(dirClone);

                    var distance = object3D.position.clone();
                    distance.sub(median);
                    if(distance.length() > halfLength){
                        distance.normalize();
                        distance.multiplyScalar(halfLength);
                        distance.add(median);
                        object3D.position.copy(distance);
                    }
                    distance = object3D.position.clone();
                    distance.sub(end);
                    var percentage = distance.length() / (halfLength * 2);
                    onDragUpdate(percentage);
                    break;
                }
            }
            //isClicked = castPoint !== undefined;
        }
    };


};
