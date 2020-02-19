const userTokenFunctions = {
    /**
     *
     * @param required 是否必要取得用户信息，如果取得为null或空，弹窗提示
     * @param gotoLoginFlag 如果取得为null或空,同时跳转到登录页面
     */
    getUserTokenFromSessionStorage(required) {
        var userTokenCache = window.sessionStorage.getItem("userToken");
        if(userTokenCache){
            var userTokenObj = JSON.parse(userTokenCache);
            return userTokenObj
        }   else {
            if(required == true){
                this.$message.warning("会话信息已过期，请重新登录！") ;
            }
            return {} ;
        }
    }
}



export const userTokenFunc = userTokenFunctions ;



