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
  // createShape();
  createSmile();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});
// 画一个正方体
function createShape() {
  let shape = new THREE.Shape()
    .moveTo(0, 0)
    .lineTo(2, 0)
    .lineTo(2, 2)
    .lineTo(0, 2)
    .lineTo(0, 0);
  // 中间挖空
  shape.holes.push(
    new THREE.Shape()
      .moveTo(0.5, 0.5)
      .lineTo(1.5, 0.5)
      .lineTo(1.5, 1.5)
      .lineTo(0.5, 1.5)
      .lineTo(0.5, 0.5)
  );
  // 立体挤压缓存题
  const geometry = new THREE.ExtrudeGeometry(shape);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  const mesh = new THREE.Mesh(geometry, material);
  base.scene.add(mesh);
}
// 画一个笑脸
function createSmile() {
  const shape = new THREE.Shape().absarc(0, 0, 1, 0, Math.PI * 2);
  shape.holes.push(new THREE.Shape().absarc(-0.3, 0.55, 0.2, 0, Math.PI * 2)); //左眼
  shape.holes.push(new THREE.Shape().absarc(0.3, 0.55, 0.2, 0, Math.PI * 2)); //右眼

  shape.holes.push(
    new THREE.Shape()
      .moveTo(-0.4, -0.3)
      .bezierCurveTo(-0.4, -0.3, 0, -0.8, 0.4, -0.3)
      .bezierCurveTo(0.4, -0.3, 0, -0.6, -0.4, -0.3)
  ); //鼻子
  const shapeGeometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(shapeGeometry, material);
  base.scene.add(mesh);
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
