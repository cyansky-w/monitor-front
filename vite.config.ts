import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
const srcPath = path.resolve(__dirname, 'src');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
	alias: [
		{ find: '@', replacement: srcPath },
	],
},
  server: {
		port: 8080,
		proxy: {
			'/prod-api': {
				target: ' http://81.68.222.187:10013', // 目标服务 
				rewrite:(path)=>path.replace(/^\/dev-api/, ""),
				changeOrigin: true
			},
			'/dev-api': {
				target: ' http://127.0.0.1:10013', // 目标服务
				rewrite:(path)=>path.replace(/^\/dev-api/, ""),
				changeOrigin: true
			},
			'/success': {
				target: ' http://127.0.0.1:3000', // 目标服务  
				changeOrigin: true
			},
			'/upload': {
				target: 'http://127.0.0.1:3000', // 日志服务器  
				changeOrigin: true
			}
		}
	}
})
