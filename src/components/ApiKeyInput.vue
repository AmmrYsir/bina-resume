<script setup lang="ts">
import { ref } from 'vue'
import { X, Key } from 'lucide-vue-next'

const emit = defineEmits(['close'])

const apiKey = ref(localStorage.getItem('gemini_api_key') || '')

const saveKey = () => {
  if (apiKey.value.trim()) {
    localStorage.setItem('gemini_api_key', apiKey.value.trim())
    emit('close')
  }
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Key class="w-5 h-5 text-indigo-600" />
            API Configuration
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <p class="text-sm text-gray-600 mb-4">
          To generate resumes, you need a Google Gemini API key. Your key is stored locally in your
          browser.
        </p>

        <div class="space-y-4">
          <div>
            <label for="apiKey" class="block text-sm font-medium text-gray-700 mb-1"
              >Gemini API Key</label
            >
            <input
              id="apiKey"
              v-model="apiKey"
              type="password"
              placeholder="AIzaSy..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              @keyup.enter="saveKey"
            />
          </div>

          <button
            @click="saveKey"
            class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!apiKey"
          >
            Save API Key
          </button>

          <p class="text-xs text-center text-gray-500 mt-4">
            Don't have a key?
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              class="text-indigo-600 hover:underline"
              >Get one here</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
