<!-- <template>
  <v-app>
    <v-navigation-drawer color="blue-darken-2">
      <v-list v-for="(item, index) in items" :key="index">
        <v-list-item
          :prepend-icon="item.icon"
          color="black"
          :title="item.name"
          :active="index === activeIndex"
          @click="changeComponent(item.path, index)"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <component :is="currentComponent"></component>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { shallowRef, onMounted } from "vue";
import { useRouter } from "vue-router";
import css2d_label from "@/components/css2d/css2d_label.vue";
import misc_animation from "@/components/animation/misc_animation.vue";
import baseCurve from "@/components/curve/baseCurve.vue";
import shape from "@/components/curve/shape.vue";
import baseFont from "@/components/font/baseFont.vue";
import flow from "@/components/font/flow.vue";
import mirrorFont from "@/components/font/mirrorFont.vue";
import baseGeometry from "@/components/geometry/baseGeometry.vue";
let activeIndex = ref(0);
const items = ref<any>([
  {
    name: "CSS2D",
    path: "/css2d/css2d_label",
    icon: "fa-solid fa-chart-gantt",
  },
  {
    name: "动画",
    path: "/animation/misc_animation",
    icon: "fa-solid fa-chart-gantt",
  },
  {
    name: "曲线",
    path: "/curve/baseCurve",
    icon: "fa-solid fa-chart-gantt",
  },
  {
    name: "形状",
    path: "/curve/shape",
    icon: "fa-solid fa-chart-gantt",
  },
  {
    name: "字体",
    path: "/font/baseFont",
    icon: "fa-solid fa-chart-gantt",
  },
  {
    name: "流体",
    path: "/font/flow",
    icon: "fa-solid fa-chart-gantt",
  },
  {
    name: "镜像",
    path: "/font/mirrorFont",
    icon: "fa-solid fa-chart-gantt",
  },
  {
    name: "几何",
    path: "/geometry/baseGeometry",
    icon: "fa-solid fa-chart-gantt",
  },
]);

onMounted(() => {
  activeIndex.value = 0;
  changeComponent(items.value[0].path, 0);
});
let currentComponent = shallowRef(null);
const componentsMap: Record<string, any> = {
  "/css2d/css2d_label": css2d_label,
  "/animation/misc_animation": misc_animation,
  "/curve/baseCurve": baseCurve,
  "/curve/shape": shape,
  "/font/baseFont": baseFont,
  "/font/flow": flow,
  "/font/mirrorFont": mirrorFont,
  "/geometry/baseGeometry": baseGeometry,
};

function changeComponent(path: string, index: number) {
  activeIndex.value = index;
  currentComponent.value = null;
  const component = componentsMap[path];
  if (component) {
    // 延迟加载新组件，确保页面已经清空
    currentComponent.value = component;
  } else {
    console.error("当前路径不存在");
  }
}

const router = useRouter();
const name = useCookie("name");
function exit() {
  router.push("/auth/login");
}
// 切换全屏模式
function changeFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
</script>
<style scoped>
.list-item.v-list-item--active {
  background-color: rgb(15, 15, 15); /* 激活状态下的背景颜色 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 使用box-shadow添加阴影以模拟海拔 */
}
</style> -->
<script setup lang="ts">
import { useRouter } from "vue-router";
// 不启用布局
definePageMeta({
  layout: false,
});

const router = useRouter();
</script>
<template>
  <v-btn @click="router.push('/css2d/css2d_label')">CSS2D</v-btn>
</template>
