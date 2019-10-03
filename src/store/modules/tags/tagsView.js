const tagsView = {
    state: {
        contextMenuBaseConf: {},
        visitedViews:[],
        cachedViews:[]
    },
    mutations: {
        SET_CONTEXT_MENU_POSITION: (state,contextMenuPositionObj) => {
            //不能直接通过修改属性，需求修改对象的引用地址才能触发视图的更新
            let data = Object.assign({},state.contextMenuBaseConf,contextMenuPositionObj) ;
            state.contextMenuBaseConf = data ;
        },
        ADD_VISITED_VIEWS:(state,view) => {
            if(state.visitedViews.some(v => v.path === view.path)) {
                return ;
            }   else {
                state.visitedViews.push({
                    name:view.name,
                    path:view.path,
                    title:view.meta.title || 'UnknowName'
                })
                if(!view.meta.noCache){
                    state.cachedViews.push(view.name);
                }
            }
        },
        DEL_VISITED_VIEWS:(state,view) => {
            //从访问列表移除
            for (const[i,v] of state.visitedViews.entries()) {
                if(v.path === view.path) {
                    state.visitedViews.splice(i,1) ;
                    break ;
                }
            }
            //从缓存列表移除
            for (const i of state.cachedViews){
                if(i === view.name){
                    const index = state.cachedViews().indexOf(i) ;
                    state.cachedViews.splice(index,1);
                    break ;
                }
            }
        },
        DEL_OTHERS_VIEWS: (state,view) => {
            //从访问列表移除
            for (const[i,v] of state.visitedViews.entries()) {
                if(v.path === view.path) {
                    state.visitedViews = state.visitedViews.slice(i,i+1) ;
                    break ;
                }
            }
            //从缓存列表移除
            for (const i of state.cachedViews){
                if(i === view.name){
                    const index = state.cachedViews().indexOf(i) ;
                    state.cachedViews = state.cachedViews.slice(index,i+1);
                    break ;
                }
            }
        },
        DEL_ALL_VIEWS:(state) => {
            state.visitedViews = [] ;
            state.cachedViews = [] ;
        }
    },
    actions: {
        doSetContextMenuPosition({commit},contextMenuPositionObj){
            commit('SET_CONTEXT_MENU_POSITION',contextMenuPositionObj);
        },
        doAddVisitedViews({ commit }, view) {
            commit('ADD_VISITED_VIEWS', view)
        },
        doDelVisitedViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_VISITED_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        doDelOthersViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_OTHERS_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        doDelAllViews({ commit, state }) {
            return new Promise((resolve) => {
                commit('DEL_ALL_VIEWS')
                resolve([...state.visitedViews])
            })
        }

    }


}


export default tagsView
