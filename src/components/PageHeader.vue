<template>
    <div class="page-header page-header-light mb-3">
        <div class="page-header-content header-elements-md-inline">
            <div class="page-title d-flex">
                <h4 v-if="user"><i class="icon-home5 mr-2"></i> <span class="font-weight-semibold text-uppercase">{{user.contact.nama_perusahaan}}</span></h4>
                <a href="#" class="header-elements-toggle text-default d-md-none"><i class="icon-more"></i></a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    }
}
</script>