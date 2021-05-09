<template>
    <div>
        <div class="row">
            <div class="col-lg-9">
                <div class="row">
                    <div class="col-sm-6 col-xl-4">
                        <div class="card card-body">
                            <div class="media">
                                <div class="mr-3 align-self-center">
                                    <i class="icon-droplet icon-3x opacity-75"></i>
                                </div>

                                <div class="media-body text-right">
                                    <h2 v-if="rtb" class="mb-0">{{rtb['ph']}}</h2>
                                    <h2 v-else class="mb-0">-</h2>
                                    <span>pH meter</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="card card-body">
                            <div class="media">
                                <div class="mr-3 align-self-center">
                                    <i class="icon-lab icon-3x opacity-75"></i>
                                </div>

                                <div class="media-body text-right">
                                    <h2 v-if="rtb" class="mb-0">{{rtb.cod}}</h2>
                                    <h2 v-else class="mb-0">-</h2>
                                    <span>COD (mg/L)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="card card-body">
                            <div class="media">
                                <div class="mr-3 align-self-center">
                                    <i class="icon-droplets icon-3x opacity-75"></i>
                                </div>

                                <div class="media-body text-right">
                                    <h2 v-if="rtb" class="mb-0">{{rtb.tss}}</h2>
                                    <h2 v-else class="mb-0">-</h2>
                                    <span>TSS (mg/L)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6 col-xl-4">
                        <div class="card card-body">
                            <div class="media">
                                <div class="mr-3 align-self-center opacity-75">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
                                        <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"/>
                                        <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>
                                    </svg>
                                </div>

                                <div class="media-body text-right">
                                    <h2 v-if="rtb" class="mb-0">{{rtb['tmp']}} ℃</h2>
                                    <h2 v-else class="mb-0">-</h2>
                                    <span>Temperature</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="card card-body">
                            <div class="media">
                                <div class="mr-3 align-self-center opacity-75">
                                    <i class="icon-atom2 icon-3x"></i>
                                </div>

                                <div class="media-body text-right">
                                    <h2 v-if="rtb" class="mb-0">{{rtb['nh4']}}</h2>
                                    <h2 v-else class="mb-0">-</h2>
                                    <span>NH4-N (mg/L)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xl-4">
                        <div class="card card-body">
                            <div class="media">
                                <div class="mr-3 align-self-center opacity-75">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
                                        <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z"/>
                                    </svg>
                                </div>

                                <div class="media-body text-right">
                                    <h2 class="mb-0">-</h2>
                                    <span>Debit (m3/h)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card bg-danger">
                    <div class="card-header header-elements-inline">
                        <h6 class="card-title">Puncak</h6>

                        <div class="header-elements">
                            <div><span class="badge badge-mark mr-1"></span> 30 Hari terakhir</div>
                        </div>
                    </div>
                    <div class="card-body text-sm">
                        <div class="d-flex align-items-center border-bottom">
                            <div class="mr-auto">pH</div>
                            <div v-if="maximum.ph" class="mb-0">{{maximum.ph}}</div>
                            <div v-else class="mb-0">-</div>
                        </div>
                        <div class="d-flex align-items-center border-bottom">
                            <div class="mr-auto">Temp</div>
                            <div v-if="maximum.tmp" class="mb-0">{{maximum.tmp}}</div>
                            <div v-else class="mb-0">-</div>
                        </div>
                        <div class="d-flex align-items-center border-bottom">
                            <div class="mr-auto">COD</div>
                            <div v-if="maximum.cod" class="mb-0">{{maximum.cod}}</div>
                            <div v-else class="mb-0">-</div>
                        </div>
                        <div class="d-flex align-items-center border-bottom">
                            <div class="mr-auto">TSS</div>
                            <div v-if="maximum.tss" class="mb-0">{{maximum.tss}}</div>
                            <div v-else class="mb-0">-</div>
                        </div>
                        <div class="d-flex align-items-center border-bottom">
                            <div class="mr-auto">NH4-n</div>
                            <div v-if="maximum.nh3n" class="mb-0">{{maximum.nh3n}}</div>
                            <div v-else class="mb-0">-</div>
                        </div>
                        <div class="d-flex align-items-center border-bottom">
                            <div class="mr-auto">Debit</div>
                            <div v-if="maximum.debit" class="mb-0">{{maximum.debit}}</div>
                            <div v-else class="mb-0">-</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-9">
                <div class="card card-body">
                    <canvas id="myChart" width="400" height="223"></canvas>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card vld-parent">
                    <Loading
                        :active.sync="isLoading"
                        :is-full-page="false"
                        :loader="'bars'"
                    >
                    </Loading>
                    <div class="card-header header-elements-inline">
                        <h6 class="card-title">Rata-rata</h6>

                        <div class="header-elements">
                            <div><span class="badge badge-mark border-success mr-1"></span> 30 Hari terakhir</div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="d-flex align-items-center border-bottom py-2">
                            <div class="mr-auto">pH</div>
                            <h2 v-if="average.ph" class="mb-0 font-weight-semibold text-success">{{average.ph.toFixed(2)}}</h2>
                            <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                        </div>
                        <div class="d-flex align-items-center border-bottom py-2">
                            <div class="mr-auto">Temp</div>
                            <h2 v-if="average.ph" class="mb-0 font-weight-semibold text-danger">{{average.tmp.toFixed(2)}}</h2>
                            <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                        </div>
                        <div class="d-flex align-items-center border-bottom py-2">
                            <div class="mr-auto">COD (mg/l)</div>
                            <h2 v-if="average.cod" class="mb-0 font-weight-semibold text-orange-300">{{average.cod.toFixed(2)}}</h2>
                            <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                        </div>
                        <div class="d-flex align-items-center border-bottom py-2">
                            <div class="mr-auto">TSS (mg/l)</div>
                            <h2 v-if="average.tss" class="mb-0 font-weight-semibold text-purple">{{average.tss.toFixed(2)}}</h2>
                            <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                        </div>
                        <div class="d-flex align-items-center border-bottom py-2">
                            <div class="mr-auto">NH4-N</div>
                            <h2 v-if="average.nh3n" class="mb-0 font-weight-semibold text-blue">{{average.nh3n.toFixed(2)}}</h2>
                            <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                        </div>
                        <div class="d-flex align-items-center border-bottom py-2">
                            <div class="mr-auto">Debit (m3/h)</div>
                            <h2 v-if="average.debit" class="mb-0 font-weight-semibold">{{average.debit.tofixed(2)}}</h2>
                            <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js'
