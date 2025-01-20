<template>
  <div class="relationship-chart">
    <svg class="w-full h-full" viewBox="0 0 800 800">
      <!-- 生克关系线 -->
      <g class="relationships">
        <path v-for="line in relationshipLines"
              :key="line.id"
              :d="line.path"
              :class="line.type"
              class="relationship-line" />
      </g>
      
      <!-- 宫位节点 -->
      <g class="nodes">
        <circle v-for="node in nodes"
                :key="node.id"
                :cx="node.x"
                :cy="node.y"
                :class="getElementClass(node.element)"
                class="palace-node"
                r="40" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.relationship-chart {
  width: 100%;
  height: 600px;
}

.relationship-line {
  fill: none;
  stroke-width: 2;
}

.relationship-line.sheng { @apply stroke-green-500; }
.relationship-line.ke { @apply stroke-red-500; }
.relationship-line.he { @apply stroke-blue-500; }
.relationship-line.hai { @apply stroke-yellow-500; }

.palace-node {
  stroke-width: 2;
  cursor: pointer;
  transition: all 0.3s;
}

.palace-node:hover {
  transform: scale(1.1);
}
</style> 