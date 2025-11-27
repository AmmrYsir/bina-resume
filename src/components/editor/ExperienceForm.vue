<script setup lang="ts">
import { useResume } from '../../composables/useResume'

const { resume, addExperience, removeExperience } = useResume()
</script>

<template>
  <div class="form-section">
    <div class="header">
      <h3>Work Experience</h3>
      <button @click="addExperience" class="glass-button sm">+ Add</button>
    </div>

    <div v-if="resume.experience.length === 0" class="empty-state">
      <p>No experience added yet.</p>
    </div>

    <div v-else class="experience-list">
      <div
        v-for="(exp, index) in resume.experience"
        :key="exp.id"
        class="glass-panel experience-item"
      >
        <div class="item-header">
          <h4>Experience #{{ index + 1 }}</h4>
          <button @click="removeExperience(exp.id)" class="delete-btn">Remove</button>
        </div>

        <div class="form-group">
          <label>Company</label>
          <input v-model="exp.company" type="text" class="glass-input" placeholder="Company Name" />
        </div>

        <div class="form-group">
          <label>Role</label>
          <input v-model="exp.role" type="text" class="glass-input" placeholder="Job Title" />
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Start Date</label>
            <input v-model="exp.startDate" type="month" class="glass-input" />
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input v-model="exp.endDate" type="month" class="glass-input" :disabled="exp.current" />
          </div>
        </div>

        <div class="form-group checkbox">
          <input type="checkbox" :id="'current-' + exp.id" v-model="exp.current" />
          <label :for="'current-' + exp.id">I currently work here</label>
        </div>

        <div class="form-group">
          <label>Description</label>
          <textarea
            v-model="exp.description"
            class="glass-input"
            rows="4"
            placeholder="Describe your responsibilities and achievements..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  font-size: 1.25rem;
  color: var(--text-main);
}

.glass-button.sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experience-item {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1); /* Slightly darker for contrast */
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
}

.delete-btn {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.85rem;
}

.delete-btn:hover {
  text-decoration: underline;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-muted);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.checkbox {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.checkbox input {
  width: auto;
}

.checkbox label {
  margin: 0;
  font-weight: normal;
}
</style>
