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
        }
    }


}
