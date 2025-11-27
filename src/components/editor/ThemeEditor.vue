<script setup lang="ts">
import { useResume } from '../../composables/useResume'

const { resume, updateTheme } = useResume()

const layouts = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  { id: 'minimal', label: 'Minimal' },
]

const fonts = [
  { id: 'Inter', label: 'Inter' },
  { id: 'Roboto', label: 'Roboto' },
  { id: 'Georgia', label: 'Georgia' },
  { id: 'Courier New', label: 'Courier New' },
]
</script>

<template>
  <div class="form-section">
    <h3>Design & Theme</h3>
    <p class="hint">Customize the look of your resume.</p>

    <div class="form-group">
      <label>Layout Style</label>
      <div class="layout-options">
        <button
          v-for="layout in layouts"
          :key="layout.id"
          class="layout-btn"
          :class="{ active: resume.theme.layout === layout.id }"
          @click="updateTheme({ layout: layout.id as any })"
        >
          {{ layout.label }}
        </button>
      </div>
    </div>

    <div class="grid-2">
      <div class="form-group">
        <label>Primary Color</label>
        <div class="color-picker-wrapper">
          <input
            type="color"
            :value="resume.theme.primaryColor"
            @input="updateTheme({ primaryColor: ($event.target as HTMLInputElement).value })"
          />
          <input
            type="text"
            :value="resume.theme.primaryColor"
            @input="updateTheme({ primaryColor: ($event.target as HTMLInputElement).value })"
            class="glass-input sm"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Secondary Color</label>
        <div class="color-picker-wrapper">
          <input
            type="color"
            :value="resume.theme.secondaryColor"
            @input="updateTheme({ secondaryColor: ($event.target as HTMLInputElement).value })"
          />
          <input
            type="text"
            :value="resume.theme.secondaryColor"
            @input="updateTheme({ secondaryColor: ($event.target as HTMLInputElement).value })"
            class="glass-input sm"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label>Font Family</label>
      <select
        :value="resume.theme.fontFamily"
        @change="updateTheme({ fontFamily: ($event.target as HTMLSelectElement).value })"
        class="glass-input"
      >
        <option v-for="font in fonts" :key="font.id" :value="font.id">
          {{ font.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h3 {
  font-size: 1.25rem;
  color: var(--text-main);
}

.hint {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.layout-options {
  display: flex;
  gap: 0.5rem;
}

.layout-btn {
  flex: 1;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--glass-border);
  color: var(--text-muted);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.layout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.layout-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

input[type='color'] {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: none;
}

.glass-input.sm {
  padding: 0.4rem;
  font-size: 0.9rem;
}

select.glass-input {
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
}
</style>
