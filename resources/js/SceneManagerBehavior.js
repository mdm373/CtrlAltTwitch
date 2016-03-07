CATW.SceneManagerBehavior = function(options){

    var self = this;
    var modelLibrary = options.modelLibrary;
    var fontLibrary = options.fontLibrary;
    var sceneBehaviours = options.behaviours;
    var isModelLoaded = false;
    var isFontLoaded = false;

    this.awake = function(){
        modelLibrary.load(self.onModelsLoaded);
        fontLibrary.load(self.onFontsLoaded);
    };

    this.onFontsLoaded = function(){
        isFontLoaded = true;
        self.handleLoadCalledBack();
    };

    this.onModelsLoaded = function() {
        isModelLoaded = true;
        self.handleLoadCalledBack();
    };

    this.handleLoadCalledBack = function(){
        if(isModelLoaded && isFontLoaded){
            for(var index = 0; index < sceneBehaviours.length; index++){
                if(sceneBehaviours[index].awake){
                    sceneBehaviours[index].awake();
                }
            }
        }
    };

    this.update = function(deltaTime) {
        if(isModelLoaded && isFontLoaded){
            for(var index = 0; index < sceneBehaviours.length; index++){
                if(sceneBehaviours[index].update){
                    sceneBehaviours[index].update(deltaTime);
                }

            }
        }
    };
};