<template>
    <div >
        <div>
            <a-row>
                <a-col :span="3">
                    <a-button size="large" icon="inbox">存为草稿</a-button>
                </a-col>
                <a-col :span="3">
                    <a-button size="large" type="primary" icon="check"
                              @click="handleCreateAnnouncement"
                    >发布</a-button>
                </a-col>
            </a-row>
            <br/>
            <a-row>
                <a-col :span="2">
                    <a-button size="large">标题：</a-button>
                </a-col>
                <a-col :span="22">
                    <a-input  allowClear size="large"
                             placeholder="请输入标题"
                             v-model="formObj.title"
                    />
                </a-col>
            </a-row>

            <a-form
                layout="inline"
                :form="announcementCreateForm"
            >
                <a-row :type="formLayout.row.type">
                    <a-col :span="formLayout.defaultColSpan">
                        <a-form-item label="关键字">
                            <a-input v-decorator="formFieldConf.keyWord"/>
                        </a-form-item>
                    </a-col>
                    <a-col :span="formLayout.defaultColSpan">
                        <a-form-item label="发布部门">
                            <a-select showSearch allowClear
                                      placeholder="请选择"
                                      style="width: 180px"
                                      optionFilterProp="children"
                                      :options="[]"
                                      :filterOption="getPermissionTypeFilterOption"
                                      v-decorator="formFieldConf.publishDepartment"
                            >
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :type="formLayout.row.type">
                    <a-col :span="formLayout.dblColSpan">
                        <a-form-item label="标签">
                            <a-select showSearch allowClear
                                      mode="multiple"
                                      placeholder="请选择"
                                      style="width: 360px"
                                      optionFilterProp="children"
                                      :options="bindData.announcementTagList"
                                      :filterOption="getPermissionTypeFilterOption"
                                      v-decorator="formFieldConf.tagIds"
                            >
                            </a-select>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
            <a-divider />
            <quill-editor
                v-model="formObj.content"
                class="quillCls"
                ref="createAnnouncementQuillEditor"
                :options="quillEditorConfig.quillOption"
                @change="handleQuillEditorChange">
            </quill-editor>
        </div>
    </div>
