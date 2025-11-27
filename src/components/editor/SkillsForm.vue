<script setup lang="ts">
import { ref, watch } from 'vue'
import { useResume } from '../../composables/useResume'

const { resume } = useResume()
const skillInput = ref('')

// Sync local input with resume skills if needed, but here we just push to array
const addSkill = () => {
  const val = skillInput.value.trim()
  if (val && !resume.skills.includes(val)) {
    resume.skills.push(val)
    skillInput.value = ''
  }
}

const removeSkill = (skill: string) => {
  resume.skills = resume.skills.filter((s) => s !== skill)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    addSkill()
  }
}
</script>

<template>
  <div class="form-section">
    <h3>Skills</h3>
    <p class="hint">Type a skill and press Enter to add it.</p>

    <div class="form-group">
      <div class="input-wrapper">
        <input
          v-model="skillInput"
          @keydown="handleKeydown"
          type="text"
          class="glass-input"
          placeholder="e.g. Vue.js, TypeScript, Leadership"
        />
        <button @click="addSkill" class="glass-button sm">Add</button>
      </div>
    </div>

    <div class="skills-list">
      <span v-for="skill in resume.skills" :key="skill" class="skill-tag">
        {{ skill }}
        <button @click="removeSkill(skill)" class="remove-tag">×</button>
      </span>
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
}

.hint {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
}

.glass-button.sm {
  padding: 0 1rem;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.skill-tag {
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: var(--text-main);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remove-tag {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0;
  display: flex;
  align-items: center;
}

.remove-tag:hover {
  color: #ef4444;
}
</style>
