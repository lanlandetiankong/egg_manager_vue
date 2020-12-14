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
                        <a-button type="danger" icon="delete"
                                  @click="handleAnnouncementBatchDeleteByIds">
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
                        <a @click="handleAnnouncementDetailDrawerShow($event,record)">
                                {{$t('langMap.drawer.actions.detail')}}
                            </a>
                            <a-divider type="vertical" />
                        <a-button type="danger" size="small" @click="handleDeleteOneById(record.fid)">{{$t('langMap.button.actions.delById')}}</a-button>
                    </template>
                </a-table>
            </div>
            <!-- 弹窗dom-区域 -->
            <div>
                <a-drawer
                    :title="drawerConf.detail.announcement.title"
                    :closeable="drawerConf.detail.announcement.closable"
                    :visible="drawerConf.detail.announcement.visible"
                    :placement="drawerConf.detail.announcement.placement"
                    :mask="drawerConf.detail.announcement.mask"
                    :maskStyle="drawerConf.detail.announcement.maskStyle"
                    :wrapStyle="drawerConf.detail.announcement.wrapStyle"
                    :drawerStyle="drawerConf.detail.announcement.drawerStyle"
                    :bodyStyle="drawerConf.detail.announcement.bodyStyle"
                    :maskClosable="drawerConf.detail.announcement.maskClosable"
                    @close="handleAnnouncementDetailDrawerClose"
                >
                    <simple-detail-drawer-comp
                        :dataObj="drawerConf.detail.announcement.dataObj"
                        :visible="drawerConf.detail.announcement.visible"
                        :drawerFieldConf="drawerConf.detail.announcement.drawerFieldConf"
                    />
                </a-drawer>
            </div><!-- 弹窗dom-区域 -->
            <div>
                <a-drawer
                    :title="drawerConf.detail.announcement.title"
                    :closeable="drawerConf.detail.announcement.closable"
                    :visible="drawerConf.detail.announcement.visible"
                    :placement="drawerConf.detail.announcement.placement"
                    :mask="drawerConf.detail.announcement.mask"
                    :maskStyle="drawerConf.detail.announcement.maskStyle"
                    :wrapStyle="drawerConf.detail.announcement.wrapStyle"
                    :drawerStyle="drawerConf.detail.announcement.drawerStyle"
                    :bodyStyle="drawerConf.detail.announcement.bodyStyle"
                    :maskClosable="drawerConf.detail.announcement.maskClosable"
                    @close="handleAnnouncementDetailDrawerClose"
                >
                    <simple-detail-drawer-comp
                        :dataObj="drawerConf.detail.announcement.dataObj"
                        :visible="drawerConf.detail.announcement.visible"
                        :drawerFieldConf="drawerConf.detail.announcement.drawerFieldConf"
                    />
                </a-drawer>
            </div>
        </div>
    </div>
</template>
<script>
    import {AnnouncementMyCreateListApi} from './announcementMyCreateListApi'
    import {DrawerFieldTypeEnum,QueryMatchType} from '~Components/index/common/drawer/drawer_define.js'
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';

    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';

    export default {
        name: "AnnouncementAllListView",
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
                        announcement:{
                            title:this.$t('langMap.drawer.title.detailForAnnouncement'),
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
                AnnouncementMyCreateListApi.getAllAnnouncementTagEnums().then((res) =>{
                    if(res.success){
                        _this.searchConf.binding.announcementTagList = res.enumList ;
                    }
                })
            },
            dealGetAllAnnouncements() {   //取得公告列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                AnnouncementMyCreateListApi.getAllMyCreateAnnouncements().then((res) => {
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
            dealQueryAnnouncements(queryFieldList,pagination,sorter) {    //带查询条件 检索公告列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                AnnouncementMyCreateListApi.getAllMyCreateAnnouncements(queryFieldList,pagination,sorter).then((res) => {
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
            dealBatchDelAnnouncement() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                AnnouncementMyCreateListApi.batchDelAnnouncement(delIds).then((res) => {
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
                AnnouncementMyCreateListApi.delOneAnnouncement(delId).then((res) => {
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
                        _this.dealQueryAnnouncements(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleAnnouncementBatchDeleteByIds(e) {     // 批量删除
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
                            _this.dealBatchDelAnnouncement();
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
            handleTableChange(pagination, filters, sorter) {    //表格变动-页码跳转/排序/筛选
                this.tableConf.pagination = pagination ;
                this.tableConf.filters = filters ;
                this.tableConf.sorter = sorter ;
                this.handleSearchFormQuery();
            },
            handleAnnouncementDetailDrawerShow(e,record){   //Drawer-公告 详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.announcement.dataObj = record ;
                    this.drawerConf.detail.announcement.visible = true ;
                }   else {
                    this.$message.error(this.$t('langMap.message.warning.openInvalidRowDetails'));
                }
            },
            handleAnnouncementDetailDrawerClose(e){ //Drawer-公告 详情关闭
                this.drawerConf.detail.announcement.visible = false ;
            }
        },
        created(){
            this.dealGetAllAnnouncements();
            this.dealGetAllAnnouncementTagList();
            var currentRoute = this.$route ;
        },
        destroyed(){
            console.log("我创建的公告列表-页面销毁 ...")
        }
    }
</script>
<style>

</style>
