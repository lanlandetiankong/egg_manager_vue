const userInfoStore = {
    state:{
        userToken:{}
    },
    actions:{
        doSetUserToken({commit},userTokenObj){
            console.log("doSetUserToken",userTokenObj) ;
            commit('SET_USER_TOKEN',userTokenObj);
        }
    },
    mutations:{
        SET_USER_TOKEN:(state,userTokenObj) => {
            console.log("SET_USER_TOKEN",userTokenObj) ;
            if(typeof userTokenObj == "undefined"){
                userTokenObj = {} ;
            }
            state.userToken = userTokenObj;
        }
    }

}


export default userInfoStore ;
