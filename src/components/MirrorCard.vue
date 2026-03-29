<script setup lang="ts">
import { computed } from 'vue'
import type { MirrorEntry } from '../types/mirror'

const props = defineProps<{
  item: MirrorEntry
  domain: string
}>()

const emit = defineEmits<{
  openExternal: [url: string]
}>()

const mirrorUrl = computed(() => `https://${props.domain}/${props.item.path}`)
const sourceHost = computed(() => {
  try {
    return new URL(props.item.url).host
  }
  catch {
    return props.item.url
  }
})
</script>

<template>
  <article class="mirror-card">
    <div class="card-top">
      <h3 class="card-path">{{ item.path }}</h3>
      <span class="card-badge">
        <span class="badge-dot" />
        Active
      </span>
    </div>

    <div class="card-route">
      <button type="button" class="route-node source" @click="emit('openExternal', item.url)">
        {{ sourceHost }}
      </button>
      <svg class="route-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <span class="route-node mirror">{{ domain }}</span>
    </div>

    <div class="card-bottom">
      <span class="sync-label">每 {{ item.pollingInterval }} 分钟同步</span>
      <button type="button" class="visit-btn" @click="emit('openExternal', mirrorUrl)">
        访问镜像
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </article>
</template>

<style scoped>
.mirror-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--shadow-sm);
  transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
}

.mirror-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--border-strong);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-path {
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  word-break: break-all;
  line-height: 1.4;
}

.card-badge {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(68, 213, 124, 0.1);
  color: #44d57c;
  font-size: 0.78rem;
  font-weight: 500;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #44d57c;
  box-shadow: 0 0 8px rgba(68, 213, 124, 0.6);
}

.card-route {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--surface-soft);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.route-node {
  font-size: 0.88rem;
  color: var(--text-secondary);
  min-width: 0;
  word-break: break-all;
}

.route-node.source {
  color: var(--accent-primary);
  font-weight: 500;
  cursor: pointer;
  transition: opacity 180ms;
}

.route-node.source:hover {
  opacity: 0.7;
}

.route-arrow {
  flex-shrink: 0;
  color: var(--text-tertiary);
}

.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.sync-label {
  color: var(--text-tertiary);
  font-size: 0.84rem;
}

.visit-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  font-size: 0.88rem;
  font-weight: 600;
  transition: transform 180ms, opacity 180ms;
}

.visit-btn:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

@media (max-width: 640px) {
  .card-route {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .route-arrow {
    transform: rotate(90deg);
    align-self: center;
  }
}
</style>
