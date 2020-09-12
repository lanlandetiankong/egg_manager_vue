import axios from 'axios'
import router from '@/router/index'
import baseURL from './baseUrl'
import {message, Spin,notification} from 'ant-design-vue'
import {ExceptionRecordUtils} from '~Utils/extensions/extensions.js'

const http = {};
const defaultNotificationMsg = {
    success:"提示",
    warning:'提示',
    error:'错误！'
}
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
                notification.error({
                    message:defaultNotificationMsg.error,
                    description:'请求出错!'
                })
                break
            case 401:
                notification.warning({
                    message:defaultNotificationMsg.warning,
                    description:'授权失败，请重新登录'
                })
                return;
            case 403:
                notification.warning({
                    message:defaultNotificationMsg.warning,
                    description:'拒绝访问'
                })
                break
            case 404:
                notification.warning({
                    message:defaultNotificationMsg.warning,
                    description:'请求错误,未找到该资源'
                })
                break
            case 500:
                notification.error({
                    message:defaultNotificationMsg.error,
                    description:'服务端错误'
                })
                break
        }
        return status >= 200 && status < 300
    },
    transformResponse: [function (data) {
        // 在传递给 then/catch 前，允许修改响应数据
        if(data){
            if(typeof data == "string"){
                return JSON.parse(data);
            }
        }
        return data;
    }],
})

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        var cfgUserToken = window.sessionStorage.getItem("userToken");
        var cfgAuthorization = window.sessionStorage.getItem("authorization");
        cfgAuthorization = typeof cfgAuthorization == "undefined" ? "" : cfgAuthorization ;
        //var tokenStr = qs.stringify(JSON.parse(cfgUserToken)) ;
        // 请求头添加token
        if (cfgUserToken) {
            var cfgUserTokenObj = JSON.parse(cfgUserToken);
            var userTokenObj = {
                account:cfgUserTokenObj['account'],
                token:cfgUserTokenObj['token'],
                userAccountId:cfgUserTokenObj['userAccountId']
            }
            //config.headers['token'] = JSON.parse(cfgUserToken).token;
            config.headers['token'] = JSON.stringify(userTokenObj);
        } else {
            console.log("employee is loginout");
        }
        config.headers['authorization'] = cfgAuthorization;
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


// 响应拦截器
instance.interceptors.response.use(
    response => {
        //return response.data;
        return response;
    },
    // 服务器状态码不是200的情况
    error => {
        var _this = this ;
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
                        if(1==2) {       //已在create axios 时定义了处理
                            notification.error({
                                message:defaultNotificationMsg.warning,
                                description:"登录过期，请重新登录！"
                            });
                        }
                        // 清除token
                        sessionStorage.removeItem('userToken');
                        break;
                    // 404请求不存在
                    case 404:
                        if(1==2){       //已在create axios 时定义了处理
                            notification.warning({
                                message:defaultNotificationMsg.warning,
                                description:"网络请求不存在"
                            });
                        }
                        break;
                    // 其他错误，直接抛出错误提示
                    default:
                        if(1==2) {       //已在create axios 时定义了处理
                            notification.error({
                                message:defaultNotificationMsg.warning,
                                description:"操作出现异常！"
                            });
                        }
                }
                return Promise.reject(error.response);
            }
        }   else {
            notification.error({
                message:defaultNotificationMsg.warning,
                description:"响应错误或服务器异常!请联系管理员！"
            });
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
                    notification.error({
                        message:defaultNotificationMsg.warning,
                        description:response.msg
                    });
                    reject(response.msg)
                }
            })
            .catch(e => {
                console.log(e)
            }, err => {
                notification.error({
                    message:defaultNotificationMsg.warning,
                    description:"请求错误或服务器异常!请联系管理员！"
                });
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
            .then((response) => {
                var respData = response.data ;
                //loadingInstance.close();
                //对返回结果的预先处理
                if (respData) {
                    if(respData instanceof Blob){   //判断是否是Blob文件流
                        let fileReader = new FileReader();
                        fileReader.onload = function() {
                            try {
                                let jsonData = JSON.parse(this.result);  // 说明是普通对象数据，后台转换失败
                                if (jsonData.hasError) {
                                    message.error(jsonData.errorMsg);
                                    reject(response);
                                }   else {
                                    resolve(response);
                                }
                            } catch (err) {   // 解析成对象失败，说明是正常的文件流
                                resolve(response);
                            }
                        };
                        fileReader.readAsText(respData);    //触发onload
                    }   else {
                        let tempRespHasError = respData.hasError;
                        //Error:不放行
                        if (typeof(tempRespHasError) != "undefined" && tempRespHasError != null && tempRespHasError === true) {
                            debugger;
                            ExceptionRecordUtils.dealAddExceptionRecords(response);
                            let tempRespInfo = respData.errorMsg;
                            if(!tempRespInfo){
                                tempRespInfo = respData.info ;
                            }
                            if (typeof(tempRespInfo) != "undefined" && tempRespInfo != null && tempRespInfo.replace(/(^s*)|(s*$)/g, "").length != 0) {
                                message.error(tempRespInfo);
                            }
                            let tempErrorActionType = respData.errorActionType;
                            if(tempErrorActionType){     //如果发生异常时，后端明确指明有操作要求
                                if("AuthenticationExpired" == tempErrorActionType){  //请求明确要求需要重新登录
                                    jumpToLoginPage(router);
                                }
                            }
                            resolve(response);
                        } else {
                            let respHasWarning = respData.hasWarning;
                            if (typeof(respHasWarning) == "undefined" || respHasWarning == null) {
                                respHasWarning = false;
                            }
                            //respData.hasWarning = respHasWarning;
                            //Warning或正常:放行
                            resolve(response);
                        }
                    }
                }
            })
            .catch(e => {
                //loadingInstance.close();
                console.log(e);
                reject(e);
            })

    })
}


function jumpToLoginPage(router) {
    window.sessionStorage.removeItem("userToken");
    debugger;
    if("/member/login" == router.app._route.fullPath){
        //当前已经是登录界面
    }   else {
        //跳转到登录界面
        router.push("/member/login");
    }
}
export default http
