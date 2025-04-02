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

interface IProps {

	width?: string | number;
	height?: string | number;

};

const props = withDefaults( defineProps<IProps>(), {

	width: '100%',
	height: '100%',

} );

const box = ref( null );
const canvas = ref( null );

const width = computed( (): string => Formatted.formatValues( props.width ) );
const height = computed( (): string => Formatted.formatValues( props.height ) );

const { width: boxWidth, height: boxHeight } = useElementSize( box );

const bxWidth = computed( () => `${ boxWidth.value }px` );
const bxHeight = computed( () => `${ boxHeight.value }px` );

const sphere: Sferka.Sphere = new Sferka.Sphere( 1, 20 );

const camera: Sferka.Camera = new Sferka.Camera( {

	yaw: 0,
	pitch: 0,
	roll: 0,
	z: 1 

} );

const scene: Sferka.Scene = new Sferka.Scene( camera, sphere );

const renderer: Sferka.Renderer = new Sferka.Renderer();

watchEffect( () => {

	if ( boxWidth.value > 0 && boxHeight.value > 0 ) {

		renderer.render( canvas.value, scene );

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

	setInterval( () => {

		scene.camera.pitch += 0.01;
		// scene.camera.yaw += 0.01;
		scene.camera.yaw += 0.03;
		scene.camera.roll += 0.01;

		// scene.camera.z -= 0.01;

		renderer.render( canvas.value, scene );

	}, 10 );

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

		border: 2px solid blue;

	}

</style>
