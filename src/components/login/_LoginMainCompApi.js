//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const LoginMainCompApi = {
    submitLoginFormByAccount(loginForm) {
        const formObj = {
            account:loginForm.userAccount,
            password:loginForm.password
        }
        return axios.post('/user/user_account/login/account',qs.stringify(formObj)).then(res => res);
    }
}
