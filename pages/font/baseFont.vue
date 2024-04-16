<script setup>
import { onMounted, ref } from "vue";
import Base from "../Base";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入字体
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
let base;
let controls;
const canvasDom = ref(null);

onMounted(() => {
  base = new Base(canvasDom.value);
  base.camera.position.y = -2;
  // 创建轨道控制器
  controls = new OrbitControls(base.camera, base.renderer.domElement);
  base.scene.background = new THREE.Color(0xffffff);
  createText();
  update();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});

// 创建文字
function createText() {
  new FontLoader().load("/fonts/gentilis_bold.typeface.json", (font) => {
    // 第一个参数字符串，第二个大小
    let shapes = font.generateShapes("TUNGRAY CLOUD-LINK", 1);
    const geometry = new THREE.ShapeGeometry(shapes);
    // 计算包围盒
    geometry.computeBoundingBox();
    // 定义一个三维空间中的点
    let t = new THREE.Vector3();
    // 获取中心点
    geometry.boundingBox.getCenter(t);
    t.negate();
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = t.x;
    mesh.position.z = -2;
    base.scene.add(mesh);
    // 线段材质
    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff000 });
    // 线段数组
    let lines = new THREE.Object3D();
    for (let i = 0; i < shapes.length; i++) {
      let shape = shapes[i];
      console.log(shape.holes);
      if (shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          let hole = shape.holes[j];
          let points = hole.getPoints(); //得到线段上的点
          let geometry = new THREE.BufferGeometry().setFromPoints(points);
          let line = new THREE.Line(geometry, lineMaterial);
          line.position.x = t.x;
          lines.add(line);
        }
      }
      let points = shape.getPoints(); //得到线段上的点
      let geometry = new THREE.BufferGeometry().setFromPoints(points);
      let line = new THREE.Line(geometry, lineMaterial);
      line.position.x = t.x;
      lines.add(line);
      base.scene.add(lines);
    }
  });
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
