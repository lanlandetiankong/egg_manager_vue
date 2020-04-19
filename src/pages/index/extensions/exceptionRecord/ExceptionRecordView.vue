<template>
    <div>
        <div>
            <!-- 操作按钮区域 -->
            <div>
                <a-row
                    :gutter="6"
                    justify="start"
                    type="flex"
                >
                    <a-col>
                        <a-button type="primary" icon="reload"
                                  @click="dealListReload"
                        >
                            刷新列表
                        </a-button>
                        <a-button type="danger" icon="delete"
                                  @click="dealRemoveAll"
                        >
                            清除所有记录
                        </a-button>
                    </a-col>
                </a-row>
            </div>
        </div>
        <a-divider/>
        <div :style="{textAlign:'justify'}">
            <a-timeline v-if="exceptionRecordList.length > 0" mode="left">
                <a-timeline-item v-for="(recordItem,itemIdx) in exceptionRecordList"
                                 :key="recordItem.uuid"
                >
                    <a-tag color="blue">
                        时间:{{recordItem.time}}
                    </a-tag>
                    <br/>
                    <a-tag :color="(recordItem.resp.hasError == true) ? 'red' :'orange' ">
                        {{recordItem.logTypeStr}} : {{ recordItem.resp.errorMsg }}
                    </a-tag>
                    <a-collapse>
                        <a-collapse-panel header="请求信息" key="reqConf">
                            <p>请求地址:{{recordItem.reqConf.url}}</p>
                            <p>请求方法:{{recordItem.reqConf.method}}</p>
                            <p>参数:{{ recordItem.reqConf.data }}</p>
                        </a-collapse-panel>
                        <a-collapse-panel header="返回信息" key="resp">
                            <p>
                                异常信息:{{ recordItem.resp.errorMsg }}
                            </p>
                            <p>
                                是否出错:{{ (recordItem.resp.hasWarning == true) ? "是" : "否" }}
                            </p>
                            <p>
                                是否警告:{{ (recordItem.resp.hasWarning == true) ? "是" : "否" }}
                            </p>
                        </a-collapse-panel>
                        <a-collapse-panel header="头部信息" key="headers">
                            <template v-for="(headerKey,headerItem) in recordItem.headers">
                                <p>{{headerKey}} : {{headerItem}}</p>
                            </template>
                        </a-collapse-panel>
                    </a-collapse>
                </a-timeline-item>
            </a-timeline>
            <a-empty v-else></a-empty>
        </div>
    </div>
</template>
<script>
    import {ExceptionRecordUtils} from '~Utils/extensions/extensions.js';

    export default {
        name: "ExceptionRecordView",
        components: {},
        data() {
            return {
                exceptionRecordList: []
            }
        },
        computed: {},
        methods: {
            dealListReload(){   //列表刷新
                this.exceptionRecordList = ExceptionRecordUtils.dealGetLocalExceptionRecordList();
            },
            dealRemoveAll(){    //清除所有本地记录
                ExceptionRecordUtils.dealRemoveAllRecord();
                this.dealListReload();
            }
        },
        mounted() {
            this.dealListReload();
        }
    }
</script>

<style scoped>

</style>
