<template>
    <div>
        <div>
            <!-- 搜索区域 -->
            <div v-show="searchConf.showListFlag">
                <div>
                    <a-form layout="inline"
                            :form="searchForm"
                            @submit="handleSearchFormQuery"
                    >
                        <a-row :gutter="10">
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="账号">
                                    <a-input v-decorator="searchConf.paramConf.account" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="用户名">
                                    <a-input v-decorator="searchConf.paramConf.nickName"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="邮箱">
                                    <a-input v-decorator="searchConf.paramConf.email"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="类型">
                                    <a-select showSearch allowClear
                                        placeholder="请选择"
                                        style="width: 180px"
                                        optionFilterProp="children"
                                        :options="searchConf.binding.userTypes"
                                        :filterOption="getFilterOption"
                                        v-decorator="searchConf.paramConf.userType"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" :style="{ textAlign: 'right' }">
                                <a-button type="primary" html-type="submit"
                                          :loading="searchConf.loadingFlag"
                                >
                                    搜索
                                </a-button>
                                <a-button :style="{ marginLeft: '8px' }" @click="handleSearchFormReset">
                                    清空
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
            </div>
            <!-- 操作区域 -->
            <div>
                <a-row
                    :gutter="16"
                    justify="start"
                    type="flex"
                >
                    <a-col>
                        <a-button type="primary" @click="handleAddUserAccountBtnClick">
                            新增
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="primary" @click="handleUpdateUserAccountBtnClick">
                            更新
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-button type="danger" @click="handleEmployeeInfoBatchDeleteByIds">
                            删除
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-switch
                            checkedChildren="展示搜索"
                            unCheckedChildren="隐藏搜索"
                            size="large"
                            v-model="searchConf.showListFlag"
                        ></a-switch>
                    </a-col>
                </a-row>
            </div>
        </div>
        <a-divider/>
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
            <span slot="userTypeStr" slot-scope="record">
                <a-tag color="blue" :key="record.userTypeStr">
                    {{record.userTypeStr}}
                </a-tag>
            </span>
                <span slot="action" slot-scope="text,record">
                <a-button type="danger" size="small" @click="handleDeleteOneById(record.fid)">删除</a-button>
            </span>
            </a-table>
        </div>
        <div>
            <employee-info-create-form-comp
                ref="employeeInfoCreateFormRef"
                :visible="dialogFormConf.visible"
                :formObj="dialogFormObj"
                :actionType="dialogFormConf.actionType"
                @createFormCancel="handleEmployeeInfoCreateFormCancel"
                @createFormSubmit="handleEmployeeInfoCreateFormSubmit"
            />
        </div>
    </div>
