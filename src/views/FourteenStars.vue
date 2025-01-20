<template>
  <div class="fourteen-stars">
    <h1 class="text-3xl font-bold mb-8">十四主星</h1>
    
    <!-- 主星分类 -->
    <div class="mb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="category in starCategories" :key="category.name" class="category-card">
          <h2 class="text-xl font-bold mb-4">{{ category.name }}</h2>
          <div class="space-y-4">
            <router-link 
              v-for="star in category.stars" 
              :key="star.id"
              :to="`/fourteen-stars/${star.id}`"
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
  </div>
</template>

<script setup>
const starCategories = [
  {
    name: '帝星',
    stars: [
      {
        id: 'ziwei',
        name: '紫微星',
        element: '土',
        earthBranch: '己',
        huaQi: '尊贵',
        brief: '紫微斗数中的帝星，代表权威、尊贵、领导力。'
      }
    ]
  },
  {
    name: '吉星',
    stars: [
      {
        id: 'tianfu',
        name: '天府星',
        element: '土',
        earthBranch: '戊',
        huaQi: '令',
        brief: '主财帛、田宅、福德，性情温和。'
      },
      {
        id: 'taiyang',
        name: '太阳星',
        element: '火',
        earthBranch: '丙',
        huaQi: '权',
        brief: '主权贵、名声、光明正大。'
      },
      {
        id: 'wuqu',
        name: '武曲星',
        element: '金',
        earthBranch: '庚',
        huaQi: '禄',
        brief: '主财禄、权力、果断。'
      },
      {
        id: 'taiyin',
        name: '太阴星',
        element: '水',
        earthBranch: '癸',
        huaQi: '富',
        brief: '主财帛、田宅、情感，善于理财。'
      },
      {
        id: 'tianliang',
        name: '天梁星',
        element: '土',
        earthBranch: '戊',
        huaQi: '荫',
        brief: '主寿命、慈祥、正直，性情温和。'
      },
      {
        id: 'tianxiang',
        name: '天相星',
        element: '水',
        earthBranch: '壬',
        huaQi: '印',
        brief: '主官禄、慈祥、恻隐，性情温和。'
      }
    ]
  },
  {
    name: '中性星',
    stars: [
      {
        id: 'tianji',
        name: '天机星',
        element: '木',
        earthBranch: '乙',
        huaQi: '谋',
        brief: '主智慧、谋略、创造力。'
      },
      {
        id: 'tanlang',
        name: '贪狼星',
        element: '木水',
        earthBranch: '甲壬',
        huaQi: '桃花',
        brief: '主欲望、桃花、变化，善于交际。'
      },
      {
        id: 'jumen',
        name: '巨门星',
        element: '水',
        earthBranch: '癸',
        huaQi: '暗',
        brief: '主口才、是非、变化，善于言辞。'
      },
      {
        id: 'tiantong',
        name: '天同星',
        element: '水',
        earthBranch: '壬',
        huaQi: '福',
        brief: '主福德、情感、享乐，性情温和。'
      },
      {
        id: 'lianzhen',
        name: '廉贞星',
        element: '火',
        earthBranch: '丙',
        huaQi: '囚',
        brief: '主清高、固执、是非。'
      }
    ]
  },
  {
    name: '凶星',
    stars: [
      {
        id: 'pojun',
        name: '破军星',
        element: '水',
        earthBranch: '癸',
        huaQi: '破',
        brief: '主变革、独特、破旧立新。'
      }
    ]
  },
  {
    name: '煞星',
    stars: [
      {
        id: 'qisha',
        name: '七杀星',
        element: '金',
        earthBranch: '庚',
        huaQi: '杀',
        brief: '主权威、竞争、果断。'
      }
    ]
  }
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