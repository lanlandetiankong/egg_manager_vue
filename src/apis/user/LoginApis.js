import apiUrl from '~Apis/index.js'
//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const LoginApis = {

    doLogin(parameter) {
        return axios.post('/define/define_menu/get/all_menu',
            qs.stringify(parameter)
        ).then(res => res) ;
    },
    doLogout(parameter) {
        return axios.post('/define/define_menu/get/all_menu',
            qs.stringify(parameter)
        ).then(res => res) ;
    },
    doGetCurrentUserNav() {
        return axios.post('/define/define_menu/get/all_menu',
            qs.stringify(parameter)
        ).then(res => res) ;
    },
    doGetSmsCaptcha(parameter) {
        return axios.post(apiUrl.SendSms,
            qs.stringify(parameter)
        ).then(res => res) ;
    },
    doGet2step(parameter){
        return axios.post('/define/define_menu/get/all_menu',
            qs.stringify(parameter)
        ).then(res => res) ;
    }
}
