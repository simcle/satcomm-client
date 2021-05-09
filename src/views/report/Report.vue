<template>
    <div>
        <div class="card">
            <Loading
                :active.sync="isDownload"
                :is-full-page="true"
            >
            <h2>Mohon tunggu file sedang di download...</h2>
            </Loading>
            <div class="card-header header-elements-inline">
                <h6 class="card-title d-flex align-items-center">LAPORAN
                    <div class="ml-3">
                        <Datepicker ref="datepicker" @date="onSelect"></Datepicker>
                    </div>
                </h6>
                <div class="header-element">
                    <button :disabled="disabled" @click="exportExcel" type="button" class="btn bg-teal-400 btn-labeled btn-labeled-left"><b><i class="icon-file-excel"></i></b> Export ke excel</button>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>pH meter</th>
                            <th>Temperatur</th>
                            <th>COD (mg/l)</th>
                            <th>TSS (mg/l)</th>
                            <th>NH4N (mg/l)</th>
                            <th>Debit (m3/h)</th>
                        </tr>
                    </thead>
                    <tbody v-if="isLoading">
                        <tr v-for="p in 20" :key="p">
                            <td>
                                <div class="alpha-blue p-1 m-1"></div>
                            </td>
                            <td>
                                <div class="alpha-green p-1 m-1"></div>
                            </td>
                            <td>
                                <div class="alpha-danger p-1 m-1"></div>
                            </td>
                            <td>
                                <div class="alpha-green p-1 m-1"></div>
                            </td>
                            <td>
                                <div class="alpha-blue p-1 m-1"></div>
                            </td>
                            <td>
                                <div class="alpha-blue p-1 m-1"></div>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr v-for="(report, i) in reports" :key="i">
                            <td>{{report.created_at}}</td>
                            <td>{{report.ph}} 
                                <span v-if="i < reports.length - 1"><i :class="[report.ph > reports[i+1].ph ? 'icon-arrow-up5 text-danger':'icon-arrow-down5 text-success']"></i></span>
                            </td>
                            <td>{{report.tmp}}
                                <span v-if="i < reports.length - 1"><i :class="[report.tmp > reports[i+1].tmp ? 'icon-arrow-up5 text-danger':'icon-arrow-down5 text-success']"></i></span>
                            </td>
                            <td>{{report.cod}}
                                <span v-if="i < reports.length - 1"><i :class="[report.cod > reports[i+1].cod ? 'icon-arrow-up5 text-danger':'icon-arrow-down5 text-success']"></i></span>
                            </td>
                            <td>{{report.tss}}
                                <span v-if="i < reports.length - 1"><i :class="[report.tss > reports[i+1].tss ? 'icon-arrow-up5 text-danger':'icon-arrow-down5 text-success']"></i></span>
                            </td>
                            <td>{{report.nh3n}}
                                <span v-if="i < reports.length - 1"><i :class="[report.nh3n > reports[i+1].nh3n ? 'icon-arrow-up5 text-danger':'icon-arrow-down5 text-success']"></i></span>
                            </td>
                            <td>{{report.debit}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer d-flex">
                <div class="align-self-center">
                    <span class="text-muted">Total {{page.total}} Records</span>
                </div>
                <div class="ml-auto">
                    <Paginate :pages="page" @get-page="getData($event)" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Datepicker from '../../components/Datepicker'
import axios from 'axios'
import Paginate from '../../components/Paginate'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    components: {
        Paginate,
        Datepicker,
        Loading
    },
    data () {
        return {
            disabled: false,
            isDownload: false,
            isLoading: false,
            reports: '',
            page: ''
        }
    },
    computed: {
        date () {
            let d = {
                date: '',
                label: '',
            }
            d.date = this.$refs.datepicker.date 
            d.label = this.$refs.datepicker.date_label
            return d
        }
    },
    methods: {
        getData (e) {
            document.documentElement.scrollTop = 0
            this.isLoading = true
            this.reports = ''
            axios.get('/api/report', {
                params: {
                    page: e,
                    date: this.date.date,
                    label: this.date.label
                }
            })
            .then((response) => {
                this.reports = response.data.data,
                this.page = response.data
                this.isLoading = false
            })
        },
        onSelect() {
            this.getData()
            if(this.date.label == 'Per Tahun') {
                this.disabled = true
            } else {
                this.disabled = false
            }
        },
        exportExcel() {
            this.isDownload = true
            axios.get('/api/report/export',{
                    params: {
                        date: this.date.date,
                        label: this.date.label
                    },
                    responseType: 'blob'
                })
            .then((response) => {
                const time = new Date();
                const blob = new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})
                const link = document.createElement('a')
                link.href = URL.createObjectURL(blob)
                link.download = time.getDay()+"_"+time.getMonth()+"_"+time.getFullYear()+"_laporan.xlsx"
                link.click()
                URL.revokeObjectURL(link.href)
                this.isDownload = false
            })
        }
    }
}
</script>