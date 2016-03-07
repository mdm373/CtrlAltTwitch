CATW.TwitchFeaturedSelectionMenuBehaviour = function(options){
    const MAX_MENU_ITEMS = 3;
    const HEIGHT_OFFSET = new THREE.Vector3(0, -300, 0);
    const MENU_POSITION = new THREE.Vector3(-400, 200, 300);
    const MENU_HIDE_OFFSET = new THREE.Vector3(0, -1000, 0);
    const TRANSITION_TIME = 2500;

    var self = this;
    var twitchApi = options.twitchApi;
    var twitchPlayer = options.twitchPlayer;
    var fontLibrary = options.fontLibrary;
    var sim = options.sim;
    var menuItems = [];
    var currentState = CATW.MenuStates.HIDDEN;
    var isToggleRequested = false;
    var isAwake;
    var showListener;
    var hideListener;

    this.awake = function(){
        var streams = twitchApi.getStreams();
        streams.getFeatured(self.onFeaturedListLoaded);
    };

    this.update = function(){
        switch(currentState){
            case CATW.MenuStates.TRANSITION_IN:
                self.updateTransitionState(CATW.MenuStates.DISPLAY, true);
                break;
            case CATW.MenuStates.TRANSITION_OUT:
                self.updateTransitionState(CATW.MenuStates.HIDDEN, false);
                break;
            case CATW.MenuStates.DISPLAY:
                self.updateToggleState(CATW.MenuStates.TRANSITION_OUT);
                break;
            case CATW.MenuStates.HIDDEN:
                self.updateToggleState(CATW.MenuStates.TRANSITION_IN);
                break;
        }
    };

    this.updateTransitionState = function(nextState, willBeIntractable){
        var haveAllArrived = true;
        for(var i =0; i < menuItems.length; i++){
            haveAllArrived = haveAllArrived && menuItems[i].hasArrived();
            if(!haveAllArrived){
                break;
            }
        }
        if(haveAllArrived){
            currentState = nextState;
            for(i =0; i < menuItems.length; i++){
                menuItems[i].setIntractable(willBeIntractable);
            }
        }
    };

    this.updateToggleState = function(nextState){
        if(isToggleRequested === true){
            self.fireTransitionListener();
            currentState = nextState;
            isToggleRequested = false;
            for(var i =0; i < menuItems.length; i++){
                menuItems[i].setIntractable(false);
                menuItems[i].transitionTo(nextState);
            }
        }
    };

    this.fireTransitionListener = function(){
        if(currentState == CATW.MenuStates.DISPLAY){
            if(hideListener){
                hideListener();
            }
        } else {
            if(showListener){
                showListener();
            }
        }
    };

    this.onFeaturedListLoaded = function (featuredData) {
        var hidePosition = new THREE.Vector3();
        hidePosition.copy(MENU_POSITION);
        hidePosition.add(MENU_HIDE_OFFSET);
        for(var featuredIndex = 0; featuredIndex < featuredData.featured.length; featuredIndex++){
            if(featuredIndex >= MAX_MENU_ITEMS){
                break;
            }
            var featured = featuredData.featured[featuredIndex];
            var group = new THREE.Group();
            var menuItem = new CATW.TwitchFeaturedSelectionMenuItemBehaviour({
                featured: featured,
                sim: sim,
                fontLibrary: fontLibrary,
                menuIndex: featuredIndex,
                menuIndexOffset: HEIGHT_OFFSET,
                menuPosition: MENU_POSITION,
                transitionDuration: TRANSITION_TIME,
                hideOffset: MENU_HIDE_OFFSET,
                onAwake: self.onMenuItemAwake,
                onItemClicked: self.onFeaturedItemClicked
            });
            menuItems.push(menuItem);
            group.addBehavior(menuItem);
            sim.scene.add(group);
        }
    };

    this.setShowListener = function(listener){
        showListener = listener;
    };

    this.setHideListener = function(listener){
        hideListener= listener;
    };

    this.onMenuItemAwake = function(){
        var allAwake = true;
        for(var i = 0; i < menuItems.length; i++){
            allAwake = allAwake && menuItems[i].isAwake();
            if(!allAwake){
                break;
            }
        }
        if(allAwake){
            isToggleRequested = true;
            isAwake = true;
        }
    };

    this.onFeaturedItemClicked = function(item){
        var name = item.getFeatured().stream.channel.name;
        twitchPlayer.setChannelByName(name);
        isToggleRequested = true;
    };

    this.show = function(){
        if(isAwake && currentState == CATW.MenuStates.HIDDEN){
            isToggleRequested = true;
        }
    }
};