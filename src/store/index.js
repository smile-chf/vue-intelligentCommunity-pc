import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        departId: "",
        Date: [],
        two:{
        nomsearchname: "",
        nomsearchdata: []
        },
        three:{
            departId:"",
            data:[],
            type:""
        },
       year:"",
       year1:"",
       year6:"",
       four:{
        username:"",
        data:[]  ,
       },
       five:{
        username:"",
        data:[]  ,
       },
       six:{
        username:"",
        data:[]  ,
       },
    },
    mutations: {
        add(state, n) {
            state.departId = n.searchorg
            state.Date = n.searchdata
        },
        add1(state, n) {
            state.two.nomsearchname = n.nomsearchname
            state.two.nomsearchdata = n.nomsearchdata
        },
        add3(state, n) {
            state.three.departId=n.departId
            state.three.data=n.data
            state.three.type=n.type
        },
        pushyear(state, n){
           state.year=n.year
        },
        pushsome(state, n){
            state.four.username=n.username
            state.four.data=n.data
        },
        pushsome1(state, n){
            state.year1=n.yeardata
        },
        pushsome4(state, n){
            state.five.username=n.username
            state.five.data=n.data
        },
        pushsome6(state, n){
            state.year6=n.yeardata
        },
        pushsome7(state, n){
            state.six.username=n.username
            state.six.data=n.data
        },
    },
    actions: {},
    modules: {}
})
