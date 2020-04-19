const exceptionRecordStore = {
    state:{
        exceptionRecordList:[],
    },
    actions:{
        doAddExceptionRecordList({commit},record){
            commit('ADD_EXCEPTION_RECORD_LIST',record);
        },
    },
    mutations:{
        ADD_EXCEPTION_RECORD_LIST:(state,record) => {
            debugger;
            if(record){
                var recordList = state.exceptionRecordList ;
                debugger;
                if(recordList){
                    state.exceptionRecordList.push(record);
                }   else {
                    state.exceptionRecordList = [record];
                }
            }

        },
    },
    getters: {
        exceptionRecordStore_exceptionRecordList(state, getters, rootState) {
            return state.exceptionRecordList ;
        },
    }
}


export default exceptionRecordStore ;
