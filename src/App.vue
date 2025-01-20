<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  HomeOutlined,
  InfoCircleOutlined,
  ApartmentOutlined,
  StarOutlined,
  SearchOutlined,
  BulbOutlined,
  WechatOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const selectedKeys = ref(['home'])
const searchValue = ref('')
const showSearch = ref(false)

// 遮罩层控制
const showMask = ref(true)
const password = ref('')

// 更新主题配置
const themes = [
  { 
    name: '默认紫', 
    primary: '#6366f1', 
    secondary: '#8b5cf6',
    type: 'light'
  },
  { 
    name: '沉稳蓝', 
    primary: '#2563eb', 
    secondary: '#3b82f6',
    type: 'light'
  },
  { 
    name: '典雅绿', 
    primary: '#059669', 
    secondary: '#10b981',
    type: 'light'
  },
  { 
    name: '东方红', 
    primary: '#dc2626', 
    secondary: '#ef4444',
    type: 'light'
  },
  { 
    name: '暗夜', 
    primary: '#1e293b', 
    secondary: '#334155',
    type: 'dark',
    textColor: '#e2e8f0',
    bgColor: '#0f172a',
    contentBg: '#1e293b',
    borderColor: '#334155'
  },
  { 
    name: '命令行', 
    primary: '#22c55e', 
    secondary: '#16a34a',
    type: 'dark',
    textColor: '#22c55e',
    bgColor: '#000000',
    contentBg: '#111111',
    borderColor: '#222222',
    fontFamily: '"Fira Code", monospace'
  }
]

const currentTheme = ref(themes[0])

// 更新主题切换函数
const changeTheme = (theme) => {
  currentTheme.value = theme
  // 基础主题色
  document.documentElement.style.setProperty('--primary-color', theme.primary)
  document.documentElement.style.setProperty('--secondary-color', theme.secondary)
  document.documentElement.style.setProperty('--theme-gradient', 
    `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`)
  
  // 暗色主题特殊处理
  if (theme.type === 'dark') {
    document.documentElement.style.setProperty('--text-color', theme.textColor)
    document.documentElement.style.setProperty('--bg-color', theme.bgColor)
    document.documentElement.style.setProperty('--content-bg', theme.contentBg)
    document.documentElement.style.setProperty('--border-color', theme.borderColor)
    document.body.classList.add('dark-theme')
    if (theme.fontFamily) {
      document.body.style.fontFamily = theme.fontFamily
    }
  } else {
    document.documentElement.style.setProperty('--text-color', '#000000')
    document.documentElement.style.setProperty('--bg-color', '#ffffff')
    document.documentElement.style.setProperty('--content-bg', '#ffffff')
    document.documentElement.style.setProperty('--border-color', '#f0f0f0')
    document.body.classList.remove('dark-theme')
    document.body.style.fontFamily = ''
  }
}

// 初始化主题
onMounted(() => {
  changeTheme(currentTheme.value)
})

// 搜索配置
const searchOptions = [
  { title: '紫微星', link: '/fourteen-stars#ziwei' },
  { title: '天机星', link: '/fourteen-stars#tianji' },
  { title: '命宫', link: '/twelve-houses#minggong' },
  { title: '财帛宫', link: '/twelve-houses#caibo' },
  // 可以继续添加更多搜索选项
]

const filteredOptions = computed(() => {
  return searchOptions.filter(option => 
    option.title.toLowerCase().includes(searchValue.value.toLowerCase())
  )
})

const onSearch = (option) => {
  router.push(option.link)
  showSearch.value = false
  searchValue.value = ''
}

// 验证密码
const verifyPassword = () => {
  if (password.value === '123456') {
    showMask.value = false
    // 可选：将验证状态保存到 localStorage
    localStorage.setItem('ziweiVerified', 'true')
  } else {
    // 密码错误提示
    window.$message.error('密码错误，请联系管理员获取正确密码')
  }
}

// 检查是否已验证
if (localStorage.getItem('ziweiVerified') === 'true') {
  showMask.value = false
}

// 移动端菜单控制
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.classList.toggle('menu-open', isMenuOpen.value)
}

// 路由变化时关闭菜单
router.afterEach(() => {
  isMenuOpen.value = false
  document.body.classList.remove('menu-open')
})
</script>

