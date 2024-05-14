import { URL, fileURLToPath } from 'node:url'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig((_opt: UserConfig) => {
  // 设置本地开发环境的访问host，注意，这里只是为127.0.0.1设置了host，测试环境，预发环境的host需要在本地的host文件中配置
  return {
    base: './',
    optimizeDeps: {
      include: ['vue']
    },
    // 注入全局变量
    define: {
      __VERSION__: JSON.stringify({})
    },
    plugins: [
      vue(),
      vueJsx(),
      // 配置html模板（这里也可以配置多页面应用，以此提高页面加载速度）
      createHtmlPlugin({
        // 配置入口文件，配置后会自动引入打包后的js文件，需要注意的是，要将index.html文件中的js文件引入注释掉
        entry: 'src/main.ts',
        inject: {
          data: {
            title: 'RViso Vue3 Template',
            description: 'RViso Vue3 Template', // 网页描述
            keywords: 'RViso Vue3 Template' // 网页关键字
          }
        }
      }),
      // 配置Mock 服务
      viteMockServe({
        ignore: /^_/, // 忽略以_开头的文件
        mockPath: 'mock', // mock文件夹
        enable: true // 是否开启mock服务
        // injectCode: `
        //         import { setupProdMockServer } from '../mock/_mock-server';
        //         setupProdMockServer();
        //       `
      })
    ],
    server: {
      disableHostCheck: true, // 关闭host检查
      open: false, // 自动打开浏览器
      port: 3000,
      gzip: true, // 开启gzip
      cors: true, // 允许跨域
      https: false, // 开启https
      proxy: {
        // 代理
        '/mock-api': {
          target: '//127.0.0.1:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mock-api/, '')
        }
        // '/api': {
        //   target: 'http://localhost:3000',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, '')
        // }
      }
    },
    build: {
      target: 'es2015', // 兼容性
      assetsDir: 'assets', // 静态资源目录
      cssTarget: 'chrome82', // css兼容性
      sourcemap: false, // 打包后是否生成.map文件
      manifest: true, // 是否生成manifest.json文件
      chunkSizeWarningLimit: 2000, // 警告阈值
      minify: 'terser', // 压缩方式
      terserOptions: {
        compress: {
          drop_console: true, // 去除console
          drop_debugger: true // 去除debugger
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue'] // 将vue单独打包
          }
        }
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          // 定义全局的scss变量
          // 给导入的路径最后加上 ;
          additionalData: '@import "@/styles/variables.scss";'
        }
      }
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url))
        },
        {
          find: 'vite-plugin-mock',
          replacement: 'vite-plugin-mock/dist/client'
        },
        {
          find: /^~(.*)$/,
          replacement: '$1'
        }
      ]
    }
  }
})
