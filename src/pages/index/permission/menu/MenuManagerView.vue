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
                                <a-form-item label="菜单名">
                                    <a-input v-decorator="searchConf.paramConf.menuName"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="上级菜单">
                                    <a-tree-select
                                        style="width: 150px"
                                        placeholder="筛选上级菜单"
                                        showSearch allowClear
                                        :treeNodeFilterProp="searchConf.treeSelectConf.parentId.treeNodeFilterProp"
                                        :treeDefaultExpandAll="searchConf.treeSelectConf.parentId.treeDefaultExpandAll"
                                        v-decorator="searchConf.paramConf.parentId"
                                        :treeData="searchConf.treeSelectConf.parentId.treeData"
                                        @change="handleParentTreeOfSearchChange"
                                    >
                                    </a-tree-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="标注">
                                    <a-input v-decorator="searchConf.paramConf.label"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="路由地址">
                                    <a-input v-decorator="searchConf.paramConf.routerUrl"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="外部地址">
                                    <a-input v-decorator="searchConf.paramConf.hrefUrl"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="类型">
                                    <a-select showSearch allowClear
                                          placeholder="请选择"
                                          style="width: 180px"
                                          optionFilterProp="children"
                                          :options="searchConf.binding.menu.urlJumpTypes"
                                          :filterOption="getMenuTypeFilterOption"
                                          v-decorator="searchConf.paramConf.urlJumpType"
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
                                  @click="handleAddDefineMenuBtnClick">
                            新增
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" icon="edit"
                                  @click="handleUpdateDefineMenuBtnClick">
                            更新
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" icon="delete"
                                  @click="handleDefineMenuBatchDeleteByIds">
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
                    :bordered="tableConf.bordered"
                    :columns="tableConf.columns"
                    :dataSource="tableConf.data"
                    :loading="tableConf.loading"
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
                    <span slot="urlJumpTypeStrRender" slot-scope="text,record">
                        <a-tag color="blue" :key="record.urlJumpTypeStr">
                            {{record.urlJumpTypeStr}}
                        </a-tag>
                    </span>
                    <span slot="action" slot-scope="text,record">
                        <a-button type="danger" size="small" @click="handleDeleteOneById(record.fid)">删除</a-button>
                    </span>
                </a-table>
            </div>
        </div>
        <!-- 弹窗dom-区域 -->
        <div>
            <define-menu-create-form-comp
                ref="defineMenuCreateFormRef"
                :visible="dialogFormConf.visible"
                :formObj="dialogFormObj"
                :actionType="dialogFormConf.actionType"
                :menuUrlJumpTypes="searchConf.binding.menu.urlJumpTypes"
                :parentSelectTrees="searchConf.treeSelectConf.parentId.treeData"
                @createFormCancel="handleDefineMenuCreateFormCancel"
                @createFormSubmit="handleDefineMenuCreateFormSubmit"
            >
            </define-menu-create-form-comp>
        </div>
    </div>
