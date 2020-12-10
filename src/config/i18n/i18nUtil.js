import Vue from "vue";
// 1.还是需要引入vue-i18n插件
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: getI18nLocale(),    // 语言标识
    messages: {
        'zh-CN': require('~Config/i18n/lang/zh-CN'),
        'en-US': require('~Config/i18n/lang/en-US')
    }
})

function getI18nLocale() {
    return (window.sessionStorage.getItem("i18nLocale")) ? window.sessionStorage.getItem("i18nLocale") : 'zh-CN'
}

export const i18nUtil =  {
    reflushCache(localVal){
        window.sessionStorage.setItem("i18nLocale",localVal);
        if(window.$cookies){
            window.$cookies.set("i18nLocale", localVal);
        }
    },
    getKey(key){
        if(!key){
            return '' ;
        }
        i18n.locale = getI18nLocale();
        return i18n.tc(key);
    }
}
