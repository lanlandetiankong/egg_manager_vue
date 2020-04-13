//ajax远程调用
import axios from '~Config/axios/httpConfig'
//包装param参数
import qs from 'qs'

/* 不要使用 // 进行注释！！！！！！！！！！！！！！！！！！！！！！！！   */

export const EmployeeDepartmentCompsApi = {
    getDefineDepartmentTreeFilterChildrens(filterId) {
        var obj = {
            filterId:filterId
        }
        //查询过滤的菜单信息(树结构) ->过滤当前id及子节点
        return axios.post('/define/define_department/getDepartmentTreeSelectFilterChildrens',qs.stringify(obj)).then(res => res.data);
    }
}
