const routingStore = {
    state:{
        grantMenuUrlMap: new Map()
    },
    actions:{
        doSetGrantMenuUrlMap({commit},menuUrlMap){
            commit('SET_GRANT_MENU_URL_MAP',menuUrlMap);
        }
    },
    mutations:{
        SET_GRANT_MENU_URL_MAP:(state,menuUrlMap) => {
            //console.log("SET_GRANT_MENU_URL_MAP",menuUrlMap) ;
            if(typeof menuUrlMap == "undefined"){
                menuUrlMap = new Map() ;
            }
            state.grantMenuUrlMap = menuUrlMap;
        }
    },
    getters: {
        routingStore_grantMenuUrlMap(state, getters, rootState) {
            return state.grantMenuUrlMap ;
        }
    }
}


export default routingStore ;
