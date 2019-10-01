<template>
    <div id="sider-bar-root">
        <div :class="sideBarLogoCls">
            Egg Manager
        </div>
        <a-menu
            mode="inline"
            theme="dark"
            class="index-menu"
            @click="dealMenuClick"
        >
            <template v-for="item in menuList">
                <a-menu-item v-if="!item.children"
                             :key="item.key">
                    <a-icon type="pie-chart"/>
                    <span>{{item.name}}</span>
                </a-menu-item>
                <sub-menu-comp v-else
                               :menu-info="item"
                               :key="item.key"/>
            </template>
        </a-menu>
    </div>
</template>

<script>
    import {LayoutApi} from '~Layout/_LayoutApi.js' ;

    import SubMenuComp from '~Components/menu/SubMenuComp' ;
    export default {
        name: "SiderBar",
        components: {
            SubMenuComp,
        },
        props:{
            siderCollapsed:Boolean,
            menuList:Array
        },
        data () {
            return {

            }
        },
        computed: {
            sideBarLogoCls(){
                return this.siderCollapsed ? "logo-collapsed" : "logo"
            }
        },
        methods: {
            dealMenuClick(obj) {
                this.$emit('siderbar-menu-open',obj.item,obj.key,obj.keyPath);
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>
@import "./_SiderBar.less";
</style>
