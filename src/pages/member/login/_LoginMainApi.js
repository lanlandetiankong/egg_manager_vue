//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const LoginMainApi = {
    submitLoginForm(loginForm) {
        const form = {

        }
        return axios.post('')
    },
    doGetAllMenu() {    //取得用户 能访问菜单列表
        return axios.post('/define/define_menu/user/getGrantedMenuTree').then(res => res) ;
    }
}
