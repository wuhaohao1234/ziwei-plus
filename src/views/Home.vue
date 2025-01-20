<template>
  <div class="home">
    <div class="hero-section">
      <h1 class="title">紫微星耀篇</h1>
      <p class="subtitle">探索命理天机，解读人生密码</p>
      <p class="description">
        紫微斗数，东方最精妙的命理体系，融合天文历法与哲学智慧，揭示命运的奥秘，指引人生的方向。
      </p>
    </div>

    <div class="content-grid">
      <a-card class="feature-card" @click="router.push('/fourteen-stars')">
        <template #cover>
          <div class="card-cover bg-gradient-to-r from-purple-500 to-indigo-500">
            <StarOutlined class="text-4xl text-white" />
          </div>
        </template>
        <a-card-meta title="十四主星">
          <template #title>
            <div class="card-title">
              <span>十四主星</span>
              <span class="card-subtitle">命盘的核心力量</span>
            </div>
          </template>
          <template #description>
            十四主星如同命盘的灵魂，每颗星辰都蕴含独特的能量场。深入解析其性质、作用与组合，揭示命运的核心密码。
          </template>
        </a-card-meta>
      </a-card>

      <a-card class="feature-card" @click="router.push('/minor-stars')">
        <template #cover>
          <div class="card-cover bg-gradient-to-r from-blue-500 to-cyan-500">
            <StarOutlined class="text-4xl text-white" />
          </div>
        </template>
        <a-card-meta title="十四辅星">
          <template #title>
            <div class="card-title">
              <span>十四辅星</span>
              <span class="card-subtitle">命运的细节编织者</span>
            </div>
          </template>
          <template #description>
            辅星如同命运的画笔，勾勒人生的细节。它们与主星相互辉映，共同编织出命运的锦绣画卷。
          </template>
        </a-card-meta>
      </a-card>

      <a-card class="feature-card" @click="router.push('/twelve-houses')">
        <template #cover>
          <div class="card-cover bg-gradient-to-r from-green-500 to-teal-500">
            <ApartmentOutlined class="text-4xl text-white" />
          </div>
        </template>
        <a-card-meta title="十二宫位">
          <template #title>
            <div class="card-title">
              <span>十二宫位</span>
              <span class="card-subtitle">人生的十二重天</span>
            </div>
          </template>
          <template #description>
            十二宫位如同人生的十二重天，涵盖命运的方方面面。透过宫位的玄机，洞察人生的真谛。
          </template>
        </a-card-meta>
      </a-card>

      <a-card class="feature-card" @click="router.push('/documentation')">
        <template #cover>
          <div class="card-cover bg-gradient-to-r from-red-500 to-orange-500">
            <BookOutlined class="text-4xl text-white" />
          </div>
        </template>
        <a-card-meta title="星耀文档">
          <template #title>
            <div class="card-title">
              <span>星耀文档</span>
              <span class="card-subtitle">智慧的传承之书</span>
            </div>
          </template>
          <template #description>
            集古今智慧于一体，融理论实践于一炉。这是一部紫微斗数的知识宝典，更是命理探索的指南针。
          </template>
        </a-card-meta>
      </a-card>
    </div>

    <div class="features-section">
      <h2 class="section-title">特色功能</h2>
      <div class="features-grid">
        <div class="feature-item">
          <h3>易用性</h3>
          <p>精心设计的知识体系，清晰的脉络结构，让您轻松掌握紫微斗数的精髓要义。</p>
        </div>
        <div class="feature-item">
          <h3>完整性</h3>
          <p>融会贯通古今智慧，从入门到精通，构建完整的紫微斗数知识体系。</p>
        </div>
        <div class="feature-item">
          <h3>专业性</h3>
          <p>严谨考证，深入研究，为您呈现最权威、最专业的紫微斗数解析。</p>
        </div>
      </div>
    </div>

    <div class="contact-section">
      <h2 class="section-title">联系方式</h2>
      <div class="contact-info">
        <div class="contact-item">
          <WechatOutlined class="contact-icon" />
          <p>微信：wh18329723317</p>
        </div>
      </div>
    </div>

    <div class="quick-links">
      <h2 class="section-title">快速导航</h2>
      <div class="links-grid">
        <template v-for="star in mainStars" :key="star.id">
          <a-button type="link" @click="router.push(`/fourteen-stars/${star.id}`)">
            {{ star.name }}
          </a-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { StarOutlined, ApartmentOutlined, BookOutlined, WechatOutlined } from '@ant-design/icons-vue'
import { getAllMajorStars } from '../data/majorStars'

const router = useRouter()
const mainStars = getAllMajorStars()
</script>

<style scoped>
.home {
  @apply p-6;
}

.hero-section {
  @apply text-center mb-12;
}

.title {
  @apply text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent;
}

.subtitle {
  @apply text-lg text-gray-600 dark:text-gray-400;
}

.description {
  @apply text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-4;
}

.card-title {
  @apply flex flex-col;
}

.card-subtitle {
  @apply text-sm text-gray-500 dark:text-gray-400 mt-1;
}

.section-title {
  @apply text-2xl font-bold mb-6 text-center;
}

.features-section {
  @apply max-w-6xl mx-auto mb-12;
}

.features-grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-8;
}

.contact-section {
  @apply max-w-4xl mx-auto mb-12;
}

.contact-info {
  @apply flex justify-center items-center;
}

.contact-item {
  @apply flex items-center gap-2 text-lg;
}

.contact-icon {
  @apply text-2xl text-green-500;
}

.feature-item {
  @apply text-center p-6;
}

.feature-item h3 {
  @apply text-xl font-bold mb-4;
}

.feature-item p {
  @apply text-gray-600 dark:text-gray-400;
}

.content-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12;
}

.feature-card {
  @apply cursor-pointer transition-transform hover:scale-105;
}

.card-cover {
  @apply h-32 flex items-center justify-center;
}

.quick-links {
  @apply max-w-4xl mx-auto;
}

.links-grid {
  @apply grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2;
}

:deep(.dark-theme) {
  .subtitle {
    @apply text-gray-400;
  }
  
  .feature-card {
    @apply bg-gray-800 border-gray-700;
  }
  
  .ant-card-meta-title {
    @apply text-gray-200;
  }
  
  .ant-card-meta-description {
    @apply text-gray-400;
  }
}
</style> 