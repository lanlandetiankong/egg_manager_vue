/**
 * store.commit('mutation_name',param)
 */
export default {
    SET_USER_TOKEN(state,usertoken) {
        state.userToken = usertoken ;
        sessionStorage.setItem('userToken',JSON.stringify(usertoken));
    },
    SET_USER_INFO(state,userinfo){
        state.userInfo  = userinfo ;
        sessionStorage.setItem('userInfo',userinfo);
    },
    LOGIN_ACCOUNT_IN(state, token) {
        //用户登录，存储token
        state.userToken = token ;
    },
    LOGIN_ACCOUNT_OUT(state) {
        sessionStorage.removeItem("userToken");
        //用户退出，移除token
        state.userToken = '' ;
    },
    toggleNavCollapse(state) {
        //切换侧边栏展开
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        //面包屑 list
        state.crumbList = []
    }
}
