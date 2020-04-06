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
        }
    }


}
