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
                                    <a-input v-decorator="searchConf.paramConf.account"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="用户名">
                                    <a-input v-decorator="searchConf.paramConf.nickName"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="邮箱">
                                    <a-input v-decorator="searchConf.paramConf.email" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item label="类型">
                                    <a-input v-decorator="searchConf.paramConf.userType"/>
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
                        <a-button type="danger">
                            删除
                        </a-button>
                    </a-col>
                    <a-col>
                        <a-switch
                            checkedChildren="展示搜索"
                            unCheckedChildren="隐藏搜索"
                            v-model="searchConf.showListFlag"
                        ></a-switch>
                    </a-col>
                </a-row>
            </div>
        </div>
        <a-divider/>
        <div>
            <a-table
                :rowKey="item => item.fid"
                :columns="tableConf.columns"
                :dataSource="tableConf.data"
                :loading="tableConf.loading"
                :rowSelection="rowSelection"
            >
            <span slot="userType" slot-scope="record">
                <a-tag color="blue" :key="record.userType">{{record.userType}}</a-tag>
            </span>
                <span slot="action" slot-scope="text,record">
                  <a-button type="danger" size="small">删除</a-button>
                  <br/>
                  <a href="javascript:;" class="ant-dropdown-link">
                    更多...<a-icon type="down"/>
                  </a>
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
    import EmployeeInfoCreateFormComp from '~Components/user/employee/info/EmployeeInfoCreateFormComp'

    import ACol from "ant-design-vue/es/grid/Col";
    import AFormItem from "ant-design-vue/es/form/FormItem";

    export default {
        name: "EmpInfoView",
        components: {AFormItem, ACol,EmployeeInfoCreateFormComp},
        data() {
            return {
                searchConf:{
                   showListFlag:false,
                    loadingFlag:false,
                    defaultColSpan:8,
                    paramConf:{
                        account:["account",{rules:[]}],
                        nickName:["nickName",{rules:[]}],
                        email:["email",{rules:[]}],
                        userType:["userType",{rules:[]}]
                    }
                },
                searchParams: {
                    nickName: '',
                    account: '',
                    email: '',
                    userType: ''
                },
                searchForm:this.$form.createForm(this,{name:'search_form'}),
                tableConf: {
                    data: [],
                    columns: tableColumns,
                    loading: false
                },
                tableCheckList:[],
                dialogFormConf:{
                    visible:false,
                    actionType:"create"
                },
                dialogFormObj:{
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
                    }
                })
            },
            dealQueryUserAccounts(queryObj){
                EmpInfoApi.getAllUserAccounts(queryObj).then((res) => {
                    if (res) {
                        this.tableConf.data = res.resultList;
                    }
                })
            },
            dealBatchDelUserAccount() {  //批量删除
                EmpInfoApi.batchDelUserAccount().then((res) => {
                    if (res) {
                        console.log(res);
                    }
                })
            },
            handleSearchFormQuery(e){   //表格搜索
                if(e){
                    e.preventDefault();
                }
                var _this = this ;
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        _this.dealQueryUserAccounts(values);
                    }
                });
            },
            handleSearchFormReset(){
                this.searchForm.resetFields();
            },
            handleAddUserAccountBtnClick(){     //新增用户按钮-点击
                var _this = this ;
                _this.dialogFormConf.visible = true ;   //显示弹窗
                _this.dialogFormConf.actionType = "create" ;
                _this.dialogFormObj = {} ;
            },
            handleUpdateUserAccountBtnClick(){  //更新用户按钮-点击
                var _this = this ;
                _this.dialogFormConf.visible = true ;   //显示弹窗
                _this.dialogFormConf.actionType = "update" ;

                console.log(_this.rowSelection.getCheckboxProps());
                console.log("_this.rowSelection");

                _this.dialogFormObj = {
                    fid:''
                } ;
            },
            handleEmployeeInfoCreateFormCancel(e){  // 创建/更新 用户表单->取消
                var _this = this ;
                _this.dialogFormConf.visible = false ;
            },
            handleEmployeeInfoCreateFormSubmit(e){   // 创建/更新 用户表单->提交
                var _this = this ;
                const dialogFormObj = _this.dealGetDialogRefFormObj();
                dialogFormObj.validateFields((err, values) => {
                    if (err) {
                        return;
                    }
                    if(_this.dialogFormConf.actionType == "create"){
                        EmpInfoApi.addUserAccountByForm(values).then((res) => {
                            if (res) {
                                if(res.hasError == false){  //异常已经有预处理了
                                    this.$message.success(res.info);
                                    _this.handleSearchFormQuery() ; //表格重新搜索
                                }
                            }
                        })
                    }   else if(_this.dialogFormConf.actionType == "update"){
                        EmpInfoApi.updateUserAccountByForm(values).then((res) => {
                            debugger;
                            if (res) {
                                console.log(res);
                            }
                        })
                    }
                    dialogFormObj.resetFields();
                });
                _this.dialogFormConf.visible = false ;
            },
            dealTableSelectChange(selectedRowKeys){ //表格勾选修改事件
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.tableCheckList = selectedRowKeys;
            },
            dealGetDialogRefFormObj() {    //返回 弹窗表单 的form对象
                return this.$refs.employeeInfoCreateFormRef.employeeInfoCreateForm ;
            }
        },
        computed: {
            rowSelection() {    //行选择
                const {selectedRowKeys} = this;
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                    getCheckboxProps: record => ({  //选择框的默认属性配置
                        props: {

                        },
                    }),
                };
            },
        },
        mounted() {
            this.dealGetAllUserAccounts();
        },
        watch:{

        }
    }
</script>

<style scoped>

</style>
