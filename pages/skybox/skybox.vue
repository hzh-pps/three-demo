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
  base.addAmbientLight(0.4);
  let adl = base.addDirectionalLight(3);
  adl.position.set(0, 10, 10);
  // 创建轨道控制器
  controls = new OrbitControls(base.camera, base.renderer.domElement);
  createSkybox();
  update();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});
function createSkybox() {
  // 创建一个立方体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    shininess: 0.5,
  });
  const mesh = new THREE.Mesh(geometry, material);
  base.scene.add(mesh);
  //
  const loader = new THREE.TextureLoader();
  const texture = loader.load("/quanjing.jpeg", () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(base.renderer, texture);
    base.scene.background = rt.texture;
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