<template>
  <div class="app min-h-screen flex">
    <!-- 密码验证遮罩层 -->
    <div v-if="showMask" class="mask-overlay">
      <div class="mask-content">
        <h2 class="mask-title text-2xl md:text-3xl">欢迎访问紫微星耀篇</h2>
        <p class="mask-description">请输入访问密码</p>
        <p class="mask-contact">
          <WechatOutlined class="contact-icon" />
          <span>获取密码请添加微信：wh18329723317</span>
        </p>
        <div class="password-input flex-col md:flex-row gap-4 md:gap-2">
          <a-input-password
            v-model:value="password"
            placeholder="请输入密码"
            @pressEnter="verifyPassword"
          />
          <a-button type="primary" @click="verifyPassword">
            确认
          </a-button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单按钮 -->
    <button 
      class="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md"
      @click="toggleMenu"
    >
      <MenuOutlined v-if="!isMenuOpen" class="text-xl" />
      <CloseOutlined v-else class="text-xl" />
    </button>

    <!-- 侧边菜单 -->
    <div 
      :class="[
        'transition-transform duration-300 ease-in-out',
        'fixed md:static left-0 top-0 h-full z-30 overflow-y-auto',
        'w-64 bg-gray-50 border-r border-gray-200 p-4',
        isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <nav class="space-y-2">
        <router-link to="/" class="nav-item">
          <span>首页</span>
        </router-link>
        <router-link to="/fourteen-stars" class="nav-item">
          <span>十四主星</span>
        </router-link>
        <router-link to="/minor-stars" class="nav-item">
          <span>十四辅星</span>
        </router-link>
        <router-link to="/twelve-houses" class="nav-item">
          <span>十二宫位</span>
        </router-link>
        <router-link to="/documentation" class="nav-item">
          <span>星耀文档</span>
        </router-link>
      </nav>
    </div>

    <!-- 主内容区 -->
    <div class="flex-1 p-4 md:p-8 bg-gray-100 md:ml-0 overflow-y-auto">
      <router-view></router-view>
    </div>

    <!-- 移动端菜单遮罩 -->
    <div 
      v-if="isMenuOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
      @click="toggleMenu"
    ></div>
  </div>
</template>

<style scoped>
.nav-item {
  @apply block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors;
}

.router-link-active {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

/* 暗色主题适配 */
:deep(.dark-theme) {
  @apply bg-gray-900 text-gray-100;
}

:deep(.dark-theme) .nav-item {
  @apply text-gray-300 hover:bg-gray-700;
}

:deep(.dark-theme) .router-link-active {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

:deep(.dark-theme) .bg-gray-50 {
  @apply bg-gray-800;
}

:deep(.dark-theme) .bg-gray-100 {
  @apply bg-gray-900;
}

:deep(.dark-theme) .border-gray-200 {
  @apply border-gray-700;
}

/* 遮罩层样式 */
.mask-overlay {
  @apply fixed inset-0 bg-black bg-opacity-80 z-50
         flex items-center justify-center;
}

.mask-content {
  @apply bg-white dark:bg-gray-800 rounded-lg p-8
         max-w-md w-full mx-4 text-center;
}

.mask-title {
  @apply text-2xl font-bold mb-4
         text-gray-800 dark:text-gray-200;
}

.mask-description {
  @apply text-gray-600 dark:text-gray-400 mb-6;
}

.mask-contact {
  @apply flex items-center justify-center gap-2 mb-6
         text-gray-700 dark:text-gray-300;
}

.contact-icon {
  @apply text-2xl text-green-500;
}

.password-input {
  @apply flex gap-2;
}

:deep(.ant-input-affix-wrapper) {
  @apply flex-1;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .app {
    padding-top: 1rem;
  }
  
  .nav-item {
    @apply px-3 py-3;
  }

  .mask-content {
    @apply mx-4 p-4 md:p-8;
  }

  .password-input {
    @apply w-full;
  }

  :deep(.ant-input-affix-wrapper) {
    @apply w-full;
  }

  :deep(.ant-btn) {
    @apply w-full md:w-auto;
  }
}

/* 防止页面滚动当菜单打开时 */
:deep(body.menu-open) {
  @apply overflow-hidden;
}
</style>
