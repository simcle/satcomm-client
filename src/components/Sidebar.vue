<template>
    <!-- Main sidebar -->
	<div class="sidebar sidebar-dark sidebar-main sidebar-fixed sidebar-expand-md">

        <!-- Sidebar mobile toggler -->
        <div class="sidebar-mobile-toggler text-center">
            <a href="#" class="sidebar-mobile-main-toggle">
                <i class="icon-arrow-left8"></i>
            </a>
            Navigation
            <a href="#" class="sidebar-mobile-expand">
                <i class="icon-screen-full"></i>
                <i class="icon-screen-normal"></i>
            </a>
        </div>
        <!-- /sidebar mobile toggler -->


        <!-- Sidebar content -->
        <div class="sidebar-content">
            
            <!-- User menu -->
            <div class="sidebar-user">
                <div class="card-body">
                    <div class="media">
                        <div class="mr-3">
                            <a href="#"><img src="@/assets/images/placeholders/placeholder.jpg" width="38" height="38" class="rounded-circle" alt=""></a>
                        </div>

                        <div class="media-body">
                            <div v-if="user" class="media-title font-weight-semibold">{{user.name}}</div>
                            <div class="font-size-xs opacity-50">
                                <i class="icon-user-lock font-size-sm"></i> &nbsp; Akun Pengguna
                            </div>
                        </div>

                        <div class="ml-3 align-self-center">
                            <router-link to="/profile" class="text-white"><i class="icon-cog3"></i></router-link>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /user menu -->

            
            <!-- Main navigation -->
            <div class="card card-sidebar-mobile">
					<ul class="nav nav-sidebar" data-nav-type="accordion">

						<!-- Main -->
						<li class="nav-item-header"><div class="text-uppercase font-size-xs line-height-xs">Main</div> <i class="icon-menu" title="Main"></i></li>
						<li class="nav-item">
							<router-link to="/" class="nav-link" exact>
								<i class="icon-grid"></i>
								<span>
									Dashboard
									<span class="d-block font-weight-normal opacity-50">Real time monitoring</span>
								</span>
							</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/sparing" class="nav-link">
								<i class="icon-chart"></i>
								<span>
									Data SPARING
									<span class="d-block font-weight-normal opacity-50">Interval 2 menit</span>
								</span>
							</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/report" class="nav-link">
								<i class="icon-file-spreadsheet"></i>
								<span>
									Laporan
								</span>
							</router-link>
						</li>
					</ul>
				</div>
            <!-- /main navigation -->

        </div>
        <!-- /sidebar content -->
			
	</div>
	<!-- /main sidebar -->
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import { mapGetters } from 'vuex'
export default {
	mounted () {
		new PerfectScrollbar('.sidebar-fixed .sidebar-content', {
			wheelSpeed: 1,
			wheelPropagation: true
		})
	},
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    }
}
</script>