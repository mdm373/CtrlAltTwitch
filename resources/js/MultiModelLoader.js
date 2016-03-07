CATW.MultiModelLoader = function(options){

    var loader = new THREE.OBJMTLLoader();
    var modelRoot = options.modelRoot;
    var modelNames = [];
    var onCompleteCallbacks = [];

    var loadedObjectMap;
    var totalLoaded = 0;

    this.addModel = function(modelName, loadCount){
        loadCount = loadCount || 1;
        for(var i = 0; i < loadCount; i++){
            modelNames.push(modelName);
        }
    };

    this.loadAllModels = function(){
        loadedObjectMap = {};
        for(var modelIndex = 0; modelIndex < modelNames.length; modelIndex++){
            var modelName = modelNames[modelIndex];
            var objLocation = modelRoot + modelName + ".obj";
            var mtlLocation = modelRoot + modelName + ".mtl";
            loader.load(objLocation, mtlLocation, this.getMultiLoaderCompleteCallBack(modelName, modelNames.length));
        }
    };

    this.addLoadCallback = function(onComplete){
        onCompleteCallbacks.push(onComplete);
    };

    this.getMultiLoaderCompleteCallBack = function(modelName, totalToLoad) {
        return function (object) {
            totalLoaded++;
            var list = loadedObjectMap[modelName];
            if(list == undefined){
                list = [];
                loadedObjectMap[modelName] = list;
            }
            list.push(object);
            if(totalLoaded >= totalToLoad){
                for (var callbackIndex = 0; callbackIndex < onCompleteCallbacks.length; callbackIndex++) {
                    onCompleteCallbacks[callbackIndex](loadedObjectMap);
                }
            }

        };
    };

};