import { db } from '../../db'
import { mapGetters } from 'vuex'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
const measuring = db.ref('Measurement')
export default {
    components: {
        Loading
    },
    data () {
        return {
            isLoading: false,
            average:'',
            maximum: '',
            rtb: null,
            time:[],
            ph:[],
            tmp:[],
            nh4:[],
            cod: [],
            tss: [],
        }
    },
    mounted () {
        this.getData()
        const app = this
        const ctx = document.getElementById('myChart');
        window.myLine = new Chart(ctx, {
            type: 'line',
            data: {
                labels: app.time,
                datasets: [{
                    label: 'pH',
                    data: app.ph,
                    fill: false,
                    backgroundColor: 'rgba(2, 207, 19)',
                    borderColor: 'rgba(2, 207, 19)'
                }, {
                    label: 'Tmp',
                    data: app.tmp,
                    backgroundColor: 'rgb(244, 67, 54)',
                    borderColor: 'rgb(244, 67, 54)',
                    fill: false
                }, {
                    label: 'COD (mg/l)',
                    data: app.cod,
                    backgroundColor: 'rgb(255, 205, 86)',
                    borderColor: 'rgb(255, 205, 86)',
                    fill: false
                }, {
                    label: 'TSS (mg/l)',
                    data: app.tss,
                    backgroundColor: 'rgb(153, 102, 255)',
                    borderColor: 'rgb(153, 102, 255)',
                    fill: false
                },{
                    label: 'NH4-N',
                    data: app.nh4,
                    backgroundColor: 'rgb(66,190,246)',
                    borderColor: 'rgb(66,190,246)',
                    fill: false      
                }, {
                    label: 'Debit (m3/h)',
                    data: [],
                    backgroundColor: 'rgb(54, 162, 235, 0.3)',
                    borderColor: 'rgb(54, 162, 235)'
                }]
            }
        })
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    methods: {
        getData () {
            this.isLoading = true
            axios.get('api/dashboard')
            .then((response) => {
                this.average = response.data.avg
                this.maximum = response.data.max
                this.isLoading = false
            })
        }
    },
    watch: {
        user: {
            immediate: true,
            handler(user) {
                if(user) {
                    this.$rtdbBind('rtb', measuring.child(1))
                }
            }
        
        },
        rtb (val) {
            if(val) {
                if(this.time.length > 19) {
                    this.time.splice(0, 1)
                }
                if(this.ph.length > 19){
                    this.ph.splice(0, 1)
                }
                if(this.nh4.length > 19) {
                    this.nh4.splice(0, 1)
                }
                if(this.cod.length > 19) {
                    this.cod.splice(0, 1)
                }
                if(this.tss.length > 19) {
                    this.tss.splice(0, 1)
                }
                let clock = new Date(val['dateTime'])
                this.time.push(clock.getHours()+":"+clock.getUTCMinutes()+":"+clock.getSeconds())
                this.ph.push(val['ph'])
                this.tmp.push(val['tmp'])
                this.nh4.push(val['nh4'])
                this.cod.push(val['cod'])
                this.tss.push(val['tss'])
                window.myLine.update()
            }
        }
    }

}
</script>