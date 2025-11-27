<script setup lang="ts">
import { ref } from 'vue'
import { useGemini } from '../../composables/useGemini'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const prompt = ref('')
const { generateResume, isGenerating, error } = useGemini()

const handleGenerate = async () => {
  const apiKey = localStorage.getItem('bina_gemini_key')
  if (!apiKey) {
    alert('Please set your Gemini API Key in Profile settings first.')
    return
  }

  if (!prompt.value.trim()) return

  await generateResume(apiKey, prompt.value)

  if (!error.value) {
    emit('close')
    prompt.value = ''
  }
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
    <div class="glass-panel modal-content">
      <div class="modal-header">
        <h3>Generate with AI</h3>
        <button @click="emit('close')" class="close-btn">×</button>
      </div>

      <div class="modal-body">
        <p class="hint">
          Describe your role, experience, and desired style. The AI will generate a full resume for
          you.
        </p>

        <textarea
          v-model="prompt"
          class="glass-input"
          rows="5"
          placeholder="e.g. I am a Senior Frontend Developer with 5 years of experience in Vue and React. I want a modern, dark-themed resume. I worked at TechCorp leading a team of 5..."
        ></textarea>

        <div v-if="error" class="error-msg">
          {{ error }}
        </div>
      </div>

      <div class="modal-footer">
        <button @click="emit('close')" class="glass-button" :disabled="isGenerating">Cancel</button>
        <button @click="handleGenerate" class="glass-button primary" :disabled="isGenerating">
          <span v-if="isGenerating">Generating...</span>
          <span v-else>Generate Resume</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  background: rgba(30, 41, 59, 0.9); /* Darker background for modal */
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.5rem;
  color: var(--text-main);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
}

.hint {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.error-msg {
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
</style>
