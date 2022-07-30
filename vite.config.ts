import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ArcoResolver} from "unplugin-vue-components/resolvers";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // 设置别名
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true
        })
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import \"@/assets/css/variable.scss\";",
      },
    },
  },
});
