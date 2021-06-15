<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="card card-body vld-parent">
                    <Loading
                        :active.sync="isLoading"
                        :is-full-page="false"
                    >
                    </Loading>
                    <canvas id="pHChart" width="300" height="200"></canvas>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="card card-body vld-parent">
                    <Loading
                        :active.sync="isLoading"
                        :is-full-page="false"
                    >
                    </Loading>
                    <canvas id="tmpChart" width="300" height="200"></canvas>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="card card-body vld-parent">
                    <Loading
                        :active.sync="isLoading"
                        :is-full-page="false"
                    >
                    </Loading>
                    <canvas id="codChart" width="300" height="200"></canvas>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="card card-body vld-parent">
                    <Loading
                        :active.sync="isLoading"
                        :is-full-page="false"
                    >
                    </Loading>
                    <canvas id="tssChart" width="300" height="200"></canvas>
                </div>
            </div>
        </div><div class="card card-body vld-parent">
            <Loading
                :active.sync="isLoading"
                :is-full-page="false"
            >
            </Loading>
            <canvas id="nh3nChart" width="300" height="100"></canvas>
        </div>

        <div class="card card-body vld-parent">
            <Loading
                :active.sync="isLoading"
                :is-full-page="false"
            >
            </Loading>
            <canvas id="debitChart" width="300" height="100"></canvas>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    components: {
        Loading
    },
    data() {
        return {
            isLoading: false,
            time:[],
            ph:[],
            tmp:[],
            cod:[],
            tss:[],
            nh3n:[],
            debit:[],
        }
    },
    mounted () {
        this.getData()
        this.showChart()
    },
    computed: {
        revtime () {
            return this.time.slice().reverse()
        },
        revph () {
            return this.ph.slice().reverse()
        },
        revtmp () {
            return this.tmp.slice().reverse()
        },
        revcod () {
            return this.cod.slice().reverse()
        },
        revtss () {
            return this.tss.slice().reverse()
        },
        revnh3n () {
            return this.nh3n.slice().reverse()
        }
    },
    methods: {
        showChart() {
            const app = this
            const pHChart = document.getElementById('pHChart')
            window.ph = new Chart(pHChart, {
                type: 'bar',
                data: {
                    labels: app.revtime,
                    datasets:[{
                        label: 'pH meter',
                        data: app.revph,
                        backgroundColor: 'rgba(2, 207, 19, 0.5)'
                    }]
                }
            })

            const tmpChart = document.getElementById('tmpChart')
            window.tmp = new Chart(tmpChart, {
                type: 'bar',
                data: {
                    labels: app.revtime,
                    datasets:[{
                        label: 'temperature',
                        data: app.revtmp,
                        backgroundColor: 'rgba(207, 2, 2, 0.5)'
                    }]
                }
            })
            const codChart = document.getElementById('codChart')
            window.tmp = new Chart(codChart, {
                type: 'bar',
                data: {
                    labels: app.revtime,
                    datasets:[{
                        label: 'COD (mg/l)',
                        data: app.revcod,
                        backgroundColor: 'rgba(255, 205, 86, 0.5)'
                    }]
                }
            })
            const tssChart = document.getElementById('tssChart')
            window.tmp = new Chart(tssChart, {
                type: 'bar',
                data: {
                    labels: app.revtime,
                    datasets:[{
                        label: 'TSS (mg/l)',
                        data: app.revtss,
                        backgroundColor: 'rgba(153, 102, 255, 0.5)'
                    }]
                }
            })
            const nh3nChart = document.getElementById('nh3nChart')
            window.tmp = new Chart(nh3nChart, {
                type: 'bar',
                data: {
                    labels: app.revtime,
                    datasets:[{
                        label: 'NH4-N (mg/l)',
                        data: app.revnh3n,
                        backgroundColor: 'rgb(66,190,246, 0.5)'
                    }]
                }
            })
            const debitChart = document.getElementById('debitChart')
            new Chart(debitChart, {
                type: 'line',
                data:{
                    labels: app.revtime,
                    datasets: [{
                        label: 'Debit (m3/h)',
                        data: [1345,1456,1378,1673,1628,1743,1578,1635,1618,1670],
                        backgroundColor:'rgb(54, 162, 235, 0.5)',
                        borderColor: 'rgb(54, 162, 235)'
                    }]
                }
            })
        },
        getData() {
            this.isLoading = true
            axios.get('api/sparing')
            .then((response) => {
                response.data.forEach(el => {
                    let time = new Date(el.created_at)
                    this.time.push(time.getHours()+":"+time.getMinutes())
                    this.ph.push(el.ph) 
                    this.tmp.push(el.tmp)
                    this.cod.push(el.cod)
                    this.tss.push(el.tss)
                    this.nh3n.push(el.nh3n)
                });
                this.showChart()
                this.isLoading = false
            })
        }
    }
}
</script>