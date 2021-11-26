import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
class App extends Component {
  componentDidMount() {
	let /*perspectiveCamera,*/ orthographicCamera, controls, scene, renderer, stats;

	/* const params = {
		orthographicCamera: true
	}; */

	const frustumSize = 400;

	init();
	animate();

	function init() {

		const aspect = window.innerWidth / window.innerHeight;

		//perspectiveCamera = new THREE.PerspectiveCamera( 60, aspect, 1, 1000 );
		//perspectiveCamera.position.z = 500;

		orthographicCamera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
		orthographicCamera.position.z = 500;

		// world

		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0xcccccc );
		scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

		//const geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
		const geometry = new THREE.BoxGeometry(100, 100, 100);
		const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

		/*for ( let i = 0; i < 500; i ++ ) {

			const mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = ( Math.random() - 0.5 ) * 1000;
			mesh.position.y = ( Math.random() - 0.5 ) * 1000;
			mesh.position.z = ( Math.random() - 0.5 ) * 1000;
			mesh.updateMatrix();
			mesh.matrixAutoUpdate = false;
			scene.add( mesh );

		} */
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = 0;
		mesh.position.y = 0;
		mesh.position.z = 0;
		mesh.updateMatrix();
		mesh.matrixAutoUpdate = false;
		scene.add(mesh);

		// lights

		const dirLight1 = new THREE.DirectionalLight( 0xffffff );
		dirLight1.position.set( 1, 1, 1 );
		scene.add( dirLight1 );

		const dirLight2 = new THREE.DirectionalLight( 0x002288 );
		dirLight2.position.set( - 1, - 1, - 1 );
		scene.add( dirLight2 );

		const dirLight3 = new THREE.DirectionalLight( 0x002288 );
		dirLight2.position.set( 1, - 1, - 1 );
		scene.add( dirLight3 );

		const ambientLight = new THREE.AmbientLight( 0x222222 );
		scene.add( ambientLight );

		// renderer

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		stats = new Stats();
		document.body.appendChild( stats.dom );

		window.addEventListener( 'resize', onWindowResize );
		createControls( orthographicCamera);

	}

	function createControls( camera ) {

		controls = new TrackballControls( camera, renderer.domElement );

		controls.rotateSpeed = 1.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;

		controls.keys = [ 'KeyA', 'KeyS', 'KeyD' ];

	}

	function onWindowResize() {

		const aspect = window.innerWidth / window.innerHeight;

		orthographicCamera.left = - frustumSize * aspect / 2;
		orthographicCamera.right = frustumSize * aspect / 2;
		orthographicCamera.top = frustumSize / 2;
		orthographicCamera.bottom = - frustumSize / 2;
		orthographicCamera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		controls.handleResize();

	}

	function animate() {

		requestAnimationFrame( animate );

		controls.update();

		stats.update();

		render();

	}

	function render() {
		const camera = orthographicCamera;

		renderer.render( scene, camera );

	}
  }
  
  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);