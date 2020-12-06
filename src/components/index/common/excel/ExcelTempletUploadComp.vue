<template>
    <div>
        <a-modal
            :visible="visible"
            :maskClosable=false
            :title="modalCompTitle"
            okText="确认提交"
            cancelText="取消"
            @cancel="() => { $emit('modalCancel')}"
            @ok="handleModalSubmit"
        >
            <div>
                <a-upload
                    :accept="uploadConf.accept"
                    :fileList="fileList"
                    :remove="handleRemove"
                    :beforeUpload="handleBeforeUpload"
                    :data="uploadConf.processData"
                    @change="handleUploadChange"
                >
                    <a-button :disabled="fileList.length >= limitSize"> <a-icon type="upload" /> 选择最多{{limitSize}}个Excel文件 </a-button>
                </a-upload>
                <a-popover title="上传提示" trigger="hover" placement="leftBottom">
                    <template slot="content">
                        <a-alert message="请正确选择.xls或.xlsx格式的Excel文件" type="warning" showIcon />
                    </template>
                    <a-button
                        type="primary"
                        @click="handleUpload"
                        :disabled="fileList.length === 0 || (fileList.length - uploadedFileList.length < 1)"
                        :loading="uploading"
                        style="margin-top: 16px"
                    >
                        {{uploading ? '上传中...' : '确认上传' }}
                    </a-button>
                </a-popover>
            </div>
        </a-modal>
    </div>
</template>
<script>
    import BeeUtil from '~Assets/js/util/bee/BeeUtil.js' ;
    import {jsObjectToFormData} from '~Components/_util/util.js' ;
    import {CommonExcelCompApi} from './CommonExcelCompApi.js'

    export default {
        name: "ExcelTempletUploadComp",
        props:{
            visible:Boolean,
            modalCompTitle:String,
            limitSize:{
                type:Number,
                default:1
            },
            moreData:{
                type:Object,
                default:{}
            },
            uploadedBeanList:{
                type:Array,
                default:[]
            }
        },
        data(){
            return {
                uploadConf:{
                    accept:"application/vnd.ms-excel",
                    processData:{},
                },
                fileList: [],
                uploadedFileList:[],
                uploading: false,
            }
        },
        methods:{
            dealVerifyIsExcel(fileName){    //验证是否合法的Excel文件格式
                var flag = BeeUtil.StringUtils.endsWith(fileName,".xls") ||  BeeUtil.StringUtils.endsWith(fileName,".xlsx");
                return flag;
            },
            handleRemove(file) {    //文件移除
                const index = this.fileList.indexOf(file);
                const newFileList = this.fileList.slice();
                newFileList.splice(index, 1);
                this.fileList = newFileList;
                const uploadIndex = this.uploadedFileList.indexOf(file);
                const newUploadFileList = this.uploadedFileList.slice();
                newUploadFileList.splice(uploadIndex, 1);
                this.uploadedFileList = newUploadFileList;
            },
            handleBeforeUpload(file,fileList) { //
                if(this.dealVerifyIsExcel(file.name) === true){
                    this.fileList = [...this.fileList, file];
                }   else {
                    this.$message.warning("所选文件不是Excel，请正确选择.xls或.xlsx格式的Excel文件") ;
                }
                return false;
            },
            handleUpload() {    //文件上传
                var _this = this ;
                const { fileList } = this;
                var formData = new FormData();
                fileList.forEach(file => {
                    formData.append('files', file);
                });
                formData = jsObjectToFormData(this.uploadConf.processData,formData);
                this.uploading = true;
                CommonExcelCompApi.uploadExcelModels(formData,this.uploadConf.processData).then((res) => {
                    if(res.success){
                        var fileUploaderBeanList = [...res.fileUploaderBeanList] ;
                        if(typeof fileUploaderBeanList != "undefined" && fileUploaderBeanList != null){
                            debugger;
                            fileUploaderBeanList = [...fileUploaderBeanList,..._this.fileList] ;
                            //确保文件列表是最新的
                            fileUploaderBeanList = fileUploaderBeanList.filter(file => {
                                return file instanceof File == false;
                            });
                            _this.fileList = fileUploaderBeanList;
                        }
                        _this.uploadedFileList = _this.fileList ;
                    }
                    this.uploading = false;
                })
            },
            handleUploadChange(e){
                //console.log("change",e);
            },
            handleModalSubmit(e){
                this.$emit("modalSubmit",e,this.uploadedFileList,this.uploadConf.processData) ;
            }
        },
        watch:{
            visible:{
                handler(val,oval){  //隐藏与展示弹窗时监听
                    if(val == true){
                        var processDataTemp = Object.assign(this.moreData, this.uploadConf.processData);
                        this.uploadConf.processData = processDataTemp ;
                        //合并prop的已上传文件
                        this.uploadedFileList = [...this.uploadedBeanList,...this.uploadedFileList];
                        this.fileList = [...this.uploadedFileList];
                    }
                    this.uploading = false;
                },
                deep: true,
                immediate:true
            }
        }

    }
</script>
<style>

</style>
