const userInfoStore = {
    state:{
        userToken:{},
        authorization:'',
        visibleRouterUrls:[]
    },
    actions:{
        doSetUserToken({commit},userTokenObj){
            //console.log("doSetUserToken",userTokenObj) ;
            commit('SET_USER_TOKEN',userTokenObj);
        },
        doSetAuthorization({commit},authorization){
            //console.log("doSetAuthorization",authorization) ;
            commit('SET_Authorization',authorization);
        },
        doSetVisibleRouterUrls({commit},routerUrls){
            commit('SET_VisibleRouterUrls',routerUrls);
        }
    },
    mutations:{
        SET_USER_TOKEN:(state,userTokenObj) => {
            console.log("SET_USER_TOKEN",userTokenObj) ;
            if(typeof userTokenObj == "undefined"){
                userTokenObj = {} ;
            }
            state.userToken = userTokenObj;
        },
        SET_Authorization:(state,authorization) => {
            if(typeof authorization == "undefined"){
                authorization = '' ;
            }
            state.authorization = authorization;
        },
        SET_VisibleRouterUrls:(state,routerUrls) => {
            if(typeof routerUrls == "undefined" || routerUrls == null){
                routerUrls = [] ;
            }
            state.visibleRouterUrls = JSON.stringify(routerUrls);
        }
    }

}


export default userInfoStore ;
