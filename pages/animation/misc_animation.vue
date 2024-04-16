<script setup>
import { onMounted, ref } from "vue";
import Base from "../Base";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入glb
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
let base;
let controls;
let mixer;
let textureLoad = new THREE.TextureLoader();
const canvasDom = ref(null);
onMounted(() => {
  base = new Base(canvasDom.value);
  base.camera.position.z = 10;
  base.addAmbientLight(0.4);
  let adl = base.addDirectionalLight(0.6);
  adl.position.set(0, 10, 10);
  // 创建轨道控制器
  controls = new OrbitControls(base.camera, base.renderer.domElement);
  createBox();
  update();
  // 屏幕宽度改变时调用该方法
  window.addEventListener("resize", resize);
});

// 创建一个正方体
function createBox() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    map: textureLoad.load("1.jpg"),
  });
  const mesh = new THREE.Mesh(geometry, material);

  const material1 = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
  });
  const mesh1 = new THREE.Mesh(geometry, material1);
  mesh1.position.x = 5;
  // base.scene.add(mesh);
  // base.scene.add(mesh1);
  // 动画对象组
  let group = new THREE.AnimationObjectGroup();
  group.add(mesh);
  group.add(mesh1);
  // 1s可见，2秒不可见，3秒可见
  // let bkTrack = new THREE.BooleanKeyframeTrack(
  //   ".visible",
  //   [0, 1, 2],
  //   [true, false, true]
  // );
  // 颜色动画
  let colorTrack = new THREE.ColorKeyframeTrack(
    ".material.color",
    [0, 1, 2],
    [1, 0, 0, 0, 1, 0, 1, 0, 0]
  );
  // 透明动画
  let numberTrack = new THREE.NumberKeyframeTrack(
    ".material.opacity",
    [0, 1, 2],
    [1, 0, 1]
  );
  // 根据轴，选择角度
  let startQu = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    0
  );
  let endQu = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI
  );
  // 旋转动画
  let quTrack = new THREE.QuaternionKeyframeTrack(
    ".quaternion",
    [0, 1, 2],
    [
      startQu.x,
      startQu.y,
      startQu.z,
      startQu.w,
      endQu.x,
      endQu.y,
      endQu.z,
      endQu.w,
      startQu.x,
      startQu.y,
      startQu.z,
      startQu.w,
    ]
  );
  // 位移动画,第一秒在原点，第二秒到X轴为10的位置，第三秒回到原点，实验时应一个
  let veTrack = new THREE.VectorKeyframeTrack(
    ".position",
    [0, 1, 2],
    [0, 0, 0, 10, 0, 0, 0, 0, 0]
  );
  // 缩放动画
  let scale = new THREE.VectorKeyframeTrack(
    ".scale",
    [0, 1, 2],
    [1, 1, 1, 2, 2, 2, 1, 1, 1]
  );
  // 材质动画
  let strTrack = new THREE.StringKeyframeTrack(
    ".material.map",
    [0, 1, 2],
    [
      textureLoad.load("/1.jpg"),
      textureLoad.load("/2.jpg"),
      textureLoad.load("/1.jpg"),
    ]
  );
  // 动画
  // let clip = new THREE.AnimationClip("boxAnim", -1, [
  //   // colorTrack,
  //   // numberTrack,
  //   // quTrack,
  //   // veTrack,
  //   scale,
  //   strTrack,
  // ]);

  new GLTFLoader().load("/jixiebi.glb", (obj) => {
    base.scene.add(obj.scene);
    console.log(obj);
    // 动画播放器
    mixer = new THREE.AnimationMixer(obj.scene.children[0]);
    let clip = obj.animations[0];
    let anim = mixer.clipAction(clip);
    anim.play();
  });
  // 播放
  // mixer = new THREE.AnimationMixer(mesh);
  // //
  // let anim = mixer.clipAction(clip);
  // // 开始播放
  // anim.play();
}

let clock = new THREE.Clock();
function update() {
  requestAnimationFrame(update);
  base.update();
  controls.update();
  mixer?.update(clock.getDelta());
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
