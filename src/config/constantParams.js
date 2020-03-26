const constantParams ={
    props:{
        upload:{
            location:{
                prefix:dealGetValueByEnv("M:\\static_dir\\","C:\\swordsman\\projects\\egg_manager\\static_dir"),
                img:"\\img"
            },
            url:{
                prefix:dealGetValueByEnv("http:\\\\localhost:8090","http:\\\\47.99.160.215:8090")
            },
            project:{
                name:"egg_manager"
            }
        }
    },
    defalutObj:{    //一些常用的默认值
        avatarUrl:"/static/img/user/panda_egg.jpg"
    }
}

/**
 * 根据 当前环境取得对应的值
 * devVal:本地开发用的值
 * prodVal 生产环境使用的值
 */
function dealGetValueByEnv(devVal,prodVal) {
    if(process.env.NODE_ENV === 'development'){
        return devVal ;
    }   else {
        return prodVal ;
    }
}
export  default constantParams ;
