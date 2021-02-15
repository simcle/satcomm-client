<template>
    <div class="d-flex justify-content-center align-items-center mt-5 mb-5">
        <form action="" class="login-form" @submit.prevent="onSubmit">
            <div class="card mb-0 mt-3 vld-parent">
                <Loading
                    :active.sync="isLoading"
                    :is-full-page="false">
                </Loading>
                <div class="card-body">
                    <div class="text-center mb-3">
                        <i class="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1"></i>
                        <h5 class="mb-0">Masuk ke akun anda</h5>
                        <span class="d-block text-muted">Masukkan kredensial Anda di bawah ini</span>
                    </div>

                    <div class="form-group form-group-feedback form-group-feedback-left">
                        <input v-model="form.email" type="text" class="form-control" placeholder="Email" :class="[error.email ? 'border-danger':'']" @keydown="error.email = ''">
                        <div class="form-control-feedback">
                            <i class="icon-mention text-muted"></i>
                        </div>
                        <span v-if="error.email" class="form-text text-danger">{{ error.email }}</span>
                    </div>

                    <div class="form-group form-group-feedback form-group-feedback-left">
                        <input v-model="form.password" type="password" class="form-control" placeholder="Password" :class="[error.password ? 'border-danger':'']" @keydown="error.password = ''" >
                        <div class="form-control-feedback">
                            <i class="icon-lock2 text-muted"></i>
                        </div>
                        <span v-if="error.password" class="form-text text-danger">{{ error.password }}</span>
                    </div>

                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block">Masuk <i class="icon-circle-right2 ml-2"></i></button>
                    </div>
                    <div class="text-center">
                        <router-link to="/forgot">Lupa password?</router-link>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapActions } from 'vuex'
export default {
    components: {
        Loading
    },
    data () {
        return {
            isLoading: false,
            form: {
                email: '',
                password: ''
            },
            error: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        onSubmit () {
            if(!this.form.email) {
                this.error.email = 'Harap masukan email anda!'
            }
            if(!this.form.password) {
                this.error.password = 'Password anda belum diisi!'
            }
            if(this.form.email && this.form.password) {
                this.store()
            }
        },
        async store () {
            this.isLoading = true
            await this.login(this.form)
            .then(() => {
                this.$router.push('/')
                this.isLoading = false
            })
            .catch(error => {
                this.isLoading = false
                this.error.email = error.data.errors.email[0]
                this.error.password = error.data.errors.email[0]
            })
        }
    }
}
</script>