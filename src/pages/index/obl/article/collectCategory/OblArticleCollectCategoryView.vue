<template>
    <div>
        <div>
            <!-- 搜索区域 -->
            <query-form-comp
                :ref="ConstantObj.queryFormCompRef"
                :showAble="searchConf.showAble"
                :loadingFlag="searchConf.loadingFlag"
                :formItemConf="searchConf.formItemConf"
                @execQuery="handleSearchFormQuery"
            />
            <!-- 操作按钮-区域-->
            <div>
                <a-row
                    :gutter="6"
                    justify="start"
                    type="flex"
                >
                    <a-col>
                        <a-button type="primary" icon="plus"
                                  @click="handleCreateByForm">
                            {{$t('langMap.button.actions.addByForm')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="edit"
                                  @click="handleUpdateByForm">
                            {{$t('langMap.button.actions.updateByForm')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" icon="delete"
                                  @click="handleBatchDeleteByIds">
                            {{$t('langMap.button.actions.batchDelByIds')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-switch
                            :checkedChildren="$t('langMap.table.config.showQuery')"
                            :unCheckedChildren="$t('langMap.table.config.hiddenQuery')"
                            size="large"
                            :style="{height:'30px'}"
                            v-model="searchConf.showAble"
                        />
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
                    :bordered="tableConf.bordered"
                    :columns="tableConf.columns"
                    :dataSource="tableConf.data"
                    :loading="searchConf.loadingFlag"
                    :scroll="tableConf.scroll"
                    :rowSelection="rowSelection"
                    @change="handleTableChange"
                >
                    <span slot="iconRender" slot-scope="text,record">
                            <span :key="record.fid"
                                  v-show="typeof record.iconName != 'undefined' && record.iconName != null && record.iconName.length > 0">
                                 <a-icon :type="record.iconName" />
                            </span>
                    </span>
                    <template slot="action" slot-scope="text,record">
                        <span>
                            <a @click="handleDetailDrawerShow($event,record)">
                                {{$t('langMap.drawer.actions.detail')}}
                            </a>
                            <a-divider type="vertical" />
                            <a-button type="danger" size="small" @click="handleDeleteOneById(record.fid)">{{$t('langMap.button.actions.delById')}}</a-button>
                        </span>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>
<script>
    import {QueryMatchType} from '~Components/regular/common/drawer/drawer_define.js'
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';
    import {OblArticleCollectCategoryApi} from './OblArticleCollectCategoryApi.js'
    import {FormItemTypeEnum,ConstantObj} from "~Components/constant_define";

    import QueryFormComp from '~Components/regular/query/QueryFormComp'
    import RowDetailDrawerComp from '~Components/regular/common/drawer/RowDetailDrawerComp';

    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ACol from "ant-design-vue/es/grid/Col";
    export default {
        name: "OblArticleCollectCategoryView",
        components: {QueryFormComp,RowDetailDrawerComp, ACol, AFormItem},
        mixins:[EggCommonMixin],
        data() {
            const textAlignDefault = 'left';
            //字段配置(Query/Drawer)
            const fieldInfoConfObj = {
                name:{
                    fieldLabel:this.$t('langMap.table.fields.obl.articleCollectCategory.name'),
                    fieldName:'name',matching:QueryMatchType.like
                },
                pid:{
                    fieldName:'pid',matching:QueryMatchType.equals,drawerAble:false
                },
                parentName:{
                    fieldLabel:this.$t('langMap.table.fields.obl.articleCollectCategory.parentName'),
                    fieldName:'parentName',searchAble:false,
                    fieldKeySplitArr:['parent','name'],isNeedSplit:true
                },
                remark:{
                    fieldLabel:this.$t('langMap.table.fields.common.remark'),
                    fieldName:'remark',matching:QueryMatchType.equals
                }
            };
            return {
                ConstantObj,
                fieldInfoConf:fieldInfoConfObj,
                binding:{
                    pidList:[]
                },
                searchConf:{
                    showAble:false,
                    loadingFlag:false,
                    formItemConf:{
                        name:{
                            key:'name',
                            formType:FormItemTypeEnum.Input,
                            label:this.$t('langMap.table.fields.obl.articleCollectCategory.name'),
                            decorator:["name", {rules: []}],
                        },
                        pid:{
                            key:'pid',
                            formType:FormItemTypeEnum.Input,
                            label:this.$t('langMap.table.fields.obl.articleCollectCategory.parentName'),
                            decorator:["pid", {rules: []}],
                            treeDefaultExpandAll:false,
                            treeNodeFilterProp:"title",
                            treeData:[]
                        },
                        remark:{
                            key:'remark',
                            formType:FormItemTypeEnum.Input,
                            label:this.$t('langMap.table.fields.common.remark'),
                            decorator:["remark", {rules: []}],
                        }
                    }
                },
                tableConf: {
                    data: [],
                    columns: [{
                        title: this.$t('langMap.table.fields.obl.articleCollectCategory.name'),
                        align:textAlignDefault,
                        dataIndex: 'name',
                        key: 'name',
                        width:100,
                    },{
                        title: this.$t('langMap.table.fields.obl.articleCollectCategory.parentName'),
                        align:textAlignDefault,
                        dataIndex: 'parent.name',
                        key: 'parent.name',
                        width:100,
                    },{
                        title: this.$t('langMap.table.fields.obl.articleCollectCategory.iconName'),
                        align:textAlignDefault,
                        dataIndex: 'iconName',
                        key: 'iconName',
                        scopedSlots:{
                            customRender:'iconRender'
                        },
                        width:60
                    },{
                        title: this.$t('langMap.table.fields.common.level'),
                        align:textAlignDefault,
                        dataIndex: 'level',
                        key: 'level',
                        width:70
                    },{
                        title: this.$t('langMap.table.fields.common.weights'),
                        align:textAlignDefault,
                        dataIndex: 'weights',
                        key: 'weights',
                        width:70
                    },{
                        title:this.$t('langMap.table.header.operation'),
                        align:textAlignDefault,
                        dataIndex:"operation",
                        key:'operation',
                        fixed:'right',
                        width:220,
                        scopedSlots: { customRender: 'action' }
                    }],
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
                        x: 1400
                    },
                    bordered:true
                },
                tableCheckIdList: [],
                tableCheckRowList: [],
                dialogFormConf: {
                    initFlag:false,
                    visible: false,
                    actionType: "create"
                },
                dialogFormObj: {
                    name: '',
                    pid:'',
                    weights:0,
                    iconName:'',
                    styleVal:'',
                },
                drawerConf:{
                    detail:{
                        articleCollectCategory:{
                            conf:{
                                title:this.$t('langMap.drawer.obl.article.detailForArticleCollectCategory'),
                            },
                            visible:false,
                            dataObj:{},
                            drawerFieldConf:fieldInfoConfObj
                        },
                    },
                }
            }
        },
        computed:{
            rowSelection() {    //行选择
                return {
                    selectedRowKeys: this.tableCheckIdList,
                    onChange: (selectedRowKeys, selectedRows) => {  //勾选 修改事件
                        this.tableCheckIdList = selectedRowKeys;
                        this.tableCheckRowList = selectedRows;
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
            dealGetPidTreeData(){  //取得-树形数据
                var _this = this ;
                OblArticleCollectCategoryApi.getTreeDataAll().then((res) => {
                    if(res && res.success){
                        if(res.gridList){
                            _this.binding.pidList = res.gridList ;
                        }
                    }
                })
            },
            changeQueryLoading(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
            },
            dealBatchDeleteByIds() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                OblArticleCollectCategoryApi.batchDeleteByIds(delIds).then((res) => {
                    if (res) {
                        if (res.success) {  //已经有对错误进行预处理
                            this.$message.success(res.msg);
                            _this.mixin_invokeQuery(_this); //表格重新搜索
                        }
                    }
                })
            },
            dealDelOneRowById(delId) {   //根据id 删除
                var _this = this;
                OblArticleCollectCategoryApi.deleteById(delId).then((res) => {
                    if (res) {
                        if (res.success) {  //已经有对错误进行预处理
                            _this.$message.success(res.msg);
                            _this.mixin_invokeQuery(_this); //表格重新搜索
                        }
                    }
                })
            },
            handleSearchFormQuery(e,values) {   //带查询条件 检索列表
                var _this = this ;
                //取得 bean 形式 的查询条件数组
                var searchFieldArr = _this.mixin_dealGetSearchFormQueryConf(_this.fieldInfoConf,values);
                _this.changeQueryLoading(true);
                OblArticleCollectCategoryApi.getPageQuery(searchFieldArr,_this.tableConf.pagination,_this.tableConf.sorter).then((res) => {
                    if (res) {
                        this.tableConf.data = res.gridList;
                        if(res.vpage){ //总个数
                            this.tableConf.pagination.total = res.vpage.total ;
                        }
                        //清空 已勾选
                        _this.tableCheckIdList = [] ;
                        _this.tableCheckRowList = [] ;
                    }
                    _this.changeQueryLoading(false);
                }).catch((e) =>{
                    _this.changeQueryLoading(false);
                })
            },
            handleCreateByForm() {     //新增按钮-点击
                var _this = this;
                _this.dialogFormConf.initFlag = true ;  //弹窗初始化
                _this.dialogFormConf.visible = true;   //显示弹窗
                _this.dialogFormConf.actionType = "create";
                _this.dialogFormObj = {
                    weights:0
                };
            },
            handleUpdateByForm() {  //更新按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        OblArticleCollectCategoryApi.getItemById(selectRowId).then((res) => {
                            var selectUserBean = res.bean;
                            if (selectUserBean) {
                                _this.dialogFormConf.initFlag = true ;  //弹窗初始化
                                _this.dialogFormConf.visible = true;   //显示弹窗
                                _this.dialogFormConf.actionType = "update";
                                _this.dialogFormObj = selectUserBean;
                                //console.log(_this.dialogFormObj);
                            }
                        })
                    } else {
                        this.$message.warning(this.$t('langMap.message.error.failedDueToNotGettingId'));
                    }
                }
            },
            handleBatchDeleteByIds(e) {     // 批量删除
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
                            _this.dealBatchDeleteByIds();
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.account.actionOfCancelDelete'));
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
                            _this.$message.info(_this.$t('langMap.message.account.actionOfCancelDelete'));
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
                this.mixin_invokeQuery(this);
            },
            handleParentTreeOfSearchChange(value){  //[上级] SelectTree cchange事件
                console.log("handleParentTreeOfSearchChange",value);
            },
            handleDetailDrawerShow(e,record){   //Drawer-详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.articleCollectCategory.dataObj = record ;
                    this.drawerConf.detail.articleCollectCategory.visible = true ;
                }   else {
                    this.$message.error(this.$t('langMap.message.warning.openInvalidRowDetails'));
                }
            },
            handleDetailDrawerClose(e){ //Drawer-详情关闭
                this.drawerConf.detail.articleCollectCategory.visible = false ;
            }
        },
        watch:{
            binding:{
                handler (val, oval) {
                    //绑定枚举值变化监听并处理
                    this.searchConf.formItemConf.pid.treeData = this.binding.pidList ;
                },
                deep: true,
                immediate:true
            }
        },
        created(){
            this.dealGetPidTreeData();
        },
        mounted() {
            this.mixin_invokeQuery(this);
        },
        destroyed(){
            console.log("文章类别管理-页面销毁 ...");
        }
    }
</script>

<style scoped>

</style>
