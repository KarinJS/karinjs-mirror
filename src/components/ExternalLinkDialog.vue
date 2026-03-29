<script setup lang="ts">
defineProps<{
  show: boolean
  url: string
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="dialog-overlay" @click.self="emit('cancel')">
      <div class="dialog-card" v-motion :initial="{ opacity: 0, scale: 0.96, y: 20 }" :enter="{ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 240, damping: 20 } }">
        <div class="dialog-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 4h5v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M10 14 20 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <span class="dialog-kicker">External navigation</span>
        <h3>准备离开当前站点</h3>
        <p>为了保留更可控的体验，所有外部链接都会先做一次确认。小小一步，安全感大很多。</p>
        <code>{{ url }}</code>
        <div class="dialog-actions">
          <button type="button" class="secondary" @click="emit('cancel')">取消</button>
          <button type="button" class="primary" @click="emit('confirm')">继续前往</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  inset: 0;
  padding: 20px;
  display: grid;
  place-items: center;
  background: var(--overlay-bg);
  backdrop-filter: blur(10px);
  z-index: 100;
}

.dialog-card {
  width: min(100%, 460px);
  padding: 32px;
  border-radius: 30px;
  border: 1px solid var(--border-strong);
  background: var(--surface-elevated);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dialog-icon {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: rgba(92, 112, 255, 0.16);
  color: var(--accent-primary);
}

.dialog-kicker {
  color: var(--text-tertiary);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.dialog-card h3 {
  font-size: 1.6rem;
  letter-spacing: -0.04em;
  color: var(--text-primary);
}

.dialog-card p,
.dialog-card code {
  color: var(--text-secondary);
  line-height: 1.7;
}

.dialog-card code {
  padding: 14px 16px;
  border-radius: 18px;
  background: var(--surface-soft);
  border: 1px solid var(--border-subtle);
  word-break: break-all;
}

.dialog-actions {
  display: flex;
  gap: 12px;
}

.dialog-actions button {
  flex: 1;
  height: 46px;
  border-radius: 999px;
  font-weight: 600;
}

.secondary {
  background: var(--surface-soft);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
}

.primary {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 180ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 560px) {
  .dialog-card {
    padding: 24px;
  }

  .dialog-actions {
    flex-direction: column;
  }
}
</style>
