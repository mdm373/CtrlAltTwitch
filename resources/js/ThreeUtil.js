CATW.ThreeUtil =  {

    FACTOR: Math.PI / 180,

    getRad: function(euler){
        return euler * CATW.ThreeUtil.FACTOR;
    },

    setRad: function(vector, eulerX, eulerY, eulerZ){
        vector.set(CATW.ThreeUtil.getRad(eulerX), CATW.ThreeUtil.getRad(eulerY), CATW.ThreeUtil.getRad(eulerZ));
    },

    setRadVector: function(to, from){
        CATW.ThreeUtil.setRad(to, from.x, from.y, from.z);
    }
};
