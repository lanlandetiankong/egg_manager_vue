<template>
    <div class="verticalCategory">
        <template v-for="category in this.categoryList">
            <a-menu
                mode="inline"
                theme="dark"
            >
                <a-menu-item key="1">
                    <a-icon type="pie-chart" />
                    <span>Option 1</span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
                    <a-menu-item key="5">Option 5</a-menu-item>
                    <a-menu-item key="6">Option 6</a-menu-item>
                    <a-menu-item key="7">Option 7</a-menu-item>
                    <a-menu-item key="8">Option 8</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2">
                    <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
                    <a-menu-item key="9">Option 9</a-menu-item>
                    <a-menu-item key="10">Option 10</a-menu-item>
                    <a-sub-menu key="sub3" title="Submenu">
                        <a-menu-item key="11">Option 11</a-menu-item>
                        <a-menu-item key="12">Option 12</a-menu-item>
                    </a-sub-menu>
                </a-sub-menu>
            </a-menu>
        </template>
    </div>
</template>
<script>
export default {
    name:'VerticalCategoryTree',
    props: {
        categoryList:Array,
    },
    data() {
        return {};
    },
    methods: {
        //由于是递归组件的监听事件，所以需要多传递一次(doCategoryClick+handleCategoryClick)
        doCategoryClick(e) {
            //当前点击行的数据，通过 myinfo绑定传递
            var clickItemInfo = e.$options._parentVnode.data.attrs.myinfo;
            this.$emit('menuitem-click',e,clickItemInfo);
        },
        handleCategoryClick(e,clickItemInfo) {
            this.$emit('category-click',e,clickItemInfo);
        }
    }
}
</script>
<style lang="stylus" scoped>
    .verticalCategory
        margin:auto
</style>
