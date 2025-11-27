<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useResume } from '../composables/useResume'
import type { CatalogueItem } from '../types'

const { getCatalogue, loadFromCatalogue } = useResume()
const router = useRouter()
const items = ref<CatalogueItem[]>([])

onMounted(() => {
  items.value = getCatalogue()
})

const handleLoad = (item: CatalogueItem) => {
  if (confirm(`Load "${item.title}"? This will overwrite your current editor content.`)) {
    loadFromCatalogue(item)
    router.push('/')
  }
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString()
}
</script>

<template>
  <div class="catalogue-container">
    <div class="header">
      <h2>Resume Catalogue</h2>
      <p>Browse and clone community resumes (Local Mock).</p>
    </div>

    <div v-if="items.length === 0" class="empty-state glass-panel">
      <p>No resumes saved yet. Go to the Editor and save your first resume!</p>
      <RouterLink to="/" class="glass-button primary">Go to Editor</RouterLink>
    </div>

    <div v-else class="grid">
      <div v-for="item in items" :key="item.id" class="glass-panel card">
        <div class="card-content">
          <h3>{{ item.title }}</h3>
          <p class="author">by {{ item.author }}</p>
          <p class="date">Created: {{ formatDate(item.createdAt) }}</p>

          <div class="tags">
            <span class="tag">{{ item.data.theme.layout }}</span>
            <span class="tag" :style="{ background: item.data.theme.primaryColor, color: 'white' }"
              >Color</span
            >
          </div>
        </div>

        <div class="card-actions">
          <button @click="handleLoad(item)" class="glass-button primary full-width">
            Clone / Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalogue-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.header {
  margin-bottom: 2rem;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card-content h3 {
  font-size: 1.25rem;
  color: var(--text-main);
  margin-bottom: 0.25rem;
}

.author {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.date {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid var(--glass-border);
}

.full-width {
  width: 100%;
}
</style>
