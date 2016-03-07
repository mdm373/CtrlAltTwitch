CATW.TwitchFeaturedSelectionBehaviour = function(options){

    const SPIN_FACTOR = .001;
    const LABEL_FONT_SCALE = .33;
    const LABEL_FONT_OFFSET = new THREE.Vector3(120, -20,-20);
    const LABEL_BACKING_SCALE = 50;
    const LABEL_BACKING_OFFSET = new THREE.Vector3(375,0,-21);

    var self = this;
    var sim = options.sim;
    var featured = options.featured;
    var onClickedCallback = options.onClicked;
    var onAwakeCallback = options.onAwake
    var fontLibrary = options.fontLibrary;
    var cube;
    var group;
    var groupDrift;
    var isHovering = false;
    var rayCaster = new THREE.Raycaster();
    var parent;
    var isIntractable;
    var isAwake;

    this.awake = function(aParent){
        parent = aParent;
        isAwake = true;
        sim.scene.addEventListener('cursormove', self.onMouseMove);
        parent.addEventListener('cursordown', self.onClickDown);
        self.populateGroup();
        self.populateCube(featured);
        self.populateLabel(featured);
        onAwakeCallback(self, parent);
    };


    this.update = function(deltaTime){
        if (isHovering) {
            self.rotateCube(deltaTime);
        }
        groupDrift.setDriftEnabled(!isHovering && isIntractable);
    };

    this.rotateCube = function(deltaTime){
        cube.rotation.set(cube.rotation.x, cube.rotation.y + deltaTime * SPIN_FACTOR, cube.rotation.z);
    };

    this.onClickDown = function(){
        if(onClickedCallback && isIntractable){
            onClickedCallback(self);
        }

    };

    this.getFeatured = function(){
        return featured;
    };

    this.onMouseMove = function(event){
        if(isIntractable){
            rayCaster.set(event.ray.origin, event.ray.direction);
            var intersects = rayCaster.intersectObject(group, true);
            isHovering = intersects.length > 0;
        }
    };

    this.populateLabel = function(featured){
        var title = featured.title;
        if(title.length > 30){
            title = title.substr(0, 30) + '...';
        }
        var geometry = new THREE.TextGeometry(title, {
            font: fontLibrary.getFont("OxygenRegular"),
            height:1
        });
        var material = new THREE.MeshBasicMaterial( { color: 'white'} );
        var label = new THREE.Mesh(geometry, material);
        label.scale.multiplyScalar(LABEL_FONT_SCALE);
        group.add(label);
        label.position.copy(LABEL_FONT_OFFSET);

        var backingGeometry = new THREE.PlaneGeometry(17, 2);
        var backingMaterial =  new THREE.MeshBasicMaterial({ color: 'rgb(112, 85, 164)'});


        var backing = new THREE.Mesh(backingGeometry, backingMaterial);
        backing.scale.multiplyScalar(LABEL_BACKING_SCALE);
        group.add(backing);
        backing.position.copy(LABEL_BACKING_OFFSET);
    };

    this.populateCube = function(featured){
        /** @namespace featured.stream.channel.logo */
        var image = featured.stream.channel.logo;
        var materialCreator = new THREE.MTLLoader.MaterialCreator();
        materialCreator.crossOrigin = '*';
        image = image.replace('https\:\/\/', '');
        var url = CATW.TwitchConfig.corsproxy + image;
        var texture = materialCreator.loadTexture(url);
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({color:'#ffffff', map: texture});
        cube = new THREE.Mesh(geometry, material);
        cube.scale.multiplyScalar(150);
        CATW.ThreeUtil.setRad(cube.rotation, 45, 45 , 0);
        group.add(cube);
        cube.position.set(0, 0, 0);
    };

    this.populateGroup = function(){
        group = new THREE.Group();
        groupDrift = new CATW.DriftBehaviour({
            location:new THREE.Vector3(0, 0 ,0),
            isEnabled:false
        });
        group.addBehavior(groupDrift);
        parent.add(group);
        group.position.set(0,0,0);
    };

    this.setIntractable = function(aIsIntractable){
        isIntractable = aIsIntractable;
        if(!isIntractable){
            isHovering = false;
            groupDrift.setDriftEnabled(false);
        }
    };

    this.isAwake = function(){
        return isAwake;
    }

};