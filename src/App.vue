<template>

  <div class="layout">
    
	<Sferka
	
		width="600"
		height="600"
		:details="details"
		:yaw="+yaw"
		:pitch="+pitch"
		:roll="+roll"
		:color="color"
	
	/>

	<div style="padding: 25px; ">

		<div style="margin-top: 25px">

			<label for="details" style="color: white">Details: </label>

			<input

				v-model="details"
				name="details"
				type="range"
				min="3"
				max="40"
				width="1000"

			/>

		</div>

		<div style="margin-top: 25px">

			<label style="color: white" for="yaw">Yaw: </label>

			<input

				v-model="yaw"
				name="yaw"
				type="range"
				min="0"
				max="0.3"
				step="0.01"
				width="1000"

			/>

		</div>

		<div style="margin-top: 25px">

			<label for="pitch" style="color: white">Pitch: </label>

			<input

				v-model="pitch"
				name="pitch"
				type="range"
				min="0"
				max="0.3"
				step="0.01"
				width="1000"

			/>

		</div>

		<div style="margin-top: 25px">

			<label for="roll" style="color: white">Roll: </label>

			<input

				v-model="roll"
				name="roll"
				type="range"
				min="0"
				max="0.3"
				step="0.01"
				width="1000"

			/>

		</div>

		<div style="margin-top: 25px">

			<label for="color" style="color: white">Color: </label>

			<input

				v-model="color"
				name="color"
				type="color"

			/>

		</div>

	</div>

  </div>


</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Sferka from './components/Sferka.vue'

const details = ref( 3 );
const yaw = ref( 0 );
const pitch = ref( 0 );
const roll = ref( 0 );
const color = ref( '#ffffff' );

</script>

<style scoped>
.layout {

	display: flex;

	width: 100%;
	height: 100vh;

	box-sizing: border-box;

}

</style>
