<template>
    <div class="content d-flex justify-content-center align-items-center mt-5 mb-5">

        <!-- Password recovery form -->
        <form autocomplete="off" class="login-form" @submit.prevent="onSubmit">
        <div v-if="has_error" class="alert alert-warning alert-dismissible">
            <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>
            <div class="font-weight-semibold mb-2">Warning!</div> 
            <ul class="list mb-0">
                <li v-for="(err, i) in has_error" :key="i">
                    {{err[0]}}
                </li>
            </ul>
        </div>
            <div class="card mb-0 vld-parent">
                <Loading
                    :active.sync="isLoading"
                    :is-full-page="false">
                </Loading>
                <div class="card-body">
                    <div class="text-center mb-3">
                        <i class="icon-lock2 icon-2x text-warning border-warning border-3 rounded-round p-3 mb-3 mt-1"></i>
                        <h5 class="mb-0">Buat password baru</h5>
                        <span class="d-block text-muted">Silahkan isi password baru anda</span>
                    </div>
                    <div class="form-group form-group-feedback form-group-feedback-right">
                        <input v-model="form.email" type="email" class="form-control" placeholder="Email anda">
                        <div class="form-control-feedback">
                            <i class="icon-mail5 text-muted"></i>
                        </div>
                    </div>
                    <div class="form-group form-group-feedback form-group-feedback-right">
                        <input v-model="form.password" type="password" class="form-control" placeholder="Password">
                        <div class="form-control-feedback">
                            <i class="icon-lock2 text-muted"></i>
                        </div>
                    </div>
                    <div class="form-group form-group-feedback form-group-feedback-right">
                        <input v-model="form.password_confirmation" type="password" class="form-control" placeholder="Konfirmasi password">
                        <div class="form-control-feedback">
                            <i class="icon-lock2 text-muted"></i>
                        </div>
                    </div>

                    <button type="submit" class="btn bg-blue btn-block"><i class="icon-enter2 mr-2"></i> Simpan</button>
                </div>
            </div>
        </form>
        <!-- /password recovery form -->

    </div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components: {
        Loading
    },
    data() {
        return {
            isLoading: false,
            form: {
                token: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            has_error: '',
        }
    },
    mounted () {
        this.form.token = this.$route.params.token
    },
    methods: {
        onSubmit() {
            this.has_error = ''
            this.postData()
        },
        async postData() {
            this.isLoading = true
            await axios.get('sanctum/csrf-cookie')
            await axios.post('password/reset', this.form)
            .then(() => {
                this.isLoading = false
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
                this.isLoading = false
                this.has_error = err.data.errors
            })
        }
    }
}
</script>