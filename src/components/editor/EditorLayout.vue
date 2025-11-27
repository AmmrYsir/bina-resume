<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('personal')

const tabs = [
  { id: 'personal', label: 'Personal' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'theme', label: 'Theme' },
]

import AIPromptModal from './AIPromptModal.vue'

const showAIModal = ref(false)
</script>

<template>
  <div class="editor-layout glass-panel">
    <div class="tabs-header">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      <button @click="showAIModal = true" class="glass-button sm ai-btn">✨ AI Generate</button>
    </div>

    <div class="editor-content">
      <div v-show="activeTab === 'personal'">
        <slot name="personal"></slot>
      </div>
      <div v-show="activeTab === 'summary'">
        <slot name="summary"></slot>
      </div>
      <div v-show="activeTab === 'experience'">
        <slot name="experience"></slot>
      </div>
      <div v-show="activeTab === 'education'">
        <slot name="education"></slot>
      </div>
      <div v-show="activeTab === 'skills'">
        <slot name="skills"></slot>
      </div>
      <div v-show="activeTab === 'theme'">
        <slot name="theme"></slot>
      </div>
    </div>

    <AIPromptModal :is-open="showAIModal" @close="showAIModal = false" />
  </div>
</template>

<style scoped>
.editor-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--glass-border);
  padding: 0.5rem;
  gap: 0.5rem;
}

.tabs {
  display: flex;
  overflow-x: auto;
  gap: 0.5rem;
  flex: 1;
}

.ai-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  color: white;
  white-space: nowrap;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: 600;
  border-radius: 8px;
  white-space: nowrap;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
}

.tab-btn.active {
  background: rgba(255, 255, 255, 0.2);
  color: var(--primary-color);
}

.editor-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}
</style>
