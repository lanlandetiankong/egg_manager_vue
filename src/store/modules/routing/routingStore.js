const routingStore = {
    state:{
        grantMenuList:[],
        grantMenuUrlMap: new Map()
    },
    actions:{
        doSetGrantMenuList({commit},menuList){
            commit('SET_GRANT_MENU_LIST',menuList);
        },
        doSetGrantMenuUrlMap({commit},menuUrlMap){
            commit('SET_GRANT_MENU_URL_MAP',menuUrlMap);
        }
    },
    mutations:{
        SET_GRANT_MENU_LIST:(state,menuList) => {
            if(typeof menuList == "undefined"){
                menuList = [] ;
            }
            state.grantMenuList = menuList;
        },
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
        },
        routingStore_grantMenuList(state, getters, rootState) {
            return state.grantMenuList ;
        }
    }
}


export default routingStore ;
