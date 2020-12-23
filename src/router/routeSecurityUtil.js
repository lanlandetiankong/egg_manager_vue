import router from '@/router/index';
import {message} from 'ant-design-vue'
/**
 * routeSecurityUtil 路由安全工具
 */

/**
 * 常量- 页面
 * @type {{login: {path: string}}}
 */
const RoutePageConst = {
    login:{
        path:'/member/login'
    }
}

function removeTokenSession(){
    window.sessionStorage.removeItem("userToken");
    window.sessionStorage.removeItem("grantedPermissions");
    window.sessionStorage.removeItem("grantedMenuUrlMap");
    window.sessionStorage.removeItem("grantedMenuList");
    window.sessionStorage.removeItem("visibleRouterUrls");
    window.sessionStorage.removeItem("authorization");
}
/**
 * 跳转到 登录页面
 * @param router
 */
function jumpToLoginPage() {
    removeTokenSession();
    if("/member/login" == router.app._route.fullPath){
        //当前已经是登录界面
    }   else {
        //跳转到登录界面
        router.push(RoutePageConst.login.path);
    }
}

/**
 * 验证会话是否有效，无效情况将自动跳转 登录界面
 */
function verifySessionValid() {
    if(isTokenValid() == false){
        message.error("用户未登录，将为您跳转到登录页面！");
        jumpToLoginPage();
    }
    return true ;
}
/**
 * 验证会话是否有效，无效情况将自动跳转 登录界面
 */
function isTokenValid() {
    var userTokenTemp = window.sessionStorage.getItem("userToken");
    var authorizationTemp = window.sessionStorage.getItem("authorization");
    if(!userTokenTemp || !authorizationTemp){
       return false ;
    }   else {
        return true ;
    }
}


export const TokenUtil = {
    loginOut(){
        jumpToLoginPage() ;
    },
    handleVerifyToken(){
        return verifySessionValid();
    },
    isTokenValid(){
        return isTokenValid();
    },
    isRouteCarryOn(to,from){
        if(isTokenValid() == false){
            removeTokenSession();
            if(to.path == RoutePageConst.login.path){
                return true ;
            }
            return false ;
        }
        return true ;
    }
}
export const RouteObjConst = RoutePageConst;
