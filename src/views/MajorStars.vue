<template>
  <div class="major-stars">
    <h1 class="text-3xl font-bold mb-8">十四主星</h1>
    
    <!-- 主星列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link 
        v-for="star in majorStars" 
        :key="star.id"
        :to="`/major-stars/${star.id}`"
        class="star-card hover:shadow-lg transition-shadow"
      >
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="text-2xl font-bold">{{ star.name }}</div>
            <div :class="getElementClass(star.element)" class="text-sm">
              {{ star.element }}{{ star.earthBranch }}
            </div>
          </div>
          <div class="text-gray-500 text-sm">
            命宫出现概率: {{ star.probability }}
          </div>
          <div class="mt-4 text-gray-600">{{ star.brief }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const majorStars = [
  {
    id: 'ziwei',
    name: '紫微星',
    element: '土',
    earthBranch: '己',
    probability: '≈1.28%',
    brief: '紫微星是紫微斗数中的帝星，代表权威、尊贵、领导力。化气为"尊贵"，具有目标长远、大局观强等特质。'
  },
  {
    id: 'tianji',
    name: '天机星',
    element: '木',
    earthBranch: '乙',
    probability: '≈4.13%',
    brief: '天机星主管智慧，是第六感的来源。思维活跃，善于谋划，具有极强的社交能力。'
  },
  // ... 其他主星数据
]

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
</script>

<style scoped>
.star-card {
  @apply block;
}

.star-card:hover {
  @apply transform transition-transform hover:-translate-y-1;
}

/* 暗色主题适配 */
:deep(.dark-theme) .star-card > div {
  @apply bg-gray-800;
}
</style> 