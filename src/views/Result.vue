<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-card-text>
        <v-container grid-list-md align-center>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <div class="result-container pa-5">
                <img src="@/assets/loops.svg" alt="loops" class="top-loops">
                  <div class="header-section">
                    <p class="display-1 modal-title">Wskazanie: <span class="font-italic">{{$route.params.title}}</span></p>
                  </div>
                <div v-for="(value) in values">
                  <div class="result-item-label">
                    {{value.label}}:
                  </div>
                  <div class="result-item-value">
                    {{value.value}}
                  </div>
                </div>
                <v-btn round outline color="blue darken-1 ma-0" class="white--text submit-button"
                  @click="goBack">
                  Edytuj
              </v-btn>
              </div>
            </v-flex>
            <v-flex xs12 sm6>
              asd
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-flex>
          <div class="text-sm-center">
          </div>
        </v-flex>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'Result',

    props: {
      dialog: {
        default: true,
        required: false
      },
      data: {
        default: ''
      }
    },

    data () {
      return {

      }
    },

    created() {
      this.values = this.$route.params.values;
    },

    methods: {
      closeModal() {
        this.$emit('update:dialog', false)
      },

      goBack() {
        this.$router.replace({
          name: "select-values",
          params: { select: this.$route.params.selectedValues }
        })
      }
    }
  }
</script>

<style lang="scss">
@import "./../assets/variables.scss";
.result-item-label {
  color: #7696AE;
  font-size: 16px;
  margin-bottom: 4px;
  font-weight: bold;
}

.result-item-value {
  font-size: 16px;
  margin-bottom: 10px;
}

.result-container {
  background-color: #E0F2FF;
  position: relative;
}

.top-loops {
  position: absolute;
  top: -15px;
  left: 50%;
  width: 80%;
  transform: translateX(-50%);
}

.modal-title {
  font-weight: normal;
  color: #666666;
}
.modal-title span {
  color: $secondary-blue-title;
  font-weight: bold;
}
</style>
