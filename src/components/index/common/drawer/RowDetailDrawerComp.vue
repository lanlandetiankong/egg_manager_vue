<template>
    <div>
        <a-drawer
           v-bind="drawerConfObj"
            @close="handleDetailDrawerClose"
        >
            <simple-detail-drawer-comp
                :dataObj="dataObj"
                :visible="visible"
                :drawerFieldConf="drawerFieldConf"
            />
        </a-drawer>
    </div>
</template>
<script>
    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';
    export default {
        name: "RowDetailDrawerComp",
        components:{SimpleDetailDrawerComp},
        mixins:[EggCommonMixin],
        props:{
            drawerConf:{
                type:Object,
                default:{}
            },
            dataObj:{
                type:Object
            },
            visible:{
                type:Boolean
            },
            drawerFieldConf:{
                type:Object
            }
        },
        data(){
            return {

            };
        },
        computed:{
            drawerConfObj(){
                //prop.drawerConf 默认初始化
                var _this = this ;
                const obj = {};
                obj['title'] = _this.mixin_defaultIfNull(_this.drawerConf['title'],this.$t('langMap.drawer.actions.detail'));
                obj['closable'] = _this.mixin_defaultIfNull(_this.drawerConf['closable'],true);
                obj['visible'] = _this.$props.visible ;
                obj['placement'] = _this.mixin_defaultIfNull(_this.drawerConf['placement'],"right");
                obj['mask'] = _this.mixin_defaultIfNull(_this.drawerConf['mask'],true);
                obj['maskStyle'] = _this.mixin_defaultIfNull(_this.drawerConf['maskStyle'],{
                    overFlowY:"auto"
                });
                obj['wrapStyle'] = _this.mixin_defaultIfNull(_this.drawerConf['wrapStyle'],{
                    overFlowY:"auto"
                });
                obj['drawerStyle'] = _this.mixin_defaultIfNull(_this.drawerConf['drawerStyle'],{
                    overFlowY:"auto"
                });
                obj['maskClosable'] = _this.mixin_defaultIfNull(_this.drawerConf['maskClosable'],true);
               return obj ;
            }
        },
        methods:{
            handleDetailDrawerClose(e) { //Drawer-公告 详情关闭
                this.$emit('execClose',e);
            }
        }
    }
</script>

<style scoped>

</style>
