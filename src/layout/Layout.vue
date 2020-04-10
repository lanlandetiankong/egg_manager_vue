<template>
    <div class="layout-page-root" >
        <a-layout id="index-layout-root">
            <a-layout-sider
                collapsible
                v-model="siderbar.conf.collapsed"
            >
                <sidebar
                    class="sidebar-container"
                    :menuList="SideMenuList"
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
                        @userLoginOut="handleUserLoginOut"
                        @goToUserCenter="handleGoToUserCenter"
                    ></navbar>
                </a-layout-header>
                <a-layout-content
                    :style="{ margin: '10px 0' }"
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

    import { Navbar, Sidebar, AppMain, TagsView,BaseFooter } from './components'
    import ALayoutSider from "ant-design-vue/es/layout/Sider";

    import {LayoutFunc} from './_LayoutFunc.js'

    import ResizeMixin from './mixin/ResizeHandler';

    var constantVars = {
        MenuUrlJumpTypeEnum:{
            RouterUrlJump:1,
            OutUrlJump:2,
            OutUrlBlankJump:3
        }
    }

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
        mixins: [ResizeMixin],
        data() {
            return {
                routerDefineObj:{   //路径定义对象,请勿修改！(请保持与外部$router一致)
                    memberLoginPage:"/member/login",
                    userCenterView:"/index/userZone/center"
                },
                siderbar:{
                    conf:{
                        collapsed: false,
                    },
                },
                SideMenuList:[],
                tagsConf: {
                    tagsArray:[],
                    selectedTag:{}
                },
                navbarConf:{
                    userInfo:{
                        imgSrc: '~UserImgPath/panda-egg.jpg'
                    }
                },

            }
        },
        computed: {
            tagViewOpendArray() {
                return this.$store.state.tagsView.visitedViews ;
            }
        },
        methods: {
            dealGotoIndex(){
                var _currentRoute = this.$route;
                if(_currentRoute){
                    if(_currentRoute.fullPath == "" || _currentRoute.fullPath == "/index"){
                        //当前已经在 index页面了，无需再跳转
                    }   else {
                        this.$router.push('/index');
                    }
                }
            },
            handleGetMenus() {
                var _this = this;
                LayoutApi.doGetAllMenu().then(res => {
                    _this.SideMenuList = res.resultList;
                });
            },
            doSiderbarMenuOpenView(item,key,keypath) {
                var _this = this ;
                _this.tagsConf.selectedTag = _this.$route ;
                this.$store.dispatch('doSetContextMenuPosition',{
                    visible:false,
                    left:0,
                    top:0
                });

            },
            doTagItemNativeClick(e,clickTag) {
                this.doToggleCurrentTag(clickTag) ;
            },
            doToggleCurrentTag(tag) {
                //console.log("doToggleCurrentTag",tag);
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
                            this.dealGotoIndex();
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
                        this.dealGotoIndex();
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

            },
            dealVerifyUserToken(){
                var userTokenTemp = window.sessionStorage.getItem("userToken");
                if(typeof userTokenTemp == "undefined" || userTokenTemp == null){
                    this.$message.error("用户未登录，将为您跳转到登录页面！");
                    this.handleUserLoginOut();
                }   else {
                    return userTokenTemp ;
                }
            },
            handleUserLoginOut(e){     //子组件命令-退出登录
                window.sessionStorage.removeItem("userToken");
                //跳转到登录界面
                this.$router.push(this.routerDefineObj.memberLoginPage);
            },
            handleGoToUserCenter(){ //子组件命令-跳转到用户中心
                this.$router.push(this.routerDefineObj.userCenterView);
            },
            dealCheckMenuItemPutAble(menuItem){ //返回是否可添加到map
                return menuItem.routerUrl && menuItem.urlJumpType == constantVars.MenuUrlJumpTypeEnum.RouterUrlJump ;
            },
            dealRecursiveMenuChildrenToMap(menuUrlMap,menuItem){
                var _this = this ;
                if(_this.dealCheckMenuItemPutAble(menuItem)){
                    menuUrlMap.set(menuItem.routerUrl,menuItem) ;
                }
                var itemChildrens = menuItem.children ;
                if(itemChildrens && itemChildrens.length > 0){
                    for(var childIdx in itemChildrens){
                        _this.dealRecursiveMenuChildrenToMap(menuUrlMap,itemChildrens[childIdx]);
                    }
                }
            },
            handleMenuListToRouters(menuList){
                var _this = this ;
                var menuUrlMap = new Map();
                if(menuList && menuList.length > 0){
                    for(var idx in menuList){
                        var menuItem = menuList[idx];
                        _this.dealRecursiveMenuChildrenToMap(menuUrlMap,menuItem);
                    }
                }
                this.$store.dispatch('doSetGrantMenuUrlMap',menuUrlMap) ;
                console.log(menuUrlMap);
            }
        },
        created(){
            var userLoginFlag = this.dealVerifyUserToken();
            if(typeof userLoginFlag != "undefined" && userLoginFlag != null){
                this.handleGetMenus();
            }
        },
        watch:{
            SideMenuList:{
                handler(val,oval){  //隐藏与展示弹窗时监听
                    console.log("SideMenuList ==>change val");
                    console.log(val);
                    this.handleMenuListToRouters(val);
                },
                deep: true,
                immediate:true
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "_Layout.less";
</style>
<style lang="less" scoped>


</style>
