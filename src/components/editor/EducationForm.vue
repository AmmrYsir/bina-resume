<script setup lang="ts">
import { useResume } from '../../composables/useResume'

const { resume, addEducation, removeEducation } = useResume()
</script>

<template>
  <div class="form-section">
    <div class="header">
      <h3>Education</h3>
      <button @click="addEducation" class="glass-button sm">+ Add</button>
    </div>

    <div v-if="resume.education.length === 0" class="empty-state">
      <p>No education added yet.</p>
    </div>

    <div v-else class="education-list">
      <div
        v-for="(edu, index) in resume.education"
        :key="edu.id"
        class="glass-panel education-item"
      >
        <div class="item-header">
          <h4>Education #{{ index + 1 }}</h4>
          <button @click="removeEducation(edu.id)" class="delete-btn">Remove</button>
        </div>

        <div class="form-group">
          <label>School / University</label>
          <input
            v-model="edu.school"
            type="text"
            class="glass-input"
            placeholder="University Name"
          />
        </div>

        <div class="form-group">
          <label>Degree</label>
          <input
            v-model="edu.degree"
            type="text"
            class="glass-input"
            placeholder="e.g. Bachelor of Science in CS"
          />
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Start Date</label>
            <input v-model="edu.startDate" type="month" class="glass-input" />
          </div>
          <div class="form-group">
            <label>End Date</label>
            <input v-model="edu.endDate" type="month" class="glass-input" />
          </div>
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

.education-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.education-item {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
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
</style>
