const tagsView = {
    state: {
        contextMenuBaseConf: {}
    },
    mutations: {
        SET_CONTEXT_MENU_POSITION: (state,contextMenuPositionObj) => {
            //不能直接通过修改属性，需求修改对象的引用地址才能触发视图的更新
            let data = Object.assign({},state.contextMenuBaseConf,contextMenuPositionObj) ;
            state.contextMenuBaseConf = data ;
        }


    },
    actions: {
        doSetContextMenuPosition({commit},contextMenuPositionObj){
            commit('SET_CONTEXT_MENU_POSITION',contextMenuPositionObj);
        }

    }


}


export default tagsView
