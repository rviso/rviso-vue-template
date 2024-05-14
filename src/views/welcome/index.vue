<template>
  <!-- 使用TailwindCSS 写一个美丽的欢迎页面 -->
  <div class="flex items-center justify-center h-screen w-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-800">
        Welcome to RViso Vue 3 Template
      </h1>
      <p class="text-gray-600">
        {{ msg }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'

const msg: Ref<string> = ref(
  'This is a Vue 3 template with Vue Router, Pinia , Scss and TailwindCSS 3'
)

onMounted(() => {
  console.log('[RViso] Welcome to RViso Vue 3 Template')
})
</script>

<style lang="scss" scoped></style>
