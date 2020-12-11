function getVueI18n() {
    var vuei18nTmp = window.vuei18n;
    //如果已有缓存的i18n，直接返回
    if(vuei18nTmp){
        return vuei18nTmp ;
    }   else {
        //懒加载Vue与VueI18n
        const Vue = require('vue');
        const VueI18n = require('vue-i18n');
        Vue.default.use(VueI18n.default);
        vuei18nTmp = new VueI18n.default({
            locale: getI18nLocale(),    // 语言标识
            messages: {
                'zh-CN': require('~Config/i18n/lang/zh-CN'),
                'en-US': require('~Config/i18n/lang/en-US')
            }
        });
        //刷新window.vuei18n
        if(vuei18nTmp){
            window.vuei18n = vuei18nTmp ;
        }
        return vuei18nTmp;
    }
}

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
        const i18n = getVueI18n();
        i18n.locale = getI18nLocale();
        return i18n.tc(key);
    }
}
