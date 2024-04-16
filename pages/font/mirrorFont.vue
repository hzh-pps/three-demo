<script setup>
import { onMounted, ref } from "vue";
import Base from "../Base";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
// 导入字体
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
let base;
let controls;
const canvasDom = ref(null);

onMounted(() => {
  base = new Base(canvasDom.value);
  base.camera.position.y = 200;
  base.camera.position.z = 600;
  // 添加环境光
  base.addAmbientLight(0.4);
  // 添加平行光
  let adr = base.addDirectionalLight(0.8);
  adr.position.set(0, 0, 100);
  // 创建轨道控制器
  controls = new OrbitControls(base.camera, base.renderer.domElement);
  base.scene.background = new THREE.Color(0x000000);
  base.scene.fog = new THREE.Fog(0x000000, 100, 2000);
  createText();
  createPlane();
  update();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});

// 创建文字
function createText() {
  new FontLoader().load("/fonts/gentilis_bold.typeface.json", (font) => {
    // 第一个参数字符串，第二个大小
    // let shapes = font.generateShapes("TUNGRAY CLOUD-LINK", 1);
    const geometry = new TextGeometry("TUNGRAY CLOUD-LINK", {
      font: font,
    });
    // 计算包围盒
    geometry.computeBoundingBox();
    // 定义一个三维空间中的点
    let t = new THREE.Vector3();
    // 获取中心点
    geometry.boundingBox.getCenter(t);
    t.negate();
    const material = new THREE.MeshStandardMaterial({
      color: 0xf312f1,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = t.x;
    mesh.position.y = 30;
    mesh.position.z = 2 * t.z;
    base.scene.add(mesh);

    const mesh1 = new THREE.Mesh(geometry, material);
    mesh1.position.x = t.x;
    mesh1.position.y = -30;
    mesh1.rotation.x = Math.PI;
    base.scene.add(mesh1);
  });
}

// 创建平面
function createPlane() {
  let plane = new THREE.PlaneGeometry(20000, 20000);
  const material = new THREE.MeshBasicMaterial({
    opacity: 0.5,
    transparent: true,
  });
  const mesh = new THREE.Mesh(plane, material);
  mesh.rotateX(-Math.PI / 2);
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
