<template>
    <keep-alive :include="cachedViews">
        <router-view />
    </keep-alive>
</template>

<script>
    export default {
        name: "EmployeePage",
        computed:{
            cachedViews() {
                return [];
            }
        }
    }
</script>

<style scoped>

</style>
