<script setup lang="ts">
import { useResume } from '../../composables/useResume'

const { resume, updatePersonal } = useResume()
</script>

<template>
  <div class="form-section">
    <h3>Personal Details</h3>

    <div class="form-group">
      <label>Full Name</label>
      <input
        :value="resume.personal.fullName"
        @input="updatePersonal('fullName', ($event.target as HTMLInputElement).value)"
        type="text"
        class="glass-input"
        placeholder="e.g. John Doe"
      />
    </div>

    <div class="form-group">
      <label>Job Title</label>
      <input
        :value="resume.personal.title"
        @input="updatePersonal('title', ($event.target as HTMLInputElement).value)"
        type="text"
        class="glass-input"
        placeholder="e.g. Senior Software Engineer"
      />
    </div>

    <div class="grid-2">
      <div class="form-group">
        <label>Email</label>
        <input
          :value="resume.personal.email"
          @input="updatePersonal('email', ($event.target as HTMLInputElement).value)"
          type="email"
          class="glass-input"
          placeholder="john@example.com"
        />
      </div>

      <div class="form-group">
        <label>Phone</label>
        <input
          :value="resume.personal.phone"
          @input="updatePersonal('phone', ($event.target as HTMLInputElement).value)"
          type="tel"
          class="glass-input"
          placeholder="+1 234 567 890"
        />
      </div>
    </div>

    <div class="grid-2">
      <div class="form-group">
        <label>Location</label>
        <input
          :value="resume.personal.location"
          @input="updatePersonal('location', ($event.target as HTMLInputElement).value)"
          type="text"
          class="glass-input"
          placeholder="New York, NY"
        />
      </div>

      <div class="form-group">
        <label>Website / LinkedIn</label>
        <input
          :value="resume.personal.website"
          @input="updatePersonal('website', ($event.target as HTMLInputElement).value)"
          type="text"
          class="glass-input"
          placeholder="linkedin.com/in/johndoe"
        />
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

h3 {
  font-size: 1.25rem;
  color: var(--text-main);
  margin-bottom: 0.5rem;
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

@media (max-width: 600px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}
</style>
