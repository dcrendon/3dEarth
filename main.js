import './style.css'

import milkyway from './milky-way-ga42a3ae51_1920.jpg'

import earthimg from './8081_earthmap4k.jpg'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set( 55 , 10 , 0 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);

const earthTexture = new THREE.TextureLoader().load(earthimg)
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshStandardMaterial( { map: earthTexture, } );
const sphere = new THREE.Mesh( geometry, material );

const ambientLight = new THREE.AmbientLight(0xffffff);

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(sphere, ambientLight)

const spaceTexture = new THREE.TextureLoader().load(milkyway)
scene.background = spaceTexture

const addStar = () => {
  const geometry = new THREE.SphereGeometry( 0.25 );
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)

const animate = () => {
  requestAnimationFrame( animate );

  sphere.rotation.y += 0.005
  // star.rotation.x += 0.1

  controls.update();

  controls.autoRotate = true;

  // Array(200).fill().forEach(addStar)

  renderer.render(scene, camera);
}
animate();