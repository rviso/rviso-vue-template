import { defineStore } from 'pinia'

/**
 * 全屏状态，由于Dream后台集成的项目是采用iframe嵌套的方式，所以需要在父页面中控制全屏状态
 */
export const useGlobalStore = defineStore('global', {
  state: () => ({
    fullscreen: JSON.parse(import.meta.env.VITE_APP_FULLSCREEN), // 全屏
    env: import.meta.env.MODE
  }),
  actions: {
    toggleFullscreen() {
      this.fullscreen = !this.fullscreen
    }
  }
})