</template>
<script>
    import {tableColumns} from './param_conf.js'
    import {EmpInfoApi} from './EmpInfoApi'
    import {UserCommonApis} from '~Apis/user/UserCommonApis.js'
    import EmployeeInfoCreateFormComp from '~Components/user/employee/info/EmployeeInfoCreateFormComp'

    import ACol from "ant-design-vue/es/grid/Col";
    import AFormItem from "ant-design-vue/es/form/FormItem";

    export default {
        name: "EmpInfoView",
        components: {AFormItem, ACol, EmployeeInfoCreateFormComp},
        data() {
            return {
                searchConf: {
                    showListFlag: true,
                    loadingFlag: false,
                    defaultColSpan: 8,
                    paramConf: {
                        account: ["account", {rules: []}],
                        nickName: ["nickName", {rules: []}],
                        email: ["email", {rules: []}],
                        userType: ["userType", {rules: []}]
                    },
                    binding:{
                        userTypes:[]
                    }
                },
                searchParams: {
                    nickName: '',
                    account: '',
                    email: '',
                    userType: ''
                },
                searchForm: this.$form.createForm(this, {name: 'search_form'}),
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
                dialogFormConf: {
                    visible: false,
                    actionType: "create"
                },
                dialogFormObj: {
                    nickName: '',
                    account: '',
                    email: '',
                    userType: ''
                }
            }
        },
        methods: {
            dealGetAllUserAccounts() {   //取得用户列表
                EmpInfoApi.getAllUserAccounts().then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                    }
                })
            },
            dealQueryUserAccounts(queryObj,pagination) {    //带查询条件 检索用户列表
                EmpInfoApi.getAllUserAccounts(queryObj,pagination).then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                        if(res.paginationBean){ //总个数
                            this.tableConf.pagination.total = res.paginationBean.total ;
                        }
                    }
                })
            },
            dealBatchDelUserAccount() {  //批量删除
                var _this = this;
                var delIds = _this.tableCheckIdList;
                EmpInfoApi.batchDelUserAccount(delIds).then((res) => {
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
                EmpInfoApi.delOneUserAccount(delId).then((res) => {
                    if (res) {
                        if (res.hasError == false) {  //已经有对错误进行预处理
                            _this.$message.success(res.info);
                            _this.handleSearchFormQuery(); //表格重新搜索
                        }
                    }
                })
            },
            dealGetUserTypeEnumList(){  //取得 用户类型-枚举列表
                var _this = this ;
                UserCommonApis.getAllUserType().then((res) => {
                    if(res && res.hasError == false){
                        if(res.enumList){
                            _this.searchConf.binding.userTypes = res.enumList ;
                        }
                    }
                })
            },
            handleSearchFormQuery(e) {   //表格-搜索
                if (e) {
                    e.preventDefault();
                }
                var _this = this;
                var paginationTemp = _this.tableConf.pagination ;
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        _this.dealQueryUserAccounts(values,paginationTemp);
                    }
                });
            },
            handleSearchFormReset() {    //重置 搜索列表 的值
                this.searchForm.resetFields();
            },
            handleTableChange(pagination, filters, sorter) {    //表格变动-页码跳转/排序/筛选
                this.tableConf.pagination = pagination ;
                this.tableConf.filters = filters ;
                this.tableConf.sorter = sorter ;
            },
            handleAddUserAccountBtnClick() {     //新增用户按钮-点击
                var _this = this;
                _this.dialogFormConf.visible = true;   //显示弹窗
                _this.dialogFormConf.actionType = "create";
                _this.dialogFormObj = {};
            },
            handleUpdateUserAccountBtnClick() {  //更新用户按钮-点击
                var _this = this;
                if (_this.tableCheckIdList.length < 1) {
                    this.$message.warning('请选择一行要更新的数据！');
                } else if (_this.tableCheckIdList.length > 1) {
                    this.$message.warning('请选择至多一行要更新的数据！');
                } else {
                    var selectRowId = _this.tableCheckIdList[0];
                    if (selectRowId) {
                        EmpInfoApi.getUserAccountById(selectRowId).then((res) => {
                            var selectUserBean = res.bean;
                            debugger;
                            if (selectUserBean) {
                                _this.dialogFormConf.visible = true;   //显示弹窗
                                _this.dialogFormConf.actionType = "update";
                                _this.dialogFormObj = selectUserBean;
                                //console.log(_this.dialogFormObj);
                            }
                        })
                    } else {
                        this.$message.warning('操作失败！未取得有效的用户id！');
                    }
                }
            },
            handleEmployeeInfoCreateFormCancel(e) {  // 创建/更新 用户表单->取消
                var _this = this;
                _this.dialogFormConf.visible = false;
            },
            handleEmployeeInfoCreateFormSubmit(e) {   // 创建/更新 用户表单->提交
                var _this = this;
                const dialogFormObj = _this.dealGetDialogRefFormObj();
                dialogFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    var closeDialogFlag = true;
                    if (_this.dialogFormConf.actionType == "create") {        //新建-提交
                        EmpInfoApi.addUserAccountByForm(values).then((res) => {
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
                        })
                    } else if (_this.dialogFormConf.actionType == "update") {   //更新-提交
                        values['fid'] = _this.dialogFormObj.fid;   //提交时，回填fid值
                        EmpInfoApi.updateUserAccountByForm(values).then((res) => {
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
                        })
                    }
                    if (closeDialogFlag == true) {    //关闭弹窗
                        dialogFormObj.resetFields();
                    }
                });
                _this.dialogFormConf.visible = false;
            },
            handleEmployeeInfoBatchDeleteByIds(e) {  // 批量删除
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
                            _this.dealBatchDelUserAccount();
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
            dealGetDialogRefFormObj() {    //返回 弹窗表单 的form对象
                return this.$refs.employeeInfoCreateFormRef.employeeInfoCreateForm;
            },
            getFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            }
        },
        computed: {
            rowSelection() {    //行选择
                const {selectedRowKeys} = this;
                return {
                    onChange: (selectedRowKeys, selectedRows) => {  //勾选 修改事件
                        this.tableCheckIdList = selectedRowKeys;
                    },
                    getCheckboxProps: record => ({  //选择框的默认属性配置
                        props: {},
                    }),
                };
            },
        },
        created(){
            this.dealGetAllUserAccounts();
            this.dealGetUserTypeEnumList();
        },
        destroyed(){
            //console.log("页面销毁 ...")
        }

    }
</script>

<style scoped>

</style>
