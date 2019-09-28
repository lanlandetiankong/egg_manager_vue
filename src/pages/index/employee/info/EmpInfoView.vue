<template>
    <div>
        <a-table :columns="tableConf.columns" :dataSource="tableConf.data">
            <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
            <span slot="customTitle"><a-icon type="smile-o"/> Name</span>
            <span slot="tags" slot-scope="tags">
                <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                  <a href="javascript:;">Invite 一 {{record.name}}</a>
                  <a-divider type="vertical"/>
                  <a href="javascript:;">Delete</a>
                  <a-divider type="vertical"/>
                  <a href="javascript:;" class="ant-dropdown-link">
                    More actions <a-icon type="down"/>
                  </a>
            </span>
        </a-table>
    </div>
</template>
<script>
    import {tableColumns} from './param_conf.js'
    export default {
        name: "EmpInfoView",
        data() {
            return {
                tableConf:{
                    data:[],
                    columns:tableColumns
                }

            }
        }
    }
</script>

<style scoped>

</style>
