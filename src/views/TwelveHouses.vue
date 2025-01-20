<template>
  <div class="twelve-houses">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">紫微斗数宫位系统</h1>
      <div class="text-gray-600 leading-relaxed">
        宫又叫「垣」，是指紫微斗数星盘上周围按照地支排列出来的十二个方格。「宫」和「位」其实是两个概念，其中「宫」是一个绝对概念，而「位」是一个相对概念。
      </div>
    </div>

    <!-- 宫位图表 -->
    <div class="palace-chart mb-8 bg-white p-6 rounded-lg shadow-sm relative">
      <!-- 添加颜色图例 -->
      <div class="absolute top-4 right-4 flex flex-col gap-2 bg-white/80 p-3 rounded-lg shadow-sm">
        <div class="text-sm font-bold mb-1">五行属性</div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-green-200"></div>
          <span class="text-sm">木</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-red-200"></div>
          <span class="text-sm">火</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-yellow-200"></div>
          <span class="text-sm">土</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-gray-200"></div>
          <span class="text-sm">金</span>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 rounded bg-blue-200"></div>
          <span class="text-sm">水</span>
        </div>
      </div>

      <!-- 原有的宫位格子 -->
      <div class="grid grid-cols-4 gap-4 text-center">
        <div class="palace-cell fire">巳 田宅</div>
        <div class="palace-cell fire">午 官禄</div>
        <div class="palace-cell earth">未 仆役</div>
        <div class="palace-cell metal">申 迁移</div>
        <div class="palace-cell earth">辰 福德</div>
        <div class="palace-cell center-palace" style="grid-column: span 2; grid-row: span 2;">
          中宫
        </div>
        <div class="palace-cell metal">酉 疾厄</div>
        <div class="palace-cell wood">卯 父母</div>
        <div class="palace-cell earth">戌 财帛</div>
        <div class="palace-cell wood">寅 命宫</div>
        <div class="palace-cell earth">丑 兄弟</div>
        <div class="palace-cell water">子 夫妻</div>
        <div class="palace-cell water">亥 子女</div>
      </div>
    </div>

    <!-- 十二宫位详解 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="palace in palaces" :key="palace.name" class="palace-card">
        <div :id="palace.id" class="scroll-mt-20">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <div class="w-1 h-6 bg-purple-600 mr-3"></div>
            {{ palace.name }}
          </h2>
          <div class="text-gray-600 leading-relaxed" v-html="palace.description"></div>
        </div>
      </div>
    </div>

    <!-- 特殊宫位 -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-6">特殊宫位</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="special in specialPalaces" :key="special.name" class="special-palace-card">
          <h3 class="text-lg font-bold mb-3">{{ special.name }}</h3>
          <div class="text-gray-600" v-html="special.description"></div>
        </div>
      </div>
    </div>

    <!-- 宫位分类 -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-6">宫位的分类</h2>
      <div class="space-y-6">
        <div v-for="category in categories" :key="category.name">
          <h3 class="text-xl font-bold mb-4">{{ category.name }}</h3>
          <div class="text-gray-600" v-html="category.description"></div>
        </div>
      </div>
    </div>

    <!-- 宫位五行关系图 -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-6">宫位五行属性图</h2>
      <div class="palace-relations-chart bg-white p-6 rounded-lg shadow-sm">
        <div class="grid grid-cols-4 gap-4">
          <!-- 第一行 -->
          <div class="palace-cell fire">
            <div class="text-sm">巳</div>
            <div class="font-bold">田宅宫</div>
            <div class="text-xs text-red-600">火</div>
          </div>
          <div class="palace-cell fire">
            <div class="text-sm">午</div>
            <div class="font-bold">官禄宫</div>
            <div class="text-xs text-red-600">火</div>
          </div>
          <div class="palace-cell earth">
            <div class="text-sm">未</div>
            <div class="font-bold">仆役宫</div>
            <div class="text-xs text-yellow-600">土</div>
          </div>
          <div class="palace-cell metal">
            <div class="text-sm">申</div>
            <div class="font-bold">迁移宫</div>
            <div class="text-xs text-gray-600">金</div>
          </div>

          <!-- 第二行 -->
          <div class="palace-cell earth">
            <div class="text-sm">辰</div>
            <div class="font-bold">福德宫</div>
            <div class="text-xs text-yellow-600">土</div>
          </div>
          <div class="palace-cell center-palace" style="grid-column: span 2; grid-row: span 2;">
            <div class="text-lg font-bold">中宫</div>
            <div class="text-sm text-yellow-600">土</div>
          </div>
          <div class="palace-cell metal">
            <div class="text-sm">酉</div>
            <div class="font-bold">疾厄宫</div>
            <div class="text-xs text-gray-600">金</div>
          </div>

          <!-- 第三行 -->
          <div class="palace-cell wood">
            <div class="text-sm">卯</div>
            <div class="font-bold">父母宫</div>
            <div class="text-xs text-green-600">木</div>
          </div>
          <div class="palace-cell earth">
            <div class="text-sm">戌</div>
            <div class="font-bold">财帛宫</div>
            <div class="text-xs text-yellow-600">土</div>
          </div>

          <!-- 第四行 -->
          <div class="palace-cell wood">
            <div class="text-sm">寅</div>
            <div class="font-bold">命宫</div>
            <div class="text-xs text-green-600">木</div>
          </div>
          <div class="palace-cell earth">
            <div class="text-sm">丑</div>
            <div class="font-bold">兄弟宫</div>
            <div class="text-xs text-yellow-600">土</div>
          </div>
          <div class="palace-cell water">
            <div class="text-sm">子</div>
            <div class="font-bold">夫妻宫</div>
            <div class="text-xs text-blue-600">水</div>
          </div>
          <div class="palace-cell water">
            <div class="text-sm">亥</div>
            <div class="font-bold">子女宫</div>
            <div class="text-xs text-blue-600">水</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 五行生克关系说明 -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-6">五行生克关系</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="relation in wuxingRelations.relations" 
             :key="relation.type" 
             class="wuxing-card">
          <h3 class="text-lg font-bold mb-3">{{ relation.type }}</h3>
          <p class="text-gray-600">{{ relation.content }}</p>
        </div>
      </div>
    </div>

    <!-- 地支关系说明 -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-6">地支关系</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="relation in earthBranchRelations" 
             :key="relation.type" 
             class="relation-card">
          <h3 class="text-lg font-bold mb-3">{{ relation.type }}</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="(pair, index) in relation.pairs || relation.groups" 
                  :key="index"
                  class="px-3 py-1 bg-gray-100 rounded">
              {{ pair }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 在地支关系说明之前添加地支关系图 -->
    <div class="mt-12">
      <h2 class="text-2xl font-bold mb-6">地支关系图</h2>
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <EarthlyBranchesChart :size="400" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EarthlyBranchesChart from '../components/EarthlyBranchesChart.vue'

const palaces = [
  {
    id: 'minggong',
    name: '命宫',
    earthBranch: '寅',
    element: '木',
    description: `命宫位于寅宫，五行属木。命宫是决定星盘主人属性的宫位，就类似于游戏中的职业，它显示了你的个性偏向。但是，人的性格是立体的，
    命宫的个性只能说是星盘主人的「本质」。大家肯定听说过「性格决定命运」这句话，其实决定命运的从来都不是性格，而是「认知」。同一个类型性格的人，
    会因为自身认知的不同，而对同一件事情产生完全不同的想法。命宫也主管一个人的精神状态、外貌、个性特征等。`
  },
  {
    id: 'xiongdi',
    name: '兄弟宫',
    earthBranch: '丑',
    element: '土',
    description: `兄弟宫位于丑宫，五行属土。兄弟宫主要看的是星盘主人和兄弟姊妹之间的相处模式。其次，在区分「父」和「母」的时候，也看和「母亲」的相处模式。
    兄弟宫是星盘主人的「兄弟宫」，但同时，它也是星盘主人「父母宫」的「夫妻位」。在传统紫微斗数解盘时，看财运也会去看「兄弟宫」，因为兄弟宫是「财帛宫」的「田宅位」，
    也就是财帛流动的宫位。此外，兄弟宫还主管人际关系、社交能力等。`
  },
  {
    id: 'fuqi',
    name: '夫妻宫',
    description: `夫妻宫主要看的是星盘主人的婚姻状况、配偶特质以及感情生活。它不仅反映婚姻关系的质量，也反映了对待感情的态度和处理方式。
    夫妻宫的星曜组合能够显示出婚姻的和谐程度、配偶的性格特点，以及感情生活中可能遇到的机遇与挑战。此外，夫妻宫还与人际关系中的亲密关系、
    合作伙伴关系等有关。`
  },
  {
    id: 'zinv',
    name: '子女宫',
    description: `子女宫不仅反映子女的数量和性别，更重要的是反映与子女的关系质量和教育方式。同时也反映一个人的创造力和生育能力。
    子女宫的星曜组合能显示出子女的性格特征、成就潜力，以及亲子关系的互动模式。此外，子女宫还与个人的艺术创造力、
    事业上的开创性有着密切关系。`
  },
  {
    id: 'caibu',
    name: '财帛宫',
    description: `财帛宫主管一个人的财运、理财能力和价值观。它不仅显示赚钱能力，还反映了理财方式和金钱观念。财帛宫的星曜组合
    能显示出财运的强弱、来源，以及理财的方式是否得当。同时也反映了一个人对物质的追求程度和处理金钱的态度。此外，
    财帛宫还与个人的自我价值认同有关。`
  },
  {
    id: 'jibing',
    name: '疾厄宫',
    description: `疾厄宫主要反映一个人的健康状况、疾病倾向以及面对困境的态度。它显示了可能出现的健康问题，以及如何预防和调养。
    疾厄宫的星曜组合能显示出身体的强弱部位，以及在人生遇到困境时的应对能力。同时也反映了心理健康状况和压力承受能力。`
  },
  {
    id: 'qianyi',
    name: '迁移宫',
    description: `迁移宫主管人生旅程中的变动，包括居所变迁、工作变动、出国机会等。它反映了一个人的流动性和适应能力。
    迁移宫的星曜组合能显示出变动的频率、性质和结果。同时也反映了对新环境的适应能力和远行的机会。此外，
    迁移宫还与人生的重大转折点有关。`
  },
  {
    id: 'puyi',
    name: '仆役宫',
    description: `仆役宫在现代解释中主要反映工作环境中的人际关系、下属或同事关系。它显示了一个人在团队中的处事方式和领导能力。
    仆役宫的星曜组合能显示出与同事的相处模式，以及在职场中的人际关系处理能力。同时也反映了管理能力和团队协作能力。`
  },
  {
    id: 'guanlu',
    name: '官禄宫',
    description: `官禄宫主管事业发展、职业成就和社会地位。它反映了一个人的事业方向、发展潜力和成就高度。官禄宫的星曜组合
    能显示出事业发展的顺逆、职业选择的倾向，以及在职场中的表现和成就。同时也反映了社会地位和名誉。此外，
    官禄宫还与权力和责任感有关。`
  },
  {
    id: 'tianzhai',
    name: '田宅宫',
    description: `田宅宫主管房产、居所环境以及对生活环境的需求。它反映了一个人的居住条件、不动产投资等方面的情况。
    田宅宫的星曜组合能显示出置业的机会、居所的舒适度，以及在不动产方面的投资眼光。同时也反映了对生活品质的追求
    和家居环境的重视程度。`
  },
  {
    id: 'fumu',
    name: '父母宫',
    description: `父母宫主要反映与父母的关系、家庭教育以及长辈关系。它显示了成长环境的影响和家庭教育的特点。
    父母宫的星曜组合能显示出与父母的感情深浅、相处模式，以及家庭氛围的特点。同时也反映了一个人的家庭观念
    和对待长辈的态度。此外，父母宫还与个人的道德观念形成有关。`
  },
  {
    id: 'fude',
    name: '福德宫',
    description: `福德宫主管一个人的福报、心性修养以及精神生活。它反映了内在的快乐程度和精神追求。福德宫的星曜组合
    能显示出一个人的福报大小、生活质量，以及精神层面的追求和满足感。同时也反映了道德修养和价值观念。此外，
    福德宫还与休闲生活、兴趣爱好有关。`
  }
]

const specialPalaces = [
  {
    name: '身宫',
    description: `身宫是星盘主人个性的「变化趋势」，它会对「命宫」的特质有一定影响力。命宫的特质属于「先天特质」，
    而「身宫」的特质就是「后天特质」。`
  },
  {
    name: '暗合宫',
    description: `暗合宫是由十二地支的地支六合衍生而来。其实大家不需要背诵这个地支六合，只需要把紫微斗数星盘从中间纵向分开，
    左右镜像宫位即是暗合宫位。`
  },
  {
    name: '来因宫',
    description: `来因宫顾名思义就是看星盘主人「为何而来」。来因宫可以作为选择从事行业时候的参考。`
  }
]

const categories = [
  {
    name: '按地支分类',
    description: `每个宫位有着自己的独有属性，这些属性可以给星盘主人属性进行一些额外的加成。而分类的原理，来源于五行。
    在五行中，「⛰️土」是所有物质的「归宿」。所以，「🪙金」、「🪵木」、「🌊水」、「🔥火」最终都会归于「⛰️土」。`
  },
  {
    name: '五行属性',
    description: `木：寅卯（东方）<br>
    火：巳午（南方）<br>
    土：辰戌丑未（中央）<br>
    金：申酉（西方）<br>
    水：亥子（北方）<br><br>
    这些属性影响着宫位的基本特质和相互关系。`
  },
  {
    name: '阴阳属性',
    description: `子、寅、辰、午、申、戌为阳<br>
    丑、卯、巳、未、酉、亥为阴<br><br>
    阴阳属性影响着宫位的性质和能量特点。`
  }
]

// 五行关系数据
const wuxingRelations = {
  title: '五行生克关系',
  relations: [
    { 
      type: '相生',
      content: '木生火、火生土、土生金、金生水、水生木',
      description: '相生关系是五行之间互相滋养、支持的关系'
    },
    { 
      type: '相克',
      content: '木克土、土克水、水克火、火克金、金克木',
      description: '相克关系是五行之间互相制约、克制的关系'
    },
    { 
      type: '相泄',
      content: '木泄火、火泄土、土泄金、金泄水、水泄木',
      description: '相泄关系表示五行之间的能量流动和转化'
    }
  ]
}

// 地支关系数据
const earthBranchRelations = [
  { 
    type: '六合',
    pairs: ['子丑', '寅亥', '卯戌', '辰酉', '巳申', '午未'],
    description: '六合关系代表相互配合、协调的关系'
  },
  { 
    type: '三合',
    groups: ['寅午戌', '亥卯未', '巳酉丑', '申子辰'],
    description: '三合关系形成局势，代表更强的相互支持关系'
  },
  { 
    type: '相冲',
    pairs: ['子午', '丑未', '寅申', '卯酉', '辰戌', '巳亥'],
    description: '相冲关系代表对立、冲突的关系'
  },
  { 
    type: '相害',
    pairs: ['子未', '丑午', '寅巳', '卯辰', '申亥', '酉戌'],
    description: '相害关系代表互相妨碍、损害的关系'
  }
]

// 工具函数
const getElementClass = (element) => {
  const map = {
    '木': 'element-wood',
    '火': 'element-fire',
    '土': 'element-earth',
    '金': 'element-metal',
    '水': 'element-water'
  }
  return map[element] || ''
}
</script>

<style scoped>
.palace-cell {
  @apply border p-4 rounded bg-gray-50 flex flex-col items-center justify-center gap-1;
  min-height: 80px;
}

.center-palace {
  @apply bg-purple-50 border-purple-200 font-bold;
}

.palace-card {
  @apply bg-white p-6 rounded-lg shadow-sm;
}

.special-palace-card {
  @apply bg-white p-6 rounded-lg shadow-sm;
}

/* 暗色主题适配 */
:deep(.dark-theme) .palace-cell {
  @apply bg-gray-800 border-gray-700;
}

:deep(.dark-theme) .center-palace {
  @apply bg-purple-900/20 border-purple-800;
}

:deep(.dark-theme) .palace-card,
:deep(.dark-theme) .special-palace-card {
  @apply bg-gray-800;
}

/* 五行颜色样式 */
.element-wood { @apply text-green-600; }
.element-fire { @apply text-red-600; }
.element-earth { @apply text-yellow-600; }
.element-metal { @apply text-gray-600; }
.element-water { @apply text-blue-600; }

.wuxing-card,
.relation-card {
  @apply bg-white p-6 rounded-lg shadow-sm;
}

/* 暗色主题适配 */
:deep(.dark-theme) .wuxing-card,
:deep(.dark-theme) .relation-card {
  @apply bg-gray-800;
}

:deep(.dark-theme) .relation-card span {
  @apply bg-gray-700;
}

/* 添加新的样式 */
.description-text {
  @apply text-gray-600 leading-relaxed;
}

.relation-description {
  @apply mt-2 text-sm text-gray-500;
}

/* 暗色主题适配 */
:deep(.dark-theme) .description-text {
  @apply text-gray-400;
}

:deep(.dark-theme) .relation-description {
  @apply text-gray-500;
}

/* 五行分组样式 */
.five-element-group {
  @apply p-4 rounded-lg border border-gray-100;
}

/* 暗色主题适配 */
:deep(.dark-theme) .five-element-group {
  @apply border-gray-700;
}

/* 五行背景色 */
.palace-cell.wood {
  @apply bg-green-200 border-green-300;
}

.palace-cell.fire {
  @apply bg-red-200 border-red-300;
}

.palace-cell.earth {
  @apply bg-yellow-200 border-yellow-300;
}

.palace-cell.metal {
  @apply bg-gray-200 border-gray-300;
}

.palace-cell.water {
  @apply bg-blue-200 border-blue-300;
}

/* 暗色主题下的五行背景色 */
:deep(.dark-theme) .palace-cell.wood {
  @apply bg-green-900/40 border-green-700;
}

:deep(.dark-theme) .palace-cell.fire {
  @apply bg-red-900/40 border-red-700;
}

:deep(.dark-theme) .palace-cell.earth {
  @apply bg-yellow-900/40 border-yellow-700;
}

:deep(.dark-theme) .palace-cell.metal {
  @apply bg-gray-900/40 border-gray-700;
}

:deep(.dark-theme) .palace-cell.water {
  @apply bg-blue-900/40 border-blue-700;
}

/* 暗色主题下的图例样式 */
:deep(.dark-theme) .palace-chart .absolute {
  @apply bg-gray-800/80;
}
</style> 