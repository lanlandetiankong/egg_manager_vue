<template functional>
    <a-sub-menu
        :key="props.menuInfo.key"
    >
    <span slot="title">
      <a-icon :type="props.menuInfo.iconName" /><span>{{ props.menuInfo.name }}</span>
    </span>
        <template v-for="item in props.menuInfo.children">
            <a-menu-item
                v-if="!item.children"
                :key="item.key"
            >
                <a-icon :type="item.iconName" />
                <span>{{ item.name }}</span>
            </a-menu-item>
            <sub-menu-comp
                v-else
                :key="item.key"
                :menu-info="item"
            />
        </template>
    </a-sub-menu>
</template>


<script>
    export default {
        name: "SubMenuComp",
        props: ['menuInfo'],
    }
</script>

<style scoped>

</style>
