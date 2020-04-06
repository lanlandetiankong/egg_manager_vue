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
                                <a-form-item label="权限名">
                                    <a-input v-decorator="searchConf.paramConf.name"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="编码">
                                    <a-input v-decorator="searchConf.paramConf.code"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="类型">
                                    <a-select showSearch allowClear
                                          placeholder="请选择"
                                          style="width: 180px"
                                          optionFilterProp="children"
                                          :options="searchConf.binding.permission.types"
                                          :filterOption="getPermissionTypeFilterOption"
                                          v-decorator="searchConf.paramConf.type"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="是否已启用">
                                    <a-select showSearch allowClear
                                              placeholder="请选择"
                                              style="width: 180px"
                                              optionFilterProp="children"
                                              :options="searchConf.binding.switchEnums"
                                              :filterOption="getPermissionTypeFilterOption"
                                              v-decorator="searchConf.paramConf.ensure"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="备注">
                                    <a-input v-decorator="searchConf.paramConf.remark"/>
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
                        <a-button type="primary" icon="plus"
                                  @click="handleAddDefinePermissionBtnClick">
                            新增
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="edit"
                                  v-show="mixin_handlePermissionDomShow('PermCtrl:Permission_Add')"
                                  @click="handleUpdateDefinePermissionBtnClick"
                        >
                            更新
                        </a-button>
                    </a-col>
                    <a-col >
                        <a-button type="danger" icon="delete"
                                  @click="handleDefinePermissionBatchDeleteByIds">
                            删除
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="check"
                                  @click="handleDefinePermissionBatchEnusreByIds">
                            启用
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
                    @change="handleTableChange"
                >
                    <span slot="ensureStr" slot-scope="record">
                        <a-tag :color="record.ensure ? 'blue' : 'red'" :key="record.ensure">
                            {{record.ensureStr}}
                        </a-tag>
                    </span>
                    <span slot="typeStr" slot-scope="record">
                        <a-tag color="blue" :key="record.typeStr">
                            {{record.typeStr}}
                        </a-tag>
                    </span>
                    <template slot="action" slot-scope="text,record">
                        <span>
                            <a @click="handleDefinePermissionDetailDrawerShow($event,record)">
                                详情
                            </a>
                            <a-divider type="vertical" />
                            <a-button type="danger" size="small" @click="handleDeleteOneById(record.fid)" v-show="record.ensure != 1">
                                删除
                            </a-button>
                        </span>
                    </template>
                </a-table>
            </div>
        </div>
        <!-- 弹窗dom-区域 -->
        <div>
            <define-permission-create-form-comp
                ref="definePermissionCreateFormRef"
                :visible="dialogFormConf.visible"
                :formObj="dialogFormObj"
                :actionType="dialogFormConf.actionType"
                :permissionTypes="searchConf.binding.permission.types"
                :permissonCodePrefixs="searchConf.binding.permission.codePrefixs.list"
                :permissonCodePrefixDefaultChecks="searchConf.binding.permission.codePrefixs.defaultChecks"
                @createFormCancel="handleDefinePermissionCreateFormCancel"
                @createFormSubmit="handleDefinePermissionCreateFormSubmit"
            >
            </define-permission-create-form-comp>
            <a-drawer
                :title="drawerConf.detail.definePermission.title"
                :closeable="drawerConf.detail.definePermission.closable"
                :visible="drawerConf.detail.definePermission.visible"
                :placement="drawerConf.detail.definePermission.placement"
                :mask="drawerConf.detail.definePermission.mask"
                :maskStyle="drawerConf.detail.definePermission.maskStyle"
                :wrapStyle="drawerConf.detail.definePermission.wrapStyle"
                :drawerStyle="drawerConf.detail.definePermission.drawerStyle"
                :bodyStyle="drawerConf.detail.definePermission.bodyStyle"
                :maskClosable="drawerConf.detail.definePermission.maskClosable"
                @close="handleDefinePermissionDetailDrawerClose"
            >
                <simple-detail-drawer-comp
                    :dataObj="drawerConf.detail.definePermission.dataObj"
                    :visible="drawerConf.detail.definePermission.visible"
                    :drawerFieldConf="drawerConf.detail.definePermission.drawerFieldConf"
                />
            </a-drawer>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';

    import {tableColumns,searchFormQueryConf} from './param_conf.js'
    import {DefinePermissionDetailDrawerConf} from './drawer_conf.js'
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ACol from "ant-design-vue/es/grid/Col";

    import {PermissionManagerApi} from './permissionManagerApi.js'
    import {PermissionCommonApis} from '~Apis/permission/PermissionCommonApis.js'
    import {BindingCommonApis} from '~Apis/common/CommonApis.js'

    import DefinePermissionCreateFormComp from "@/components/index/define/permission/manager/DefinePermissionCreateFormComp";
    import SimpleDetailDrawerComp from '~Components/index/common/drawer/SimpleDetailDrawerComp';
    export default {
        name: "PermissionManagerView",
        components: {DefinePermissionCreateFormComp,SimpleDetailDrawerComp, ACol, AFormItem},
        data() {
            return {
                searchConf:{
                    showListFlag:false,
                    loadingFlag:false,
                    defaultColSpan: 8,
                    paramConf: {
                        name: ["name", {rules: []}],
                        code: ["code", {rules: []}],
                        type: ["type", {rules: []}],
                        ensure: ["ensure", {rules: []}],
                        remark:["remark",{rules: []}]
                    },
                    binding:{
                        permission:{
                            types:[],
                            codePrefixs:{
                                list:[],
                                defaultChecks:[]
                            }
                        },
                        switchEnums:[]
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
                    sorter:{}
                },
                tableCheckIdList: [],
                tableCheckRowList: [],
                dialogFormConf: {
                    visible: false,
                    actionType: "create"
                },
                dialogFormObj: {
                    name: '',
                    code: '',
                    type: ''
                },
                drawerConf:{
                    detail:{
                        definePermission:{
                            title:"权限定义详情",
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
                            drawerFieldConf:DefinePermissionDetailDrawerConf
                        },
                    },
                },
            }
        },
        mixins:[EggCommonMixin],
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
            },
            ...mapGetters([
                'userInfoStore_grantedPermissions',
            ])
        },
        methods: {
            dealPermissionBtnShow(key){
                return this.userInfoStore_grantedPermissions.includes('Permission:Add2') ;
            },
            getPermissionTypeFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealGetPermissionTypeEnumList(){  //取得 用户类型-枚举列表
                var _this = this ;
                PermissionCommonApis.getAllPermissionTypes().then((res) => {
                    if(res && res.hasError == false){
                        if(res.enumList){
                            _this.searchConf.binding.permission.types = res.enumList ;
                        }
                    }
                })
            },
            dealGetPermissionCodePrefixEnumList(){  //取得 权限定义Code前缀-枚举列表
                var _this = this ;
                PermissionCommonApis.getAllPermissionCodePrefixs().then((res) => {
                    if(res && res.hasError == false){
                        if(res.enumList){
                            _this.searchConf.binding.permission.codePrefixs.list = res.enumList ;
                            _this.searchConf.binding.permission.codePrefixs.defaultChecks = res.enumDefaultCheckList ;
                        }
                    }
                })
            },
            dealGetBindingSwitchEnumList(){  //取得 开关式取值-枚举列表
                var _this = this ;
                BindingCommonApis.getSwitchEnumList().then((res) => {
                    if(res && res.hasError == false){
                        if(res.enumList){
                            _this.searchConf.binding.switchEnums = res.enumList ;
                        }
                    }
                })
            },
            dealGetDialogRefFormObj() {    //返回 弹窗表单 的form对象
                return this.$refs.definePermissionCreateFormRef.definePermissionCreateForm;
            },
            dealChangeTableSearchLoadingState(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
                this.tableConf.loading = loadingFlag;
            },
            dealGetAllDefinePermissions() {   //取得权限列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                PermissionManagerApi.getAllDefinePermissions().then((res) => {
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
            dealQueryDefinePermissions(queryFieldList,pagination,sorter) {    //带查询条件 检索权限列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                PermissionManagerApi.getAllDefinePermissions(queryFieldList,pagination,sorter).then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                        //清空 已勾选
                        _this.tableCheckIdList = [] ;
                        _this.tableCheckRowList = [] ;
                    }
                    _this.dealChangeTableSearchLoadingState(false);
                }).catch((e) =>{
                    _this.dealChangeTableSearchLoadingState(false);
                })
            },
            dealBatchDelDefinePermission() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                PermissionManagerApi.batchDelDefinePermission(delIds).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            this.$message.success(res.info);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealBatchEnusreDefinePermission() {  //批量启用
                var _this = this;
                var delIds = _this.tableCheckIdList;
                PermissionManagerApi.batchEnsureDefinePermission(delIds).then((res) => {
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
                PermissionManagerApi.delOneDefinePermission(delId).then((res) => {
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
                        _this.dealQueryDefinePermissions(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleAddDefinePermissionBtnClick() {     //新增权限按钮-点击
                var _this = this;
                _this.dialogFormConf.visible = true;   //显示弹窗
                _this.dialogFormConf.actionType = "create";
                _this.dialogFormObj = {};
            },
            handleUpdateDefinePermissionBtnClick() {  //更新权限按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要更新的数据！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要更新的数据！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        PermissionManagerApi.getDefinePermissionById(selectRowId).then((res) => {
                            var selectUserBean = res.bean;
                            if (selectUserBean) {
                                _this.dialogFormConf.visible = true;   //显示弹窗
                                _this.dialogFormConf.actionType = "update";
                                _this.dialogFormObj = selectUserBean;
                                //console.log(_this.dialogFormObj);
                            }
                        })
                    } else {
                        this.$message.warning('操作失败！未取得有效的权限id！');
                    }
                }
            },
            handleDefinePermissionBatchDeleteByIds(e) {     // 批量删除-确认框
                var _this = this;
                var selectDelIds = _this.tableCheckIdList;
                if (selectDelIds.length < 1) {
                    _this.$message.warning("请选择至少一条要删除的数据！");
                } else {
                    var selectDelRows = _this.tableCheckRowList ;
                    var delAbleFlag = true ;    //是否可删除
                    for (var i in selectDelRows){
                        if(selectDelRows[i].ensure == 1){
                            delAbleFlag = false;
                            break;
                        }
                    }
                    if(delAbleFlag === true){
                        _this.$confirm({
                            content: '是否确认删除所选的' + selectDelIds.length + "条数据？",
                            okText: '确认',
                            cancelText: '取消',
                            onOk() {
                                _this.dealBatchDelDefinePermission();
                            },
                            onCancel() {
                                _this.$message.info("操作：取消删除");
                            }
                        })
                    }   else {
                        _this.$message.warning("所选项中包含已启用的项，请取消勾选所有已启用的项后重试！");
                    }
                }
            },
            handleDefinePermissionBatchEnusreByIds(e) {     // 批量启用-确认框
                var _this = this;
                var selectDelIds = _this.tableCheckIdList;
                if (selectDelIds.length < 1) {
                    _this.$message.warning("请选择至少一条要启用的数据！");
                } else {
                    _this.$confirm({
                        content: '权限一旦启用后无法禁用！请再次确认是否启用所选的' + selectDelIds.length + "条数据？",
                        okText: '确认',
                        cancelText: '取消',
                        onOk() {
                            _this.dealBatchEnusreDefinePermission();
                        },
                        onCancel() {
                            _this.$message.info("操作：取消启用");
                        }
                    })
                }
            },
            handleDefinePermissionCreateFormCancel(e) {  // 创建/更新 权限定义表单->取消
                var _this = this;
                _this.dialogFormConf.visible = false;
            },
            handleDefinePermissionCreateFormSubmit(e) {   // 创建/更新 权限表单->提交
                var _this = this;
                const dialogFormObj = _this.dealGetDialogRefFormObj();
                dialogFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    var closeDialogFlag = true;
                    if (_this.dialogFormConf.actionType == "create") {        //新建-提交
                        PermissionManagerApi.addDefinePermissionByForm(values).then((res) => {
                            if (res) {
                                if (res.hasError == false) {  //异常已经有预处理了
                                    this.$message.success(res.info);
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
                        PermissionManagerApi.updateDefinePermissionByForm(values).then((res) => {
                            if (res) {
                                if (res.hasError == false) {  //异常已经有预处理了
                                    this.$message.success(res.info);
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
            handleTableChange(pagination, filters, sorter) {    //表格变动-页码跳转/排序/筛选
                this.tableConf.pagination = pagination ;
                this.tableConf.filters = filters ;
                this.tableConf.sorter = sorter ;
                this.handleSearchFormQuery();
            },
            handleDefinePermissionDetailDrawerShow(e,record){   //Drawer-租户定义 详情展示
                if(typeof record != "undefined"){
                    this.drawerConf.detail.definePermission.dataObj = record ;
                    this.drawerConf.detail.definePermission.visible = true ;
                }   else {
                    this.$message.error("打开无效的行详情！");
                }
            },
            handleDefinePermissionDetailDrawerClose(e){ //Drawer-租户定义 详情关闭
                this.drawerConf.detail.definePermission.visible = false ;
            }
        },
        created(){
            this.dealGetAllDefinePermissions();
            this.dealGetPermissionTypeEnumList();
            this.dealGetPermissionCodePrefixEnumList();
            this.dealGetBindingSwitchEnumList();
        },
        destroyed(){
            console.log("权限管理-页面销毁 ...")
        }
    }
</script>

<style scoped>

</style>
