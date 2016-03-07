CATW.MultiFontLoader = function(options) {

    var self = this;
    var fontRoot = options.fontRoot;
    var fontNames = [];

    this.addFont = function(fontName){
        fontNames.push(fontName);
    };

    this.loadAllFonts = function(callback){
        var fontMap = {};
        for(var fontIndex = 0; fontIndex < fontNames.length; fontIndex++){
            var fontName = fontNames[fontIndex];
            $.ajax({
                dataType: "json",
                url:fontRoot + fontName + ".json",
                success:self.getOnFontLoadedCallback(fontName, fontMap, callback)
            });
        }
    };

    this.getOnFontLoadedCallback = function(fontName, fontMap, finalCallback){
        return function (font){
            THREE.FontUtils.loadFace(font);
            fontMap[fontName] = font;
            if(Object.keys(fontMap).length >= fontNames.length){
                finalCallback(fontMap);
            }
        };
    };


};