</template>
<script>
    import {tableColumns,searchFormQueryConf} from './param_conf.js'
    import AFormItem from "ant-design-vue/es/form/FormItem";
    import ACol from "ant-design-vue/es/grid/Col";

    import {MenuManagerApi} from './menuManagerApi.js'
    import {ModuleCommonApis} from '~Apis/module/ModuleCommonApis.js'

    import DefineMenuCreateFormComp from "~Components/index/module/manager/DefineMenuCreateFormComp";

    export default {
        name: "MenuManagerView",
        components: {DefineMenuCreateFormComp, ACol, AFormItem},
        data() {
            return {
                searchConf:{
                    showListFlag:false,
                    loadingFlag:false,
                    defaultColSpan: 8,
                    paramConf: {
                        menuName: ["menuName", {rules: []}],
                        parentId: ["parentId", {rules: []}],
                        label: ["label", {rules: []}],
                        routerUrl: ["routerUrl", {rules: []}],
                        hrefUrl: ["hrefUrl", {rules: []}],
                        urlJumpType: ["urlJumpType", {rules: []}],
                        remark:["remark",{rules: []}]
                    },
                    binding:{
                        menu:{
                            urlJumpTypes:[]
                        }
                    },
                    formObj:{

                    },
                    treeSelectConf:{
                        parentId:{
                            treeDefaultExpandAll:false,
                            treeNodeFilterProp:"title",
                            treeData:[]
                        }
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
                        x: 1140
                    },
                    bordered:true
                },
                tableCheckIdList: [],
                dialogFormConf: {
                    visible: false,
                    actionType: "create"
                },
                dialogFormObj: {
                    menuName: '',
                    parentId:'',
                    label: '',
                    orderNum:0,
                    iconName:'',
                    styleVal:'',
                    typeVal: '',
                }
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
            getMenuTypeFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealGetMenuTypeEnumList(){  //取得 菜单url跳转类型-枚举列表
                var _this = this ;
                ModuleCommonApis.getAllMenuUrlJumpTypes().then((res) => {
                    if(res && res.hasError == false){
                        if(res.enumList){
                            _this.searchConf.binding.menu.urlJumpTypes = res.enumList ;
                        }
                    }
                })
            },
            dealGetParentIdTreeData(){  //取得 菜单定义-树形数据
                var _this = this ;
                MenuManagerApi.getAllDefineMenuTree().then((res) => {
                    if(res && res.hasError == false){
                        if(res.resultList){
                            _this.searchConf.treeSelectConf.parentId.treeData = res.resultList ;
                        }
                    }
                })
            },
            dealGetDialogRefFormObj() {    //返回 弹窗表单 的form对象
                return this.$refs.defineMenuCreateFormRef.defineMenuCreateForm;
            },
            dealChangeTableSearchLoadingState(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
                this.tableConf.loading = loadingFlag;
            },
            dealGetAllDefineMenus() {   //取得菜单列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                MenuManagerApi.getAllDefineMenus().then((res) => {
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
            dealQueryDefineMenus(queryFieldList,pagination,sorter) {    //带查询条件 检索菜单列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                MenuManagerApi.getAllDefineMenus(queryFieldList,pagination,sorter).then((res) => {
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
            dealBatchDelDefineMenu() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                MenuManagerApi.batchDelDefineMenu(delIds).then((res) => {
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
                MenuManagerApi.delOneDefineMenu(delId).then((res) => {
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
                        _this.dealQueryDefineMenus(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleAddDefineMenuBtnClick() {     //新增菜单按钮-点击
                var _this = this;
                _this.dialogFormConf.visible = true;   //显示弹窗
                _this.dialogFormConf.actionType = "create";
                _this.dialogFormObj = {
                    orderNum:0
                };
            },
            handleUpdateDefineMenuBtnClick() {  //更新菜单按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要更新的数据！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要更新的数据！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        MenuManagerApi.getDefineMenuById(selectRowId).then((res) => {
                            var selectUserBean = res.bean;
                            if (selectUserBean) {
                                _this.dialogFormConf.visible = true;   //显示弹窗
                                _this.dialogFormConf.actionType = "update";
                                _this.dialogFormObj = selectUserBean;
                                //console.log(_this.dialogFormObj);
                            }
                        })
                    } else {
                        this.$message.warning('操作失败！未取得有效的菜单id！');
                    }
                }
            },
            handleDefineMenuBatchDeleteByIds(e) {     // 批量删除
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
                            _this.dealBatchDelDefineMenu();
                        },
                        onCancel() {
                            _this.$message.info("操作：取消删除");
                        }
                    })
                }
            },
            handleDefineMenuCreateFormCancel(e) {  // 创建/更新 菜单定义表单->取消
                var _this = this;
                _this.dialogFormConf.visible = false;
            },
            handleDefineMenuCreateFormSubmit(e) {   // 创建/更新 菜单表单->提交
                var _this = this;
                const dialogFormObj = _this.dealGetDialogRefFormObj();
                dialogFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    var closeDialogFlag = true;
                    if (_this.dialogFormConf.actionType == "create") {        //新建-提交
                        MenuManagerApi.addDefineMenuByForm(values).then((res) => {
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
                        MenuManagerApi.updateDefineMenuByForm(values).then((res) => {
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
            handleParentTreeOfSearchChange(value){  //[上级菜单] SelectTree cchange事件
                console.log("handleParentTreeOfSearchChange",value);
            }
        },
        created(){
            this.dealGetAllDefineMenus();
            this.dealGetMenuTypeEnumList();
            this.dealGetParentIdTreeData();
        },
        destroyed(){
            console.log("菜单管理-页面销毁 ...")
        }
    }
</script>

<style scoped>

</style>
