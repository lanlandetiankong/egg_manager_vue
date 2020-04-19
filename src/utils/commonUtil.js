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

export const generateUUID = function() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}


export const userTokenFunc = userTokenFunctions ;



