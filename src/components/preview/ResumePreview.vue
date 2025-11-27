<script setup lang="ts">
import { computed } from 'vue'
import { useResume } from '../../composables/useResume'

const { resume } = useResume()

const themeStyles = computed(() => ({
  '--theme-primary': resume.theme.primaryColor,
  '--theme-secondary': resume.theme.secondaryColor,
  '--theme-bg': resume.theme.backgroundColor,
  '--theme-font': resume.theme.fontFamily,
  '--theme-radius': resume.theme.borderRadius,
}))

const layoutClass = computed(() => `layout-${resume.theme.layout}`)
</script>

<template>
  <div class="preview-container" :style="themeStyles">
    <div id="resume-preview" class="resume-a4" :class="layoutClass">
      <!-- Header / Personal Info -->
      <header class="resume-header">
        <h1 class="name">{{ resume.personal.fullName }}</h1>
        <h2 class="title">{{ resume.personal.title }}</h2>

        <div class="contact-info">
          <span v-if="resume.personal.email">{{ resume.personal.email }}</span>
          <span v-if="resume.personal.phone">{{ resume.personal.phone }}</span>
          <span v-if="resume.personal.location">{{ resume.personal.location }}</span>
          <span v-if="resume.personal.website">{{ resume.personal.website }}</span>
        </div>
      </header>

      <!-- Summary -->
      <section v-if="resume.summary" class="section summary">
        <h3 class="section-title">Summary</h3>
        <p>{{ resume.summary }}</p>
      </section>

      <!-- Experience -->
      <section v-if="resume.experience.length > 0" class="section experience">
        <h3 class="section-title">Experience</h3>
        <div v-for="exp in resume.experience" :key="exp.id" class="item">
          <div class="item-header">
            <h4 class="company">{{ exp.company }}</h4>
            <span class="date"
              >{{ exp.startDate }} - {{ exp.current ? 'Present' : exp.endDate }}</span
            >
          </div>
          <h5 class="role">{{ exp.role }}</h5>
          <p class="description">{{ exp.description }}</p>
        </div>
      </section>

      <!-- Education -->
      <section v-if="resume.education.length > 0" class="section education">
        <h3 class="section-title">Education</h3>
        <div v-for="edu in resume.education" :key="edu.id" class="item">
          <div class="item-header">
            <h4 class="school">{{ edu.school }}</h4>
            <span class="date">{{ edu.startDate }} - {{ edu.endDate }}</span>
          </div>
          <h5 class="degree">{{ edu.degree }}</h5>
        </div>
      </section>

      <!-- Skills -->
      <section v-if="resume.skills.length > 0" class="section skills">
        <h3 class="section-title">Skills</h3>
        <div class="skills-grid">
          <span v-for="skill in resume.skills" :key="skill" class="skill-badge">{{ skill }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* A4 Container */
.preview-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.1);
}

.resume-a4 {
  width: 210mm;
  min-height: 297mm;
  background: var(--theme-bg);
  font-family: var(--theme-font), sans-serif;
  color: #333;
  padding: 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  transform-origin: top center;
}

/* Base Styles */
.name {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--theme-primary);
  line-height: 1.2;
}

.title {
  font-size: 1.25rem;
  color: var(--theme-secondary);
  font-weight: 500;
  margin-bottom: 1rem;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 2rem;
}

.contact-info span:not(:last-child)::after {
  content: '•';
  margin-left: 1rem;
  color: #ccc;
}

.section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--theme-primary);
  border-bottom: 2px solid var(--theme-primary);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.item {
  margin-bottom: 1.5rem;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.25rem;
}

.company,
.school {
  font-weight: 700;
  font-size: 1.1rem;
}

.date {
  font-size: 0.9rem;
  color: #666;
}

.role,
.degree {
  font-weight: 600;
  color: #444;
  margin-bottom: 0.5rem;
}

.description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
  white-space: pre-line;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-badge {
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #374151;
}

/* Layout Variants */

/* Modern: Left-aligned, clean */
.layout-modern .name {
  text-transform: uppercase;
}

/* Classic: Centered Header */
.layout-classic .resume-header {
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 2rem;
  margin-bottom: 2rem;
}

.layout-classic .contact-info {
  justify-content: center;
}

.layout-classic .section-title {
  text-align: center;
  border-bottom: none;
  position: relative;
}

.layout-classic .section-title::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background: var(--theme-primary);
  margin: 0.5rem auto 0;
}

/* Minimal: Sidebar style (using Grid) */
.layout-minimal {
  display: grid;
  grid-template-columns: 30% 1fr;
  gap: 2rem;
  padding: 0;
}

.layout-minimal .resume-header {
  grid-column: 1 / -1;
  background: var(--theme-primary);
  color: white;
  padding: 2rem;
}

.layout-minimal .name {
  color: white;
}

.layout-minimal .title {
  color: rgba(255, 255, 255, 0.9);
}

.layout-minimal .contact-info {
  color: rgba(255, 255, 255, 0.8);
}

.layout-minimal .section.skills {
  grid-column: 1;
  padding-left: 2rem;
}

.layout-minimal .section:not(.skills) {
  grid-column: 2;
  padding-right: 2rem;
}

/* Print Styles */
@media print {
  .preview-container {
    padding: 0;
    background: white;
    overflow: visible;
  }

  .resume-a4 {
    width: 100%;
    min-height: auto;
    box-shadow: none;
    padding: 0;
  }

  /* Hide everything else */
  body > *:not(.preview-container) {
    display: none;
  }
}
</style>
