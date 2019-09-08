export default {
    UserToken(state,getters,rootState) {
        const localUserToken = sessionStorage.getItem("userToken") ;
        if(localUserToken){
            return JSON.parse(sessionStorage.getItem("userToken")) ;
        }   else {
            return null ;
        }
    },
    UserInfo(state,getters,rootState) {
        if(!state.userInfo ) {
            state.userInfo = JSON.parse(sessionStorage.getItem("userToken")) ;
        }
        return state.userInfo;
    }
}
