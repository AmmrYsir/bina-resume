<script setup lang="ts">
import { ref } from 'vue'
import EditorLayout from '../components/editor/EditorLayout.vue'
import PersonalDetailsForm from '../components/editor/PersonalDetailsForm.vue'
import SummaryForm from '../components/editor/SummaryForm.vue'
import ExperienceForm from '../components/editor/ExperienceForm.vue'
import EducationForm from '../components/editor/EducationForm.vue'
import SkillsForm from '../components/editor/SkillsForm.vue'
import ThemeEditor from '../components/editor/ThemeEditor.vue'
import ResumePreview from '../components/preview/ResumePreview.vue'
import { useExport } from '../composables/useExport'
import { useResume } from '../composables/useResume'

const { exportToPdf, exportToWord } = useExport()
const { saveToCatalogue, resume } = useResume()
const isPreviewMobileOpen = ref(false)

const handleExportWord = () => {
  exportToWord('resume-preview', 'my-resume.docx')
}

const handleSave = () => {
  const title = prompt('Enter a title for this resume:', `${resume.personal.fullName}'s Resume`)
  if (title) {
    saveToCatalogue(title, resume.personal.fullName || 'Anonymous')
    alert('Saved to Catalogue!')
  }
}
</script>

<template>
  <div class="editor-view">
    <!-- Mobile Toggle -->
    <div class="mobile-toggle">
      <button class="glass-button" @click="isPreviewMobileOpen = !isPreviewMobileOpen">
        {{ isPreviewMobileOpen ? 'Edit Resume' : 'View Preview' }}
      </button>
    </div>

    <!-- Editor Panel -->
    <div class="panel editor-panel" :class="{ hidden: isPreviewMobileOpen }">
      <EditorLayout>
        <template #personal><PersonalDetailsForm /></template>
        <template #summary><SummaryForm /></template>
        <template #experience><ExperienceForm /></template>
        <template #education><EducationForm /></template>
        <template #skills><SkillsForm /></template>
        <template #theme><ThemeEditor /></template>
      </EditorLayout>
    </div>

    <!-- Preview Panel -->
    <div class="panel preview-panel" :class="{ active: isPreviewMobileOpen }">
      <div class="preview-toolbar glass-panel">
        <span class="toolbar-title">Live Preview</span>
        <div class="actions">
          <button @click="handleSave" class="glass-button sm">Save</button>
          <button @click="handleExportWord" class="glass-button sm">Word</button>
          <button @click="exportToPdf" class="glass-button sm primary">PDF</button>
        </div>
      </div>
      <div class="preview-content">
        <ResumePreview />
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-view {
  display: flex;
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  position: relative;
}

.panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.editor-panel {
  width: 450px;
  min-width: 350px;
  padding: 1rem;
  z-index: 2;
}

.preview-panel {
  flex: 1;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
}

.preview-toolbar {
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
  z-index: 5;
}

.toolbar-title {
  font-weight: 600;
  color: var(--text-main);
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.preview-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.mobile-toggle {
  display: none;
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 100;
}

/* Mobile Responsive */
@media (max-width: 900px) {
  .editor-view {
    flex-direction: column;
  }

  .editor-panel {
    width: 100%;
    padding: 0.5rem;
  }

  .preview-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 10;
    background: #0f172a; /* Solid bg for mobile preview */
  }

  .preview-panel.active {
    transform: translateX(0);
  }

  .editor-panel.hidden {
    /* Optional: hide editor when preview is open to save resources,
       but CSS transform handles visibility */
    display: none;
  }

  .mobile-toggle {
    display: block;
  }
}
</style>
