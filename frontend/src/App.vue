<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header title="Projeto encurtamento de url" 
		:hideToggle="!user"
		:hideUserDropdown="!user"/>
		<Menu v-if="user"/>
		<Loading v-if="validatingToken"/>
		<Content v-else/>
		<Footer/>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import Header from "./components/template/Header"
import Menu from "./components/template/Menu"
import Content from "./components/template/Content"
import Footer from "./components/template/Footer"
import { http, userKey } from '@/global'
import Loading from '@/components/template/Loading'

export default {
	name: "App",
	components: {Header, Menu, Content, Footer, Loading},
	computed: mapState(['isMenuVisible', 'user']),
	data(){
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)
			if (!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'auth' })
				return
			}
			const res = await http.post('/auth/validateToken', userData)
			console.log(res)
			if (res.data) {
				this.$store.commit('setUser', userData)
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}
	body {
		margin: 0;
	}

	#app{
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas: "header header"
		"menu content"
		"menu footer";
	}
	#app.hide-menu{
		grid-template-areas:"header header" "content content" "footer footer";
	}
</style>