<template>
    <a-button v-if="langLocale==='zh'" @click="langChangeToZh">
        English
    </a-button>
    <a-button  v-else @click="langChangeToZh">
        中文
    </a-button>
</template>
<!-- i18n 切换语言 组件 -->
<script>
    import {i18nUtil} from "~Config/i18n/i18nUtil";


    export default {
        name:'I18nChangeComp',
        data(){
            return {}
        },
        computed:{
            langLocale(){
                return (this.$i18n.locale) ? this.$i18n.locale : 'zh' ;
            }
        },
        methods:{
            langChangeToZh(){
                let lang = this.$i18n.locale === 'zh' ? 'en' : 'zh'
                this.$i18n.locale = lang ;
                i18nUtil.reflushCache(this.$i18n.locale);
                //手动更新那些npm组件的内容
                this.manualUpdateText();
            },
            /**
             * 手动更新那些npm组件的内容
             */
            manualUpdateText(){
                document.getElementsByClassName('verify-change-code')[0].innerHTML = this.$t('langMap.button.actions.switchToNextOne') ;
            }
        }
    }
</script>
