<script setup lang="ts">
import MirrorCard from './MirrorCard.vue'
import type { MirrorEntry } from '../types/mirror'

const props = defineProps<{
  mirrors: MirrorEntry[]
  loading: boolean
  domain: string
}>()

const emit = defineEmits<{
  openExternal: [url: string]
}>()

const skeletons = Array.from({ length: 2 }, (_, index) => index)
</script>

<template>
  <section id="mirrors" class="mirror-section">
    <h2 class="section-title">镜像列表</h2>

    <div v-if="loading" class="mirror-list" aria-live="polite" aria-busy="true">
      <div v-for="item in skeletons" :key="item" class="skeleton-card">
        <span class="skeleton-line short" />
        <span class="skeleton-line full" />
        <span class="skeleton-line medium" />
      </div>
    </div>

    <div v-else-if="props.mirrors.length" class="mirror-list">
      <MirrorCard
        v-for="mirror in props.mirrors"
        :key="mirror.path"
        :item="mirror"
        :domain="props.domain"
        @open-external="emit('openExternal', $event)"
      />
    </div>

    <div v-else class="empty-state">
      <p>暂无可用镜像</p>
    </div>
  </section>
</template>

<style scoped>
.mirror-section {
  display: grid;
  gap: 20px;
  padding-bottom: clamp(60px, 10vh, 100px);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-tertiary);
  letter-spacing: -0.01em;
}

.mirror-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.skeleton-card {
  padding: 24px;
  border-radius: 20px;
  border: 1px solid var(--border-subtle);
  background: var(--surface-soft);
  display: grid;
  gap: 14px;
}

.skeleton-line {
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.14), rgba(255,255,255,0.03));
  background-size: 200% 100%;
  animation: shimmer 1.8s linear infinite;
}

:global(html:not(.dark)) .skeleton-line {
  background: linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.08), rgba(0,0,0,0.04));
  background-size: 200% 100%;
}

.short { width: 30%; }
.medium { width: 55%; }
.full { width: 100%; }

.empty-state {
  padding: 40px 0;
  text-align: center;
  color: var(--text-tertiary);
}

@keyframes shimmer {
  to { background-position: -200% 0; }
}
</style>
