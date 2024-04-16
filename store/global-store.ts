import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const name = ref("xdp");
  const age = ref(18);
  const sex = ref("男");
  return { name, age, sex };
});

export const usePostStore = defineStore("postStore", () => {
  const postID = ref("这是文章ID");
  const postTitle = ref("这是文章标题");
  const postContent = ref("这是文章内容");
  return { postID, postTitle, postContent };
});
