CATW.MenuButtonControllerBehavior = function(options){
    var CONTROLS_OFFSET = new THREE.Vector3(0, 12, 320);
    var CONTROLS_SCALE = 15;

    var self = this;
    var modelLibrary = options.modelLibrary;
    var parent;
    var button;
    var menu = options.menu;
    var isAwake;

    this.awake = function(object3d){
        parent = object3d;
        var group = new THREE.Group();
        button = new CATW.ToggleButtonBehaviour({
            modelLibrary:modelLibrary,
            onAwake: self.onButtonAwake,
            onClick: self.onButtonClick,
            isDown: true,
            topImage: '../models/ButtonTopImageTextureMenu.png'
        });
        group.addBehavior(button);
        parent.add(group);
        group.position.copy(CONTROLS_OFFSET);
        group.scale.multiplyScalar(CONTROLS_SCALE);
        menu.setHideListener(self.onMenuHide);
        menu.setShowListener(self.onMenuShow);
    };

    this.onButtonAwake = function(){
        isAwake = true;
    };

    this.onMenuHide = function(){
        button.setDown(false);
    };

    this.onMenuShow = function(){
        button.setDown(true);
    };

    this.onButtonClick = function(){
        if(!button.isDown()){
            menu.show();
        }
    };

    this.isAwake = function(){
        return isAwake;
    }

};
