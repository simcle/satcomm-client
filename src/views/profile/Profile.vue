<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-md-4">
                <form @submit.prevent="onSubmit">
                    <div class="card vld-parent">
                         <Loading
                            :active.sync="isLoading"
                            :is-full-page="false"
                        >
                        </Loading>
                        <div class="card-header">
                            <h5 class="card-title">
                                AKUN PERSONAL
                            </h5>
                        </div>
                        <div class="card-body">
                            <form action="">
                                <div class="form-group">
                                    <label for="">Nama Lengkap</label>
                                    <input v-model="users.name" type="text" :class="[errors.name ? 'border-danger':'']" @keydown="errors.name=''" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Nomor Handphone</label>
                                    <input v-model="users.phone" type="text" :class="[errors.phone ? 'border-danger':'']" @keydown="errors.phone=''" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="">Kontak email</label>
                                    <input v-model="users.email" type="email" :class="[errors.email ? 'border-danger':'']" @keydown="errors.email=''" class="form-control">
                                </div>
                            </form>
                        </div>
                        <div class="card-footer text-right">
                            <button class="btn btn-primary" type="submit">simpan</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-sm-12 col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title">
                            DATA PERUSAHAAN
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <span class="text-muted">Nama Perusahaan</span>
                            <h3>{{user.contact.nama_perusahaan}}</h3>
                        </div>
                        <div class="mb-3">
                            <span class="text-muted">Jenis Usaha</span>
                            <h6>{{user.contact.jenis_usaha}}</h6>
                        </div>
                        <div class="mb-3">
                            <span class="text-muted">Alamat Perusahaan</span>
                            <div>{{user.contact.alamat}}</div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <span class="text-muted">Telepon Kantor</span>
                                <div>{{user.contact.tlp_kantor}}</div>
                            </div>
                            <div class="col-md-6">
                                <span class="text-muted">Email Kantor</span>
                                <div>{{user.contact.email_kantor}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import Swal from '../../assets/js/sweetallert'
export default {
    components: {
        Loading
    },
    data() {
        return {
            isLoading: false,
            users: {
                name:'',
                email: '',
                phone: '',
            },
            errors: {
                name: '',
                email: '',
                phone: '',
            }
        }
    },
    mounted () {
        this.getData()
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    methods: { 
        ...mapActions({
            updateMe: 'auth/me'
        }),
        getData() {
            this.users.name = this.user.name
            this.users.email = this.user.email
            this.users.phone = this.user.contact.no_hp
        },
        onSubmit () {
            if(!this.users.name) {
                this.errors.name = "Nama tidak boleh kosong!"
            }
            if(!this.users.phone) {
                this.errors.phone = "No HP harus di isi!"
            }
            if(!this.users.email) {
                this.errors.email = "Eamial harus di isi!"
            } else if(!this.validateEmail(this.users.email)) {
                this.errors.email = "Penulisan email anda salah"
            }
            if(this.users.name && this.users.phone && this.users.email && this.validateEmail(this.users.email)) {
                this.updateData()
            }
        },
        validateEmail (email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        updateData() {
            this.isLoading = true
            axios.post('api/profile/update', this.users)
            .then(() => {
                this.updateMe()
                this.isLoading = false
                Swal.fire({
                    buttonsStyling: false,
                    confirmButtonClass: 'btn btn-primary',
                    cancelButtonClass: 'btn btn-light',
                    text: 'Perubahan berhasil di simpan',
                    type: 'success',
                    toast: true,
                    showConfirmButton: false,
                    position: 'center'
                })
            })
        }
    }
}
</script>