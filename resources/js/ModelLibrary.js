CATW.ModelLibrary = function(options){

    var self = this;
    var objectMap = {};
    var loader = new CATW.MultiModelLoader(options);
    var isLoaded = false;

    this.init = function(){
        loader.addModel('VolumeRockerNob');
        loader.addModel('VolumeRockerBody');
        loader.addModel('demo');
        loader.addModel('ButtonTop', 3);
        loader.addModel('ButtonBase', 3);
        loader.addModel('ControlBox');
    };

    this.load = function(onLoadCallback){
        if(!isLoaded){
            loader.addLoadCallback( function(aObjectMap) {
                isLoaded = true;
                objectMap = aObjectMap;
                onLoadCallback(aObjectMap);
            });
            loader.loadAllModels();
        }
    };

    this.getModel = function(modelName){
        var instanceList = objectMap[modelName];
        var model = undefined;
        if(instanceList != undefined){
            if(instanceList.length > 0){
                model = instanceList.pop();
            }
        }
        return model;
    };


    self.init();
};
