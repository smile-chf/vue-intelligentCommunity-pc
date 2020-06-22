<template>
    <div class="mychart3">
        <div id="map_canvas"></div>
        <div class="four_item">
            <div class="four_item_unit" @click="go">
                <p class="p1">党委/党总支</p>
                <p class="p2">{{fourData.dwAndDzz}}</p>
            </div>
            <div class="four_item_unit" @click="go">
                <p class="p1">党支部</p>
                <p class="p2">{{fourData.dzb}}</p>
            </div>
            <div class="four_item_unit" @click="go">
                <p class="p1">正式党员</p>
                <p class="p2">{{fourData.formal}}</p>
            </div>
            <div class="four_item_unit" @click="go">
                <p class="p1">预备党员</p>
                <p class="p2">{{fourData.preparation}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import mapStyle from "../../static/custom_map_config.json";

    export default {
        name: "mychart3",
        data() {
            return {
                map: "",
                geolocation: "",
                point: new BMap.Point(117.225095,31.754029),
                // point1: "117.307246, 31.869826",
                // point2: "117.389246, 32.069826",
                mapLib: "",
                fourData: [],
                list: [],
                img1: require("../assets/img/usually.png"),
                img2: require("../assets/img/choose.png")
            };
        },
        props: ['data3'],
        mounted() {
            this.fourData = this.data3.other;
            this.list = this.data3.partyDeparts;
            this.initmap();
            this.popup();
            for (let i = 0; i < this.list.length; i++) {
                this.add_overlay(this.list[i]);
            }
        },
        methods: {
            go() {
                this.$router.push('/index/visual')
            },
            initmap() {
                this.map = new BMap.Map("map_canvas"); // 创建地图实例
                this.geolocation = new BMap.Geolocation();
                this.map.enableScrollWheelZoom();
                // setTimeout(function () {
                    this.map.centerAndZoom(this.point, 13);
                // },100);

                var styleJson = mapStyle;
                this.map.setMapStyleV2({styleJson: styleJson});
            },
            add_overlay(Sdata) {
                let a = Sdata.latitudeAndLongitude.split(",")[0];
                let b = Sdata.latitudeAndLongitude.split(",")[1];
                let jw = new BMap.Point(b, a);
                var myIcon = new BMap.Icon(this.img1, new BMap.Size(40, 200));
                var marker = new BMap.Marker(jw, {icon: myIcon});
                var myIcon2 = new BMap.Icon(this.img2, new BMap.Size(40, 200));
                var marker2 = new BMap.Marker(jw, {icon: myIcon2});

                this.map.addOverlay(marker);
                //最后一个点作为定位中心点
                // this.map.centerAndZoom(jw, 13);

                const customizedInfoWindow = new window.BMapLib.InfoBox(
                    this.map,
                    `<div class="grayInfo">
                        <div class="title">组织：${Sdata.name}</div>
                        <div class="content">书记：${Sdata.secretary}</div>
                        <div class="content">党员：${Sdata.memberCount}人</div>
                        <div class="content">地址：${Sdata.address}
                            </div>
                      </div>`
                );

                //添加标注点的鼠标事件
                marker.addEventListener("mouseover", function (e) {
                    this.map.addOverlay(marker2);
                    this.map.removeOverlay(marker);
                    customizedInfoWindow.open(jw);
                });
                marker.addEventListener("mouseout", function () {
                    customizedInfoWindow.close(jw);
                });
                //切换标注点的鼠标事件
                marker2.addEventListener("mouseout", function () {
                    this.map.addOverlay(marker);
                    this.map.removeOverlay(marker2);
                    customizedInfoWindow.close(jw);
                });
            },

            popup() {
            }
        }
    }
</script>

<style>
    .mychart3 {
        width: 100%;
        height: 100%;
        position: relative;
        /*margin-left: .5%;*/
        /*margin-top: .7%;*/
        box-sizing: border-box;
        padding: .2rem;
    }

    .four_item {
        display: flex;
        width: 100%;
        height: 12%;
        position: absolute;
        top: 10%;
        left: 0;
        justify-content: center;
        box-sizing: border-box;
        padding: 0 2.1rem;
    }

    .four_item .four_item_unit {
        width: 17.71%;
        height: 100%;
        background: url("../assets/img/map_bg.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        margin-right: 5%;
        cursor: pointer;
    }

    .four_item .four_item_unit:last-child {
        margin-right: 0;
    }

    .four_item .four_item_unit .p1 {
        color: #ADF0FF;
        font-size: .6rem;
        margin-top: 6%;
    }

    .four_item .four_item_unit .p2 {
        color: #FFFFFF;
        font-size: 1.2rem;
        margin-top: 1%;
    }


    #map_canvas {
        width: 100%;
        height: 100%;
    }

    .BMap_Marker {
        /*width: 30px !important;*/
        height: 100px !important;
        background-size: 100% 100% !important;
    }

    .BMap_Marker img {
        width: 100%;
        height: 50%;
    }

    .infoBox {
        width: 14rem;
        height: 7rem;
        color: #FFE6CA;
        font-size: .6rem;
        background: url("../assets/img/title_bg.png") no-repeat;
        background-size: 100% 100%;
        pointer-events: none;
        box-sizing: border-box;
        padding: .9rem 1.5rem;
        line-height: 1rem;
        margin-bottom: 2.5rem;
    }

    .infoBox img {
        display: none;
    }

    .anchorBL {
        display: none;
    }
</style>
