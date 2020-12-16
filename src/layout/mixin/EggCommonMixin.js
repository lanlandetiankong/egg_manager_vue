import { mapGetters } from 'vuex' ;

export const EggCommonMixin = {
    data(){

    },
    computed:{
        ...mapGetters([
            'userInfoStore_grantedPermissions',
        ])
    },
    created(){

    },
    methods:{
        mixin_handlePermissionDomShow(permCode){    //根据后台传递的[可展示权限]列表进行[权限按钮]展示的控制
            return  this.userInfoStore_grantedPermissions.includes(permCode) ;
        },
        mixin_handleGetCurMenuConf(){ //取得当前页面的meta
            const metaObj = this.$route.meta;
            if(metaObj){
                const menuConfTemp = metaObj.menuConf ;
                return (menuConfTemp) ? metaObj.menuConf : {} ;
            }
            return {} ;
        },
        mixin_handleGetCurMenuId(){ //取得当前页面的[菜单定义]fid,但例如/index等页面是无法取到对应的值的
            var menuId = "" ;
            const menuConf = this.mixin_handleGetCurMenuConf() ;
            if(menuConf){
                menuId = menuConf.fid ;
            }
            return menuId ;
        },
        mixin_dealGetSearchFormQueryConf(queryConf,queryObj){
            const queryFieldArr = [] ;
            if(queryObj) {
                for (const key in queryObj){
                    const searchFieldObj = queryConf[key];
                    if(typeof searchFieldObj == "undefined"){
                        continue ;
                    }
                    const searchAbleVal = this.mixin_defaultIfblank(searchFieldObj.searchAble,true);
                    if(searchAbleVal == false){
                        continue ;
                    }
                    const queryVal = queryObj[key] ;
                    if(queryVal || queryVal == 0){
                        queryFieldArr.push({
                            fieldName:searchFieldObj.fieldName,
                            value:queryObj[key],
                            matching:searchFieldObj.matching
                        });
                    }
                }
            }
            return queryFieldArr ;
        },
        mixin_defaultIfblank(val,defval){   //当blank时取默认值
            if(typeof val == "undefined" || val == null || val == ""){
                return defval ;
            }   else {
                return val ;
            }
        }
    }


}
