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
    },
    device: state => state.app.device,
    theme: state => state.app.theme,
    color: state => state.app.color,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    nickname: state => state.user.name,
    roles: state => state.user.roles,
    userInfo: state => state.user.info,
    addRouters: state => state.permission.addRouters,
    multiTab: state => state.app.multiTab,
}
