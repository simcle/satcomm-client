<template>
    <div class="content d-flex justify-content-center align-items-center mt-5 mb-5">

        <!-- Password recovery form -->
        <form autocomplete="off" class="login-form" @submit.prevent="onSubmit">
            <div class="card mb-0 vld-parent">
                <Loading
                    :active.sync="isLoading"
                    :is-full-page="false">
                </Loading>
                <div class="card-body">
                    <div class="text-center mb-3">
                        <i class="icon-spinner11 icon-2x text-warning border-warning border-3 rounded-round p-3 mb-3 mt-1"></i>
                        <h5 class="mb-0">Pemulihan password</h5>
                        <span class="d-block text-muted">Kami akan mengirimkan instruksi melalui email anda</span>
                    </div>

                    <div class="form-group form-group-feedback form-group-feedback-right">
                        <input v-model="email" type="email" class="form-control" :class="[error ? 'border-danger':'']" @keydown="error=''" placeholder="Email anda">
                        <div class="form-control-feedback">
                            <i class="icon-mail5 text-muted"></i>
                        </div>
                        <span v-if="error" class="form-text text-danger">{{error}}</span>
                    </div>

                    <button type="submit" class="btn bg-blue btn-block"><i class="icon-spinner11 mr-2"></i> Reset password</button>
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
    data () {
        return {
            isLoading: false,
            email: '',
            error: ''
        }
    },
    methods: {
        onSubmit () {
            if(!this.email) {
                this.error = "Masukan email anda!"
            } else if(!this.validateEmail(this.email)) {
                this.error ="Penulisan email anda salah"
            }
            if(!this.error) {
                this.posData()
            }
        },
        posData () {
            this.isLoading = true
            axios.post('api/reset-password', {
                email: this.email
            })
            .then(() => {
                this.isLoading = false
                this.$router.push('/notif-reset/'+this.email)
            })
        },
        validateEmail (email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
    }
}
</script>