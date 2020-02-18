<template>
    <div>
        <a-upload
            name="file"
            class="avatar-uploader"
            listType="picture-card"
            :showUploadList="false"
            :beforeUpload="beforeImgUpload"
            :data="uploadConf.moreData"
            :action="uploadConf.action"
            @change="handleUploadChange"
        >
            <img v-if="headImgRealUri" :src="headImgRealUri" alt="头像" :style="uploadConf.imgDomStyle"/>
            <div v-else>
                <a-icon :type="uploadConf.loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">上传</div>
            </div>
        </a-upload>
    </div>
</template>

<script>
    import constantParams from '~Config/constantParams'
    import BeeUtil from '~Assets/js/util/bee/BeeUtil.js'
    import baseUrl from '~Config/axios/baseUrl.js'
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    export default {
        name: "HeadImgUpload",
        props:{
            singleLargeSize:Number,
            moreDataObj:Object,
            avatarUrl:String
        },
        data(){
            return {
                uploadConf:{
                    accept:".png, .jpg, .jpeg",
                    action:baseUrl+"/commom_api/file/imgUpload/headImgUpload",
                    directory:false,
                    moreData:{
                        a:"a"
                    },
                    loading:false,
                    imageUri:'',
                    imgDomStyle:{
                        maxWidth:"100px",
                        maxHeight:"100px"
                    },
                    uploadImgObj:{
                        fileLocation:"",
                        fileName:"",
                        fileOldName:"",
                        fileUri:"",
                        http:""
                    }
                }
            }
        },
        methods:{
            beforeImgUpload(file){
                const isJPG = file.type === 'image/jpeg'|| file.type === 'image/jpg';
                const isPng = file.type === 'image/png';
                const isLt2M = file.size / this.largeSizeComp ;
                if(isJPG || isPng){
                    if (!isLt2M) {
                        this.$message.error('图片文件必须小鱼2MB!');
                    }
                }   else {
                    this.$message.error('只允许上传.jpg类型的文件!');
                }
                return (isJPG || isPng) && isLt2M;
            },
            handleUploadChange(info) {
                console.log("handleUploadChange...");
                console.log(info);
                if (info.file.status === 'uploading') {
                    this.uploadConf.loading = true;
                    return;
                }
                if (info.file.status === 'done') {
                    var resp = info.fileList[0].response ;
                    if(resp.hasError == false){
                        var fileResBeanTemp  = resp.fileResBean ;
                        this.uploadConf.imageUri =  fileResBeanTemp.fileUri ;
                        this.uploadConf.uploadImgObj = fileResBeanTemp ;
                    }
                }
                if (info.file.status === 'error') {

                }
            },
            dealUploadReset(){  //清空上传框的内容
                this.uploadConf.imageUri = "" ;
                this.uploadConf.uploadImgObj = {} ;
            }
        },
        computed:{
            largeSizeComp(){    //单文件最大上传
                var largeSizeTemp = this.singleLargeSize ;
                if(typeof largeSizeTemp == "undefined" || largeSizeTemp == null){   //如果没指定，默认2mb
                    largeSizeTemp = 1024 * 1024 * 2 ;
                }
                return largeSizeTemp ;
            },
            headImgRealUri(){   //展示的图片的真实地址
                var _this = this ;
                var urlPrefix = constantParams.props.upload.url.prefix ;
                var imgUri = "" ;
                var showImgFlag = true ;
                if(BeeUtil.StringUtils.isBlank(_this.uploadConf.imageUri)){
                    if(BeeUtil.StringUtils.isNotBlank(_this.avatarUrl)){
                        imgUri = _this.avatarUrl ;
                    }   else {
                        showImgFlag = false ;
                    }
                }   else {
                    imgUri = _this.uploadConf.imageUri ;
                }
                return showImgFlag ? urlPrefix + imgUri : "" ;
            },
            avatarUrlVal(){   //展示的图片的真实地址
                var _this = this ;
                var imgUri = "" ;
                var showImgFlag = true ;
                if(BeeUtil.StringUtils.isBlank(_this.uploadConf.imageUri)){
                    if(BeeUtil.StringUtils.isNotBlank(_this.avatarUrl)){
                        imgUri = _this.avatarUrl ;
                    }   else {
                        showImgFlag = false ;
                    }
                }   else {
                    imgUri = _this.uploadConf.imageUri ;
                }
                return showImgFlag ?  imgUri : "" ;
            }
        }

    }
</script>

<style scoped>
    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
</style>
