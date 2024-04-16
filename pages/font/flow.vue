<script setup>
import { onMounted, ref } from "vue";
import Base from "../Base";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// 导入字体
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Flow } from "three/examples/jsm/modifiers/CurveModifier";

let base;
let controls;
let flow;
const canvasDom = ref(null);

onMounted(() => {
  base = new Base(canvasDom.value);
  base.camera.position.set(0, 2, 4);
  // 添加光照
  base.addAmbientLight(0.1);
  // 平行光
  let adl = base.addDirectionalLight(0.45);
  adl.position.set(0, 10, 10);
  // 创建轨道控制器
  controls = new OrbitControls(base.camera, base.renderer.domElement);
  createFlow();
  update();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});

function createFlow() {
  // 三维曲线
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-1, 0, 1),
      new THREE.Vector3(-1, 1, 1),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0, 1),
    ],
    true
  );
  // 曲线上的点
  const points = curve.getPoints(50);
  // 
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  const curveObject = new THREE.Line(geometry, material);
  base.scene.add(curveObject);

  new FontLoader().load("/fonts/helvetiker_regular.typeface.json", (font) => {
    const geometry = new TextGeometry("TUNGRAY", {
      font,
      size: 0.2,
      height: 0.05,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.01,
      bevelSegments: 5,
    });
    geometry.rotateX(Math.PI);
    let mat = new THREE.MeshStandardMaterial({ color: 0x99ffff });
    let mesh = new THREE.Mesh(geometry, mat);
    flow = new Flow(mesh); //创建一个沿着曲线的运动的物体
    flow.updateCurve(0, curve); //第一个参数是索引，第二个参数是曲线
    base.scene.add(flow.object3D);
  });
}

function update() {
  requestAnimationFrame(update);
  base.update();
  controls.update();
  flow?.moveAlongCurve(-0.002); //参数代表运动速度和方向
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
