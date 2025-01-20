<template>
  <div class="earthly-branches-chart">
    <canvas ref="canvas" :width="size" :height="size"></canvas>
    <!-- 关系类型选择器 -->
    <div class="relation-selector">
      <a-radio-group v-model:value="currentRelation" button-style="solid">
        <a-radio-button value="sixHe">六合</a-radio-button>
        <a-radio-button value="sanHe">三合</a-radio-button>
        <a-radio-button value="chong">相冲</a-radio-button>
        <a-radio-button value="hai">相害</a-radio-button>
      </a-radio-group>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 500  // 增大默认尺寸
  }
})

const canvas = ref(null)
const currentRelation = ref('sixHe')

// 十二地支数据
const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

// 关系数据
const relations = {
  sixHe: [['子', '丑'], ['寅', '亥'], ['卯', '戌'], ['辰', '酉'], ['巳', '申'], ['午', '未']],
  sanHe: [['寅', '午', '戌'], ['亥', '卯', '未'], ['巳', '酉', '丑'], ['申', '子', '辰']],
  chong: [['子', '午'], ['丑', '未'], ['寅', '申'], ['卯', '酉'], ['辰', '戌'], ['巳', '亥']],
  hai: [['子', '未'], ['丑', '午'], ['寅', '巳'], ['卯', '辰'], ['申', '亥'], ['酉', '戌']]
}

// 地支五行属性数据
const branchElements = {
  '子': { element: '水', color: '#60a5fa' }, // 更柔和的蓝色
  '丑': { element: '土', color: '#fbbf24' }, // 更暖的黄色
  '寅': { element: '木', color: '#34d399' }, // 更清新的绿色
  '卯': { element: '木', color: '#34d399' },
  '辰': { element: '土', color: '#fbbf24' },
  '巳': { element: '火', color: '#f87171' }, // 更柔和的红色
  '午': { element: '火', color: '#f87171' },
  '未': { element: '土', color: '#fbbf24' },
  '申': { element: '金', color: '#9ca3af' }, // 更柔和的灰色
  '酉': { element: '金', color: '#9ca3af' },
  '戌': { element: '土', color: '#fbbf24' },
  '亥': { element: '水', color: '#60a5fa' }
}

// 绘制函数
const draw = () => {
  const ctx = canvas.value.getContext('2d')
  const center = props.size / 2
  const radius = props.size * 0.35  // 调整圆的大小

  // 清空画布
  ctx.clearRect(0, 0, props.size, props.size)

  // 绘制装饰性圆环
  const circles = [0.95, 0.85, 0.75]
  circles.forEach(ratio => {
    ctx.beginPath()
    ctx.arc(center, center, radius * ratio, 0, Math.PI * 2)
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    ctx.stroke()
  })

  // 绘制地支和五行
  branches.forEach((branch, index) => {
    const angle = (index * Math.PI * 2) / 12 - Math.PI / 2
    const x = center + radius * 0.85 * Math.cos(angle)
    const y = center + radius * 0.85 * Math.sin(angle)

    // 绘制地支背景圆
    ctx.beginPath()
    ctx.arc(x, y, radius * 0.15, 0, Math.PI * 2)
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.15)
    gradient.addColorStop(0, branchElements[branch].color + '30')
    gradient.addColorStop(1, branchElements[branch].color + '10')
    ctx.fillStyle = gradient
    ctx.fill()

    // 绘制边框
    ctx.strokeStyle = branchElements[branch].color + '50'
    ctx.lineWidth = 2
    ctx.stroke()

    // 绘制地支文字
    ctx.font = `bold ${radius * 0.12}px "Microsoft YaHei"`
    ctx.fillStyle = branchElements[branch].color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(branch, x, y)

    // 绘制五行文字
    ctx.font = `${radius * 0.08}px "Microsoft YaHei"`
    ctx.fillText(branchElements[branch].element, x, y + radius * 0.18)
  })

  // 绘制关系线
  const currentRelations = relations[currentRelation.value]
  currentRelations.forEach(relation => {
    const points = relation.map(branch => {
      const index = branches.indexOf(branch)
      const angle = (index * Math.PI * 2) / 12 - Math.PI / 2
      return {
        x: center + radius * 0.6 * Math.cos(angle),
        y: center + radius * 0.6 * Math.sin(angle)
      }
    })

    // 设置线条样式
    ctx.strokeStyle = branchElements[relation[0]].color
    ctx.lineWidth = 2
    ctx.setLineDash([])

    if (points.length === 2) {
      // 绘制双向连线
      drawConnection(ctx, points[0], points[1])
    } else {
      // 绘制三合连线
      drawTriangleConnection(ctx, points)
    }
  })
}

// 绘制双向连线
const drawConnection = (ctx, start, end) => {
  const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y)
  gradient.addColorStop(0, ctx.strokeStyle)
  gradient.addColorStop(1, ctx.strokeStyle + '50')
  ctx.strokeStyle = gradient

  ctx.beginPath()
  ctx.moveTo(start.x, start.y)
  ctx.lineTo(end.x, end.y)
  ctx.stroke()
}

// 绘制三合连线
const drawTriangleConnection = (ctx, points) => {
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  points.forEach(point => {
    ctx.lineTo(point.x, point.y)
  })
  ctx.closePath()
  ctx.stroke()

  // 绘制中心点
  const center = {
    x: (points[0].x + points[1].x + points[2].x) / 3,
    y: (points[0].y + points[1].y + points[2].y) / 3
  }
  ctx.beginPath()
  ctx.arc(center.x, center.y, 3, 0, Math.PI * 2)
  ctx.fillStyle = ctx.strokeStyle
  ctx.fill()
}

// 监听关系类型变化
watch(currentRelation, () => {
  draw()
})

onMounted(() => {
  draw()
})
</script>

<style scoped>
.earthly-branches-chart {
  @apply relative flex flex-col items-center gap-6;
}

.relation-selector {
  @apply flex gap-2;
}

canvas {
  @apply rounded-xl bg-white shadow-sm p-8;
}

:deep(.ant-radio-button-wrapper) {
  @apply px-6 py-2 text-sm font-medium;
}

/* 暗色主题适配 */
:deep(.dark-theme) canvas {
  @apply bg-gray-900;
}
</style> 