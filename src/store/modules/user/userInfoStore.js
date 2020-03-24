const userInfoStore = {
    state:{
        userToken:{},
        authorization:''
    },
    actions:{
        doSetUserToken({commit},userTokenObj){
            //console.log("doSetUserToken",userTokenObj) ;
            commit('SET_USER_TOKEN',userTokenObj);
        },
        doSetAuthorization({commit},authorization){
            //console.log("doSetAuthorization",authorization) ;
            commit('SET_Authorization',authorization);
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
        }
    }

}


export default userInfoStore ;
