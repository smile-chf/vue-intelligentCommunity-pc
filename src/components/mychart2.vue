<template>
    <div class="mychart2">
        <div id="myChart2">
            <div class="myChart2_title">
                <div class="top">
                    <img src="@/assets/img/men.png" alt="">
                    <p style="margin-right: .2rem"> {{data2.menCount}}人 </p>
                    <p> {{style1.width}}人 </p>
                </div>
                <div class="top">
                    <p style="margin-right: .2rem;position: relative;top: .05rem">{{style2.width}}</p>
                    <p>{{data2.womenCount}}人</p>
                    <img src="@/assets/img/women.png" alt="">
                </div>
            </div>
            <div class="myChart2_main">
                <p class="man common" :style="style1"></p>
                <p class="woman common" :style="style2"></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mychart2",
        data() {
            return {
                style1:{
                    width:''
                },
                style2:{
                    width:''
                }
            }
        },
        props: ['data2'],
        created() {
            console.log(this.data2,'data2')
            let allOcunt=this.data2.menCount+this.data2.womenCount;
            this.style1.width=((this.data2.menCount/allOcunt)*100).toFixed(2)+'%';
            this.style2.width=((this.data2.womenCount/allOcunt).toFixed(2)*100).toFixed(2)+'%';
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style>
    .mychart2 {
        height: 84%;
        width: 100%;
    }

    #myChart2 {
        height: 100%;
        box-sizing: border-box;
        padding: 0 5%;
    }
    #myChart2:before{
        content: '';
        display: table;
    }
    .myChart2_title{
        display: flex;
        justify-content: space-between;
        font-size: .6rem;
        color: #ADF0FF;
        margin-top: 5%;
    }
    .myChart2_title .top{
        display: flex;
        align-items: center;
        color: #54A2D5;
    }
    .myChart2_title .top img{
        /*width: .5rem;*/
        height: 1rem;
    }
    .myChart2_main{
        display: flex;
        width: 100%;
        margin-top: 2%;
    }
    .myChart2_main .man{
        background: #4391C5;
        border-radius: .5rem 0 0 .5rem;
    }
    .myChart2_main .woman{
        background: #D2842C;
        border-radius:0 .5rem .5rem 0;
    }
    .myChart2_main .common{
        height: .5rem;
    }
</style>
