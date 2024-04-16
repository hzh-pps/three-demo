<script setup>
import { onMounted, ref } from "vue";
import Base from "../Base";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
let base;
let controls;
const canvasDom = ref(null);

onMounted(() => {
  base = new Base(canvasDom.value);
  // 创建轨道控制器
  controls = new OrbitControls(base.camera, base.renderer.domElement);
  update();
  // createEllipse();
  // createCatmullRom();
  // createCubicBezier();
  createSpline();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});

//#region 创建椭圆曲线
function createEllipse() {
  const curve = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    2,
    3, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
  );

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // 创建线
  const ellipse = new THREE.Line(geometry, material);
  base.scene.add(ellipse);
}
//#endregion

//#region 创建三维曲线
function createCatmullRom() {
  const curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-2, 0, 2),
      new THREE.Vector3(-1, 1, 1),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, -1, 1),
      new THREE.Vector3(2, 0, 2),
    ],
    true
  );
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // Create the final object to add to the scene
  const curveObject = new THREE.Line(geometry, material);
  base.scene.add(curveObject);
}
//#endregion

//#region 创建二维立方赛贝尔曲线
function createCubicBezier() {
  const curve = new THREE.CubicBezierCurve(
    new THREE.Vector2(-2, 0),
    new THREE.Vector2(-1, 1),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(1, -1)
  );

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // Create the final object to add to the scene
  const curveObject = new THREE.Line(geometry, material);
  base.scene.add(curveObject);
}
//#endregion

//#region 创建三维样条曲线
function createSpline() {
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-2, 0, 2),
    new THREE.Vector3(-1, 1, 1),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2, 0, 0)
  );

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  // Create the final object to add to the scene
  const curveObject = new THREE.Line(geometry, material);
  base.scene.add(curveObject);
}
//#endregion

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
