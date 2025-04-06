<template>

	<div

		ref="box"
		class="sferka"

	>

		<canvas
		
			ref="canvas"
			class="sferka__canvas"
			:width="props.width"
			:height="props.height"

		/>

	</div>

</template>

<script lang="ts" setup>
import { Formatted } from '../utils/formatted';
import * as Sferka from '../entities';
import { type ICamera } from '../interfaces/camera'; 
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useElementSize } from '@vueuse/core';
import { useRotating } from '../composables/rotating';

interface IProps {

	width?: string | number;
	height?: string | number;
	details?: number;
	color?: string;

};

const props = withDefaults( defineProps<IProps>(), {

	width: '100%',
	height: '100%',
	details: 20,
	color: '#ffffff'

} );

const box = ref( null );
const canvas = ref( null );

const width = computed( (): string => Formatted.formatValues( props.width ) );
const height = computed( (): string => Formatted.formatValues( props.height ) );

const { width: boxWidth, height: boxHeight } = useElementSize( box );

const { yaw, pitch } = useRotating( box );

const bxWidth = computed( () => `${ boxWidth.value }px` );
const bxHeight = computed( () => `${ boxHeight.value }px` );

const sphere: Sferka.Sphere = new Sferka.Sphere( 1, 4, '#ff0000' );
const cube: Sferka.Cube = new Sferka.Cube( 1, 4, '#ff0000' );
const cylinder: Sferka.Cylinder = new Sferka.Cylinder( 1, 4, '#ff0000' );
const cone: Sferka.Cone = new Sferka.Cone( 1, 4, '#ff0000' );

const camera: Sferka.Camera = new Sferka.Camera( {

	yaw: 0,
	pitch: 0,
	roll: 0,
	z: 1 

} );

const light: Sferka.Light = new Sferka.Light( {

	yaw: 0,
	pitch: 0,
	roll: 1,

} );

const scene: Sferka.Scene = new Sferka.Scene( camera, light, cone );

console.log( 'scene' );
console.log( scene );

const renderer: Sferka.Renderer = new Sferka.Renderer();

watchEffect( () => {

	// if ( boxWidth.value > 0 && boxHeight.value > 0 ) {

	// 	renderer.render( canvas.value, scene );

	// }

	if ( yaw.value || pitch.value ) {

		scene.camera.yaw = yaw.value;
		scene.camera.pitch = pitch.value;

		renderer.render( canvas.value, scene );

	}

	if ( props.details > 2 ) {

		scene.mesh.setDetails( props.details );

	}

	if ( props.color ) {

		scene.mesh.setColor( props.color );

	}

} );

onMounted( (): void => {



	console.log( 'SPHERE' );
	console.log( sphere );

	console.log( 'camera' );
	console.log( camera );

	console.log( 'scene' );
	console.log( scene );

	console.log( 'renderer' );
	console.log( renderer );

	console.log( 'W = ', canvas.value.clientWidth );

	renderer.render( canvas.value, scene );

	// setInterval( () => {

	// 	scene.camera.yaw += props.yaw;
	// 	scene.camera.pitch += props.pitch;
	// 	scene.camera.roll += props.roll;

	// 	renderer.render( canvas.value, scene );

	// }, 10 );

} );

</script>

<style scoped>
.sferka {

	position: relative;

	width: v-bind( width );
	height: v-bind( height );

}

	.sferka__canvas {

		position: relative;

		box-sizing: border-box;

	}

</style>
