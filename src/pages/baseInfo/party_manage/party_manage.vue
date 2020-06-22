<template>
    <div class="wrap">
        <div class="list">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">组织名:</p>
                        <el-input v-model="search.Sname" placeholder="请输入"></el-input>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="Onsearch">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <p @click="add()">添加</p>
                    <p @click="opendelete()">删除</p>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" v-loading="loading" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="name" label="组织名"></el-table-column>
                <!--                <el-table-column prop="ownerKey" label="所属数字字典" width="180"></el-table-column>-->
                <el-table-column prop="ownerName" label="所属地区社区居委会名字"></el-table-column>
                <el-table-column prop="type" label="党总支/党支部"></el-table-column>
                <!--                <el-table-column prop="pid" label="上一级id"></el-table-column>-->
            </el-table>
            <el-pagination
                @size-change="sizeChange1"
                @current-change="currentChange1"
                :current-page="currentPage"
                :page-sizes="[10, 24, 36, 48]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="total"
            ></el-pagination>
        </div>

        <!-- 修改 -->
        <div class="detail" v-if="isShow">
            <div class="small_detail_wrap">
                <!--   头部基本档案 -->
                <p class="title">新建党组织</p>
                <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                    <div>
                        <el-form-item label="组织名：">
                            <el-input v-model="form.name" placeholder="组织名"></el-input>
                        </el-form-item>
                        <el-form-item label="经度：">
                            <el-input v-model="form.longitude" placeholder="经度"></el-input>
                        </el-form-item>
                        <el-form-item label="纬度：">
                            <el-input v-model="form.latitude" placeholder="纬度"></el-input>
                        </el-form-item>
                        <el-form-item label="地址：">
                            <el-input v-model="form.address" placeholder="地址"></el-input>
                        </el-form-item>
                        <el-form-item label="书记：">
                            <el-input v-model="form.secretary" placeholder="书记"></el-input>
                        </el-form-item>
                        <el-form-item label="类型：">
                            <el-select v-model="form.type" placeholder="请选择">
                                <el-option label="党委" value="0" name="党委"></el-option>
                                <el-option label="党总支" value="1" name="党总支"></el-option>
                                <el-option label="党支部" value="2" name="党支部"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属党委：" v-if="form.type==1||form.type==2">
                            <el-select v-model="party" @change="changeBranch" placeholder="请选择所属党委">
                                <el-option :label=item.name :value=item.id :name=item.name
                                           v-for="item of partyCommitteeArr"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属党总支：" v-if="form.type==2">
                            <el-select v-model="subParty" placeholder="请选择所属党总支">
                                <el-option :label=item.name :value=item.id :name=item.name
                                           v-for="item of generalPartyBranch"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属地区：">
                            <el-select v-model="form.parentArea" placeholder="地区" @change="change('parentArea','1')"
                                       ref='parentArea'>
                                <el-option :label="item.value" :value="item.key" v-for="item in parentAreaArr"
                                           :key="item.key"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属社区：">
                            <el-select v-model="form.area" placeholder="社区" @change="change('area','1')" ref="area">
                                <el-option :label="item.value" :value="item.key" v-for="item in areaArr"
                                           :key="item.key"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属居委会">
                            <el-select v-model="form.committee" placeholder="居委会" @change="change('committee','1')"
                                       ref="committee">
                                <el-option :label="item.value" :value="item.key" v-for="item in committeeArr"
                                           :key="item.key"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-form>
                <div class="handle" style="display: flex;align-items: center;justify-content: center;padding: 0">
                    <p class="close" @click="sure">保存</p>
                    <p class="close" style="width: 4rem" @click="chooseLatitudeAndLongitude">经纬度拾取</p>
                    <p class="close" @click="close">取消</p>
                </div>
            </div>
        </div>
        <div class="detail" v-show="showMap">
            <div class="small_detail_wrap small_detail_wrap1" style="padding: 0">
                <div class="searchDiv">
                    <label>请输入地点名称：</label>
                    <el-input v-model="baiduMap.searchValue" class="searchValue"></el-input>
                    <el-button class="searchValueBtn" type="primary" @click="searchLocation">搜索</el-button>
                    <label style="margin-left: 36px">经纬度：{{baiduMap.longitude +','+baiduMap.latitude}}</label>
                    <el-button class="searchValueConfirmBtn" type="primary" @click="chooseSearchValue">拾取</el-button>
                    <el-button class="closeBtn" type="primary" @click="showMap=false">关闭</el-button>
                </div>
                <div id="allmap" style="height: 75vh;"></div>
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        name: "index",
        data() {
            return {
                search: {
                    Sname: ""
                },
                isShow: false,
                loading: false,
                showMap: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                idArr: '',
                partyCommitteeArr: [],
                generalPartyBranch: [],
                party: '',
                subParty: '',
                form: {
                    name: "",
                    ownerName: "",
                    longitude: "",
                    latitude: "",
                    address: "",
                    secretary: "",
                    type: "",
                    parentArea: "",
                    area: "",
                    committee: ""
                },
                parentAreaArr: [],
                areaArr: [],
                committeeArr: [],
                area: '',
                key: '',
                baiduMap: {
                    searchValue: "",
                    local: "",
                    longitude: "",
                    latitude: ""
                }
            };
        },
        created() {
            this.getlist();
            this.getPartyList(0);
        },
        methods: {
            Onsearch() {
                this.pageNum = 1
                this.getlist()
            },
            //切换每页条数
            sizeChange1(val) {
                this.pageSize = val;
                this.getlist();
            },
            //切换页码
            currentChange1(val) {
                this.pageNum = val;
                this.currentPage = val;
                this.getlist();
            },
            getlist() {
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/party/departs", {
                        params: {
                            pageSize: this.pageSize,
                            pageNum: this.pageNum,
                            name: this.search.Sname
                        }
                    })
                    .then(data => {
                        this.loading = false;
                        if (data.data.code === 200) {
                            this.tableData = data.data.details.list.list;
                            this.total = data.data.details.list.total;
                            this.currentChange = data.data.details.list.pageNum;
                        }
                    });
            },
            handleChange(val) {
                let arr = [];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id)
                }
                this.idArr = arr
            },

            add() {
                this.isShow = true;
                this.party = '';
                this.key = '';
                this.area = '';
                this.form.name = '';
                this.form.type = "";
                this.party = "";
                this.subParty = "";
                this.form.parentArea = "";
                this.form.area = "";
                this.form.committee = "";
                this.form.longitude = "";
                this.form.latitude = "";
                this.form.address = "";
                this.form.secretary = "";
                this.parentAreaArr = [];
                this.areaArr = [];
                this.committeeArr = [];
                //获取地区
                this.axios.post('/hfcx_multi_project/manage/dictionary/search?key=qu').then(res => {
                }).catch(e => {
                    let json = {
                        value: "请选择地区",
                        key: ""
                    };
                    this.parentAreaArr = [];
                    this.parentAreaArr.push(json);
                    this.parentAreaArr.push(...e.data);
                })
            },
            close() {
                this.isShow = false;
            },
            handleModify(id) {
                this.loading = true;
                this.isShow = true;
                this.axios
                    .get("/intelligentCommunity/manage/party/depart/" + id)
                    .then(res => {
                        this.loading = false;
                        if (res.data.code === 200) {
                            this.form.name = res.data.details.data.name;
                            this.form.ownerName = res.data.details.data.ownerName;
                            this.form.type = res.data.details.data.type;
                        }
                    });
            },

            // 删除列表
            opendelete(id) {
                // 批量删除
                if (this.idArr.toString() == '') {
                    this.$message({
                        type: 'info',
                        message: '请选择删除项!'
                    });
                    return false
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        method: 'post',
                        url: '/intelligentCommunity/manage/party/deleteDepart',
                        data: this.idArr
                    })
                        .then(data => {
                            if (data.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getlist()
                            }
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            // 点击确定
            sure() {
                if (!this.form.type) {
                    this.$message({
                        type: 'info',
                        message: '请选择所属党组织/党支部!'
                    });
                    return false
                }
                if (this.form.type == 2 && !this.party) {
                    this.$message({
                        type: 'info',
                        message: '请选择所属党组织!'
                    });
                    return false
                }
                if (!this.form.name) {
                    this.$message({
                        type: 'info',
                        message: '请输入姓名!'
                    });
                    return false;
                }
                if (!this.area) {
                    this.$message({
                        type: 'info',
                        message: '请最少选择一个地区!'
                    });
                    return false
                }
                if (this.form.latitude == "" || this.form.longitude == "") {
                    this.$message({
                        type: 'info',
                        message: '请填写经纬度'
                    });
                    return false
                }
                if (!this.form.address) {
                    this.$message({
                        type: 'info',
                        message: '请输入地址!'
                    });
                    return false;
                }
                if (!this.form.secretary) {
                    this.$message({
                        type: 'info',
                        message: '请输入书记!'
                    });
                    return false;
                }
                this.loading = true;
                let pid = this.party;
                if (this.form.type == 2) {
                    pid = this.subParty;
                }
                this.axios
                    .post("/intelligentCommunity/manage/party/saveDepart", {
                        name: this.form.name,
                        address: this.form.address,
                        secretary: this.form.secretary,
                        ownerName: this.area,
                        ownerKey: this.key,
                        type: this.form.type,
                        pid: pid,
                        latitudeAndLongitude: this.form.latitude + "," + this.form.longitude
                    })
                    .then(res => {
                        this.loading = false;
                        if (res.data.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.getlist();
                            this.isShow = false;
                        }
                    }).catch(e => {
                    this.$message({
                        type: 'info',
                        message: '添加失败!'
                    });
                });

            },


            change(ref, type) {
                this.$nextTick(function () {
                    let val = this.$refs[ref]._props.value;
                    if (ref == 'parentArea') {
                        this.axios.post('/hfcx_multi_project/manage/dictionary/search?key=' + val).then(res => {
                        }).catch(e => {
                            this.areaArr = e.data
                        });
                        //赋值
                        this.area = this.$refs[ref].selectedLabel;
                        this.key = this.$refs[ref]._props.value;
                        this.areaArr = [{
                            value: '请选择社区',
                            key: ''
                        }];
                        this.form.area = '';
                        this.committeeArr = [{
                            value: '请选择居委会',
                            key: ''
                        }];
                        this.form.committee = ''
                    }
                    if (ref == 'area') {
                        this.axios.post('/hfcx_multi_project/manage/dictionary/search?key=' + val).then(res => {
                        }).catch(e => {
                            this.committeeArr = e.data
                        });
                        this.committeeArr = [{
                            value: '请选择居委会',
                            key: ''
                        }];
                        this.form.committee = '';
                        this.area = this.$refs[ref].selectedLabel;
                        this.key = this.$refs[ref]._props.value;
                    }
                    if (ref == 'committee') {
                        this.area = this.$refs[ref].selectedLabel;
                        this.key = this.$refs[ref]._props.value;
                    }

                })

            },

            getPartyList(type, pid) {
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/party/getDepartByTypeOrPid", {
                        params: {
                            type: type,
                            pid: pid
                        }
                    })
                    .then(data => {
                        this.loading = false;
                        if (data.data.code === 200) {
                            if (type == 0) {
                                this.partyCommitteeArr = data.data.details.data
                            } else if (type == 1) {
                                this.generalPartyBranch = data.data.details.data
                            }
                        }
                    });
            },
            changeBranch() {
                this.generalPartyBranch = [];
                this.subParty = "";
                this.getPartyList(1, this.party);
            },
            chooseLatitudeAndLongitude() {
                this.showMap = true;
                this.initMap();
            },
            initMap() {
                let _vueObj = this;
                this.baiduMap.latitude = this.form.latitude;
                this.baiduMap.longitude = this.form.longitude;
                // 在指定容器创建地图实例并设置最大最小缩放级别
                let map = new BMap.Map("allmap", {
                    minZoom: 5,
                    maxZoom: 19
                });

                let _lng = _vueObj.baiduMap.longitude, _lat = _vueObj.baiduMap.latitude;
                if (_lng == "" || _lat == "") {
                    _lng = "117.233836";
                    _lat = "31.826946";
                }

                // 初始化地图，设置中心点和显示级别，延迟执行，解决中心不准问题
                setTimeout(() => {
                    map.centerAndZoom(new BMap.Point(_lng, _lat), 15);
                }, 100);
                // 开启鼠标滚轮缩放功能，仅对PC上有效
                map.enableScrollWheelZoom(true);
                // 将控件（平移缩放控件）添加到地图上
                map.addControl(new BMap.NavigationControl());
                // 显示坐标红点
                map.addOverlay(new BMap.Marker(new BMap.Point(_lng, _lat)));

                // 为地图增加点击事件，为input赋值
                map.addEventListener("click", function (e) {
                    let lat = e.point.lat;
                    let lng = e.point.lng;
                    _vueObj.baiduMap.latitude = lat;
                    _vueObj.baiduMap.longitude = lng;
                    map.clearOverlays();
                    map.addOverlay(new BMap.Marker(new BMap.Point(_vueObj.baiduMap.longitude, _vueObj.baiduMap.latitude)));
                });

                // 创建位置检索、周边检索和范围检索
                _vueObj.baiduMap.local = new BMap.LocalSearch(map, {
                    renderOptions: {
                        map: map
                    }
                });
            },
            searchLocation() {
                this.form.latitude = "";
                this.form.longitude = "";
                if (this.baiduMap.searchValue != "") {
                    this.baiduMap.local.search(this.baiduMap.searchValue);
                }
            },
            chooseSearchValue() {
                this.form.latitude = this.baiduMap.latitude;
                this.form.longitude = this.baiduMap.longitude;
                this.showMap = false;
            }
        }
    };
</script>

<style scoped lang="less">
    .wrap {
        position: relative;
    }

    .form {
        margin-top: 2rem;
    }

    .title {
        width: 100%;
        text-align: center;
        font-size: .9rem;
        color: #212121;
        font-weight: 500;
        padding: 1.5rem 0 .5rem;
        box-sizing: border-box;
    }

    .el-form--inline .el-form-item {
        width: 98%;
    }

    .el-select {
        width: 100% !important;
    }

    .small_detail_wrap {
        padding: 0 0 1rem 0;
    }

    .small_detail_wrap1 {
        width: 80%;
    }

    .searchDiv {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 10px 0 10px 10px;

        .searchValue {
            display: inline-block;
            width: 200px;
        }

        .searchValueBtn, .searchValueConfirmBtn {
            display: inline-block;
            margin-left: 10px;
        }

        button {
            width: 3.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            padding: 0;
            background-color: #f58733;
            border: none;
        }

        button:last-child {
            background-color: #f00;
        }
    }
</style>
