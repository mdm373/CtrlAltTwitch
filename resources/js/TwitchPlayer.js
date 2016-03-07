CATW.TwitchPlayer = function(options){

    var self = this;
    var player;
    var playListener;
    var pauseListener;
    var channelChangeListener;

    this.init = function(){
        var options = {width: 535,  height: 300, channel: "altspacevr"};
        player = new Twitch.Player("twitchscreen", options);
        player.addEventListener('play', self.onPlay);
        player.addEventListener('pause', self.onPause);

    };

    this.setVolume = function(ratio){
        player.setVolume(ratio);
    };

    this.setChannelByName = function(channelName){
        player.setChannel(channelName);
        if(channelChangeListener){
            channelChangeListener();
        }
    };

    this.play = function(){
        player.play();
    };

    this.pause = function(){
        player.pause();
    };

    this.setPauseListener = function(listener){
        pauseListener = listener;
    };

    this.setPlayListener = function(listener){
        playListener = listener;
    };

    this.setChannelChangeListener = function(listener){
        channelChangeListener = listener;
    }

    this.onPause = function(){
        if(pauseListener){
            pauseListener();
        }
    };

    this.onPlay = function(){
        if(playListener) {
            playListener();
        }
    };


    this.init();
};
