<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const apiKey = ref('')
const router = useRouter()

onMounted(() => {
  const savedName = localStorage.getItem('bina_user_name')
  const savedKey = localStorage.getItem('bina_gemini_key')
  if (savedName) name.value = savedName
  if (savedKey) apiKey.value = savedKey
})

const saveProfile = () => {
  localStorage.setItem('bina_user_name', name.value)
  localStorage.setItem('bina_gemini_key', apiKey.value)
  alert('Profile saved!')
  router.push('/')
}
</script>

<template>
  <div class="profile-container">
    <div class="glass-panel profile-card">
      <h2>Profile & Settings</h2>
      <p class="subtitle">Configure your details and AI access.</p>

      <form @submit.prevent="saveProfile" class="profile-form">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="glass-input"
            placeholder="Enter your name"
          />
        </div>

        <div class="form-group">
          <label for="apiKey">Gemini API Key</label>
          <input
            id="apiKey"
            v-model="apiKey"
            type="password"
            class="glass-input"
            placeholder="Enter your Gemini API Key"
          />
          <small class="hint">
            Required for AI features. Stored locally in your browser.
            <a href="https://aistudio.google.com/app/apikey" target="_blank" class="link"
              >Get a key here</a
            >.
          </small>
        </div>

        <div class="actions">
          <button type="submit" class="glass-button primary">Save Settings</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
}

.profile-card {
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-main);
}

.subtitle {
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: var(--text-main);
}

.hint {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.link {
  color: var(--primary-color);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
