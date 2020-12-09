<template>
    <div>
        <!-- 搜索栏-->
        <div>
            <!-- 搜索区域 -->
            <div >
                <div v-show="searchConf.showListFlag">
                    <a-form layout="inline"
                            :form="searchForm"
                            @submit="handleSearchFormQuery"
                    >
                        <a-row :gutter="6">
                            <a-col :span="searchConf.defaultColSpan"
                                   v-show="searchFlagConf.belongTenantId.show"
                            >
                                <a-form-item :label="$t('langMap.table.fields.tenant.belongTenant')">
                                    <a-select showSearch allowClear
                                              :placeholder="$t('langMap.commons.forms.pleaseChoose')"
                                              style="width: 180px"
                                              optionFilterProp="children"
                                              :disabled="!searchFlagConf.belongTenantId.modifyVal"
                                              :options="searchConf.binding.belongTenants"
                                              :filterOption="getFilterOption"
                                              v-decorator="searchConf.paramConf.belongTenantId"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.department.belongDepartment')">
                                    <a-tree-select
                                        :placeholder="$t('langMap.commons.forms.pleaseChoose')"
                                        style="width: 150px"
                                        showSearch allowClear
                                        v-decorator="searchConf.paramConf.belongDepartmentId"
                                        :treeNodeFilterProp="searchConf.treeSelectConf.belongDepartmentId.treeNodeFilterProp"
                                        :treeDefaultExpandAll="searchConf.treeSelectConf.belongDepartmentId.treeDefaultExpandAll"
                                        :treeData="searchConf.treeSelectConf.belongDepartmentId.treeData"
                                        @change="handleBelongDepartmentOfSearchChange"
                                    >
                                    </a-tree-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.user.userAccount')">
                                    <a-input v-decorator="searchConf.paramConf.account" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.user.nickName')">
                                    <a-input v-decorator="searchConf.paramConf.nickName"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.user.email')">
                                    <a-input v-decorator="searchConf.paramConf.email"/>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.type')">
                                    <a-select showSearch allowClear
                                              :placeholder="$t('langMap.commons.forms.pleaseChoose')"
                                              style="width: 180px"
                                              optionFilterProp="children"
                                              :options="searchConf.binding.userTypes"
                                              :filterOption="getFilterOption"
                                              v-decorator="searchConf.paramConf.userType"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                            <a-col :span="searchConf.defaultColSpan">
                                <a-form-item :label="$t('langMap.table.fields.common.lockStatus')">
                                    <a-select showSearch allowClear
                                              :placeholder="$t('langMap.commons.forms.pleaseChoose')"
                                              style="width: 180px"
                                              optionFilterProp="children"
                                              :options="searchConf.binding.lockStates"
                                              :filterOption="getFilterOption"
                                              v-decorator="searchConf.paramConf.locked"
                                    >
                                    </a-select>
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="24" :style="{ textAlign: 'right' }">
                                <search-filter-btn-comp
                                    :showFlag="searchConf.showListFlag"
                                    @btnClick="toggleSearchShowListFlag"
                                >
                                </search-filter-btn-comp>
                                <a-button type="primary" html-type="submit" icon="search"
                                >
                                    {{$t('langMap.button.actions.query')}}
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-form>
                </div>
                <div>
                    <a-row>
                        <a-col :span="24" :style="{ textAlign: 'right' }">
                            <search-filter-btn-comp
                                :showFlag="!searchConf.showListFlag"
                                @btnClick="toggleSearchShowListFlag"
                            >
                            </search-filter-btn-comp>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>
        <!-- 表格内容 -->
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
                <span slot="userTypeStr" slot-scope="record">
                    <a-tag color="blue" :key="record.userTypeStr">
                        {{record.userTypeStr}}
                    </a-tag>
                </span>
                <span slot="locked" slot-scope="record">
                    <a-tag v-if="record.locked == 1" color="red" :key="record.fid">
                        {{$t('langMap.commons.enums.lockStatus.locked')}}
                    </a-tag>
                    <a-tag v-else-if="record.locked == 0" color="blue" :key="record.fid">
                        {{$t('langMap.commons.enums.lockStatus.unlock')}}
                    </a-tag>
                </span>
            </a-table>
        </div>
    </div>
</template>

