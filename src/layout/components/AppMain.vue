<template>
  <section class="app_main" style="min-height: 100%;">
    <transition name="fade" mode="out-in">
        <router-view style="min-height: 100%;"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
        return this.$store.state.tagsView.cachedViews ;
    }
  }
}
</script>
<style>
    .app_main{
        min-height: 100%;
        height:100%
    }
</style>
