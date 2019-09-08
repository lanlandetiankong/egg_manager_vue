import {message, notification} from 'ant-design-vue';



export const commonEleNotice = {
    msgBox: {
        handleShowSimpleSuccessConfirm : (theMessage,theTitle) => {
            if(!theTitle){
                theTitle = '操作提示'
            }
            return getShowSimpleConfirm(theTitle,theMessage,"success") ;
        },
        handleShowSimpleInfoConfirm : (theMessage,theTitle) => {
            if(!theTitle){
                theTitle = '操作提示'
            }
            return getShowSimpleConfirm(theTitle,theMessage,"info") ;
        },
        handleShowSimpleWarningConfirm : (theMessage,theTitle) => {
            if(!theTitle){
                theTitle = '操作提示'
            }
            return getShowSimpleConfirm(theTitle,theMessage,"warning") ;
        },
        handleShowSimpleErrorConfirm : (theMessage,theTitle) => {
            if(!theTitle){
                theTitle = '操作提示'
            }
            return getShowSimpleConfirm(theTitle,theMessage,"error") ;
        }
    },
    notification:{
        handleShowErrorNotify : (theMessage,limitTime) => {
            limitTime = doNotifyLimitTime(theMessage,limitTime);
            //进行通知
            Notification({
                title:'错误提示：',
                type:'error',
                message:theMessage,
                duration:limitTime,
            })
        },
        handleShowWarningNotify : (theMessage,limitTime) => {
            limitTime = doNotifyLimitTime(theMessage,limitTime);
            //进行通知
            Notification({
                title:'警告：',
                type:'warning',
                message:theMessage,
                duration:limitTime
            })
        },
        handleShowInfoNotify : (theMessage,limitTime) => {
            limitTime = doNotifyLimitTime(theMessage,limitTime);
            //进行通知
            Notification({
                title:'提示消息：',
                type:'info',
                message:theMessage,
                duration:limitTime
            })
        },
        handleShowSuccessNotify : (theMessage,limitTime) => {
            limitTime = doNotifyLimitTime(theMessage,limitTime);
            //进行通知
            Notification({
                title:'操作成功：',
                type:'success',
                message:theMessage,
                duration:limitTime
            })
        }
    }
}

/**
 * 弹窗确认框
 * @param theTitle
 * @param theMessage
 * @param theType
 * @returns {Promise<MessageData>}
 */
function getShowSimpleConfirm (theTitle,theMessage,theType) {
    //进行通知
    const Message = Message.confirm(theMessage,theTitle,{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
    return Message ;
}

/**
 * 弹窗提示
 * @param theMessage
 * @param limitTime
 * @returns {*}
 */
function doNotifyLimitTime(theMessage,limitTime) {
    if(typeof(limitTime) == undefined || limitTime == null) {
        limitTime = 0 ;
    }
    return limitTime ;
}
