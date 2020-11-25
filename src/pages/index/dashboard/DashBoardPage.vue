<template>
    <div>
        <a-tabs
            :defaultActiveKey="layoutConf.tab.defaultActiveKey"
            :tabPosition="layoutConf.tab.mode"
            :style="{ height: '300px'}"
            @change="handleTabChange"
        >
            <a-tab-pane :tab="layoutConf.tab.list.announcementList.title"
                        :key="layoutConf.tab.list.announcementList.key">
                <announcement-list-comp
                    :dataList="tabConf.announcementList.dataList"
                    @viewItemClick="handleAnnouncementViewItemClick"
                />
            </a-tab-pane>
            <a-tab-pane :tab="layoutConf.tab.list.articleList.title"
                        :key="layoutConf.tab.list.articleList.key">
                文章列表 Todo
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script>
    import {tabConfList} from './param_conf.js'

    import {DashBoardApi} from './dashBoardApi.js'

    import AnnouncementListComp from '~Components/index/dashboard/announcement/AnnouncementListComp'

    export default {
        name: "DashBoardPage",
        components: {AnnouncementListComp},
        data(){
            return {
                layoutConf:{
                    tab:{
                        mode: 'left',
                        list:tabConfList,
                        defaultActiveKey:"announcementList"
                    }
                },
                tabConf:{
                    announcementList:{
                        dataList:[],
                        limitSize:10
                    }
                }
            }
        },
        methods:{
            dealGetTabItem(tabKey){     //根据tab的key 取得tab对应的项
                var _this = this;
                var tabList = _this.layoutConf.tab.list ;
                if(tabList){
                    var tabItem = tabList[tabKey];
                    if(tabItem){
                        return tabItem ;
                    }
                }
            },
            dealTabInit(tabKey){    //根据tab的key对tab对应的项 进行初始化
                var _this = this ;
                if(tabKey){
                    if(tabKey == _this.layoutConf.tab.list.announcementList.key){      //公告列表
                        _this.dealInitAnnouncementListTab();
                    }
                }
            },
            dealInitAnnouncementListTab(){  //公告列表-初始化
                var announcementListTemp = this.tabConf.announcementList ;
                DashBoardApi.getSomeAnnouncementList(announcementListTemp.limitSize,false).then((res) => {
                    if (res.success == true) {  //已经有对错误进行预处理
                        announcementListTemp.dataList = res.gridList ;
                    }
                })
            },
            dealGoToShowAnnouncementView(fid){   //处理-跳转到 [公告] 展示页面
                var routeParam = {
                    fid: fid
                }
                this.$router.push({ path: '/index/announcement/display', query: routeParam});
            },
            handleTabChange(tabKey){
                var _this = this;
                var tabItem = _this.dealGetTabItem(tabKey);
                if(tabItem){    //取得到tab item
                    if(tabItem.initFlag == false){  //尚未初始化
                        _this.dealTabInit(tabKey);
                        tabItem.initFlag = true ;
                    }
                }
            },
            handleAnnouncementViewItemClick(e,item){    //公告列表-点击查看事件
                var _this = this ;
                _this.dealGoToShowAnnouncementView(item.fid);
            }
        },
        created(){
            var _this = this ;
            var defaultActiveKeyTemp = _this.layoutConf.tab.defaultActiveKey ;
            if(defaultActiveKeyTemp){   //初始化第一个 tab
                _this.dealTabInit(defaultActiveKeyTemp);
            }
        }
    }
</script>

<style scoped>

</style>
