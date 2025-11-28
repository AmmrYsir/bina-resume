<script setup lang="ts">
import { useResumeStore } from '../stores/resume'
import { storeToRefs } from 'pinia'
import { GeminiService } from '../services/ai'
import { Loader2, Wand2 } from 'lucide-vue-next'

const store = useResumeStore()
const { resumeData, generatedResumeHtml, isGenerating } = storeToRefs(store)

const generateResume = async () => {
  const apiKey = localStorage.getItem('gemini_api_key')
  if (!apiKey) {
    alert('Please set your API key first.')
    return
  }

  isGenerating.value = true
  try {
    const aiService = new GeminiService()
    generatedResumeHtml.value = await aiService.generateResume(resumeData.value, apiKey)
  } catch (error) {
    console.error('Generation failed:', error)
    alert('Failed to generate resume. Please check your API key and try again.')
  } finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div
      v-if="!generatedResumeHtml"
      class="flex-1 flex flex-col items-center justify-center text-center p-8 text-gray-400"
    >
      <div class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <Wand2 class="w-8 h-8 text-indigo-400" />
      </div>
      <h3 class="text-lg font-medium text-white mb-2">Ready to Generate</h3>
      <p class="max-w-xs mx-auto mb-8">
        Fill in your details on the left and click the button below to let AI build your resume.
      </p>

      <button
        @click="generateResume"
        :disabled="isGenerating"
        class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Loader2 v-if="isGenerating" class="w-5 h-5 animate-spin" />
        <Wand2 v-else class="w-5 h-5" />
        {{ isGenerating ? 'Generating Magic...' : 'Generate Resume' }}
      </button>
    </div>

    <div v-else class="h-full flex flex-col">
      <div class="flex justify-end mb-4 gap-2">
        <button
          @click="generateResume"
          :disabled="isGenerating"
          class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Loader2 v-if="isGenerating" class="w-4 h-4 animate-spin" />
          <span v-else>Regenerate</span>
        </button>
      </div>

      <div class="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
        <iframe
          :srcdoc="generatedResumeHtml"
          class="w-full h-full border-none"
          title="Resume Preview"
        ></iframe>
      </div>
    </div>
  </div>
</template>
