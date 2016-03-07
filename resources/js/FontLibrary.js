CATW.FontLibrary = function(options){

    var self = this;
    var loader = new CATW.MultiFontLoader(options);
    var fontMap = {};
    var isLoaded = false;

    this.init = function(){
        loader.addFont("OxygenRegular");
    };

    this.load = function(callback){
        if(!isLoaded){
            loader.loadAllFonts(self.getFontLoadCallback(callback));
        }
    };

    this.getFont = function(fontName){
        return fontMap[fontName].familyName;
    };

    this.getFontLoadCallback = function(callback){
        return function (aFontMap){
            isLoaded = true;
            fontMap = aFontMap;
            callback(this);
        }
    };


    self.init();
};
