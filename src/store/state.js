export default {
    get UserToken() {
        return sessionStorage.getItem('userToken') ;
    },
    set UserToken(value) {
        sessionStorage.setItem('userToken', value)
    },
    get UserInfoToken() {
        return sessionStorage.getItem('userToken') ;
    },
    set UserInfoToken(value) {
        sessionStorage.setItem('userToken', value)
    },
    /* 导航菜单是否折叠 */
    isSidebarNavCollapse: false,
    /* 面包屑导航列表 */
    crumbList: []
}
