import axios from 'axios'
import router from '@/router/index'
import store from '@/store/index.js'
import baseURL from './baseUrl'
import {message, Spin} from 'ant-design-vue'
import {commonEleNotice} from '~Assets/js/common/notice/myCommonNotice'
import qs from 'qs'

const http = {}
//基础访问url
var instance = axios.create({
    timeout: 50000,
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    validateStatus(status) {
        switch (status) {
            case 400:
                message.error('请求出错')
                break
            case 401:
                message.warning({
                    message: '授权失败，请重新登录'
                })
                return;
            case 403:
                message.warning({
                    message: '拒绝访问'
                })
                break
            case 404:
                message.warning({
                    message: '请求错误,未找到该资源'
                })
                break
            case 500:
                message.warning({
                    message: '服务端错误'
                })
                break
        }
        return status >= 200 && status < 300
    }
})

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        var cfgUserToken = window.sessionStorage.getItem("userToken");
        // 请求头添加token
        if (cfgUserToken) {
            config.headers['token'] = JSON.parse(cfgUserToken).id;
        } else {
            console.log("employee is loginout");
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


// 响应拦截器
instance.interceptors.response.use(
    response => {
        return response.data;
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response) {
            if (error.response.status) {
                switch (error.response.status) {
                    // 401: 未登录
                    // 未登录则跳转登录页面，并携带当前页面的路径
                    // 在登录成功后返回当前页面，这一步需要在登录页操作。
                    case 401:
                        break;
                    // 登录过期对用户进行提示
                    // 清除本地token和清空vuex中token对象
                    // 跳转登录页面
                    case 403:
                        commonEleNotice.notification.handleShowErrorNotify("登录过期，请重新登录");
                        // 清除token
                        sessionStorage.removeItem('userToken');
                        break;
                    // 404请求不存在
                    case 404:
                        commonEleNotice.notification.handleShowErrorNotify("网络请求不存在");
                        break;
                    // 其他错误，直接抛出错误提示
                    default:
                        commonEleNotice.notification.handleShowErrorNotify(error.response);
                }
                return Promise.reject(error.response);
            }
        }   else {
            commonEleNotice.notification.handleShowErrorNotify('请求错误或服务器异常!请联系管理员！');
        }
    }
);


http.get = function (url, options) {
    let loadingInstance;
    if (!options || options.isShowLoading !== false) {
        //loadingInstance = Spin.prototype ;
    }
    return new Promise((resolve, reject) => {
        instance
            .get(url, options)
            .then(response => {
                if (!options || options.isShowLoading !== false) {
                    //loadingInstance.close();
                }
                if (response.code === 1) {
                    resolve(response.data)
                } else {
                    commonEleNotice.notification.handleShowErrorNotify(response.msg);
                    reject(response.msg)
                }
            })
            .catch(e => {
                console.log(e)
            }, err => {
                commonEleNotice.notification.handleShowErrorNotify('请求错误或服务器异常!请联系管理员！');
                reject(err)
            })
    })
}

http.post = function (url, data, options) {
    let loadingInstance
    if (!options || options.isShowLoading !== false) {
        //loadingInstance = Spin.service({fullscreen: true});
    }
    return new Promise((resolve, reject) => {
        instance
            .post(url, data, options)
            .then(response => {
                //loadingInstance.close();
                //对返回结果的预先处理
                if (response) {
                    let tempRespHasError = response.hasError;
                    //Error:不放行
                    if (typeof(tempRespHasError) != "undefined" && tempRespHasError != null && tempRespHasError === true) {
                        let tempRespInfo = response.errorMsg;
                        if(!tempRespInfo){
                            tempRespInfo = response.info ;
                        }
                        if (typeof(tempRespInfo) != "undefined" && tempRespInfo != null && tempRespInfo.replace(/(^s*)|(s*$)/g, "").length != 0) {
                            message.error(tempRespInfo);
                        }
                        resolve(response);
                    } else {
                        let respHasWarning = response.hasWarning;
                        if (typeof(respHasWarning) == "undefined" || respHasWarning == null) {
                            respHasWarning = false;
                        }
                        response.hasWarning = respHasWarning;
                        //Warning或正常:放行
                        resolve(response);
                    }
                }
            })
            .catch(e => {
                //loadingInstance.close();
                console.log(e);
            })

    })
}
export default http
