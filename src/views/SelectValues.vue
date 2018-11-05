<template>
  <v-content>
		<v-card>
			<v-card-text>
				<v-container>
					<v-layout>
						<v-flex sm6>
							<p class="display-1 modal-title">Wskazanie: <span class="font-italic">{{ $route.params.selected }}</span></p>
						</v-flex>
						<v-flex sm6 class="text-sm-right">
							<v-btn round color="blue darken-1" class="white--text submit-button"
								@click="$router.push({path: 'search'})">
								<v-icon dark left>arrow_back</v-icon>
								Wróć
							</v-btn>
						</v-flex>
					</v-layout>
				</v-container>
				<v-container fill-height grid-list-md>
					<v-layout justify-center row justify-space-between align-top align-content-center>
						<v-flex sm4>
							<div v-for="(step, index) in steps" :key="index">
								<v-select outline
								v-model="selectedValues[index]"
								:items="step.options.filter(option => option.parentValues === null || option.parentValues.indexOf(selectedValues[index - 1]) >= 0)"
								:label="step.label"
								@change="() => changeValue(index)"
								no-data-text='brak opcji do wyboru'
								:disabled="index > 0 && !selectedValues[index - 1]">
								</v-select>
							</div>
							<div class="text-sm-right">
								<v-btn round color="blue darken-1" class="white--text submit-button" :disabled="selectedValues.length !== steps.length" @click="goToResult">
									Szukaj
									<v-icon right dark>search</v-icon>
								</v-btn>
							</div>
						</v-flex>
						<v-flex sm6 offset-sm2>
							<img src="@/assets/tasks.svg" alt="tasks" class="main-image">
						</v-flex>
					</v-layout>
				</v-container>
			</v-card-text>
		</v-card>
	</v-content>
</template>

<script>

	export default {
		name: 'SelectValues',

		data () {
			return {
				steps: [{
					label: 'Typ wskazania',
					options: [{
						value: 1,
						text: 'niedrobnokomórkowy',
						parentValues: null
					}, {
						value: 2,
						text: 'drobnokomórkowy',
						parentValues: null,
						disabled: true
					}]
				}, {
					label: 'Podtyp wskazania 1',
					options: [{
						value: 3,
						text: 'płaskonabłonkowy',
						parentValues: [1],
						disabled: true
					}, {
						value: 4,
						text: 'niepłaskonabłonkowy',
						parentValues: [1]
					}]
				}, {
					label: 'Podtyp wskazania 2',
					options: [{
						value: 5,
						text: 'brak',
						parentValues: [3],
						disabled: true
					}, {
						value: 6,
						text: 'gruczołowy',
						parentValues: [4]
					}, {
						value: 7,
						text: 'wielokomórkowy',
						parentValues: [4],
						disabled: true
					}, {
						value: 8,
						text: 'NOS',
						parentValues: [4],
						disabled: true
					}]
				}, {
					label: 'Rodzaje mutacji',
					options: [{
						value: 9,
						text: 'brak',
						parentValues: [5],
						disabled: true
					}, {
						value: 10,
						text: 'mutacja EGFR',
						parentValues: [5],
						disabled: true
					}, {
						value: 11,
						text: 'mutacja ALK',
						parentValues: [6]
					}, {
						value: 12,
						text: 'mutacja T790M',
						parentValues: [6],
						disabled: true
					}, {
						value: 13,
						text: 'mutacja ROS',
						parentValues: [6],
						disabled: true
					}]
				}, {
					label: 'Stopień zaawansowania choroby',
					options: [{
						value: 14,
						text: 'III A',
						parentValues: [9, 10, 11],
						disabled: true
					}, {
						value: 15,
						text: 'III B',
						parentValues: [9, 10, 11]
					}, {
						value: 16,
						text: 'IV',
						parentValues: [9, 10, 11],
						disabled: true
					}]
				}, {
					label: 'Przerzuty do OUN',
					options: [{
						value: 17,
						text: 'tak',
						parentValues: [14, 15, 16]
					}, {
						value: 18,
						text: 'nie',
						parentValues: [14, 15, 16],
						disabled: true
					}]
				}, {
					label: 'Stopień wg ECOG',
					options: [{
						value: 19,
						text: '0',
						parentValues: [17, 18]
					}, {
						value: 20,
						text: '1',
						parentValues: [17, 18],
						disabled: true
					}, {
						value: 21,
						text: '2',
						parentValues: [17, 18],
						disabled: true
					}, {
						value: 22,
						text: '3',
						parentValues: [17, 18],
						disabled: true
					}, {
						value: 23,
						text: '4',
						parentValues: [17, 18],
						disabled: true
					}]
				}],
				selectedValues: [],
			}
		},
		methods: {
			changeValue(index) {
				for(let i = index + 1; i < this.selectedValues.length; i++) {
					this.selectedValues[i] = null;
				}
			},
			goToResult() {
				let values = [];
				let options = [];
				this.steps.forEach(step => {
					step.options.forEach(option => {
						if (this.selectedValues.indexOf(option.value) >= 0) {
							values.push({
								label: step.label,
								value: option.text
							});
						}
					});
				});

				this.$router.replace({
					name: "result",
					params: {
						title: this.$route.params.selected,
						values: values,
						selectedValues: this.selectedValues
					}
				})
			}
		},
		mounted() {
			if (this.$route.params.select) {
				this.selectedValues = this.$route.params.select
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "./../assets/variables.scss";
.v-input /deep/ .v-input__slot {
	background: #fff !important;
	border: 2px solid #8FD0FF !important;
}
.v-input.v-input--is-disabled /deep/ .v-input__slot {
	border: 2px solid rgba(0,0,0,.38) !important;
}
.main-image {
	max-width: 100%;
}
.modal-title {
	font-weight: normal;
	color: #666666;
	position: relative;
	&:before {
		content: '';
		position: absolute;
		bottom: -30px;
		left: 0;
		height: 2px;
		width: 72px;
		background-color: $secondary-blue-title;
	}
}
.modal-title span {
	color: $secondary-blue-title;
	font-weight: bold;
}
.submit-button {
	background: linear-gradient(90deg, #0066CC 0%, #0E8FD7 100%);
	font-weight: normal;
	letter-spacing: 1px;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat) {
	background: rgba(0,0,0,.12)!important;
}
</style>