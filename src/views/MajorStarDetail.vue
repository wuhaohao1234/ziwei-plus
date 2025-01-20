<template>
  <div v-if="star" class="major-star-detail">
    <div class="mb-8">
      <router-link to="/fourteen-stars" class="text-blue-500 hover:text-blue-600">
        ← 返回主星列表
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
          <div class="label">命宫概率</div>
          <div>{{ star.probability }}</div>
        </div>
        <div class="info-item">
          <div class="label">职司</div>
          <div>{{ star.duty }}</div>
        </div>
      </div>
      <div class="text-gray-600">{{ star.description }}</div>

      <!-- 添加四化信息显示 -->
      <div class="mt-6">
        <h3 class="text-xl font-bold mb-4">四化特性</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="font-bold text-green-600">化科</div>
            <div class="mt-2">主学术、研究、创新</div>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="font-bold text-blue-600">化权</div>
            <div class="mt-2">主权力、谋略、决策</div>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="font-bold text-yellow-600">化禄</div>
            <div class="mt-2">主富贵、财运、福分</div>
          </div>
          <div class="p-4 bg-gray-50 rounded-lg">
            <div class="font-bold text-red-600">化忌</div>
            <div class="mt-2">主阻碍、困扰、压力</div>
          </div>
        </div>
      </div>
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
import { getMajorStar } from '../data/majorStars'

const route = useRoute()
const star = computed(() => getMajorStar(route.params.id))

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
  return line_trimmed.startsWith('紫微化') || 
         line_trimmed.startsWith('天机化') ||
         line_trimmed.startsWith('太阳化') ||
         line_trimmed.startsWith('武曲化') ||
         line_trimmed.startsWith('天府化') ||
         line_trimmed.startsWith('天同化') ||
         line_trimmed.startsWith('廉贞化') ||
         line_trimmed.startsWith('天机化') ||
         line_trimmed.startsWith('太阴化') ||
         line_trimmed.startsWith('天相化') ||
         line_trimmed.startsWith('天梁化') ||
         line_trimmed.startsWith('七杀化') ||
         line_trimmed.startsWith('破军化')
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

/* 四化信息的样式 */
.palace-effect {
  @apply bg-gray-50 rounded-lg p-4;
}

/* 暗色主题适配 */
:deep(.dark-theme) .palace-effect {
  @apply bg-gray-900;
}
</style> 