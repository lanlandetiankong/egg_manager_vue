/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */
import $ from 'jquery' ;

export const LayoutFunc = {
    //判断菜单是否已经打开
    handleCheckMenuIsOpen(_this,tempTagsArr,key) {
        var tempTagsOpendFlag = false ;
        if(tempTagsArr.length == 0){
            tempTagsOpendFlag = false ;
        }   else {
            $.each(tempTagsArr,function (idx,val) {
                if(key == val.id) {
                    tempTagsOpendFlag = true ;
                    return false ;
                }
            })
        }
        return tempTagsOpendFlag ;
    },
    //判断菜单是否已经打开
    handleGetMenuToTagObj(_this,tempMenuList,key) {
        var tempAddMenuObj = null ;
        if(tempMenuList.length > 0){
            tempAddMenuObj = LayoutFunc.dealGetNextMenu(tempMenuList,key,tempAddMenuObj);
            console.log("tempAddMenuObj =>" ,tempAddMenuObj);
        }
        if(typeof tempAddMenuObj != "undefined" && tempAddMenuObj != null) {
            return {
                id:'test'
            }
        }   else {

        }
    },

    dealGetNextMenu(tempMenuList,key,tempAddMenuObj) {
        if(tempMenuList.length > 0){
            $.each(tempMenuList,function (idx,val) {
                if(key == val.id){
                    tempAddMenuObj = val ;
                    console.log("match",tempAddMenuObj) ;
                    return false ;
                }   else {
                    if(val.children && val.children.length > 0){
                        tempAddMenuObj =  LayoutFunc.dealGetNextMenu(val.children,key,tempAddMenuObj);
                    }   else {
                        return false ;
                    }
                }
            })
        }
        if(tempAddMenuObj != null){
            return tempAddMenuObj ;
        }
    }


}
