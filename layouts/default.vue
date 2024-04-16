<script setup lang="ts">
// 使用路由
const router = useRouter();

// 使用 cookie
const name = useCookie("name");

// 此处定义用户菜单
const userMenus = ref<any[]>([
  {
    name: "个人信息",
    path: "/auth/personal-information",
    icon: "fa-solid fa-user",
  },
  {
    name: "修改密码",
    path: "/auth/update-password",
    icon: "fa-solid fa-pen-to-square",
  },
  {
    name: "系统设置",
    path: "/auth/system-setting",
    icon: "fa-solid fa-gear",
  },
  {
    name: "常见问题",
    path: "/auth/FAQ",
    icon: "fa-solid fa-circle-question",
  },
]);

// 此处定义页面菜单
const pageMenus = ref<any[]>();

// tabs 类型
type TabType = {
  parentName: string;
  name: string;
  path: string;
  icon: string;
};

// 正在选中的 tab 对象
let selectTab = ref<TabType | null>(null);
// 已打开的所有 tab
let tabs = ref<TabType[]>([]);

// 添加 tab
function addTab(tab: TabType) {
  // 新的 tab 是否在 tabs 中已经存在，存在则不添加
  if (tabs.value.findIndex((item) => item.name === tab.name) < 0)
    tabs.value.push(tab);
  // 更新选中的 tab
  selectTab.value = tab;
}

// 移除 tab
function removeTab(tab: TabType) {
  // 获取要删除的 tab 的索引
  const tabIndex = tabs.value.indexOf(tab);
  // 从 tabs 中删除该 tab
  tabs.value.splice(tabIndex, 1);

  // 如果删除的 tab 为选中的 tab
  if (selectTab.value && tab.name === selectTab.value.name) {
    // 如果删除该 tab 后，tabs 长度大于 0
    if (tabs.value.length > 0) {
      // 如果删除的 tab 为最后一个，则需要更新选中的 tab 为前一个 tab，且跳转到前一个 tab
      if (tabIndex === tabs.value.length) {
        selectTab.value = tabs.value[tabIndex - 1];
        router.push({ path: tabs.value[tabIndex - 1].path });
        return;
      }
      // 如果删除的 tab 不为最后一个，则需要更新选中的 tab 为后一个 tab，且跳转到后一个 tab
      selectTab.value = tabs.value[tabIndex];
      router.push({ path: tabs.value[tabIndex].path });
    }
    // 如果删除该 tab 后，tabs 长度等于 0，则不需要做任何操作
  }
  // 如果删除的 tab 不为选中的 tab，则不需要做任何操作
}

// 检测 tabs 长度，如果为 0，则跳转到 home 页面

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
  {
    name: "天空盒",
    path: "/skybox/skybox",
    icon: "fa-solid fa-chart-gantt",
  },
]);
</script>

<template>
  <v-app>
    <v-navigation-drawer color="blue-darken-2">
      <v-list v-for="(item, index) in items" :key="index">
        <v-list-item
          :prepend-icon="item.icon"
          color="black"
          :title="item.name"
          :to="item.path"
        >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<style scoped>
.list-item-active {
  background-image: linear-gradient(25deg, #0044bd, #1e66d3, #2a88e9, #2dacff);
  color: white !important;
}
</style>
