<script setup>
import { onMounted, ref } from "vue";
import Base from "../Base";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
let base;
let controls;
const canvasDom = ref(null);
let gui;
onMounted(() => {
  base = new Base(canvasDom.value);
  base.addAmbientLight(10);
  gui = new GUI();
  // 创建轨道控制器
  controls = new OrbitControls(base.camera, base.renderer.domElement);
  update();
  createBox();
  // createCapsule();
  // createSphere();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});
// 立方缓存几何体
function createBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: 0xdce5ef });
  const cube = new THREE.Mesh(geometry, material);
  material.wireframe = true;
  base.scene.add(cube);
  gui.add(material, "wireframe", true).name("是否显示网格");
}
// 创建胶囊几何体
function createCapsule() {
  const geometry = new THREE.CapsuleGeometry(1, 1, 10, 8);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const capsule = new THREE.Mesh(geometry, material);
  base.scene.add(capsule);
}
// 创建圆形缓冲几何体
function createSphere() {
  const geometry = new THREE.CircleGeometry(1, 16, 0, Math.PI);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  const sphere = new THREE.Mesh(geometry, material);
  base.scene.add(sphere);
}
function update() {
  requestAnimationFrame(update);
  base.update();
  controls.update();
}
function resize() {
  base.resize();
}
</script>

<template>
  <canvas ref="canvasDom" id="canvasDom"></canvas>
</template>
<style scoped>
#canvasDom {
  width: 100vw;
  height: 100vh;
}
</style>
