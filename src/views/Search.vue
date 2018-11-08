<template>
  <v-content>
    <v-container fill-height grid-list-md>
      <v-layout align-top justify-center row justify-space-between align-center align-content-center>
        <v-flex md6>
          <img src="@/assets/doctors.svg" alt="Vuetify.js" class="mb-5 main-image">
        </v-flex>
        <v-flex md6>
          <h2 class="display-2 search-title font-italic">Wyszukaj<br>wskazanie</h2>
          <div class="autocomplete-container">
            <vue-autosuggest class="mt-4 mb-4"
              :suggestions="filteredOptions"
              :section-configs="sectionConfigs"
              :get-suggestion-value="getSuggestionClicked"
              :inputProps="{id:'autosuggest__input', onInputChange: this.onInputChange, placeholder:'Wpisz 3 znaki...'}">
              <template slot-scope="{suggestion}">
                <span class="my-suggestion-item"
                  :class="{disabled: suggestion.item.disabled}">
                  {{suggestion.item.name}}
                </span>
              </template>
            </vue-autosuggest>
            <v-icon>search</v-icon>
          </div>
          <v-chip label class="suggestions-chips"
            v-for="item in suggestionsChips"
            :disabled="item.disabled"
            :color="item.color"
            @click="goToSelection(item.name)">
            {{item.name}}
          </v-chip>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      :timeout="5000">
      Ta opcja jest niedostępna
    </v-snackbar>
  </v-content>
</template>
<script>
import { VueAutosuggest } from 'vue-autosuggest'

  export default {
    name: 'Search',

    components: {
      VueAutosuggest
    },

    data () {
      return {
        snackbar: false,
        filteredOptions: [],
        selected: null,
        suggestions: {
          data: [
            { name: "Rak płuca",
              disabled: false
            },
            { name: "Rak oskrzelikowo-pęcherzykowy",
              disabled: true
            },
            { name: "Rak gruczołowo-płaskonabłonkowy",
              disabled: true
            },
            { name: "Rak płuca (wszystkie)2",
              disabled: true
            },
            { name: "Rak oskrzelikowo-pęcherzykowy2",
              disabled: true
            },
            { name: "Rak gruczołowo-płaskonabłonkowy2",
              disabled: true
            },
            { name: "Rak płuca (wszystkie)3",
              disabled: true
            },
            { name: "Rak oskrzelikowo-pęcherzykowy3",
              disabled: true
            },
            { name: "Rak gruczołowo-płaskonabłonkowy3",
              disabled: true
            },
            { name: "Bruceloza",
              disabled: true
            },
            { name: "Angina",
              disabled: true
            },
            { name: "Gorączka plamista",
              disabled: true
            }
          ]
        },
        suggestionsChips: [
          { 
            name: 'Rak płuca',
            color: '#D9EFFF',
            disabled: false
          },
          { 
            name: 'Angina',
            color: '#D9F8FF',
            disabled: true
          },
          { 
            name: 'Bruceloza',
            color: '#D9FFF6',
            disabled: true
          },
          { 
            name: 'Choroba Whipple’a',
            color: '#D9FFE8',
            disabled: true
          },
          { 
            name: 'Gorączka plamista',
            color: '#D9FFDB',
            disabled: true
          },
          { 
            name: 'Sporotrychoza',
            color: '#E5FFD9',
            disabled: true
          },
          { 
            name: 'Kryptosporydioza ',
            color: '#F5FFD9',
            disabled: true
          }
        ],
        sectionConfigs: {
          default: {
            limit: 6,
            onSelected: (e) => {
              console.log(e.item.name)
              if(e.item.disabled === true) {
                this.snackbar = true
                return
              }
              this.goToSelection(e.item.name)
            }
          },
        }
      }
    },
    methods: {
      getSuggestionClicked(suggestion) {
        this.filteredOptions = []
      },
      getSuggestionValue(suggestion) {
        return suggestion.item.disabled === true ? `${suggestion.item.name} - disabled` : suggestion.item.name
      },
      onInputChange(text) {
        if (text === null || text.length < 3) {
          this.filteredOptions = []
          return 
        }

        // Full customizability over filtering
        const filteredData = this.suggestions.data.filter(option => {
          return option.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
        });

        // Store data in one property, and filtered in another
        this.filteredOptions = [{ data: filteredData }];
      },
      goToSelection(chosenItem) {
        console.log(chosenItem)
        if(chosenItem.disabled === true) return
        this.$router.replace({
          name: "select-values",
          params: {
            selected: chosenItem,
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../assets/variables.scss";
  .main-image {
    max-width: 100%;
  }

  .search-title {
    color: $secondary-blue-title;
  }

  .autocomplete-container /deep/ #autosuggest__input::placeholder {
    color: $text-color !important;
  }

  .autocomplete-container /deep/ .my-suggestion-item {
    padding: 7.5px 10px;
    display: block;
    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
      color: rgba(0, 0, 0, .38);
    }
  }

  .suggestions-chips {
    border-radius: 12px;
    padding: 5px;
    font-weight: bold;
    &:not(.v-chip--disabled) {
      cursor: pointer;
      color: $deep-blue;
      /deep/ .v-chip__content {
        cursor: pointer;
      }
    }
  }

  .autocomplete-container /deep/ #autosuggest__input {
    background-color: #fff;
    border-radius: 50px;
    outline: none;
    position: relative;
    display: block;
    font-size: 18px;
    border: 1px solid #89BDF2;
    box-shadow: 0px 30px 64px rgba(26, 157, 254, 0.1);
    padding: 15px 10px;
    padding-left: 20px;
    width: 100%;
  }

  .autocomplete-container /deep/ .autosuggest__results-container {
    position: relative;
    width: 100%;
  }

  .autocomplete-container /deep/ .autosuggest__results {
    top: 7px;
    font-weight: 300;
    margin: 0;
    position: absolute;
    z-index: 10000001;
    width: 100%;
    border: 1px solid #e0e0e0;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: white;
    padding: 0px;
  }

  .autocomplete-container /deep/ .autosuggest__results ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  .autocomplete-container /deep/ .autosuggest__results .autosuggest__results_item {
    cursor: pointer;
  }

  .autocomplete-container /deep/ #autosuggest ul:nth-child(1) > .autosuggest__results_title {
    border-top: none;
  }

  .autocomplete-container /deep/ .autosuggest__results .autosuggest__results_title {
    color: gray;
    font-size: 11px;
    margin-left: 0;
    padding: 15px 13px 5px;
    border-top: 1px solid lightgray;
  }

  .autocomplete-container /deep/ .autosuggest__results .autosuggest__results_item:active,
  .autocomplete-container /deep/ .autosuggest__results .autosuggest__results_item:hover,
  .autocomplete-container /deep/ .autosuggest__results .autosuggest__results_item:focus,
  .autocomplete-container /deep/ .autosuggest__results .autosuggest__results_item.autosuggest__results_item-highlighted {
    background-color: #ddd;
  }

  .autocomplete-container {
    position: relative;
  }

  .autocomplete-container .v-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    padding: 5px;
    background-color: $secondary-blue-title;
    border-radius: 50%;
  }
</style>