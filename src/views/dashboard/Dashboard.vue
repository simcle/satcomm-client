<template>
    <div>
        <div class="row">
            <div class="col-sm-6 col-xl-3">
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
            <div class="col-sm-6 col-xl-3">
                <div class="card card-body">
                    <div class="media">
                        <div class="mr-3 align-self-center opacity-75">
                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
                                <path d="M8 1.75a.25.25 0 0 1 .25.25v9.02a1.5 1.5 0 1 1-.5 0V2A.25.25 0 0 1 8 1.75z"/>
                                <path d="M6 2a2 2 0 1 1 4 0v7.627a3.5 3.5 0 1 1-4 0V2zm2-1a1 1 0 0 0-1 1v7.901a.5.5 0 0 1-.25.433A2.499 2.499 0 0 0 8 15a2.5 2.5 0 0 0 1.25-4.666.5.5 0 0 1-.25-.433V2a1 1 0 0 0-1-1z"/>
                            </svg>
                        </div>

                        <div class="media-body text-right">
                            <h2 v-if="rtb" class="mb-0">{{rtb['tmp']}} &#8451;</h2>
                            <h2 v-else class="mb-0">-</h2>
                            <span>Temperature</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-3">
                <div class="card card-body">
                    <div class="media">
                        <div class="mr-3 align-self-center">
                            <i class="icon-lab icon-3x opacity-75"></i>
                        </div>

                        <div class="media-body text-right">
                            <h2 class="mb-0">-</h2>
                            <span>COD (mg/l)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-xl-3">
                <div class="card card-body">
                    <div class="media">
                        <div class="mr-3 align-self-center">
                            <i class="icon-droplets icon-3x opacity-75"></i>
                        </div>

                        <div class="media-body text-right">
                            <h2 class="mb-0">-</h2>
                            <span>TSS (mg/l)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-9">
                <div class="card card-body">
                    <canvas id="myChart" width="400" height="190"></canvas>
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
                       <div class="d-flex align-items-center border-bottom p-2">
                           <div class="mr-auto">pH</div>
                           <h2 v-if="average.ph" class="mb-0 font-weight-semibold text-success">{{average.ph.toFixed(2)}}</h2>
                           <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                       </div>
                       <div class="d-flex align-items-center border-bottom p-2">
                           <div class="mr-auto">Temp</div>
                           <h2 v-if="average.tmp" class="mb-0 font-weight-semibold text-danger">{{average.tmp.toFixed(2)}} &#8451;</h2>
                           <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                       </div>
                       <div class="d-flex align-items-center border-bottom p-2">
                           <div class="mr-auto">COD (mg/l)</div>
                           <h2 v-if="average.cod" class="mb-0 font-weight-semibold">{{average.cod.tofixed(2)}}</h2>
                           <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                       </div>
                       <div class="d-flex align-items-center border-bottom p-2">
                           <div class="mr-auto">TSS (mg/l)</div>
                           <h2 v-if="average.tss" class="mb-0 font-weight-semibold">{{average.tss.tofixed(2)}}</h2>
                           <h2 v-else class="mb-0 font-weight-semibold">-</h2>
                       </div>
                       <div class="d-flex align-items-center border-bottom p-2">
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
            rtb: null,
            time:[],
            ph:[],
            tmp:[],
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
                    label: 'pH meter',
                    data: app.ph,
                    fill: false,
                    backgroundColor: 'rgba(2, 207, 19)',
                    borderColor: 'rgba(2, 207, 19)'
                }, {
                    label: 'Temperature',
                    data: app.tmp,
                    backgroundColor: 'rgba(207, 2, 2)',
                    borderColor: 'rgba(207, 2, 2)',
                    fill: false      
                }, {
                    label: 'COD (mg/l)',
                    data: [],
                    backgroundColor: 'rgb(255, 205, 86)',
                    borderColor: 'rgb(255, 205, 86)',
                    fill: false
                }, {
                    label: 'TSS (mg/l)',
                    data: [],
                    backgroundColor: 'rgb(153, 102, 255)',
                    borderColor: 'rgb(153, 102, 255)',
                    fill: false
                },{
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
                this.average = response.data
                this.isLoading = false
            })
        }
    },
    watch: {
        user: {
            immediate: true,
            handler(user) {
                if(user) {
                    this.$rtdbBind('rtb', measuring.child(user.id))
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
                if(this.tmp.length > 19) {
                    this.tmp.splice(0, 1)
                }
                let clock = new Date(val['dateTime'])
                this.time.push(clock.getHours()+":"+clock.getUTCMinutes()+":"+clock.getSeconds())
                this.ph.push(val['ph'])
                this.tmp.push(val['tmp'])
                window.myLine.update()
            }
        }
    }

}
</script>