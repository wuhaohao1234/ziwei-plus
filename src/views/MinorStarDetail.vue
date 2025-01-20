<template>
  <div v-if="star" class="minor-star-detail">
    <div class="mb-8">
      <router-link to="/minor-stars" class="text-blue-500 hover:text-blue-600">
        ← 返回辅星列表
      </router-link>
    </div>

    <h1 class="text-3xl font-bold mb-8">{{ star.name }}</h1>

    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="info-item">
          <div class="label">五行</div>
          <div :class="getElementClass(star.element)">{{ star.element }}{{ star.earthBranch }}</div>
        </div>
        <div class="info-item">
          <div class="label">化气</div>
          <div>{{ star.huaQi }}</div>
        </div>
        <div class="info-item">
          <div class="label">职司</div>
          <div>{{ star.duty }}</div>
        </div>
      </div>
      <div class="text-gray-600 whitespace-pre-line">{{ star.description }}</div>
    </div>

    <!-- 宫位影响 -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-2xl font-bold mb-6">宫位影响</h2>
      <div class="space-y-6">
        <div v-for="(effect, palace) in star.palaceEffects" :key="palace" class="palace-effect">
          <h3 class="text-lg font-bold mb-2">{{ palace }}宫</h3>
          <div class="text-gray-600 whitespace-pre-line">
            <template v-for="(line, index) in splitEffectLines(effect)" :key="index">
              <div 
                :class="{
                  'mt-4 font-bold': isTransformationLine(line),
                  'text-green-600': line.includes('化科'),
                  'text-blue-600': line.includes('化权'),
                  'text-yellow-600': line.includes('化禄'),
                  'text-red-600': line.includes('化忌')
                }"
              >
                {{ line.trim() }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMinorStar } from '../data/minorStars'

const route = useRoute()
const star = computed(() => getMinorStar(route.params.id))

const getElementClass = (element) => {
  const map = {
    '木': 'text-green-600',
    '火': 'text-red-600',
    '土': 'text-yellow-600',
    '金': 'text-gray-600',
    '水': 'text-blue-600'
  }
  return map[element]
}

// 分割效果文本为行
const splitEffectLines = (effect) => {
  return effect.split('\n').filter(line => line.trim())
}

// 判断是否为四化行
const isTransformationLine = (line) => {
  const line_trimmed = line.trim()
  return line_trimmed.startsWith('左辅化') || 
         line_trimmed.startsWith('右弼化') ||
         line_trimmed.startsWith('天魁化') ||
         line_trimmed.startsWith('天钺化') ||
         line_trimmed.startsWith('文昌化') ||
         line_trimmed.startsWith('文曲化') ||
         line_trimmed.startsWith('禄存化') ||
         line_trimmed.startsWith('天马化')
}
</script>

<style scoped>
.info-item {
  @apply space-y-1;
}

.info-item .label {
  @apply text-sm text-gray-500;
}

/* 暗色主题适配 */
:deep(.dark-theme) .bg-white {
  @apply bg-gray-800;
}

.palace-effect {
  @apply bg-gray-50 rounded-lg p-4;
}

:deep(.dark-theme) .palace-effect {
  @apply bg-gray-900;
}
</style> 