<script>
    import jquery from 'jquery';
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';
    import {tableColumns,searchFormQueryConf} from './param_conf.js'
    import {UserTableSelectCompApi} from './userTableSelectCompApi'
    import {UserCommonApis} from '~Apis/user/UserCommonApis.js'

    import SearchFilterBtnComp from '~Components/common/search/SearchFilterBtnComp'

    export default {
        name: 'UserTableSelectComp',
        mixins:[EggCommonMixin],
        components:{SearchFilterBtnComp},
        props: {
            maxSize:{
                type:Number,
                default:1,
                validator: function (value) {
                    if(value){
                        return value > 0 ;
                    }
                    return false ;
                }
            },
            minSize:{
                type:Number,
                default:1,
                validator: function (value) {
                    if(value){
                        return value > 0 ;
                    }
                    return false ;
                }
            },
            checkIdList:{
                type:Array,
                default:[]
            },
            searchFlagConf:{
                belongTenantId:{
                    show:true,
                    search:true,
                    modifyVal:true,
                    defaultVal:''
                },
                belongDepartmentId: {
                    show:true,
                    search:true,
                    modifyVal:true,
                    defaultVal:''
                },
                account: {
                    show:true,
                    search:true,
                    modifyVal:true,
                    defaultVal:''
                },
                nickName: {
                    show:true,
                    search:true,
                    modifyVal:true,
                    defaultVal:''
                },
                email: {
                    show:true,
                    search:true,
                    modifyVal:true,
                    defaultVal:''
                },
                userType: {
                    show:true,
                    search:true,
                    modifyVal:true,
                    defaultVal:undefined
                },
                locked: {
                    show:true,
                    search:true,
                    modifyVal:true,
                    defaultVal:undefined
                }
            }
        },
        data() {

            var _this = this ;
            return {
                searchConf: {
                    showListFlag:false,
                    loadingFlag: false,
                    defaultColSpan: 8,
                    paramConf: {
                        belongTenantId: ["belongTenantId", {rules: [],initialValue:_this.$props.searchFlagConf.belongTenantId.defaultVal}],
                        belongDepartmentId: ["belongDepartmentId", {rules: [],initialValue:_this.$props.searchFlagConf.belongDepartmentId.defaultVal}],
                        account: ["account", {rules: [],initialValue:_this.$props.searchFlagConf.account.defaultVal}],
                        nickName: ["nickName", {rules: [],initialValue:_this.$props.searchFlagConf.nickName.defaultVal}],
                        email: ["email", {rules: [],initialValue:_this.$props.searchFlagConf.email.defaultVal}],
                        userType: ["userType", {rules: [],initialValue:_this.$props.searchFlagConf.userType.defaultVal}],
                        locked: ["locked", {rules: [],initialValue:_this.$props.searchFlagConf.locked.defaultVal}]
                    },
                    binding:{
                        belongTenants:[],
                        belongDepartments:[],
                        userTypes:[],
                        lockStates:[]
                    },
                    treeSelectConf:{
                        belongDepartmentId:{
                            treeDefaultExpandAll:false,
                            treeNodeFilterProp:"title",
                            treeData:[]
                        }
                    }
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
            }
        },
        methods: {
            toggleSearchShowListFlag(){ //切换显示/隐藏

                this.searchConf.showListFlag = !this.searchConf.showListFlag ;
            },
            dealChangeTableSearchLoadingState(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
                this.tableConf.loading = loadingFlag;
            },
            dealGetAllUserAccounts() {   //取得用户列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                UserTableSelectCompApi.getAllUserAccounts().then((res) => {
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
            dealQueryUserAccounts(queryFieldArr,pagination,sorter) {    //带查询条件 检索用户列表
                var _this = this ;
                _this.dealChangeTableSearchLoadingState(true);
                UserTableSelectCompApi.getAllUserAccounts(queryFieldArr,pagination,sorter).then((res) => {
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
            dealGetSearchFormQueryConf(queryObj){   //取得查询基本配置
                var _this = this ;
                var queryFieldArr = [] ;
                if(queryObj) {
                    for (var key in queryObj){

                        var searchFieldObj = searchFormQueryConf[key];
                        var searchFlagConfItem = _this.searchFlagConf[key];
                        //是否可以作为搜索条件
                        var searchFlagTmp = _this.handleGetSearchFlagBoolean(searchFlagConfItem,"show",true);
                        if(searchFieldObj && (searchFlagTmp == true)){
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
            handleGetSearchFlagBoolean(searchFlagConfItem,key,defaultVal){
                if(!searchFlagConfItem){
                    return defaultVal ;
                }
                var itemFlag = searchFlagConfItem[key];
                if(typeof itemFlag == "undefined" || itemFlag ==null){
                    return defaultVal;
                }
                return itemFlag;
            },
            dealGetUserTypeEnumList(){  //取得 用户类型-枚举列表
                var _this = this ;
                UserCommonApis.getAllUserType().then((res) => {
                    if(res && res.success){
                        if(res.enumList){
                            _this.searchConf.binding.userTypes = res.enumList ;
                        }
                    }
                })
            },
            dealGetDefineTenantEnumList(){  //取得 所属租户-枚举列表
                var _this = this ;
                UserTableSelectCompApi.getAllDefineTenantEnums().then((res) => {
                    if(res && res.success){
                        if(res.enumList){
                            _this.searchConf.binding.belongTenants = res.enumList ;
                        }
                    }
                })
            },
            dealGetDefineDepartmentTreeData(){  //取得 所属租户-枚举列表
                var _this = this ;
                UserTableSelectCompApi.getAllDefineDepartmentTrees().then((res) => {
                    if(res && res.success){
                        if(res.gridList){
                            _this.searchConf.treeSelectConf.belongDepartmentId.treeData = res.gridList ;
                        }
                    }
                })
            },
            dealGetLockStateEnumList(){  //取得 用户锁定状态-枚举列表
                var _this = this ;
                UserCommonApis.getAllUserLockStateType().then((res) => {
                    if(res && res.success){
                        if(res.enumList){
                            _this.searchConf.binding.lockStates = res.enumList ;
                        }
                    }
                })
            },
            dealGetAllRoleList(){  //取得 所有的角色定义
                var _this = this ;
                return UserTableSelectCompApi.getAllDefineRoles().then((res) => {
                    if(res && res.success){
                        if(res.gridList){
                            _this.dialogGrantRoleObj.all = res.gridList ;
                            _this.dealAllRoleItemToTransferDataSource(res.gridList);
                        }
                    }
                })
            },
            dealGetAllJobList(){  //取得 所有的职务定义
                var _this = this ;
                return UserTableSelectCompApi.getAllDefineJobs().then((res) => {
                    if(res && res.success){
                        if(res.gridList){
                            _this.dialogGrantJobObj.all = res.gridList ;
                            _this.dealAllJobItemToTransferDataSource(res.gridList);
                        }
                    }
                })
            },
            dealAllRoleItemToTransferDataSource(allItemArr){    //role转化为 transfer可用的 数组对象
                var _this = this ;
                var dataSourceArrTemp = [] ;
                if(allItemArr && allItemArr.length > 0 ){
                    jquery.each(allItemArr,function (idx,val) {
                        if(val){
                            dataSourceArrTemp.push({
                                key:_this.dealNullStrToEmpty(val.fid),
                                title:_this.dealNullStrToEmpty(val.name),
                                description:_this.dealNullStrToEmpty(val.remark),
                                disabled:false
                            })
                        }
                    })
                }
                _this.dialogGrantRoleObj.allDataSource = dataSourceArrTemp ;
            },
            dealAllJobItemToTransferDataSource(allItemArr){    //job转化为 transfer可用的 数组对象
                var _this = this ;
                var dataSourceArrTemp = [] ;
                if(allItemArr && allItemArr.length > 0 ){
                    jquery.each(allItemArr,function (idx,val) {
                        if(val){
                            dataSourceArrTemp.push({
                                key:_this.dealNullStrToEmpty(val.fid),
                                title:_this.dealNullStrToEmpty(val.name),
                                description:_this.dealNullStrToEmpty(val.remark),
                                disabled:false
                            })
                        }
                    })
                }
                _this.dialogGrantJobObj.allDataSource = dataSourceArrTemp ;
            },
            dealNullStrToEmpty(str,repStr){ //如果遇到 Undefine或者null，替换为repStr
                if(typeof str == "undefined" || str == null){
                    if(typeof repStr != "undefined" && repStr == null){
                        return repStr ;
                    }   else {
                        return "";
                    }
                }   else {
                    return str;
                }
            },
            handleSearchFormQuery(e) {   //表格-搜索
                if (e) {
                    e.preventDefault();
                }
                var _this = this;
                var paginationTemp = _this.tableConf.pagination ;
                var sorterTemp = _this.tableConf.sorter ;
                this.searchForm.validateFields((err, values) => {
                    if (!err) {
                        //取得 bean 形式 的查询条件数组
                        var searchFieldArr = _this.dealGetSearchFormQueryConf(values);
                        _this.dealQueryUserAccounts(searchFieldArr,paginationTemp,sorterTemp);
                    }
                });
            },
            handleTableChange(pagination, filters, sorter) {
                //表格变动-页码跳转/排序/筛选
                this.tableConf.pagination = pagination ;
                this.tableConf.filters = filters ;
                this.tableConf.sorter = sorter ;
                this.handleSearchFormQuery();
            },
            getFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            handleBelongDepartmentOfSearchChange(value){  //[搜索-所属部门] SelectTree cchange事件
                //console.log("handleBelongDepartmentOfSearchChange",value);
            },
        },
        computed: {
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
            },
        },
        created() {
            this.dealGetAllUserAccounts();
            this.dealGetUserTypeEnumList();
            this.dealGetDefineTenantEnumList();
            this.dealGetDefineDepartmentTreeData();
            this.dealGetLockStateEnumList();
        }
    };
</script>
