const tagsView = {
    state: {
        contextMenuBaseConf: {},
        visitedViews:[],
        cachedViews:new Map()
    },
    mutations: {
        SET_CONTEXT_MENU_POSITION: (state,contextMenuPositionObj) => {
            //不能直接通过修改属性，需求修改对象的引用地址才能触发视图的更新
            let data = Object.assign({},state.contextMenuBaseConf,contextMenuPositionObj) ;
            state.contextMenuBaseConf = data ;
        },
        SET_HIDDEN_CONTEXT_MENU_POSITION: (state) => {
            let data = JSON.parse(JSON.stringify(state.contextMenuBaseConf)) ;
            data.visible = false;
            state.contextMenuBaseConf = data ;
        },
        ADD_VISITED_VIEWS:(state,view) => {
            if(state.visitedViews.some(v => v.path === view.path)) {
                return ;
            }   else {
                var viewMetaTemp = view.meta ;
                state.visitedViews.push({
                    name:view.name,
                    path:view.path,
                    title:viewMetaTemp.title || 'UnknowName'
                })
                if(viewMetaTemp.keepAliveFlag == true){
                    //key:上级页面 组件名，该上级页面下需要缓存的 组件名集合
                    var viewParentRouterCompName = viewMetaTemp.parentRouterCompName ;
                    if(viewParentRouterCompName){
                        var parentRouteList = state.cachedViews.get(viewParentRouterCompName);
                        if(typeof parentRouteList == "undefined" || parentRouteList == null){   //不存在key
                            parentRouteList = [viewMetaTemp.selfCompName];
                        }   else {  //存在key 添加新的
                            var selfCompNameExist = parentRouteList.find((val) => {
                                return val == viewMetaTemp.selfCompName;
                            });
                            if(typeof selfCompNameExist == "undefined"){    //当前组件还没添加
                                parentRouteList.push(viewMetaTemp.selfCompName);
                            }   else {
                                //console.log("当前子页面已经记录："+viewMetaTemp.selfCompName);
                            }
                        }
                        var stateCachedViewsTemp = state.cachedViews;
                        stateCachedViewsTemp.set(viewParentRouterCompName,parentRouteList);
                        state.cachedViews = new Map(stateCachedViewsTemp);
                    }
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





        },
        DEL_OTHERS_VIEWS: (state,view) => {
            //从访问列表移除
            for (const[i,v] of state.visitedViews.entries()) {
                if(v.path === view.path) {
                    state.visitedViews = state.visitedViews.slice(i,i+1) ;
                    break ;
                }
            }


        },
        DEL_ALL_VIEWS:(state) => {
            state.visitedViews = [] ;
            state.cachedViews = new Map() ;
        }
    },
    actions: {
        doSetContextMenuPosition({commit},contextMenuPositionObj){
            commit('SET_CONTEXT_MENU_POSITION',contextMenuPositionObj);
        },
        doSetHiddenContextMenuPosition({commit}){
            commit('SET_HIDDEN_CONTEXT_MENU_POSITION');
        },
        doAddVisitedViews({ commit }, view) {
            commit('ADD_VISITED_VIEWS', view)
        },
        doDelVisitedViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_VISITED_VIEWS', view) ;
                resolve([...state.visitedViews])
            })
        },
        doDelOthersViews({ commit, state }, view) {
            return new Promise((resolve) => {
                commit('DEL_OTHERS_VIEWS', view) ;
                resolve([...state.visitedViews])
            })
        },
        doDelAllViews({ commit, state }) {
            return new Promise((resolve) => {
                commit('DEL_ALL_VIEWS') ;
                resolve([...state.visitedViews])
            })
        }

    }


}


export default tagsView
