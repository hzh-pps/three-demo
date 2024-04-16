<script setup>
import { onMounted, ref } from "vue";
import Base from "../Base";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// 导入css2d
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
let base;
let controls;
const canvasDom = ref(null);
let earth;
let moon;
let labelRenderer;
let gui;
onMounted(() => {
  gui = new GUI();
  base = new Base(canvasDom.value);
  const axesHelper = new THREE.AxesHelper(5);
  base.scene.add(axesHelper);
  base.addAmbientLight(0.4);
  let adl = base.addDirectionalLight(2);
  adl.position.set(0, 0, 10);
  adl.lookAt(0, 0, 0);
  base.camera.position.set(0, 0, 10);
  createCSS2DRenderer();
  // 创建轨道控制器
  controls = new OrbitControls(base.camera, labelRenderer.domElement);
  createEarth();
  createMoon();
  createGUI();
  update();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});
// 创建一个地球
function createEarth() {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  // 高光材质
  const material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("/textures/earth.png"),
    // 高光颜色
    specular: 0x333333,
    // 高光强度
    shininess: 100,
  });
  earth = new THREE.Mesh(geometry, material);
  earth.layers.enableAll();
  createEarthLabel();
  base.scene.add(earth);
}
// 创建一个月球
function createMoon() {
  const geometry = new THREE.SphereGeometry(0.29, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load("/textures/Moon.jpg"),
  });
  moon = new THREE.Mesh(geometry, material);
  moon.layers.enableAll();
  moon.position.x = 5;
  createMoonLabel();
  base.scene.add(moon);
}
// 创建css2drenderer
function createCSS2DRenderer() {
  labelRenderer = new CSS2DRenderer();
  //
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0";
  // 将labelRenderer.domElement添加到body
  document.body.appendChild(labelRenderer.domElement);
}
// 创建地球的label
function createEarthLabel() {
  // 地球名称
  let earthDiv = document.createElement("div");
  earthDiv.textContent = "Earth";
  earthDiv.style.fontSize = "14px";
  earthDiv.style.color = "white";
  let obj = new CSS2DObject(earthDiv);
  obj.position.set(1.5, 0, 0);
  obj.center.set(0, 1);
  obj.layers.set(1);
  earth.add(obj);
  // 地球质量
  let wegDiv = document.createElement("div");
  wegDiv.textContent = "5.972×10^24kg";
  wegDiv.style.fontSize = "14px";
  wegDiv.style.color = "white";
  let wegObj = new CSS2DObject(wegDiv);
  wegObj.position.set(1.5, 0, 0);
  wegObj.center.set(0, 0);
  wegObj.layers.set(2);
  earth.add(wegObj);
}

// 创建月球的label
function createMoonLabel() {
  // 月球名称
  let earthDiv = document.createElement("div");
  earthDiv.textContent = "Moon";
  earthDiv.style.fontSize = "14px";
  earthDiv.style.color = "white";
  let obj = new CSS2DObject(earthDiv);
  obj.position.set(0.5, 0, 0);
  obj.center.set(0, 1);
  obj.layers.set(1);
  moon.add(obj);
  // 月球质量
  let wegDiv = document.createElement("div");
  wegDiv.textContent = "7.3477×10^22kg";
  wegDiv.style.fontSize = "14px";
  wegDiv.style.color = "white";
  let wegObj = new CSS2DObject(wegDiv);
  wegObj.position.set(0.5, 0, 0);
  wegObj.center.set(0, 0);
  wegObj.layers.set(2);
  moon.add(wegObj);
}

function createGUI() {
  let layers = {
    layers1: () => {
      base.camera.layers.toggle(1);
    },
    layers2: () => {
      base.camera.layers.toggle(2);
    },
    enableAll: () => {
      base.camera.layers.enableAll();
    },
    disableAll: () => {
      base.camera.layers.disableAll();
    },
  };
  gui.add(layers, "layers1");
  gui.add(layers, "layers2");
  gui.add(layers, "enableAll");
  gui.add(layers, "disableAll");
}

let clock = new THREE.Clock();
let elapsedTime = 0;
function update() {
  requestAnimationFrame(update);
  elapsedTime = clock.getElapsedTime();
  // 月球绕着地球旋转
  moon.position.set(5 * Math.sin(elapsedTime), 0, 5 * Math.cos(elapsedTime));
  // earth.rotation.y += 0.001;
  base.update();
  controls.update();
  labelRenderer.render(base.scene, base.camera);
}
function resize() {
  base.resize();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
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
