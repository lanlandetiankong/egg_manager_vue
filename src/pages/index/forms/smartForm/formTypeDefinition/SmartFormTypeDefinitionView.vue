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
                                <a-form-item :label="$t('langMap.table.fields.common.type')">
                                    <a-input v-decorator="searchConf.paramConf.name"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.description')">
                                    <a-input v-decorator="searchConf.paramConf.description"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.remark')">
                                    <a-input v-decorator="searchConf.paramConf.remark"/>
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
                        <a-button type="primary" icon="plus"
                                  @click="handleAddByFormBtnClick">
                            {{$t('langMap.button.actions.addByForm')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="edit"
                                  @click="handleUpdateByFormBtnClick">
                            {{$t('langMap.button.actions.updateByForm')}}
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" icon="delete"
                                  @click="handleBatchDelByIdsBtnClick">
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
                    @change="handleTableChange"
                >
                    <span slot="iconRender" slot-scope="text,record">
                            <span :key="record.fid"
                                  v-show="typeof record.iconVal != 'undefined' && record.iconVal != null && record.iconVal.length > 0">
                                 <a-icon :type="record.iconVal" />
                            </span>
                    </span>
                    <span slot="typeStr" slot-scope="text,record">
                        <a-tag color="blue" :key="record.typeStr">
                            {{record.typeStr}}
                        </a-tag>
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
        <!-- 弹窗dom-区域 -->
        <div>
            <smart-form-type-definition-create-form-comp
                ref="smartFormTypeDefinitionCreateFormCompRef"
                :visible="dialogFormConf.visible"
                :formObj="dialogFormObj"
                :actionType="dialogFormConf.actionType"
                @createFormCancel="handleCreateFormDialogCancel"
                @createFormSubmit="handleCreateFormDialogSubmit"
            >
            </smart-form-type-definition-create-form-comp>
            <a-drawer
                :title="drawerConf.detail.defaultGridItem.title"
                :closeable="drawerConf.detail.defaultGridItem.closable"
                :visible="drawerConf.detail.defaultGridItem.visible"
                :placement="drawerConf.detail.defaultGridItem.placement"
                :mask="drawerConf.detail.defaultGridItem.mask"
                :maskStyle="drawerConf.detail.defaultGridItem.maskStyle"
                :wrapStyle="drawerConf.detail.defaultGridItem.wrapStyle"
                :drawerStyle="drawerConf.detail.defaultGridItem.drawerStyle"
                :bodyStyle="drawerConf.detail.defaultGridItem.bodyStyle"
                :maskClosable="drawerConf.detail.defaultGridItem.maskClosable"
                @close="handleDefaultDataItemDetailDrawerClose"
            >
                <simple-detail-drawer-comp
                    :dataObj="drawerConf.detail.defaultGridItem.dataObj"
                    :visible="drawerConf.detail.defaultGridItem.visible"
                    :drawerFieldConf="drawerConf.detail.defaultGridItem.drawerFieldConf"
                />
            </a-drawer>
        </div>
    </div>
</template>
<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ACol from "ant-design-vue/es/grid/Col";

    import {SmartFormTypeDefinitionApi} from './smartFormTypeDefinitionApi.js'
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';

    import SmartFormTypeDefinitionCreateFormComp from "@/components/index/forms/smartForm/formTypeDefinition/SmartFormTypeDefinitionCreateFormComp";
    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';

    export default {
        name: "SmartFormTypeDefinitionView",
        components: {SmartFormTypeDefinitionCreateFormComp,SimpleDetailDrawerComp, ACol, AFormItem},
        mixins:[EggCommonMixin],
        data() {
            const textAlignDefault = 'left' ;
            //字段配置(Query/Drawer)
            const fieldInfoConfObj = {
                name:{
                    fieldLabel:this.$t('langMap.table.fields.formType.formTypeName'),
                    fieldName:'name', matching:'like'
                },
                description:{
                    fieldLabel:this.$t('langMap.table.fields.common.description'),
                    fieldName:'description', matching:'like'
                },
                orderNum:{
                    fieldLabel:this.$t('langMap.table.fields.common.sortVal'),
                    fieldName:'orderNum',searchAble:false
                },
                remark:{
                    fieldLabel:this.$t('langMap.table.fields.common.remark'),
                    fieldName:'remark', matching:'like'
                }
            };
            return {
                fieldInfoConf:fieldInfoConfObj,
                searchConf:{
                    showListFlag:false,
                    loadingFlag:false,
                    defaultColSpan: 8,
                    paramConf: {
                        name: ["name", {rules: []}],
                        description: ["description", {rules: []}],
                        remark:["remark",{rules: []}]
                    }
                },
                searchForm:this.$form.createForm(this,{name:'search_form'}),
                tableConf: {
                    data: [],
                    columns: [{
                        title: '类型名',
                        align:textAlignDefault,
                        dataIndex: 'name',
                        key: 'name'
                    }, {
                        title: '描述',
                        align:textAlignDefault,
                        dataIndex: 'description',
                        key: 'description'
                    },{
                        title: '排序',
                        align:textAlignDefault,
                        dataIndex: 'orderNum',
                        key: 'orderNum'
                    },{
                        title:'操作',
                        align:textAlignDefault,
                        dataIndex:"operation",
                        key:'operation',
                        fixed:'right',
                        width:220,
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
                    sorter:{}
                },
                tableCheckIdList: [],
                dialogFormConf: {
                    visible: false,
                    actionType: "create"
                },
                dialogFormObj: {
                    name: '',
                    description:'',
                    orderNum:undefined,
                    remark:''
                },
                drawerConf:{
                    detail:{
                        defaultGridItem:{
                            title:this.$t('langMap.drawer.title.detailForDefineFormType'),
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
            onSelectChange(selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            },
            dealGetDialogRefFormObj() {    //返回 弹窗表单 的form对象
                return this.$refs.smartFormTypeDefinitionCreateFormCompRef.smartFormTypeDefinitionCreateForm;
            },
            dealChangeTableSearchLoadingState(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
                this.tableConf.loading = loadingFlag;
            },
            dealGetAllGridData() {   //取得数据列表
                var _this = this;
                _this.dealChangeTableSearchLoadingState(true);
                SmartFormTypeDefinitionApi.getDataPage().then((res) => {
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
            dealQueryGridData(queryFieldList,pagination,sorter) {    //带查询条件 检索数据列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                SmartFormTypeDefinitionApi.getDataPage(queryFieldList,pagination,sorter).then((res) => {
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
            dealBatchDelByIdsBtnClick() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                SmartFormTypeDefinitionApi.batchDelByIds(delIds).then((res) => {
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
                SmartFormTypeDefinitionApi.delOneById(delId).then((res) => {
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
                        _this.dealQueryGridData(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleAddByFormBtnClick() {     //新增按钮-点击
                var _this = this;
                _this.dialogFormConf.visible = true;   //显示弹窗
                _this.dialogFormConf.actionType = "create";
                _this.dialogFormObj = {};
            },
            handleUpdateByFormBtnClick() {  //更新按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        SmartFormTypeDefinitionApi.getOneItemById(selectRowId).then((res) => {
                            var selectUserBean = res.bean;
                            if (selectUserBean) {
                                _this.dialogFormConf.visible = true;   //显示弹窗
                                _this.dialogFormConf.actionType = "update";
                                _this.dialogFormObj = selectUserBean;
                                console.log(_this.dialogFormObj);
                            }
                        })
                    } else {
                        this.$message.warning(this.$t('langMap.message.error.failedDueToNotGettingId'));
                    }
                }
            },
            handleBatchDelByIdsBtnClick(e) {     // 批量删除
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
                            _this.dealBatchDelByIdsBtnClick();
                        },
                        onCancel() {
                            _this.$message.info(_this.$t('langMap.message.info.actionOfCancelDelete'));
                        }
                    })
                }
            },
            handleCreateFormDialogCancel(e) {  // 创建/更新 表单->取消
                var _this = this;
                _this.dialogFormConf.visible = false;
            },
            handleCreateFormDialogSubmit(e) {   // 创建/更新 表单->提交
                var _this = this;
                const dialogFormObj = _this.dealGetDialogRefFormObj();
                dialogFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    var closeDialogFlag = true;
                    if (_this.dialogFormConf.actionType == "create") {        //新建-提交
                        SmartFormTypeDefinitionApi.addByForm(values).then((res) => {
                            if (res) {
                                if (res.success) {  //异常已经有预处理了
                                    this.$message.success(res.msg);
                                    _this.handleSearchFormQuery(); //表格重新搜索
                                } else {
                                    closeDialogFlag = false;
                                }
                            } else {
                                closeDialogFlag = false;
                            }
                            if (closeDialogFlag == true) {    //关闭弹窗
                                dialogFormObj.resetFields();
                                _this.dialogFormConf.visible = false;
                            }
                        })
                    } else if (_this.dialogFormConf.actionType == "update") {   //更新-提交
                        values['fid'] = _this.dialogFormObj.fid;   //提交时，回填fid值
                        SmartFormTypeDefinitionApi.updateByForm(values).then((res) => {
                            if (res) {
                                if (res.success) {  //异常已经有预处理了
                                    this.$message.success(res.msg);
                                    _this.handleSearchFormQuery(); //表格重新搜索
                                } else {
                                    closeDialogFlag = false;
                                }
                            } else {
                                closeDialogFlag = false;
                            }
                            if (closeDialogFlag == true) {    //关闭弹窗
                                dialogFormObj.resetFields();
                                _this.dialogFormConf.visible = false;
                            }
                        })
                    }

                });

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
            handleDetailDrawerShow(e,record){   //Drawer-详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.defaultGridItem.dataObj = record ;
                    this.drawerConf.detail.defaultGridItem.visible = true ;
                }   else {
                    this.$message.error(this.$t('langMap.message.warning.openInvalidRowDetails'));
                }
            },
            handleDefaultDataItemDetailDrawerClose(e){ //Drawer-详情关闭
                this.drawerConf.detail.defaultGridItem.visible = false ;
            }
        },
        created(){
            this.dealGetAllGridData();
        },
        destroyed(){
            console.log("智能表单类型管理-页面销毁 ...")
        }
    }
</script>

<style scoped>

</style>
