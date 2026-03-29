<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useDark, useMediaQuery, useToggle } from '@vueuse/core'
import ExternalLinkDialog from './components/ExternalLinkDialog.vue'
import MirrorGrid from './components/MirrorGrid.vue'
import SiteFooter from './components/SiteFooter.vue'
import SiteHeader from './components/SiteHeader.vue'
import type { MirrorEntry } from './types/mirror'

const DOMAIN = 'mirror.karinjs.com'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})
const toggleDark = useToggle(isDark)
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const mirrors = ref<MirrorEntry[]>([])
const loading = ref(true)
const showDialog = ref(false)
const pendingUrl = ref('')

const totalMirrors = computed(() => mirrors.value.length)
const fastestSync = computed(() => Math.min(...mirrors.value.map(item => item.pollingInterval), 10))

const particlesOptions = computed(() => {
  const particleColor = isDark.value ? '#dce7ff' : '#2d4bcf'
  const linkColor = isDark.value ? 'rgba(220, 231, 255, 0.16)' : 'rgba(45, 75, 207, 0.10)'
  const reduceMotion = prefersReducedMotion.value

  return {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: reduceMotion ? 16 : 34, density: { enable: true, area: 1200 } },
      color: { value: particleColor },
      opacity: { value: reduceMotion ? 0.12 : 0.18, random: { enable: true, minimumValue: 0.08 } },
      size: { value: { min: 1, max: 3 } },
      links: {
        enable: !reduceMotion,
        color: linkColor,
        distance: 150,
        opacity: 0.8,
        width: 1,
      },
      move: {
        enable: !reduceMotion,
        speed: 0.45,
        direction: 'none',
        random: true,
        outModes: { default: 'out' },
      },
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: { enable: !reduceMotion, mode: 'grab' },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 160,
          links: { opacity: 0.22 },
        },
      },
    },
    detectRetina: true,
  }
})

function requestExternal(url: string) {
  pendingUrl.value = url
  showDialog.value = true
}

function confirmLeave() {
  window.open(pendingUrl.value, '_blank', 'noopener,noreferrer')
  closeDialog()
}

function closeDialog() {
  showDialog.value = false
  pendingUrl.value = ''
}

function scrollToMirrors() {
  document.getElementById('mirrors')?.scrollIntoView({
    behavior: prefersReducedMotion.value ? 'auto' : 'smooth',
    block: 'start',
  })
}

onMounted(async () => {
  try {
    const response = await fetch('/mirror.json')
    if (!response.ok)
      return

    mirrors.value = await response.json()
  }
  catch (error) {
    console.warn(error)
  }
  finally {
    window.setTimeout(() => {
      loading.value = false
    }, 180)
  }
})
</script>

<template>
  <div class="app-shell">
    <vue-particles v-if="!prefersReducedMotion" id="tsparticles" :options="particlesOptions" class="particles-bg" />
    <div class="ambient-orb orb-left" />
    <div class="ambient-orb orb-right" />
    <div class="ambient-grid" />

    <div class="content-wrap">
      <SiteHeader :is-dark="isDark" @toggle-theme="toggleDark()" @open-external="requestExternal" />

      <main class="page-content">
        <section class="hero">
          <h1 class="hero-title">
            KarinJS <span class="text-gradient">Mirror</span>
          </h1>
          <p class="hero-desc">稳定、快速、设计精良的开源镜像服务</p>
          <button class="domain-pill" type="button" @click="scrollToMirrors">
            <span class="pulse-dot" />
            <span>{{ DOMAIN }}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <p class="hero-meta">
            {{ totalMirrors }} 个镜像入口 · {{ fastestSync }} 分钟级同步
          </p>
        </section>

        <MirrorGrid :mirrors="mirrors" :loading="loading" :domain="DOMAIN" @open-external="requestExternal" />
      </main>

      <SiteFooter @open-external="requestExternal" />
    </div>

    <ExternalLinkDialog :show="showDialog" :url="pendingUrl" @confirm="confirmLeave" @cancel="closeDialog" />
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  overflow: clip;
}

.particles-bg,
.ambient-grid,
.ambient-orb {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

.particles-bg {
  z-index: 0;
}

.ambient-grid {
  z-index: 0;
  opacity: 0.5;
  background-image:
    linear-gradient(to right, rgba(130, 150, 255, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(130, 150, 255, 0.08) 1px, transparent 1px);
  background-size: 120px 120px;
  mask-image: radial-gradient(circle at center, rgba(0, 0, 0, 0.72), transparent 78%);
}

.ambient-orb {
  z-index: 0;
}

.orb-left {
  inset: -160px auto auto -120px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(110, 160, 255, 0.24), transparent 70%);
  filter: blur(18px);
}

.orb-right {
  inset: 120px -80px auto auto;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(132, 255, 214, 0.18), transparent 70%);
  filter: blur(18px);
}

.page-content {
  position: relative;
  z-index: 1;
}

.content-wrap {
  position: relative;
  z-index: 1;
  max-width: 880px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 32px);
}

/* ── Hero ── */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(80px, 16vh, 160px) 0 clamp(60px, 10vh, 120px);
  gap: 20px;
}

.hero-title {
  font-size: clamp(2.6rem, 7vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.1;
}

.text-gradient {
  background: linear-gradient(135deg, var(--accent-primary), #44d5a0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  color: var(--text-secondary);
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 36ch;
}

.domain-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  margin-top: 8px;
  border-radius: 999px;
  border: 1px solid var(--border-subtle);
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: border-color 200ms, transform 200ms, box-shadow 200ms;
}

.domain-pill:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #44d57c;
  box-shadow: 0 0 10px rgba(68, 213, 124, 0.7);
  animation: pulse 2.4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.hero-meta {
  color: var(--text-tertiary);
  font-size: 0.88rem;
  letter-spacing: 0.02em;
}

.page-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px clamp(16px, 4vw, 32px) 48px;
  display: grid;
  gap: clamp(56px, 10vw, 96px);
}

@media (max-width: 640px) {
  .page-content {
    padding-top: 34px;
    gap: 56px;
  }

  .orb-left,
  .orb-right {
    opacity: 0.6;
  }
}
</style>
