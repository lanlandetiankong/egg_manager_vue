//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const MenuManagerApi = {
    getAllDefineMenuTree() {
        var obj = {
            withRoot:true  ,   //是否包含根节点
        }
        //查询所有菜单信息(树结构)
        return axios.post('/define/define_menu/getAllMenuTreeSelect',qs.stringify(obj)).then(res => res.data);
    },
    getAllDefineMenus(queryArr,pagination,sorter) {
        var sortObj = {}
        if(sorter){
            sortObj['field'] = sorter.field ;
            sortObj['order'] = sorter.order ;
        }
        var obj = {
            queryObj:JSON.stringify(queryArr),
            paginationObj:JSON.stringify(pagination),
            sortObj:JSON.stringify(sortObj),
        }
        //查询所有菜单信息
        return axios.post('/define/define_menu/getAllDefineMenuDtos',qs.stringify(obj)).then(res => res.data);
    },
    getDefineMenuById(defineMenuId){  //根据菜单id查询菜单信息
        var params = {
            defineMenuId:defineMenuId
        }
        return axios.post("/define/define_menu/getDefineMenuById",qs.stringify(params)).then(res => res.data) ;
    },
    addDefineMenuByForm(formObj) {     //新增菜单
        return axios.post("/define/define_menu/doAddDefineMenu",qs.stringify(formObj)).then(res => res.data);;
    },
    updateDefineMenuByForm(formObj) {  //更新菜单
        return axios.post("/define/define_menu/doUpdateDefineMenu",qs.stringify(formObj)).then(res => res.data) ;
    },
    updateExcelModel(menuId,fileItem) {  //更新菜单的excel模板
        fileItem = (fileItem) ? fileItem : {} ;
        fileItem['menuId'] = menuId ;
        return axios.post("/define/define_menu/doUpdateExcelModel",qs.stringify(fileItem)).then(res => res.data) ;
    },
    batchDelDefineMenu(ids) {  //批量删除
        var obj = {
            delIds:ids
        }
        return axios.post("/define/define_menu/batchDelDefineMenuByIds",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    },
    delOneDefineMenu(delId) {  //删除
        var obj = {
            delId:delId
        }
        return axios.post("/define/define_menu/delOneDefineMenuById",qs.stringify(obj,{indices: false})).then(res => res.data) ;
    }
}
