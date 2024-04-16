export default defineNuxtConfig({
  css: ["vuetify/styles"],
  build: {
    transpile: ["vuetify"],
  },

  // 启用了哪些模块
  modules: ["@pinia/nuxt", "nuxt-lodash", "@hypernym/nuxt-gsap"],
  gsap: {
    composables: true,
  },
  imports: {
    dirs: ["http"],
  },
  // 配置默认请求地址
  runtimeConfig: {
    public: {
      apiBase: "http://10.0.20.250:5050",
      // apiBase: "http://10.0.20.61:8068",
    },
  },

  // 类型检查、严格模式是否启用
  typescript: { strict: true, typeCheck: false },
  // devtools 工具是否启用
  devtools: { enabled: true },
});
