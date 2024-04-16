<script setup>
import { onMounted, ref } from "vue";
import Base from "./Base";
import * as THREE from "three";
// 轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入tweenjs
import { Tween } from "three/examples/jsm/libs/tween.module.js";

definePageMeta({
  layout: false,
});
let base;
let controls;
const canvasDom = ref(null);
let tween;
onMounted(() => {
  base = new Base(canvasDom.value);
  base.addAmbientLight(10);
  const axesHelper = new THREE.AxesHelper(5);
  base.scene.add(axesHelper);
  // 创建轨道控制器
  controls = new OrbitControls(base.camera, base.renderer.domElement);
  createBox();
  update();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});

// 创建一个正方体
function createBox() {
  // 几何体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 材质
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  // 网格
  const mesh = new THREE.Mesh(geometry, material);
  // const mesh1 = new THREE.Mesh(geometry, material);
  // mesh1.position.set(-5, 1, 3);
  // base.scene.add(mesh1);
  base.scene.add(mesh);
  tween = new Tween(mesh.position)
    .to({ x: 5, y: 5, z: 3 }, 5000)
    .repeat(Infinity)
    .yoyo(true)
    .start();
}

function update() {
  requestAnimationFrame(update);
  base.update();
  tween.update();
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
