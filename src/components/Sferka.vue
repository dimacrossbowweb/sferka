<template>

	<div

		ref="box"
		class="sferka"

	>

		<canvas
		
			ref="canvas"
			class="sferka__canvas"	
			
		/>

	</div>

</template>

<script lang="ts" setup>
import { Formatted } from '../utils/formatted';
import * as Sferka from '../entities';
import { type ICamera } from '../interfaces/camera'; 
import { ref, computed, onMounted } from 'vue';


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

onMounted( (): void => {

	const sphere: Sferka.Sphere = new Sferka.Sphere( 1, 10 );

	const camera: Sferka.Camera = new Sferka.Camera( {

		yaw: 0,
		pitch: 0,
		roll: 0,
		z: 1 

	} );

	const scene: Sferka.Scene = new Sferka.Scene( camera, sphere );

	const renderer: Sferka.Renderer = new Sferka.Renderer();

	console.log( 'SPHERE' );
	console.log( sphere );

	console.log( 'camera' );
	console.log( camera );

	console.log( 'scene' );
	console.log( scene );

	console.log( 'renderer' );
	console.log( renderer );

	renderer.render( canvas.value, scene );

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

		width: 100%;
		height: 100%;

	}

</style>
