<template>
  <v-app>
    <v-content>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" required
                    v-model="input.username"
                    :rules="[v => !!v || 'Item is required']">
                  </v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" required
                    v-model="input.password"
                    :rules="[v => !!v || 'Item is required']">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                  @click="login"
                  :disabled="!valid">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar" :timeout="6000">
      Błąd przy logowaniu
    </v-snackbar>
  </v-app>
</template>

<script>
  import mock from './mockAccount'
  export default {
    name: 'Login',
    data () {
      return {
        snackbar: false,
        valid: true,
        input: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        this.$emit("authenticated", true)
        this.$router.replace({ name: "search" })
        // if(this.$refs.form.validate()) {
        //   if(this.input.username == mock.mockAccount.username && this.input.password == mock.mockAccount.password) {
        //     this.$emit("authenticated", true)
        //     this.$router.replace({ name: "search" })
        //   } else {
        //     this.clear()
        //     this.snackbar = true
        //   }
        // }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style lang="scss">
  @import "./../assets/variables.scss";
  .theme--light.v-card {
    background-color: $primary-color;
  }
</style>
