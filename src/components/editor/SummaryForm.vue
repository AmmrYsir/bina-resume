<script setup lang="ts">
import { useResume } from '../../composables/useResume'

const { resume, updateSummary } = useResume()
</script>

<template>
  <div class="form-section">
    <h3>Professional Summary</h3>
    <p class="hint">Write a short summary of your background and goals.</p>

    <div class="form-group">
      <textarea
        :value="resume.summary"
        @input="updateSummary(($event.target as HTMLTextAreaElement).value)"
        class="glass-input"
        rows="6"
        placeholder="Experienced Software Engineer with a passion for building scalable web applications..."
      ></textarea>
    </div>
  </div>
</template>

<style scoped>
.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h3 {
  font-size: 1.25rem;
  color: var(--text-main);
  margin-bottom: 0.25rem;
}

.hint {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

textarea {
  resize: vertical;
  min-height: 100px;
}
</style>
