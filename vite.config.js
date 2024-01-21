import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from '@rollup/plugin-inject';
// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [
    vue(),
    inject({
      $:"jquery",
      jQuery:"jquery",
      "windows.jQuery":"jquery",
    })
  ],
  server:{
    proxy: {
      '/api': {
        target: "http://localhost:port",//后端接口的url地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
