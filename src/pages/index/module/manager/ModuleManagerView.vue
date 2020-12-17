<template>
    <div>
        <div>
            <!-- 搜索区域 -->
            <query-form-comp
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
                    :columns="tableConf.columns"
                    :dataSource="tableConf.data"
                    :loading="searchConf.loadingFlag"
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
            <define-module-create-form-comp
                ref="defineModuleCreateFormRef"
                :visible="dialogFormConf.visible"
                :formObj="dialogFormObj"
                :actionType="dialogFormConf.actionType"
                :moduleTypes="binding.moduleTypes"
                @createFormCancel="handleCreateFormCancel"
                @createFormSubmit="handleCreateFormSubmit"
            >
            </define-module-create-form-comp>
            <a-drawer
                :title="drawerConf.detail.defineModule.title"
                :closeable="drawerConf.detail.defineModule.closable"
                :visible="drawerConf.detail.defineModule.visible"
                :placement="drawerConf.detail.defineModule.placement"
                :mask="drawerConf.detail.defineModule.mask"
                :maskStyle="drawerConf.detail.defineModule.maskStyle"
                :wrapStyle="drawerConf.detail.defineModule.wrapStyle"
                :drawerStyle="drawerConf.detail.defineModule.drawerStyle"
                :bodyStyle="drawerConf.detail.defineModule.bodyStyle"
                :maskClosable="drawerConf.detail.defineModule.maskClosable"
                @close="handleDetailDrawerClose"
            >
                <simple-detail-drawer-comp
                    :dataObj="drawerConf.detail.defineModule.dataObj"
                    :visible="drawerConf.detail.defineModule.visible"
                    :drawerFieldConf="drawerConf.detail.defineModule.drawerFieldConf"
                />
            </a-drawer>
        </div>
    </div>
