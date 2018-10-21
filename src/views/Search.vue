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
              :get-suggestion-value="getSuggestionValue"
              :render-suggestion="getSuggestionValue"
              :inputProps="{id:'autosuggest__input', onInputChange: this.onInputChange, placeholder:'Wpisz 3 znaki...'}"
            />
            <v-icon>search</v-icon>
          </div>
          <v-chip label v-for="item in suggestionsChips" :color="item.color" class="suggestionsChips"
            @click="goToSelection(item.name)">
            {{item.name}}
          </v-chip>
        </v-flex>
      </v-layout>
    </v-container>
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
        test: '',
        filteredOptions: [],
        selected: null,
        suggestions: {
          data: [
            { name: "Rak płuca" },
            { name: "Rak oskrzelikowo-pęcherzykowy" },
            { name: "Rak gruczołowo-płaskonabłonkowy" },
            { name: "Rak płuca (wszystkie)2" },
            { name: "Rak oskrzelikowo-pęcherzykowy2" },
            { name: "Rak gruczołowo-płaskonabłonkowy2" },
            { name: "Rak płuca (wszystkie)3" },
            { name: "Rak oskrzelikowo-pęcherzykowy3" },
            { name: "Rak gruczołowo-płaskonabłonkowy3" },
          ]
        },
        suggestionsChips: [
          { 
            name: 'Rak płuca',
            color: '#D9EFFF'
          },
          { 
            name: 'Angina',
            color: '#D9F8FF'
          },
          { 
            name: 'Bruceloza',
            color: '#D9FFF6'
          },
          { 
            name: 'Choroba Whipple’a',
            color: '#D9FFE8'
          },
          { 
            name: 'Gorączka plamista',
            color: '#D9FFDB'
          },
          { 
            name: 'Sporotrychoza',
            color: '#E5FFD9'
          },
          { 
            name: 'Kryptosporydioza ',
            color: '#F5FFD9'
          }
        ],
        sectionConfigs: {
          default: {
            limit: 6,
            onSelected: (e) => {
              this.goToSelection(e.item.name)
            }
          },
        }
      }
    },
    methods: {
      getSuggestionValue(suggestion) {
        return suggestion.item.name;
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
        console.log('asd', chosenItem)
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

  .autocomplete-container /deep/ .suggestionsChips {
    border-radius: 12px;
    padding: 5px;
    color: $deep-blue;
    font-weight: bold;
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
    padding: 7.5px 10px;
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