</template>
<script>
    import {AnnouncementCreateApi} from './announcementCreateApi'

    //使用 扩展模块
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    import ImageResize from 'quill-image-resize-module'
    Quill.register('modules/ImageExtend', ImageExtend);
    Quill.register('modules/ImageResize', ImageResize);

    import baseUrl from '~Config/axios/baseUrl.js'

    import ATextarea from "ant-design-vue/es/input/TextArea";
    export default {
        name: "AnnouncementCreateView",
        components: {ATextarea},
        data(){
            var _this = this ;
            //上传图片的路径
            var uploadFieleUrl = "/commom_api/file/imgUpload/headImgUpload" ;
            //quill 富文本框 的默认配置
            var quillToolBarConf = this.$quillToolbarConfig.quillToolbarOptions;
            quillToolBarConf['container'] = container ;
            quillToolBarConf['handlers'] = {
                'image': function () {
                    QuillWatch.emit(this.quill.id)
                }
            };

            var paramsRules ={
                keyWord:[
                    {required:true,message:'请填写关键字!'}
                ],
                publishDepartment:[
                    {required:false,message:'请选择发布部门!'},
                ],
                tagIds:[
                    {required:true,message:'请选择标签!'},
                    {type:'array'}
                ]
            };
            return {
                formLayout:{
                    row:{
                        type:"flex"
                    },
                    defaultColSpan: 8,
                    dblColSpan:12,
                },
                announcementCreateForm:{},
                formFieldConf:{
                    keyWord:["keyWord",{rules:paramsRules.keyWord}],
                    publishDepartment:["publishDepartment",{rules:paramsRules.publishDepartment}],
                    tagIds:["tagIds",{rules:paramsRules.tagIds}]
                },
                formObj:{
                    title:'',
                    content:'',
                    keyWord:'',
                    publishDepartment:'',
                    tagIds:undefined
                },
                bindData:{
                    announcementTagList:[]
                },
                toolbarConfig:{
                    loadings:{
                        isSubmitLoading:false,
                        isCancelLoading:false
                    }
                },
                quillEditorConfig:{
                    quillOption:{
                        placeholder:'请输入通知内容',
                        debug:'warn',
                        readOnly:false,
                        imageDrop: true,
                        modules:{
                            toolbar: {
                                container:this.$quillToolbarConfig.quillToolbarOptions,
                                handlers: {
                                    'image': function () {  // 劫持原来的图片点击按钮事件
                                        QuillWatch.emit(this.quill.id)
                                    }
                                }
                            },
                            history: this.$quillToolbarConfig.quillHistoryOptions,
                            ImageExtend: {
                                loading: true,
                                name: 'file',
                                size:2,
                                action: baseUrl+uploadFieleUrl,
                                response: _this.dealQuillImgExtendResponse,
                                headers:(xhr) => {
                                },
                                change:_this.dealQuillImgExtendChange
                            },
                            ImageResize:{},
                        },
                        scrollingContainer:'y'
                    }
                }
            }
        },
        computed:{

        },
        methods:{
            getPermissionTypeFilterOption(input,option){
                return (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            },
            dealGetAllAnnouncementTagList(){    //取得所有的 公告标签
                var _this = this ;
                AnnouncementCreateApi.getAllAnnouncementTagEnums().then((res) =>{
                    if(res.hasError == false){
                        _this.bindData.announcementTagList = res.enumList ;
                    }
                })
            },
            //富文本内容发生更改事件监听
            handleQuillEditorChange(e) {
                //console.log("handleQuillEditorChange => ",e.text) ;
            },
            dealQuillImgExtendResponse(res){    //quill 图片上传回调
                console.log("dealQuillImgExtendResponse");
                console.log(res);
                if(res.hasError == false){
                    var fileResBean = res.fileResBean ;
                    return fileResBean.filePrefix + fileResBean.fileUri
                }   else {
                    this.$message.error(res.errorMsg) ;
                }

            },
            dealQuillImgExtendChange(xhr, formData){
                //console.log(xhr,formData);
            },
            dealCheckCreateAble(){  //判断是否可以 创建
                var _this = this ;
                let tempTitle = _this.formObj.title;
                let tempContent  = _this.formObj.content;
                if(tempTitle.length == 0 || tempContent.length == 0){
                    return false ;
                }
                return true ;
            },
            dealFormValuesMapToObj(values){
                var formObjTemp = this.formObj ;
                if(values){
                    formObjTemp['keyWord'] = values.keyWord;
                    formObjTemp['publishDepartment'] = values.publishDepartment;
                    formObjTemp['tagIds'] = values.tagIds;
                }
                return formObjTemp ;
            },
            //确认发表博文
            handleCreateAnnouncement(e){
                var _this = this ;
                //验证是否未编辑
                let isCreateAble = this.dealCheckCreateAble() ;
                if(isCreateAble == false){
                    _this.$message.warning("公告标题或内容为空,请输入有效公告标题或内容后重试！")
                    return false ;
                }   else {
                    //取得请求的参数：标题&内容、用户信息
                    var formObjTemp = _this.formObj ;
                    this.announcementCreateForm.validateFields((err, values) => {
                        if (!err) {
                            _this.formObj = _this.dealFormValuesMapToObj(values) ;
                            AnnouncementCreateApi.addAnnouncementByForm(_this.formObj).then((res) =>{
                                if(res.hasError == false){
                                    _this.$message.success(res.info) ;
                                    //关闭当前页面
                                    _this.doTagItemSelectedClose();
                                }
                            })
                        }
                    });

                }
            },
            doTagItemSelectedClose(){  //关闭当前标签
                var selectedTag = this.$route ;
                //关闭当前所选标签
                this.$store.dispatch('doDelVisitedViews',selectedTag).then((views) => {
                    const latestView = views.slice(-1)[0] ;
                    if(latestView) {
                        this.$router.push(latestView.path) ;
                    }   else {
                        this.$router.push('/') ;
                    }
                })
            }
        },
        created(){
            var _this = this ;
            _this.announcementCreateForm = this.$form.createForm(_this,{
                name:'AnnouncementCreateForm',
                onFieldsChange: (_, changedFields) => {
                    //console.log(changedFields);
                    this.$emit('change', changedFields);
                },
                mapPropsToFields:() =>{
                    //console.log(_this.formObj);
                    return {
                        keyWord: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.keyWord
                        }),
                        publishDepartment: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.publishDepartment
                        }),
                        tagIds: this.$form.createFormField({
                            ..._this.formObj,
                            value: _this.formObj.tagIds
                        }),
                    }
                }
            });
        },
        mounted(){
            this.dealGetAllAnnouncementTagList() ;
        }
    }
</script>
<style scoped>
    .quillCls {
        height:300px;
    }
</style>
