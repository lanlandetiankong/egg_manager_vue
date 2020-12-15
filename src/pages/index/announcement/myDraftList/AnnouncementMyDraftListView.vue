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
                        <a-row :gutter="6">
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.title')">
                                    <a-input v-decorator="searchConf.paramConf.title"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.keyword')">
                                    <a-input v-decorator="searchConf.paramConf.keyWord"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.tag')">
                                    <a-select showSearch allowClear
                                              :placeholder="$t('langMap.commons.forms.pleaseChoose')"
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
                                <a-form-item :label="$t('langMap.table.fields.common.content')">
                                    <a-input v-decorator="searchConf.paramConf.content"/>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" :style="{ textAlign: 'right' }">
                                <a-button type="primary" html-type="submit" icon="search"
                                          :loading="searchConf.loadingFlag"
                                >
                                    {{$t('langMap.button.actions.query')}}
                                </a-button>
                                <a-button :style="{ marginLeft: '8px' }" icon="close-square"
                                          @click="handleSearchFormReset">
                                    {{$t('langMap.button.actions.reset')}}
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
                    :gutter="6"
                    justify="start"
                    type="flex"
                >
                    <a-col>
                        <a-button type="primary" icon="check"
                                  @click="handleAnnouncementDraftBatchPublishByIds">
                            {{$t('langMap.button.actions.publish')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="check"
                                  @click="handleGoToAnnouncementCreateView">
                            {{$t('langMap.button.actions.edit')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" icon="delete"
                                  @click="handleAnnouncementDraftBatchDeleteByIds">
                            {{$t('langMap.button.actions.batchDelByIds')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-switch
                            :checkedChildren="$t('langMap.table.config.showQuery')"
                            :unCheckedChildren="$t('langMap.table.config.hiddenQuery')"
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
                    :locale="{emptyText:$t('langMap.table.config.emptyData')}"
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
                                {{$t('langMap.drawer.actions.detail')}}
                            </a>
                            <a-divider type="vertical" />
                            <a-dropdown>
                                <a-menu slot="overlay" @click="handleTableActionGroupClick($event,record)">
                                    <a-menu-item key="recordDel">{{$t('langMap.button.actions.delById')}}</a-menu-item>
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
    import {AnnouncementMyDraftListApi} from './announcementMyDraftListApi'
    import {DrawerFieldTypeEnum,QueryMatchType} from '~Components/index/common/drawer/drawer_define.js'
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';

    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';

    export default {
        name: "AnnouncementMyDraftListView",
        components:{SimpleDetailDrawerComp},
        mixins:[EggCommonMixin],
        data() {
            const textAlignDefault = 'left' ;
            //字段配置(Query/Drawer)
            const fieldInfoConfObj = {
                title:{
                    fieldLabel:this.$t('langMap.table.fields.announcement.title'),
                    fieldName:'title', matching:QueryMatchType.like,
                },
                keyWord:{
                    fieldLabel:this.$t('langMap.table.fields.announcement.keyWord'),
                    fieldName:'keyWord', matching:QueryMatchType.like,
                },
                tagIds:{
                    fieldName:'tagIds', matching:QueryMatchType.like,drawerAble:false,
                },
                tagNameOfStr:{
                    fieldLabel:this.$t('langMap.table.fields.announcement.tagNameOfStr'),
                    fieldName:'tagNameOfStr',searchAble:false,
                },
                content:{
                    fieldLabel:this.$t('langMap.table.fields.announcement.content'),
                    fieldName:'content', matching:QueryMatchType.like,type:DrawerFieldTypeEnum.HtmlDom
                },
                remark:{
                    fieldLabel:this.$t('langMap.table.fields.common.remark'),
                    fieldName:'remark', matching:QueryMatchType.like,
                }
            };
            return {
                fieldInfoConf:fieldInfoConfObj,
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
                    columns: [{
                        title: '标题',
                        align:textAlignDefault,
                        dataIndex: 'title',
                        key: 'title',
                        width:100,
                    }, {
                        title: '关键字',
                        align:textAlignDefault,
                        dataIndex: 'keyWord',
                        key: 'keyWord',
                        width:100,
                    },{
                        title: '标签',
                        align:textAlignDefault,
                        key: 'tagNames',
                        width:150,
                        scopedSlots: { customRender: 'tagNamesRender' },
                    }, {
                        title: '内容',
                        align:textAlignDefault,
                        dataIndex: 'shortContent',
                        width:300,
                        key: 'shortContent',
                    },  {
                        title: '发布部门',
                        align:textAlignDefault,
                        dataIndex: 'publishDepartment',
                        width:100,
                        key: 'publishDepartment',
                    }, {
                        title:'操作',
                        key:'operation',
                        width: 220,
                        scopedSlots: { customRender: 'action' }
                    }],
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
                            title:this.$t('langMap.drawer.title.detailForAnnouncementDraft'),
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
                            drawerFieldConf:fieldInfoConfObj
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
                        props: {
                            name:record.fid
                        }
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
                    if(res.success){
                        _this.searchConf.binding.announcementTagList = res.enumData ;
                    }
                })
            },
            dealGetMyAnnouncementDrafts() {   //取得公告列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                AnnouncementMyDraftListApi.getAllMyCreateAnnouncementDrafts().then((res) => {
                    if (res) {
                        this.tableConf.data = res.gridList;
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
                        this.tableConf.data = res.gridList;
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
                        if (res.success) {  //已经有对错误进行预处理
                            this.$message.success(res.msg);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealDelOneRowById(delId) {   //根据id 删除
                var _this = this;
                AnnouncementMyDraftListApi.delOneAnnouncementDraft(delId).then((res) => {
                    if (res) {
                        if (res.success) {  //已经有对错误进行预处理
                            _this.$message.success(res.msg);
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
                        if (res.success) {  //已经有对错误进行预处理
                            this.$message.success(res.msg);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealPublishOneRowById(delId) {   //根据id 将草稿的公告 发布
                var _this = this;
                AnnouncementMyDraftListApi.publishOneAnnouncementDraft(delId).then((res) => {
                    if (res) {
                        if (res.success) {  //已经有对错误进行预处理
                            _this.$message.success(res.msg);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
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
                        var searchFieldArr = _this.mixin_dealGetSearchFormQueryConf(_this.fieldInfoConf,values);
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
                    _this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForDelete'));
                } else {
                    _this.$confirm({
                        content: _this.$t('langMap.message.confirm.isConfirmDeleteWhatSelectedRow',[selectDelIds.length]),
                        okText: _this.$t('langMap.button.actions.confirm'),
                        cancelText: _this.$t('langMap.button.actions.cancel'),
                        onOk() {
                            _this.dealBatchDelAnnouncementDraft();
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.info.actionOfCancelDelete'));
                        }
                    })
                }
            },
            handleDeleteOneById(delId) {     //删除指定行
                var _this = this;
                if (delId) {
                    _this.$confirm({
                        content: this.$t('langMap.message.confirm.isConfirmDeleteSelectedRow'),
                        okText: _this.$t('langMap.button.actions.confirm'),
                        cancelText: _this.$t('langMap.button.actions.cancel'),
                        onOk() {
                            _this.dealDelOneRowById(delId);
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.info.actionOfCancelDelete'));
                        }
                    })
                } else {
                    _this.$message.warning(_this.$t('langMap.message.warning.invalidDeleteOperation'));
                }
            },
            handleAnnouncementDraftBatchPublishByIds(e) {     // 批量发布
                var _this = this;
                var selectDelIds = _this.tableCheckIdList;
                if (selectDelIds.length < 1) {
                    _this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else {
                    _this.$confirm({
                        content: _this.$t('langMap.message.confirm.isConfirmPublishWhatSelectedRow',[selectDelIds.length]),
                        okText: _this.$t('langMap.button.actions.confirm'),
                        cancelText: _this.$t('langMap.button.actions.cancel'),
                        onOk() {
                            _this.dealBatchPublishAnnouncementDraft();
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.info.actionOfCancelPublish'));
                        }
                    })
                }
            },
            handlePublishOneById(delId) {     //发布指定公告
                var _this = this;
                if (delId) {
                    _this.$confirm({
                        content: _this.$t('langMap.message.confirm.isConfirmPublishSelectedRow'),
                        okText: _this.$t('langMap.button.actions.confirm'),
                        cancelText: _this.$t('langMap.button.actions.cancel'),
                        onOk() {
                            _this.dealPublishOneRowById(delId);
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.info.actionOfCancelPublish'));
                        }
                    })
                } else {
                    _this.$message.warning(_this.$t('langMap.message.warning.invalidPublishOperation'));
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
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                }   else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                }   else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        _this.dealGoToAnnouncementCreateView(selectRowId) ;
                    }   else {
                        this.$message.warning(this.$t('langMap.message.error.failedDueToNotGettingId'));
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
                    this.$message.error(this.$t('langMap.message.warning.openInvalidRowDetails'));
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
