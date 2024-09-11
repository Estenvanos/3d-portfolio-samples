import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();
scene.background = new THREE.Color("#F0F0F0");

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5;

const geometry = new THREE.DodecahedronGeometry()
const material = new THREE.MeshLambertMaterial({ color: "#C42021", emissive: "#6C0E23"})
const form = new THREE.Mesh(geometry, material)

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2)
const toBoxMaterial = new THREE.MeshStandardMaterial({ color: "#F4EBD9", emissive: "#A790A5"})
const box_form = new THREE.Mesh(boxGeometry, toBoxMaterial)
box_form.position.y = -1.5

scene.add(form)
scene.add(box_form)

const light = new THREE.SpotLight("#fffff", 150)
light.position.set(1, 1, 1)
scene.add(light)

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.dampingFactor = 0.05
controls.enableZoom = true;
controls.enablePam = true;

function animate(){
  requestAnimationFrame(animate)

  form.rotation.x += 0.01
  form.rotation.y += 0.01

  box_form.rotation.y += 0.005

  controls.update()

  renderer.render(scene, camera)  
}

//Handle Window Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate()
