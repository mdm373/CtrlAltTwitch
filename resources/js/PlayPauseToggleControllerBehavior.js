CATW.PlayPauseToggleControllerBehavior = function(options){

    const PLAY_TYPES = { PLAY:1, PAUSE:2, NONE:3};
    const OFFSET = 2.7;
    const CONTROLS_OFFSET = new THREE.Vector3(0, 12, 150);
    const CONTROLS_SCALE = 15;
    var self = this;
    var parent;
    var modelLibrary = options.modelLibrary;
    var twitchPlayer = options.twitchPlayer;

    var playButton;
    var pauseButton;
    var isAwake = false;
    var playType = PLAY_TYPES.NONE;

    this.awake = function(object3d){
        parent = object3d;
        var group = new THREE.Group();
        playButton = self.addButton(new THREE.Vector3(0, 0, -OFFSET), group, self.onPlayClick, false, "../models/ButtonTopImageTexturePlay.png");
        pauseButton = self.addButton(new THREE.Vector3(0, 0, OFFSET), group, self.onPauseClick, false, "../models/ButtonTopImageTexturePause.png");
        parent.add(group);
        group.position.copy(CONTROLS_OFFSET);
        group.scale.multiplyScalar(CONTROLS_SCALE);
        twitchPlayer.setChannelChangeListener(self.onChannelChange);
        twitchPlayer.setPlayListener(self.onPlay);
        twitchPlayer.setPauseListener(self.onPause);
    };

    this.onChannelChange = function(){
        playType = PLAY_TYPES.PLAY;
        self.updateButtonState();
    };

    this.onPause = function(){
        playType = PLAY_TYPES.PAUSE;
        self.updateButtonState();
    };

    this.onPlay = function(){
        playType = PLAY_TYPES.PLAY;
        self.updateButtonState();
    };

    this.updateButtonState = function(){
        if(isAwake){
            playButton.setDown(playType === PLAY_TYPES.PLAY);
            pauseButton.setDown(playType === PLAY_TYPES.PAUSE);
        }
    };


    this.addButton = function(offset, parent, onClick, isDown, topImage){
        var group = new THREE.Group();
        var buttonBehaviour = new CATW.ToggleButtonBehaviour({
            modelLibrary:modelLibrary,
            onAwake: self.onButtonAwake,
            onClick: onClick,
            isDown: isDown,
            topImage: topImage
        });
        group.addBehavior(buttonBehaviour);
        parent.add(group);
        group.position.copy(offset);
        return buttonBehaviour;
    };

    this.onPlayClick = function(){
        if(isAwake && playType === PLAY_TYPES.PAUSE){
            twitchPlayer.play();
        }
    };

    this.onPauseClick = function(){
        if(isAwake && playType === PLAY_TYPES.PLAY){
            twitchPlayer.pause();
        }
    };

    this.onButtonAwake = function(){
        if(playButton.isAwake() && pauseButton.isAwake()){
            isAwake = true;
        }
    }



};
