CATW.TwitchApi = function(){

    const API_ROOT = "https://api.twitch.tv/kraken";

    var streams = new CATW.TwitchApiStreams({root:API_ROOT});

    this.getStreams = function(){
        return streams;
    };

};

CATW.TwitchApiStreams = function(options){
    var root = options.root;

    this.getFeatured = function(callback){
        $.ajax({
            url: root + '/streams/featured',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if(callback){
                    callback(data);
                }
            }
        });
    };

};