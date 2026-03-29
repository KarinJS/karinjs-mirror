<script setup lang="ts">
const repoUrl = 'https://github.com/karinjs/karinjs-mirror'

const emit = defineEmits<{
  openExternal: [url: string]
}>()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <span class="footer-copy">© 2026 KarinJS Project</span>
      <button class="footer-link" type="button" @click="emit('openExternal', repoUrl)">
        GitHub
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: 1;
  padding-bottom: 32px;
}

.footer-inner {
  padding: 18px 0;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.footer-copy {
  color: var(--text-tertiary);
  font-size: 0.84rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--text-tertiary);
  font-size: 0.84rem;
  transition: color 180ms;
}

.footer-link:hover {
  color: var(--text-primary);
}
</style>
