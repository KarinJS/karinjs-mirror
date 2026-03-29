<script setup lang="ts">
const GITHUB_URL = 'https://github.com/karinjs/karinjs-mirror'

defineProps<{
  isDark: boolean
}>()

const emit = defineEmits<{
  toggleTheme: []
  openExternal: [url: string]
}>()
</script>

<template>
  <header class="site-header">
    <nav class="header-nav">
      <div class="brand">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" />
          <path d="M3.5 12h17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          <path d="M12 3c2.8 2.6 4.2 5.6 4.2 9S14.8 18.4 12 21c-2.8-2.6-4.2-5.6-4.2-9S9.2 5.6 12 3Z" stroke="currentColor" stroke-width="1.6" />
        </svg>
        <span>KarinJS Mirror</span>
      </div>

      <div class="header-actions">
        <button class="icon-btn" type="button" :aria-label="isDark ? '浅色模式' : '深色模式'" @click="emit('toggleTheme')">
          <svg v-if="isDark" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3.75V2m0 20v-1.75M4.93 4.93 3.7 3.7m16.6 16.6-1.23-1.23M3.75 12H2m20 0h-1.75M4.93 19.07 3.7 20.3m16.6-16.6-1.23 1.23M12 17.25a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9 9 0 1 0 20.354 15.354Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button class="icon-btn" type="button" aria-label="GitHub" @click="emit('openExternal', GITHUB_URL)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.73.08-.73 1.22.09 1.87 1.25 1.87 1.25 1.08 1.87 2.84 1.33 3.53 1.02.11-.79.42-1.33.76-1.63-2.67-.3-5.47-1.33-5.47-5.91 0-1.3.46-2.36 1.22-3.2-.13-.3-.53-1.52.12-3.16 0 0 1-.32 3.28 1.22a11.45 11.45 0 0 1 5.98 0c2.28-1.54 3.28-1.22 3.28-1.22.65 1.64.25 2.86.12 3.16.76.84 1.22 1.9 1.22 3.2 0 4.59-2.8 5.61-5.48 5.9.43.38.82 1.12.82 2.27 0 1.64-.02 2.96-.02 3.36 0 .33.22.69.83.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12Z" /></svg>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  padding-top: 16px;
}

.header-nav {
  padding: 10px 10px 10px 20px;
  border: 1px solid var(--glass-border);
  border-radius: 999px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: var(--shadow-sm);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: -0.02em;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: var(--text-secondary);
  transition: color 180ms, background 180ms;
}

.icon-btn:hover {
  color: var(--text-primary);
  background: var(--surface-soft);
}
</style>
