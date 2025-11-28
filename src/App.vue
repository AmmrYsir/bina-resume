<script setup lang="ts">
import { ref } from 'vue'
import ResumeForm from './components/ResumeForm.vue'
import ResumePreview from './components/ResumePreview.vue'
import ApiKeyInput from './components/ApiKeyInput.vue'
import { FileText, Sparkles } from 'lucide-vue-next'

const showApiKeyModal = ref(true)
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="bg-indigo-600 p-2 rounded-lg">
            <FileText class="w-6 h-6 text-white" />
          </div>
          <h1 class="text-xl font-bold text-gray-900 tracking-tight">Bina Resume</h1>
        </div>
        <div class="flex items-center gap-4">
          <button @click="showApiKeyModal = true" class="text-sm text-gray-500 hover:text-gray-900">
            API Key Settings
          </button>
          <a
            href="https://github.com/AmmrYsir/bina-resume"
            target="_blank"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">GitHub</span>
            <!-- Github Icon -->
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main
      class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 gap-6 grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-4rem)]"
    >
      <!-- Left: Form -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full"
      >
        <div class="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h2 class="font-semibold text-gray-900 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            Your Details
          </h2>
        </div>
        <div class="flex-1 overflow-y-auto p-6">
          <ResumeForm />
        </div>
      </div>

      <!-- Right: Preview -->
      <div
        class="bg-gray-900 rounded-2xl shadow-xl border border-gray-800 overflow-hidden flex flex-col h-full relative group"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none"
        ></div>
        <div
          class="p-4 border-b border-gray-800 bg-gray-900/50 flex items-center justify-between z-10"
        >
          <h2 class="font-semibold text-white flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-yellow-400" />
            Live Preview
          </h2>
          <div class="flex gap-2">
            <!-- Actions like download can go here -->
          </div>
        </div>
        <div class="flex-1 overflow-y-auto p-6 bg-gray-800/50 backdrop-blur-sm">
          <ResumePreview />
        </div>
      </div>
    </main>

    <ApiKeyInput v-if="showApiKeyModal" @close="showApiKeyModal = false" />
  </div>
</template>

<style scoped>
/* Custom scrollbar for webkit */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
