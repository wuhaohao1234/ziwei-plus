import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 添加 base 配置，设置为根路径
  base: "/ziwei-plus",
  // 如果需要，也可以配置构建输出目录
  build: {
    outDir: "docs",
    assetsDir: "assets",
    // 确保资源路径正确
    assetsInlineLimit: 4096,
    // 生成静态资源的存放路径
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
      }
    }
  }
});