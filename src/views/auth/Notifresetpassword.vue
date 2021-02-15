<template>
    <div class="d-flex justify-content-center align-items-centet mt-5">
        <div class="mt-5 text-center">
            <h4 class="font-weight-semibold">Permintaan untuk reset password sudah kami kirimkan ke email anda</h4>
            <h3>Silahkan periksa kotak masuk email anda</h3>
            <h1 class="font-weight-semibold">{{email}}</h1>
        </div>
    </div>  
</template>

<script>
export default {
    data() {
        return {
            email: ''
        }
    },
    mounted() {
        this.email = this.$route.params.email
    }
}
</script>