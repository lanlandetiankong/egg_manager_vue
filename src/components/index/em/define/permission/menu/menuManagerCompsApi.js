//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const MenuCreateFormApi = {
    getDefineMenuTreeFilterChildrens(filterId) {
        var obj = {
            filterId:filterId
        }
        //查询过滤的菜单信息(树结构) ->过滤当前id及子节点
        return axios.post('/emCtl/define/defineMenu/queryFilteredTreeSelect',qs.stringify(obj)).then(res => res.data);
    }
}
