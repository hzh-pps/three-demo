import * as THREE from "three";

export default class Base {
  constructor(canvas) {
    // 场景
    this.scene = new THREE.Scene();
    // 照相机
    this.camera = new THREE.PerspectiveCamera(
      75, // 视野
      window.innerWidth / window.innerHeight, // 视口
      1, // 近平面
      10000 // 远平面
    );
    this.camera.position.set(0, 0, 5);
    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true, // 抗锯齿
    });
    // 渲染器范围
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // 渲染器像素比
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
  update() {
    this.renderer.render(this.scene, this.camera);
  }
  // 自适应方法
  resize() {
    // 照相机
    this.camera.aspect = window.innerWidth / window.innerHeight;
    // 更新照相机投影矩阵
    this.camera.updateProjectionMatrix();
    // 渲染器
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // 渲染器像素比
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }
  // 添加环境光
  addAmbientLight(intensity = 1, color = 0xffffff) {
    const light = new THREE.AmbientLight(color, intensity);
    this.scene.add(light);
    return light;
  }
  // 添加平行光
  addDirectionalLight(intensity = 1, color = 0xffffff) {
    const light = new THREE.DirectionalLight(color, intensity);
    this.scene.add(light);
    return light;
  }
}
