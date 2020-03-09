<template>
    <div>
        <div>
            <!-- 复合搜索-区域 -->
            <div v-show="searchConf.showListFlag">
                <div>
                    <a-form layout="inline"
                            :form="searchForm"
                            @submit="handleSearchFormQuery"
                    >
                        <a-row :gutter="10">
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="标题">
                                    <a-input v-decorator="searchConf.paramConf.title"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="关键字">
                                    <a-input v-decorator="searchConf.paramConf.keyWord"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="标签">
                                    <a-select showSearch allowClear
                                              placeholder="请选择"
                                              style="width: 180px"
                                              optionFilterProp="children"
                                              :options="searchConf.binding.announcementTagList"
                                              :filterOption="getAnnouncementTagListFilterOption"
                                              v-decorator="searchConf.paramConf.tagIds"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="内容">
                                    <a-input v-decorator="searchConf.paramConf.content"/>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" :style="{ textAlign: 'right' }">
                                <a-button type="primary" html-type="submit" icon="search"
                                          :loading="searchConf.loadingFlag"
                                >
                                    搜索
                                </a-button>
                                <a-button :style="{ marginLeft: '8px' }" icon="close-square"
                                          @click="handleSearchFormReset">
                                    清空
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
                <a-divider/>
            </div>
            <!-- 操作按钮-区域-->
            <div>
                <a-row
                    :gutter="16"
                    justify="start"
                    type="flex"
                >
                    <a-col>
                        <a-button type="primary" icon="check"
                                  @click="handleAnnouncementDraftBatchPublishByIds">
                            直接发布
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="check"
                                  @click="handleGoToAnnouncementCreateView">
                            编辑
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" icon="delete"
                                  @click="handleAnnouncementDraftBatchDeleteByIds">
                            删除
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-switch
                            checkedChildren="展示搜索"
                            unCheckedChildren="隐藏搜索"
                            size="large"
                            :style="{height:'30px'}"
                            v-model="searchConf.showListFlag"
                        ></a-switch>
                    </a-col>
                </a-row>
            </div>
            <a-divider/>
            <!-- 表格-区域 -->
            <div>
                <a-table
                    :locale="{emptyText:'暂无数据'}"
                    :pagination="tableConf.pagination"
                    :rowKey="item => item.fid"
                    :columns="tableConf.columns"
                    :dataSource="tableConf.data"
                    :loading="tableConf.loading"
                    :rowSelection="rowSelection"
                    :scroll="tableConf.scroll"
                    @change="handleTableChange"
                >
                    <span slot="tagNamesRender" slot-scope="record">
                        <template v-for="tagNameItem in record.tagNames">
                            <a-tag color="blue" :key="tagNameItem">
                                {{tagNameItem}}
                            </a-tag>
                        </template>
                    </span>

                    <template slot="action" slot-scope="text,record">
                        <span>
                            <a @click="handleAnnouncementDraftDetailDrawerShow($event,record)">
                                详情
                            </a>
                            <a-divider type="vertical" />
                            <a-dropdown>
                                <a-menu slot="overlay" @click="handleTableActionGroupClick($event,record)">
                                    <a-menu-item key="recordDel">删除</a-menu-item>
                                    <a-menu-item key="publish">发布</a-menu-item>
                                </a-menu>
                                <a-button> 操作 <a-icon type="down" /> </a-button>
                            </a-dropdown>
                        </span>
                    </template>
                </a-table>
            </div>
            <!-- 弹窗dom-区域 -->
            <div>
                <a-drawer
                    :title="drawerConf.detail.announcementDraft.title"
                    :closeable="drawerConf.detail.announcementDraft.closable"
                    :visible="drawerConf.detail.announcementDraft.visible"
                    :placement="drawerConf.detail.announcementDraft.placement"
                    :mask="drawerConf.detail.announcementDraft.mask"
                    :maskStyle="drawerConf.detail.announcementDraft.maskStyle"
                    :wrapStyle="drawerConf.detail.announcementDraft.wrapStyle"
                    :drawerStyle="drawerConf.detail.announcementDraft.drawerStyle"
                    :bodyStyle="drawerConf.detail.announcementDraft.bodyStyle"
                    :maskClosable="drawerConf.detail.announcementDraft.maskClosable"
                    @close="handleAnnouncementDraftDetailDrawerClose"
                >
                    <simple-detail-drawer-comp
                        :dataObj="drawerConf.detail.announcementDraft.dataObj"
                        :visible="drawerConf.detail.announcementDraft.visible"
                        :drawerFieldConf="drawerConf.detail.announcementDraft.drawerFieldConf"
                    />
                </a-drawer>
            </div>
        </div>
    </div>
