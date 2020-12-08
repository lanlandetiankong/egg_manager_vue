export const i18nUtil =  {
    reflushCache(localVal){
        window.sessionStorage.setItem("i18nLocale",localVal);
        if(window.$cookies){
            window.$cookies.set("i18nLocale", localVal);
        }
    }
}
