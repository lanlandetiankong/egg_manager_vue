<template>
    <div class="layout-page-root" >
        <a-layout id="index-layout-root">
            <a-layout-sider
                collapsible
                v-model="siderbar.conf.collapsed"
            >
                <sidebar
                    class="sidebar-container"
                    :menuList="siderbar.menuList"
                    :siderCollapsed="siderbar.conf.collapsed"
                    @siderbar-menu-open="doSiderbarMenuOpenView"
                >
                </sidebar>
            </a-layout-sider>
            <a-layout>
                <a-layout-header
                    style="background: #fff; padding: 0;"
                >
                    <navbar
                        :userInfo="navbarConf.userInfo"
                    ></navbar>
                </a-layout-header>
                <a-layout-content
                    :style="{ margin: '10px 0', overflow: 'initial' }"
                >
                    <tags-view
                        :tagsArray="tagViewOpendArray"
                        :selectedTag="tagsConf.selectedTag"
                        @tag-item-native-click="doTagItemNativeClick"
                        @tag-item-selected-close="doTagItemSelectedClose"
                        @tag-item-others-close="doTagItemOthersClose"
                        @tag-item-all-close="doTagItemAllClose"
                        @toggle-current-tag="doToggleCurrentTag"
                        :style="{paddingBottom:'10px'}"
                    >
                    </tags-view>
                    <app-main
                        :style="{ padding: '5px', background: '#fff', textAlign: 'center' }"
                    ></app-main>
                </a-layout-content>
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
                tagsConf: {
                    tagsArray:[],
                    selectedTag:{}
                },
                navbarConf:{
                    userInfo:{
                        imgSrc: '~UserImgPath/panda-egg.jpg'
                    }
                }
            }
        },
        computed: {
            tagViewOpendArray() {
                return this.$store.state.tagsView.visitedViews ;
            },
        },
        watch: {

        },
        methods: {
            handleGetMenus() {
                var _this = this;
                LayoutApi.doGetAllMenu().then(res => {
                    _this.siderbar.menuList = res.resultList;
                });
            },
            doSiderbarMenuOpenView(item,key,keypath) {
                var _this = this ;
                var addTagObj = LayoutFunc.handleGetMenuToTagObj(_this,_this.siderbar.menuList,key);
                //console.log("addTagObj",addTagObj);
                if(addTagObj != null){
                    //_this.tagsConf.tagsArray.push(addTagObj);
                    _this.tagsConf.selectedTag = addTagObj ;
                    this.$store.dispatch('doSetContextMenuPosition',{
                        visible:false,
                        left:0,
                        top:0
                    });
                }   else {
                    console.log("添加菜单失败!") ;
                }
            },
            doTagItemNativeClick(e,clickTag) {
                this.doToggleCurrentTag(clickTag) ;
            },
            doToggleCurrentTag(tag) {
                console.log("doToggleCurrentTag",tag);
                this.tagsConf.selectedTag = tag ;
            },
            doTagItemSelectedClose(e,selectedTag,isTagActive){
                //关闭当前所选标签
                this.$store.dispatch('doDelVisitedViews',selectedTag).then((views) => {
                    if(isTagActive == true){
                        const latestView = views.slice(-1)[0] ;
                        if(latestView) {
                            this.$router.push(latestView.path) ;
                        }   else {
                            this.$router.push('/') ;
                        }
                    }
                })
            },
            doTagItemOthersClose(e){
                //关闭其他标签
                var _this = this ;
                _this.$store.dispatch('doDelOthersViews',_this.tagsConf.selectedTag).then((views) => {
                    const latestView = views.slice(-1)[0] ;
                    if(!latestView) {
                        _this.$router.push('/') ;
                    }
                })
            },
            doTagItemAllClose(e){
                //关闭所有标签
                this.$store.dispatch('doDelAllViews').then((views) => {
                    //do something
                });
                //切换到主页
                this.$router.push("/");
            },
            dealMenuClick(obj) {
                console.log("dealMenuClick",obj);
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
