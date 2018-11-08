<template>
  <v-app id="app">
    <v-toolbar app v-if="authenticated">
      <img src="@/assets/profilizer-logo.svg" alt="roche">
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <span class="body-1">Czesc anna.kowalska@roche.com</span>
        <v-btn to="/login" flat @click.native="logout()" replace>Wyloguj</v-btn>
      </v-toolbar-title>
      <v-avatar
        size="45"
        color="grey lighten-4">
        <img src="@/assets/user-image.svg" alt="user">
      </v-avatar>
      <img src="@/assets/roche-logo.svg" alt="roche" class="ml-3">
    </v-toolbar>
    <router-view @authenticated="setAuthenticated" />
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        authenticated: false,
      }
    },
    methods: {
      setAuthenticated(status) {
        this.authenticated = status
      },
      logout() {
        this.authenticated = false
      }
    },
    mounted() {
      if(!this.authenticated) {
        this.$router.replace({ name: "login" });
      }
    }
  }
</script>

<style lang="scss">
  @import "./assets/variables.scss";
  #app {
    font-family: 'Roboto', sans-serif;
  }
  .main-title {
    color: $secondary-blue;
    font-size: 22px;
  }
  .theme--light.application {
    background-color: $primary-color;
  }
  .theme--light.v-toolbar {
    background-color: #fff;
  }
</style>
