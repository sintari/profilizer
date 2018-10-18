<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-card-text>
        <v-container grid-list-md align-center>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <div class="result-container">
                <div v-for="(value) in values">
                  <div class='result-item-label'>
                    {{value.label}}:
                  </div>
                  <div class='result-item-value'>
                    {{value.value}}
                  </div>
                </div>
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
      }
    },
  }
</script>

<style lang="scss">

  .result-item-label {
    color: #7696AE;
    font-size: 16px;
    margin-bottom: 4px;
  }

  .result-item-value {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .result-container {
    background-color: #E0F2FF;
  }

</style>
