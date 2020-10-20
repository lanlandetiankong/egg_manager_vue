import apiUrl from '~Apis/index.js'
//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const LoginApis = {

    doLogin(parameter) {
        return axios.post('/define/defineMenu/get/all_menu',
            qs.stringify(parameter)
        ).then(res => res.data) ;
    },
    doLogout(parameter) {
        return axios.post('/define/defineMenu/get/all_menu',
            qs.stringify(parameter)
        ).then(res => res.data) ;
    },
    doGetCurrentUserNav() {
        return axios.post('/define/defineMenu/get/all_menu',
            qs.stringify(parameter)
        ).then(res => res.data) ;
    },
    doGetSmsCaptcha(parameter) {
        return axios.post(apiUrl.SendSms,
            qs.stringify(parameter)
        ).then(res => res.data) ;
    },
    doGet2step(parameter){
        return axios.post('/define/defineMenu/get/all_menu',
            qs.stringify(parameter)
        ).then(res => res.data) ;
    }
}
