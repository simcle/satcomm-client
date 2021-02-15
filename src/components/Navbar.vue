<template>
	<div class="navbar navbar-expand-md navbar-light fixed-top">

		<!-- Header with logos -->
		<div class="navbar-header navbar-dark d-none d-md-flex align-items-md-center">
			<div class="navbar-brand navbar-brand-md">
				<a href="/" class="d-inline-block">
					<img src="@/assets/images/logo_satcomm.png" alt="">
				</a>
			</div>
			
			<div class="navbar-brand navbar-brand-xs">
				<a href="/" class="d-inline-block">
					<img src="@/assets/images/logo_icon.png" alt="">
				</a>
			</div>
		</div>
		<!-- /header with logos -->
	

		<!-- Mobile controls -->
		<div class="d-flex flex-1 d-md-none">
			<div class="navbar-brand mr-auto">
				<a href="/" class="d-inline-block">
					<img src="@/assets/images/logo_satcomm.png" alt="">
				</a>
			</div>	

			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
				<i class="icon-tree5"></i>
			</button>

			<button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
				<i class="icon-paragraph-justify3"></i>
			</button>
		</div>
		<!-- /mobile controls -->


		<!-- Navbar content -->
		<div class="collapse navbar-collapse" id="navbar-mobile">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block">
						<i class="icon-paragraph-justify3"></i>
					</a>
				</li>
			</ul>

			<span class="badge bg-pink-400 badge-pill ml-md-3 mr-md-auto">ONLINE</span>

			<ul class="navbar-nav">
				<li class="nav-item dropdown dropdown-user">
					<a href="#" class="navbar-nav-link d-flex align-items-center dropdown-toggle" data-toggle="dropdown">
						<img src="@/assets/images/placeholders/placeholder.jpg" class="rounded-circle mr-2" height="34" alt="">
						<span v-if="user">{{user.name}}</span>
					</a>

					<div class="dropdown-menu dropdown-menu-right">
						<router-link to="/profile" class="dropdown-item"><i class="icon-user-plus"></i> My profile</router-link>
						<div class="dropdown-divider"></div>
						<a href="#" @click.prevent="logout" class="dropdown-item"><i class="icon-switch2"></i> Logout</a>
					</div>
				</li>
			</ul>
		</div>
		<!-- /navbar content -->
		
	</div>
</template>

<script>
import theme from '../theme'
import { mapGetters, mapActions } from 'vuex'
export default {
	mounted () {
		theme.initSidebars()
		theme.initNavigations()
		theme.initComponents()
		theme.initDropdownSubmenu()
		theme.initHeaderElementsToggle()
		theme.initBeforeLoad()
		this.$nextTick(() => {
			theme.initAfterLoad()
		})
	},
	computed: {
		...mapGetters({
			user: 'auth/user'
		})
	},
	methods: {
		...mapActions({
			signout: 'auth/logout'
		}),
		async logout() {
			await this.signout()
			this.$router.push('/login')
		}
	}

}
</script>