<template>
    <div id="app" ref="appRootPage">
        <router-view/>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: 'App',
        data() {
            return {
                clientHeight: '',
                constantKey: {
                    userToken: 'userToken'
                }
            }
        },
        mounted() {
            //this.initHeight();        //触发高度计算
            window.vue = this
        },
        methods: {
            changeFixed(clientHeight) {
                this.$refs.appRootPage.style.height = clientHeight + 'px';
            },
            initHeight() {
                //获取浏览器可视区域高度
                this.clientHeight = $(document).height();
                //console.log($(document).height()) ;//浏览器可视区域对象宽度
                window.onresize = () => {
                    this.clientHeight = $(document).height();
                }
            }
        },
        watch: {
            clientHeight: function () {
                this.changeFixed(this.clientHeight);
            }
        },
    }
</script>
<style>
    html, body ,#app {
        height: 100%;
    }
</style>
