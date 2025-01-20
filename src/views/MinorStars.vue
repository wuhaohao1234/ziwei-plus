<template>
  <div class="minor-stars">
    <h1 class="text-3xl font-bold mb-8">十四辅星</h1>
    
    <!-- 辅星分类 -->
    <div class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="category in starCategories" :key="category.name" class="category-card">
          <h2 class="text-xl font-bold mb-4">{{ category.name }}</h2>
          <div class="space-y-4">
            <router-link 
              v-for="star in category.stars" 
              :key="star.id"
              :to="`/minor-stars/${star.id}`"
              class="star-item"
            >
              <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <span class="text-lg font-bold">{{ star.name }}</span>
                    <span :class="getElementClass(star.element)" class="text-sm">
                      {{ star.element }}{{ star.earthBranch }}
                    </span>
                  </div>
                  <span class="text-sm text-gray-500">{{ star.huaQi }}</span>
                </div>
                <p class="text-gray-600 text-sm">{{ star.brief }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 子路由内容 -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getAllMinorStars } from '../data/minorStars'

// 从 minorStars.js 获取所有辅星数据
const allStars = getAllMinorStars()

// 将辅星按类别分组
const starCategories = computed(() => [
  {
    name: '六吉星',
    stars: allStars.filter(star => 
      ['zuofu', 'youbi', 'tiankui', 'tianyue', 'wenxing', 'wenqu'].includes(star.id)
    )
  },
  {
    name: '六煞星',
    stars: allStars.filter(star => 
      ['dikong', 'dijie', 'huoxing', 'lingxing', 'tuoluo', 'qingyang'].includes(star.id)
    )
  },
  {
    name: '二助星',
    stars: allStars.filter(star => 
      ['tianma', 'lucun'].includes(star.id)
    )
  }
])

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
.category-card {
  @apply bg-gray-50 p-6 rounded-lg;
}

.star-item {
  @apply block;
}

/* 暗色主题适配 */
:deep(.dark-theme) .category-card {
  @apply bg-gray-900;
}

:deep(.dark-theme) .star-item > div {
  @apply bg-gray-800;
}
</style> 