</template>
<script>
    import {tableColumns,searchFormQueryConf} from './param_conf.js'
    import {AnnouncementDraftDetailDrawerConf} from './drawer_conf.js'
    import {AnnouncementMyDraftListApi} from './announcementMyDraftListApi'

    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';

    export default {
        name: "AnnouncementMyDraftListView",
        components:{SimpleDetailDrawerComp},
        data() {
            return {
                searchConf:{
                    showListFlag:false,
                    loadingFlag:false,
                    defaultColSpan: 8,
                    paramConf: {
                        title: ["title", {rules: []}],
                        keyWord: ["keyWord", {rules: []}],
                        tagIds: ["tagIds", {rules: []}],
                        content:["content",{rules: []}]
                    },
                    binding:{
                        announcementTagList:[]
                    }
                },
                searchForm:this.$form.createForm(this,{name:'search_form'}),
                tableConf: {
                    data: [],
                    columns: tableColumns,
                    loading: false,
                    pagination: {
                        current:1,
                        pageSize:10,
                        pageSizeOptions:['10','20','50','100'],
                        showQuickJumper:false,
                        showSizeChanger:true,
                        total:0,
                        showTotal(total,range){
                            return `${range[0]}-${range[1]} of ${total} items` ;
                        }
                    },
                    filters:{},
                    sorter:{},
                    scroll:{
                        x: 750
                    }
                },
                tableCheckIdList: [],
                dialogFormConf: {
                    visible: false,
                    actionType: "create"
                },
                dialogFormObj: {
                    title: '',
                    keyWord: '',
                    tagIds: ''
                },
                drawerConf:{
                    detail:{
                        announcementDraft:{
                            title:"公告草稿详情",
                            closable:true,
                            visible:false,
                            placement:"right",
                            mask:true,
                            maskStyle:{
                                overFlowY:"auto"
                            },
                            wrapStyle:{
                                overFlowY:"auto"
                            },
                            drawerStyle:{
                                overFlowY:"auto"
                            },
                            bodyStyle:{
                                overFlowY:"auto"
                            },
                            maskClosable:true,  //点击蒙层是否关闭,
                            dataObj:{},
                            drawerFieldConf:AnnouncementDraftDetailDrawerConf
                        },
                    },
                },
            }
        },
        computed:{
            rowSelection() {    //行选择
                return {
                    selectedRowKeys: this.tableCheckIdList,
                    onChange: (selectedRowKeys, selectedRows) => {  //勾选 修改事件
                        this.tableCheckIdList = selectedRowKeys;
                    },
                    getCheckboxProps: record => ({  //选择框的默认属性配置
                        props: {},
                    }),
                };
            }
        },
        methods: {
            getAnnouncementTagListFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealChangeTableSearchLoadingState(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
                this.tableConf.loading = loadingFlag;
            },
            dealGetAllAnnouncementTagList(){    //取得所有的 公告标签
                var _this = this ;
                AnnouncementMyDraftListApi.getAllAnnouncementTagEnums().then((res) =>{
                    if(res.hasError == false){
                        _this.searchConf.binding.announcementTagList = res.enumList ;
                    }
                })
            },
            dealGetMyAnnouncementDrafts() {   //取得公告列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                AnnouncementMyDraftListApi.getAllMyCreateAnnouncementDrafts().then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                    }
                    _this.dealChangeTableSearchLoadingState(false);
                }).catch((e) =>{
                    _this.dealChangeTableSearchLoadingState(false);
                })
            },
            dealQueryAnnouncementDrafts(queryFieldList,pagination,sorter) {    //带查询条件 检索公告列表
                var _this = this;
                _this.dealChangeTableSearchLoadingState(true);
                AnnouncementMyDraftListApi.getAllMyCreateAnnouncementDrafts(queryFieldList,pagination,sorter).then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                        //清空 已勾选
                        _this.tableCheckIdList = [] ;
                    }
                    _this.dealChangeTableSearchLoadingState(false);
                }).catch((e) =>{
                    _this.dealChangeTableSearchLoadingState(false);
                })
            },
            dealBatchDelAnnouncementDraft() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                AnnouncementMyDraftListApi.batchDelAnnouncementDraft(delIds).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            this.$message.success(res.info);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealDelOneRowById(delId) {   //根据id 删除
                var _this = this;
                AnnouncementMyDraftListApi.delOneAnnouncementDraft(delId).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            _this.$message.success(res.info);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealBatchPublishAnnouncementDraft() {  //批量发布
                var _this = this;
                var publishIds = _this.tableCheckIdList;
                AnnouncementMyDraftListApi.batchPublishAnnouncementDraft(publishIds).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            this.$message.success(res.info);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealPublishOneRowById(delId) {   //根据id 将草稿的公告 发布
                var _this = this;
                AnnouncementMyDraftListApi.publishOneAnnouncementDraft(delId).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            _this.$message.success(res.info);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealGetSearchFormQueryConf(queryObj){   //取得查询基本配置
                var _this = this ;
                var queryFieldArr = [] ;
                if(queryObj) {
                    for (var key in queryObj){
                        var searchFieldObj = searchFormQueryConf[key];
                        if(searchFieldObj){
                            const queryVal = queryObj[key] ;
                            if(queryVal || queryVal == 0){
                                searchFieldObj['value'] = queryObj[key];
                                queryFieldArr.push(searchFieldObj);
                            }
                        }
                    }
                }
                return queryFieldArr ;
            },
            handleSearchFormQuery(e) {
                var _this = this ;
                if (e) {
                    e.preventDefault();
                }
                var paginationTemp = _this.tableConf.pagination ;
                var sorterTemp = _this.tableConf.sorter ;
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        //取得 bean 形式 的查询条件数组
                        var searchFieldArr = _this.dealGetSearchFormQueryConf(values);
                        _this.dealQueryAnnouncementDrafts(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleAnnouncementDraftBatchDeleteByIds(e) {     // 批量删除
                var _this = this;
                var selectDelIds = _this.tableCheckIdList;
                if (selectDelIds.length < 1) {
                    _this.$message.warning("请选择至少一条要删除的数据！");
                } else {
                    _this.$confirm({
                        content: '是否确认删除所选的' + selectDelIds.length + "条数据？",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealBatchDelAnnouncementDraft();
                        },
                        onCancel() {
                            _this.$message.info("操作：取消删除");
                        }
                    })
                }
            },
            handleDeleteOneById(delId) {     //删除指定行
                var _this = this;
                if (delId) {
                    _this.$confirm({
                        content: '是否确认删除所选行？',
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealDelOneRowById(delId);
                        },
                        onCancel() {
                            _this.$message.info("操作：取消删除");
                        }
                    })
                } else {
                    _this.$message.warning("无效删除操作！");
                }
            },
            handleAnnouncementDraftBatchPublishByIds(e) {     // 批量发布
                var _this = this;
                var selectDelIds = _this.tableCheckIdList;
                if (selectDelIds.length < 1) {
                    _this.$message.warning("请选择至少一条要发布的公告！");
                } else {
                    _this.$confirm({
                        content: '是否确认发布所选的' + selectDelIds.length + "条公告？",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealBatchPublishAnnouncementDraft();
                        },
                        onCancel() {
                            _this.$message.info("操作：取消发布");
                        }
                    })
                }
            },
            handlePublishOneById(delId) {     //发布指定公告
                var _this = this;
                if (delId) {
                    _this.$confirm({
                        content: '是否确认发布所选行？',
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealPublishOneRowById(delId);
                        },
                        onCancel() {
                            _this.$message.info("操作：取消发布");
                        }
                    })
                } else {
                    _this.$message.warning("无效发布操作！");
                }
            },
            handleTableChange(pagination, filters, sorter) {    //表格变动-页码跳转/排序/筛选
                this.tableConf.pagination = pagination ;
                this.tableConf.filters = filters ;
                this.tableConf.sorter = sorter ;
                this.handleSearchFormQuery();
            },
            handleTableActionGroupClick(e,record){  //表格-更多操作：按key区分操作类型
                var _this = this ;
                if(e.key == "recordDel"){   //行删除
                    _this.handleDeleteOneById(record.fid);
                }   else if(e.key == "publish"){ //行锁定
                    _this.handlePublishOneById(record.fid);
                }
            },
            handleGoToAnnouncementCreateView(){     //跳转到 [新建公告] 页面
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要编辑的数据！');
                }   else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要编辑的数据！');
                }   else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        _this.dealGoToAnnouncementCreateView(selectRowId) ;
                    }   else {
                        this.$message.warning('操作失败！未取得有效的行id！');
                    }
                }
            },
            dealGoToAnnouncementCreateView(fid){   //跳转到 [新建公告] 页面 处理
                var routeParam = {
                    fid: fid,
                    action:"update"
                }
                this.$router.push({ path: '/index/announcement/create', query: routeParam});
            },
            handleAnnouncementDraftDetailDrawerShow(e,record){   //Drawer-公告草稿 详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.announcementDraft.dataObj = record ;
                    this.drawerConf.detail.announcementDraft.visible = true ;
                }   else {
                    this.$message.error("打开无效的行详情！");
                }
            },
            handleAnnouncementDraftDetailDrawerClose(e){ //Drawer-公告草稿 详情关闭
                this.drawerConf.detail.announcementDraft.visible = false ;
            }
        },
        created(){
            this.dealGetMyAnnouncementDrafts();
            this.dealGetAllAnnouncementTagList();
            var currentRoute = this.$route ;
        },
        destroyed(){
            console.log("我的草稿箱-页面销毁 ...")
        }

    }
</script>
<style>

</style>
