<template>
    <div>
        <!-- 搜索栏-->
        <div>
            <query-form-comp
                :showAble="searchConf.showAble"
                :loadingFlag="searchConf.loadingFlag"
                :formItemConf="searchConf.formItemConf"
                @execQuery="handleSearchFormQuery"
            />
        </div>
        <!-- 表格内容 -->
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
    import {UserTableSelectCompApi} from './userTableSelectCompApi'
    import {UserCommonApis} from '~Apis/user/UserCommonApis.js'
    import {EggCommonMixin} from '~Layout/mixin/EggCommonMixin';
    import {QueryMatchType} from '~Components/regular/common/drawer/drawer_define.js'
    import QueryFormComp from '~Components/regular/query/QueryFormComp'
    import SearchFilterBtnComp from '~Components/regular/common/search/SearchFilterBtnComp'

    export default {
        name: 'UserTableSelectComp',
        mixins:[EggCommonMixin],
        components:{QueryFormComp,SearchFilterBtnComp},
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
                userName: {
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
            const textAlignDefault = 'left';
            const fieldInfoConfObj = {
                account:{
                    fieldLabel:this.$t('langMap.table.fields.em.user.userAccount'),
                    fieldName:'account', matching:QueryMatchType.like,
                },
                userName:{
                    fieldLabel:this.$t('langMap.table.fields.em.user.userName'),
                    fieldName:'userName', matching:QueryMatchType.like,
                },
                email:{
                    fieldLabel:this.$t('langMap.table.fields.em.user.email'),
                    fieldName:'email', matching:QueryMatchType.like,
                },
                userType:{
                    fieldLabel:this.$t('langMap.table.fields.em.user.userType'),
                    fieldName:'userType', matching:QueryMatchType.equals,drawerAble:false
                },
                belongTenantId:{
                    fieldName:'defineTenantId',matching:QueryMatchType.equals, foreignName:'userTenant',drawerAble:false,
                },
                belongDepartmentId:{
                    fieldName:'defineDepartmentId', matching:QueryMatchType.equals, foreignName:'userDepartment',drawerAble:false,
                },
                locked:{
                    fieldLabel:this.$t('langMap.table.fields.common.lockedStatus'),
                    fieldName:'locked', matching:QueryMatchType.equals,type:DrawerFieldTypeEnum.Enum,
                    enumValMap:{"1":"已锁定", "0":"未锁定"}
                }
            };
            return {
                fieldInfoConf:fieldInfoConfObj,
                binding:{
                    belongTenants:[],
                    belongDepartments:[],
                    userTypes:[],
                    lockStates:[]
                },
                searchConf: {
                    showAble:false,
                    loadingFlag: false,
                    formItemConf:{
                        belongTenantId:{
                            key:'belongTenantId',
                            formType:FormItemTypeEnum.Select,
                            label:this.$t('langMap.table.fields.em.tenant.belongTenant'),
                            decorator:["belongTenantId", {rules: [],initialValue:_this.$props.searchFlagConf.belongTenantId.defaultVal}],
                            options:[]
                        },
                        belongDepartmentId:{
                            key:'belongDepartmentId',
                            formType:FormItemTypeEnum.TreeSelect,
                            label:this.$t('langMap.table.fields.em.department.belongDepartment'),
                            decorator:["belongDepartmentId", {rules: [],initialValue:_this.$props.searchFlagConf.belongDepartmentId.defaultVal}],
                            treeDefaultExpandAll:false,
                            treeNodeFilterProp:"title",
                            treeData:[]
                        },
                        account:{
                            key:'account',
                            formType:FormItemTypeEnum.Input,
                            label:this.$t('langMap.table.fields.em.user.userAccount'),
                            decorator:["account", {rules: [],initialValue:_this.$props.searchFlagConf.account.defaultVal}],
                        },
                        userName:{
                            key:'userName',
                            formType:FormItemTypeEnum.Input,
                            label:this.$t('langMap.table.fields.em.user.userName'),
                            decorator:["userName", {rules: [],initialValue:_this.$props.searchFlagConf.userName.defaultVal}],
                        },
                        email:{
                            key:'email',
                            formType:FormItemTypeEnum.Input,
                            label:this.$t('langMap.table.fields.em.user.email'),
                            decorator:["email", {rules: [],initialValue:_this.$props.searchFlagConf.email.defaultVal}],
                        },
                        userType:{
                            key:'userType',
                            formType:FormItemTypeEnum.Select,
                            label:this.$t('langMap.table.fields.common.type'),
                            decorator:["userType", {rules: [],initialValue:_this.$props.searchFlagConf.userType.defaultVal}],
                            options:[]
                        },
                        locked:{
                            key:'locked',
                            formType:FormItemTypeEnum.Select,
                            label:this.$t('langMap.table.fields.common.label'),
                            decorator:["locked", {rules: [],initialValue:_this.$props.searchFlagConf.locked.defaultVal}],
                            options:[]
                        }
                    },
                },
                tableConf: {
                    data: [],
                    columns: [{
                        title: this.$t('langMap.table.fields.em.user.userAccount'),
                        align:textAlignDefault,
                        dataIndex: 'account',
                        key: 'account',
                        sorter:true,
                        scopedSlots: { customRender: 'account' },
                    },  {
                        title: this.$t('langMap.table.fields.em.user.userName'),
                        align:textAlignDefault,
                        dataIndex: 'userName',
                        sorter:true,
                        key: 'userName',
                    }, {
                        title: this.$t('langMap.table.fields.em.user.email'),
                        align:textAlignDefault,
                        dataIndex: 'email',
                        key: 'email',
                    }, {
                        title: this.$t('langMap.table.fields.em.user.userType'),
                        align:textAlignDefault,
                        key: 'userTypeStr',
                        scopedSlots: { customRender: 'userTypeStr' },
                    },{
                        title: this.$t('langMap.table.fields.common.lockedStatus'),
                        align:textAlignDefault,
                        key: 'locked',
                        scopedSlots: { customRender: 'locked' },
                    }, {
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
            }
        },
        methods: {
            changeQueryLoading(loadingFlag){   //修改[表格搜索]是否在 加载状态中
                if(typeof loadingFlag == "undefined" || loadingFlag == null){
                    loadingFlag = false ;
                }
                this.searchConf.loadingFlag = loadingFlag;
            },
            dealGetAllUserAccounts() {   //取得用户列表
                var _this = this ;
                _this.changeQueryLoading(true);
                UserTableSelectCompApi.getPageQuery().then((res) => {
                    if (res) {
                        this.tableConf.data = res.gridList;
                        if(res.vpage){ //总个数
                            this.tableConf.pagination.total = res.vpage.total ;
                        }
                    }
                    _this.changeQueryLoading(false);
                }).catch((e) =>{
                    _this.changeQueryLoading(false);
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
                        _this.searchConf.binding.userTypes = res.enumData.list ;
                    }
                })
            },
            dealGetDefineTenantEnumList(){  //取得 所属租户-枚举列表
                var _this = this ;
                UserTableSelectCompApi.getAllDefineTenantEnums().then((res) => {
                    if(res && res.success){
                        _this.searchConf.binding.belongTenants = res.enumData.list ;
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
                        _this.searchConf.binding.lockStates = res.enumData.list ;
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
                                key:_this.mixin_dealNullStrToEmpty(val.fid),
                                title:_this.mixin_dealNullStrToEmpty(val.name),
                                description:_this.mixin_dealNullStrToEmpty(val.remark),
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
                                key:_this.mixin_dealNullStrToEmpty(val.fid),
                                title:_this.mixin_dealNullStrToEmpty(val.name),
                                description:_this.mixin_dealNullStrToEmpty(val.remark),
                                disabled:false
                            })
                        }
                    })
                }
                _this.dialogGrantJobObj.allDataSource = dataSourceArrTemp ;
            },
            handleSearchFormQuery(e,values) {   //带查询条件 检索用户列表
                var _this = this;
                //取得 bean 形式 的查询条件数组
                var searchFieldArr = _this.dealGetSearchFormQueryConf(values);
                _this.changeQueryLoading(true);
                UserTableSelectCompApi.getPageQuery(searchFieldArr,_this.tableConf.pagination,_this.tableConf.sorter).then((res) => {
                    if (res) {
                        this.tableConf.data = res.gridList;
                        if(res.vpage){ //总个数
                            this.tableConf.pagination.total = res.vpage.total ;
                        }
                        //清空 已勾选
                        _this.tableCheckIdList = [] ;
                    }
                    _this.changeQueryLoading(false);
                }).catch((e) =>{
                    _this.changeQueryLoading(false);
                })
            },
            handleTableChange(pagination, filters, sorter) {
                //表格变动-页码跳转/排序/筛选
                this.tableConf.pagination = pagination ;
                this.tableConf.filters = filters ;
                this.tableConf.sorter = sorter ;
                this.mixin_invokeQuery(this);
            }
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
        watch:{
            binding:{
                handler (val, oval) {
                    //绑定枚举值变化监听并处理
                    this.searchConf.formItemConf.belongTenantId.options = this.binding.belongTenants ;
                    this.searchConf.formItemConf.belongDepartmentId.treeData = this.binding.belongDepartments ;
                    this.searchConf.formItemConf.userType.options = this.binding.userTypes ;
                    this.searchConf.formItemConf.locked.options = this.binding.lockStates ;
                },
                deep: true,
                immediate:true
            }
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
