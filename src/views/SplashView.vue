<template>
  <div class="flex flex-col items-center justify-center h-screen bg-black">
    <!-- Logo and Title -->
    <img :src="logo" alt="Logo" class="w-100 mb-4" />

    <!-- Loading Text and Bar -->
    <div class="w-100">
      <p class="font-press text-white text-sm mb-2">{{ loadingText }}</p>
      <div class="h-6 border-4 border-white">
        <div
          class="h-full bg-white transition-all duration-300"
          :style="{ width: progressBarWidth + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/images/logo.png'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loadingText = ref('Loading.')
const progress = ref(0)

onMounted(() => {
  // Animate progress bar
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 3.3
    }
  }, 100)

  // Animate loading text
  let dotCount = 1
  const dotInterval = setInterval(() => {
    loadingText.value = 'Loading' + '.'.repeat(dotCount)
    dotCount = (dotCount % 3) + 1
  }, 300)

  // After 3 seconds, redirect
  setTimeout(() => {
    clearInterval(interval)
    clearInterval(dotInterval)
    router.push('/home') // Go to home
  }, 3000)
})

const progressBarWidth = computed(() => Math.min(progress.value, 100))
</script>
