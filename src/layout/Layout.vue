<template>
    <div class="layout-page-root" >
        <a-layout id="index-layout-root">
            <a-layout-sider
                v-model="siderbar.conf.collapsed"
            >
                <sidebar
                    class="sidebar-container"
                    :menuList="siderbar.menuList"
                    :siderCollapsed="siderbar.conf.collapsed"
                    @siderbar-menu-open="doSiderbarMenuOpen"
                >
                </sidebar>
            </a-layout-sider>
            <a-layout>
                <a-layout-header
                    style="background: #fff; padding: 0;"
                >
                    <navbar
                        :collapsed="siderbar.conf.collapsed"
                        @siderbar-toggle="()=> siderbar.conf.collapsed = !siderbar.conf.collapsed"
                    ></navbar>
                </a-layout-header>
                <a-layout-content
                    :style="{ margin: '10px 0', overflow: 'initial' }"
                >
                    <tags-view
                        :tagsArray="tagsConf.tagsArray"
                        :selectedTag="tagsConf.selectedTag"
                        @tag-item-native-click="doTagItemNativeClick"
                        :style="{paddingBottom:'10px'}"
                    >
                    </tags-view>
                    <app-main
                        :style="{ padding: '5px', background: '#fff', textAlign: 'center' }"
                    ></app-main>
                </a-layout-content>
                <a-layout-footer
                >
                    <base-footer></base-footer>
                </a-layout-footer>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
    import {LayoutApi} from '~Layout/_LayoutApi.js' ;
    import $ from 'jquery' ;

    import { Navbar, Sidebar, AppMain, TagsView,BaseFooter } from './components'
    import ALayoutSider from "ant-design-vue/es/layout/Sider";

    import {LayoutFunc} from './_LayoutFunc.js'

    export default {
        name: "Layout",
        components: {
            ALayoutSider,
            Navbar,
            Sidebar,
            AppMain,
            TagsView,
            BaseFooter
        },
        data() {
            return {
                siderbar:{
                    conf:{
                        collapsed: false,
                    },
                    menuList: [],
                },
                tabsConf: {
                    activityKey: '',
                    mode: 'top',
                    defaultOpen:[],
                },
                tagsConf: {
                    tagsArray:[],
                    selectedTag:{}
                }
            }
        },
        computed: {

        },
        methods: {
            handleGetMenus() {
                var _this = this;
                LayoutApi.doGetAllMenu().then(res => {
                    _this.siderbar.menuList = res.resultList;
                });
            },
            doSiderbarMenuOpen(item,key,keypath) {
                var _this = this ;
                var tagsOpendFlag = LayoutFunc.handleCheckMenuIsOpen(_this,_this.tagsConf.tagsArray,key);
                if(tagsOpendFlag == false) {
                    var addTagObj = LayoutFunc.handleGetMenuToTagObj(_this,_this.siderbar.menuList,key);
                    if(addTagObj != null){
                        _this.tagsConf.tagsArray.push(addTagObj);
                        _this.tagsConf.selectedTag = addTagObj ;
                        this.$store.dispatch('doSetContextMenuPosition',{
                            visible:false,
                            left:0,
                            top:0
                        });
                    }   else {
                        console.log("添加菜单失败!") ;
                    }
                    console.log(("selectedTag",_this.tagsConf.selectedTag));
                }
            },
            doTagItemNativeClick(e,clickTag) {
                this.tagsConf.selectedTag = clickTag ;
            },
            dealMenuClick(obj) {
                console.log(obj);
            },

            dealTabsChange(activeKey) {

            },
            dealTabsEdit(targetKey, action) {

            },
            dealTabsClick(activeKey) {

            }
        },
        mounted() {
            this.handleGetMenus();

        }
    }
</script>
<style lang="less" scoped>
    @import "_Layout.less";
</style>
<style lang="less" scoped>


</style>
