<template>
	<div id="app">
		<!-- Main navbar -->
		<template v-if="auth">
			<Navbar></Navbar>
		</template>
		<template v-else>
			<NavbarLogin></NavbarLogin>
		</template>
		<!-- /main navbar -->

		<div class="page-content">
			<!-- Main sidebar -->
			<template v-if="auth">
				<Sidebar></Sidebar>
			</template>
			<!-- /main sidebar -->

			<div class="content-wrapper">
				<!-- Page header -->
				<template v-if="auth">
					<PageHeader></PageHeader>
				</template>
				<!-- /page header -->
				
				<div class="content pt-0">
					<transition name="fade" mode="out-in">
						<router-view />
					</transition>	
				</div>

				<!-- Footer -->
				<div class="navbar navbar-expand-lg navbar-light">
					<div class="text-center d-lg-none w-100">
						<button type="button" class="navbar-toggler dropdown-toggle" data-toggle="collapse" data-target="#navbar-footer">
							<i class="icon-unfold mr-2"></i>
							Footer
						</button>
					</div>

					<div class="navbar-collapse collapse" id="navbar-footer">
						<span class="navbar-text">
							&copy; 2021 <a href="http://satcomm.co.id">satcomm</a>
						</span>

						<ul class="navbar-nav ml-lg-auto">
							<li class="nav-item"><a href="http://satcomm.co.id/" class="navbar-nav-link" target="_blank"><i class="icon-lifebuoy mr-2"></i> Support</a></li>
							<li class="nav-item"><a href="http://satcomm.co.id" class="navbar-nav-link" target="_blank"><i class="icon-file-text2 mr-2"></i> Docs</a></li>
							<li class="nav-item"><a href="http://iha.co.id" class="navbar-nav-link font-weight-semibold" target="_blank"><span class="text-pink-400"><i class="icon-info22 mr-2"></i> Info</span></a></li>
						</ul>
					</div>
				</div>
			<!-- /footer -->
			</div>
		</div>
	</div>
</template>
<script>
import NavbarLogin from '@/components/NavbarLogin'
import Navbar from '@/components/Navbar'
import PageHeader from '@/components/PageHeader'
import Sidebar from '@/components/Sidebar'
import { mapGetters } from 'vuex'
export default {
	components: {
		NavbarLogin,
		Navbar,
		PageHeader,
		Sidebar
	},
	
	computed: {
		...mapGetters({
			auth: 'auth/authenticated',
		})
	}
}
</script>
<style>
	@import url("https://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700,900");
	#app {
		min-height: 90vh;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.fade-enter-active,
	.fade-leave-active {
		transition-duration: 0.3s;
		transition-property: opacity;
		transition-timing-function: ease;
	}

	.fade-enter,
	.fade-leave-active {
		opacity: 0
	}

</style>
