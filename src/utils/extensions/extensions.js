import {generateUUID} from '~Utils/commonUtil.js';
import BeeUtil from '~Assets/js/util/bee/BeeUtil.js' ;

const localStorageKeys = {
    exceptionRecordList:"exceptionRecordList"
}

const exceptionRecordUtil = {
    dealAddExceptionRecords(response){
        let resultObj = response.data;
        if(resultObj){
            if(resultObj instanceof Object){
                if(resultObj.hasError == true){
                    var recordItem = this.dealTransferExceptionRecord(response,"error");
                    this.dealLocalAppendExceptionRecordList(recordItem);
                }   else if(resultObj.hasWarning == true){
                    var recordItem = this.dealTransferExceptionRecord(response,"warning");
                    this.dealLocalAppendExceptionRecordList(recordItem);
                }
            }
        }
    },
    dealLocalAppendExceptionRecordList(recordItem){     //追加项
        if(recordItem){
            let recordList = this.dealGetLocalExceptionRecordList() ;
            recordList.unshift(recordItem);     //添加到头部
            window.localStorage.setItem(localStorageKeys.exceptionRecordList,JSON.stringify(recordList));
        }
    },
    dealGetLocalExceptionRecordList(){  //取得已有集合
        let recordList = window.localStorage.getItem(localStorageKeys.exceptionRecordList) ;
        if(typeof recordList == "undefined" || recordList == null){
            recordList = [] ;
        }   else {
            recordList = JSON.parse(recordList);
        }
        return recordList ;
    },
    dealTransferExceptionRecord(response,logType){  //将请求返回结果转为 record
        logType = (logType) ? logType : "error";
        var logTypeStr = (logType == "error") ? "异常" : "警告" ;
        var confObj = response.config;
        var dataObj = response.data ;
        var requestObj = response.request ;
        var headersObj = (response.headers) ? response.headers : {} ;

        var recordObj = {
            uuid:generateUUID(),
            logType:logType,
            logTypeStr:logTypeStr,
            time:BeeUtil.DateUtils.getCurrentTime(),
            reqConf:{
                url:confObj.url,    //请求地址
                data:confObj.data,  //相关参数
                method:confObj.method,   //请求方式
            },
            resp:{
                hasError: dataObj.hasError, //是否出错
                errorMsg: dataObj.errorMsg, //异常信息
                hasWarning: dataObj.hasWarning, //是否警告
                info: dataObj.info  //信息
            },
            headers:headersObj,
            reqInfo:{
                status: requestObj.status
            }
        }
        return recordObj ;
    },
    dealRemoveAllRecord(){  //清除所有记录
        window.localStorage.setItem(localStorageKeys.exceptionRecordList,JSON.stringify([]));
    }
}

export const ExceptionRecordUtils =  exceptionRecordUtil ;