</template>
<script>
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ACol from "ant-design-vue/es/grid/Col";

    import {QueryMatchType} from '~Components/index/common/drawer/drawer_define.js'
    import {ModuleManagerApi} from './moduleManagerApi.js'
    import {ModuleCommonApis} from '~Apis/module/ModuleCommonApis.js'
    import {FormItemTypeEnum} from "~Components/query/form_enum";
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';

    import QueryFormComp from '~Components/query/QueryFormComp'
    import DefineModuleCreateFormComp from "@/components/index/module/manager/DefineModuleCreateFormComp";
    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';

    export default {
        name: "ModuleManagerView",
        components: {QueryFormComp,DefineModuleCreateFormComp,SimpleDetailDrawerComp, ACol, AFormItem},
        mixins:[EggCommonMixin],
        data() {
            const textAlignDefault = 'left' ;
            //字段配置(Query/Drawer)
            const fieldInfoConfObj = {
                name:{
                    fieldLabel:this.$t('langMap.table.fields.module.moduleName'),
                    fieldName:'name',matching:QueryMatchType.like,
                },
                code:{
                    fieldLabel:this.$t('langMap.table.fields.common.code'),
                    fieldName:'code',matching:QueryMatchType.like
                },
                iconVal:{
                    fieldLabel:this.$t('langMap.table.fields.module.iconName'),
                    searchAble:false, fieldName:'iconVal',matching:QueryMatchType.like
                },
                type:{
                    fieldLabel:this.$t('langMap.table.fields.common.type'),
                    fieldName:'type',matching:QueryMatchType.equals,
                },
                remark:{
                    fieldLabel:this.$t('langMap.table.fields.common.remark'),
                    fieldName:'remark',matching:QueryMatchType.like,
                }
            };
            return {
                fieldInfoConf:fieldInfoConfObj,
                binding:{
                    moduleTypes:[]
                },
                searchConf:{
                    showAble:false,
                    loadingFlag:false,
                    formItemConf:{
                        name:{
                            key:'name',
                            formType:FormItemTypeEnum.Input,
                            label:this.$t('langMap.table.fields.module.moduleName'),
                            decorator:["name", {rules: []}],
                        },
                        code:{
                            key:'code',
                            formType:FormItemTypeEnum.Input,
                            label:this.$t('langMap.table.fields.common.code'),
                            decorator:["code", {rules: []}],
                        },
                        type:{
                            key:'type',
                            formType:FormItemTypeEnum.Select,
                            label:this.$t('langMap.table.fields.common.type'),
                            decorator:["type", {rules: []}],
                            options:[]
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
                        title: this.$t('langMap.table.fields.module.moduleName'),
                        align:textAlignDefault,
                        dataIndex: 'name',
                        key: 'name'
                    }, {
                        title: this.$t('langMap.table.fields.common.code'),
                        align:textAlignDefault,
                        dataIndex: 'code',
                        key: 'code'
                    }, {
                        title: this.$t('langMap.table.fields.module.iconName'),
                        align:textAlignDefault,
                        dataIndex: 'iconVal',
                        key: 'iconVal',
                        scopedSlots:{
                            customRender:'iconRender'
                        }
                    }, {
                        title: this.$t('langMap.table.fields.common.type'),
                        align:textAlignDefault,
                        key: 'typeStr',
                        scopedSlots: { customRender: 'typeStr' },
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
                    sorter:{}
                },
                tableCheckIdList: [],
                dialogFormConf: {
                    visible: false,
                    actionType: "create"
                },
                dialogFormObj: {
                    name: '',
                    code: '',
                    iconVal:'',
                    styleVal:'',
                    typeVal: ''
                },
                drawerConf:{
                    detail:{
                        defineModule:{
                            title:this.$t('langMap.drawer.title.detailForDefineModule'),
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
            dealGetModuleTypeEnumList(){  //取得 用户类型-枚举列表
                var _this = this ;
                ModuleCommonApis.getAllModuleTypes().then((res) => {
                    if(res && res.success){
                        _this.binding.moduleTypes = res.enumData.list ;
                    }
                })
            },
            dealGetDialogRefFormObj() {    //返回 弹窗表单 的form对象
                return this.$refs.defineModuleCreateFormRef.defineModuleCreateForm;
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
                ModuleManagerApi.batchDeleteByIds(delIds).then((res) => {
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
                ModuleManagerApi.deleteById(delId).then((res) => {
                    if (res) {
                        if (res.success) {  //已经有对错误进行预处理
                            _this.$message.success(res.msg);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            handleSearchFormQuery(e,values) {   //带查询条件 检索模块列表
                var _this = this ;
                //取得 bean 形式 的查询条件数组
                var searchFieldArr = _this.mixin_dealGetSearchFormQueryConf(_this.fieldInfoConf,values);
                _this.changeQueryLoading(true);
                ModuleManagerApi.getPageQuery(searchFieldArr,_this.tableConf.pagination,_this.tableConf.sorter).then((res) => {
                    if (res) {
                        this.tableConf.data = res.gridList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                        //清空 已勾选
                        _this.tableCheckIdList = [] ;
                    }
                    _this.changeQueryLoading(false);
                }).catch((e) =>{
                    _this.changeQueryLoading(false);
                })
            },
            handleCreateByForm() {     //新增模块按钮-点击
                var _this = this;
                _this.dialogFormConf.visible = true;   //显示弹窗
                _this.dialogFormConf.actionType = "create";
                _this.dialogFormObj = {};
            },
            handleUpdateByForm() {  //更新模块按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning(this.$t('langMap.message.warning.pleaseSelectTheOnlyRowOfDataForUpdate'));
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        ModuleManagerApi.getItemById(selectRowId).then((res) => {
                            var selectUserBean = res.bean;
                            if (selectUserBean) {
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
                            _this.$message.info(_this.$t('langMap.message.info.actionOfCancelDelete'));
                        }
                    })
                }
            },
            handleCreateFormCancel(e) {  // 创建/更新 模块定义表单->取消
                var _this = this;
                _this.dialogFormConf.visible = false;
            },
            handleCreateFormSubmit(e) {   // 创建/更新 模块表单->提交
                var _this = this;
                const dialogFormObj = _this.dealGetDialogRefFormObj();
                dialogFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    var closeDialogFlag = true;
                    if (_this.dialogFormConf.actionType == "create") {        //新建-提交
                        ModuleManagerApi.createByForm(values).then((res) => {
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
                        ModuleManagerApi.updateByForm(values).then((res) => {
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
            handleDetailDrawerShow(e,record){   //Drawer-模块定义 详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.defineModule.dataObj = record ;
                    this.drawerConf.detail.defineModule.visible = true ;
                }   else {
                    this.$message.error(this.$t('langMap.message.warning.openInvalidRowDetails'));
                }
            },
            handleDetailDrawerClose(e){ //Drawer-模块定义 详情关闭
                this.drawerConf.detail.defineModule.visible = false ;
            }
        },
        watch:{
            binding:{
                handler (val, oval) {
                    //绑定枚举值变化监听并处理
                    this.searchConf.formItemConf.type.options = this.binding.moduleTypes ;
                },
                deep: true,
                immediate:true
            }
        },
        created(){
            this.handleSearchFormQuery();
            this.dealGetModuleTypeEnumList();
        },
        destroyed(){
            console.log("模块管理-页面销毁 ...")
        }
    }
</script>

<style scoped>

</style>
