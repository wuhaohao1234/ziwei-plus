<template>
  <div class="documentation">
    <div class="stars-section">
      <h2 class="section-title">主星</h2>
      <div class="stars-grid">
        <a-card v-for="star in majorStars" :key="star.id" class="star-card">
          <div class="star-header">
            <h3>{{ star.name }}</h3>
            <a-tag :color="star.element === '金' ? 'gold' : 
                          star.element === '木' ? 'green' :
                          star.element === '水' ? 'blue' :
                          star.element === '火' ? 'red' :
                          star.element === '土' ? 'orange' : 'default'">
              {{ star.element }}
            </a-tag>
          </div>
          <div class="star-content">
            <p><strong>地支：</strong>{{ star.earthBranch }}</p>
            <p><strong>化气：</strong>{{ star.huaQi }}</p>
            <p><strong>职司：</strong>{{ star.duty }}</p>
            <p><strong>简述：</strong>{{ star.brief }}</p>
            <div class="star-description">
              <strong>详解：</strong>
              <p v-for="(line, index) in star.description.split('\n')" :key="index">
                {{ line.trim() }}
              </p>
            </div>
            <div v-if="star.palaceEffects" class="palace-effects">
              <strong>宫位效果：</strong>
              <a-collapse>
                <a-collapse-panel v-for="(effect, palace) in star.palaceEffects" 
                  :key="palace" 
                  :header="palace">
                  <p v-for="(line, index) in effect.split('\n')" :key="index">
                    {{ line.trim() }}
                  </p>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </div>
        </a-card>
      </div>

      <h2 class="section-title">辅星</h2>
      <div class="stars-grid">
        <a-card v-for="star in minorStars" :key="star.id" class="star-card">
          <div class="star-header">
            <h3>{{ star.name }}</h3>
            <a-tag :color="star.element === '金' ? 'gold' : 
                          star.element === '木' ? 'green' :
                          star.element === '水' ? 'blue' :
                          star.element === '火' ? 'red' :
                          star.element === '土' ? 'orange' : 'default'">
              {{ star.element }}
            </a-tag>
          </div>
          <div class="star-content">
            <p><strong>地支：</strong>{{ star.earthBranch }}</p>
            <p><strong>化气：</strong>{{ star.huaQi }}</p>
            <p><strong>职司：</strong>{{ star.duty }}</p>
            <p><strong>简述：</strong>{{ star.brief }}</p>
            <div class="star-description">
              <strong>详解：</strong>
              <p v-for="(line, index) in star.description.split('\n')" :key="index">
                {{ line.trim() }}
              </p>
            </div>
            <div v-if="star.palaceEffects" class="palace-effects">
              <strong>宫位效果：</strong>
              <a-collapse>
                <a-collapse-panel v-for="(effect, palace) in star.palaceEffects" 
                  :key="palace" 
                  :header="palace">
                  <p v-for="(line, index) in effect.split('\n')" :key="index">
                    {{ line.trim() }}
                  </p>
                </a-collapse-panel>
              </a-collapse>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAllMajorStars } from '../data/majorStars'
import { getAllMinorStars } from '../data/minorStars'

const majorStars = getAllMajorStars()
const minorStars = getAllMinorStars()
</script>

<style scoped>
.documentation {
  @apply p-6;
}

.section-title {
  @apply text-2xl font-bold mb-6 pb-2 border-b-2 border-blue-500 text-blue-500;
}

.stars-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8;
}

.star-card {
  @apply h-full;
}

.star-header {
  @apply flex justify-between items-center mb-4;
}

.star-header h3 {
  @apply text-lg font-bold m-0;
}

.star-content p {
  @apply my-2;
}

.star-description {
  @apply mt-4;
}

.palace-effects {
  @apply mt-6;
}

:deep(.ant-collapse) {
  @apply mt-3;
}

:deep(.dark-theme) {
  .star-card {
    @apply bg-gray-800 border-gray-700;
  }
  
  .section-title {
    @apply text-gray-200 border-gray-700;
  }
}
</style> 