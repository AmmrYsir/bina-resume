<script setup lang="ts">
import { useResumeStore } from '../stores/resume'
import { storeToRefs } from 'pinia'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-vue-next'
import { ref } from 'vue'

const store = useResumeStore()
const { resumeData } = storeToRefs(store)

const activeSection = ref('personal')

const toggleSection = (section: string) => {
  activeSection.value = activeSection.value === section ? '' : section
}

const addExperience = () => {
  resumeData.value.experience.push({
    id: Date.now(),
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  })
}

const removeExperience = (index: number) => {
  resumeData.value.experience.splice(index, 1)
}

const addEducation = () => {
  resumeData.value.education.push({
    id: Date.now(),
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
  })
}

const removeEducation = (index: number) => {
  resumeData.value.education.splice(index, 1)
}

const addSkill = () => {
  resumeData.value.skills.push('')
}

const removeSkill = (index: number) => {
  resumeData.value.skills.splice(index, 1)
}
</script>

<template>
  <div class="space-y-4">
    <!-- Personal Info -->
    <div class="border border-gray-200 rounded-xl overflow-hidden">
      <button
        @click="toggleSection('personal')"
        class="w-full px-4 py-3 bg-white flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span class="font-medium text-gray-900">Personal Information</span>
        <component
          :is="activeSection === 'personal' ? ChevronUp : ChevronDown"
          class="w-4 h-4 text-gray-500"
        />
      </button>
      <div
        v-show="activeSection === 'personal'"
        class="p-4 bg-white border-t border-gray-100 space-y-4"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              v-model="resumeData.personalInfo.fullName"
              type="text"
              class="input-field"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="resumeData.personalInfo.email"
              type="email"
              class="input-field"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              v-model="resumeData.personalInfo.phone"
              type="tel"
              class="input-field"
              placeholder="+1 234 567 890"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
            <input
              v-model="resumeData.personalInfo.linkedin"
              type="text"
              class="input-field"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Website / Portfolio</label>
            <input
              v-model="resumeData.personalInfo.website"
              type="text"
              class="input-field"
              placeholder="johndoe.com"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Summary -->
    <div class="border border-gray-200 rounded-xl overflow-hidden">
      <button
        @click="toggleSection('summary')"
        class="w-full px-4 py-3 bg-white flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span class="font-medium text-gray-900">Professional Summary</span>
        <component
          :is="activeSection === 'summary' ? ChevronUp : ChevronDown"
          class="w-4 h-4 text-gray-500"
        />
      </button>
      <div v-show="activeSection === 'summary'" class="p-4 bg-white border-t border-gray-100">
        <textarea
          v-model="resumeData.summary"
          rows="4"
          class="input-field w-full"
          placeholder="Briefly describe your professional background and goals..."
        ></textarea>
      </div>
    </div>

    <!-- Experience -->
    <div class="border border-gray-200 rounded-xl overflow-hidden">
      <button
        @click="toggleSection('experience')"
        class="w-full px-4 py-3 bg-white flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span class="font-medium text-gray-900">Experience</span>
        <component
          :is="activeSection === 'experience' ? ChevronUp : ChevronDown"
          class="w-4 h-4 text-gray-500"
        />
      </button>
      <div
        v-show="activeSection === 'experience'"
        class="p-4 bg-white border-t border-gray-100 space-y-6"
      >
        <div
          v-for="(exp, index) in resumeData.experience"
          :key="exp.id"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group"
        >
          <button
            @click="removeExperience(index)"
            class="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 class="w-4 h-4" />
          </button>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Job Title</label>
              <input
                v-model="exp.title"
                type="text"
                class="input-field-sm"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Company</label>
              <input
                v-model="exp.company"
                type="text"
                class="input-field-sm"
                placeholder="Acme Corp"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
              <input
                v-model="exp.startDate"
                type="text"
                class="input-field-sm"
                placeholder="Jan 2020"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">End Date</label>
              <input
                v-model="exp.endDate"
                type="text"
                class="input-field-sm"
                placeholder="Present"
              />
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1">Description</label>
            <textarea
              v-model="exp.description"
              rows="3"
              class="input-field-sm w-full"
              placeholder="Key responsibilities and achievements..."
            ></textarea>
          </div>
        </div>
        <button
          @click="addExperience"
          class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus class="w-4 h-4" />
          Add Position
        </button>
      </div>
    </div>

    <!-- Education -->
    <div class="border border-gray-200 rounded-xl overflow-hidden">
      <button
        @click="toggleSection('education')"
        class="w-full px-4 py-3 bg-white flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span class="font-medium text-gray-900">Education</span>
        <component
          :is="activeSection === 'education' ? ChevronUp : ChevronDown"
          class="w-4 h-4 text-gray-500"
        />
      </button>
      <div
        v-show="activeSection === 'education'"
        class="p-4 bg-white border-t border-gray-100 space-y-6"
      >
        <div
          v-for="(edu, index) in resumeData.education"
          :key="edu.id"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group"
        >
          <button
            @click="removeEducation(index)"
            class="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 class="w-4 h-4" />
          </button>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1"
                >School / University</label
              >
              <input
                v-model="edu.school"
                type="text"
                class="input-field-sm"
                placeholder="University of Tech"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Degree</label>
              <input
                v-model="edu.degree"
                type="text"
                class="input-field-sm"
                placeholder="BSc Computer Science"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
              <input
                v-model="edu.startDate"
                type="text"
                class="input-field-sm"
                placeholder="2016"
              />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500 mb-1">End Date</label>
              <input v-model="edu.endDate" type="text" class="input-field-sm" placeholder="2020" />
            </div>
          </div>
        </div>
        <button
          @click="addEducation"
          class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus class="w-4 h-4" />
          Add Education
        </button>
      </div>
    </div>

    <!-- Skills -->
    <div class="border border-gray-200 rounded-xl overflow-hidden">
      <button
        @click="toggleSection('skills')"
        class="w-full px-4 py-3 bg-white flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span class="font-medium text-gray-900">Skills</span>
        <component
          :is="activeSection === 'skills' ? ChevronUp : ChevronDown"
          class="w-4 h-4 text-gray-500"
        />
      </button>
      <div v-show="activeSection === 'skills'" class="p-4 bg-white border-t border-gray-100">
        <div class="flex flex-wrap gap-2 mb-4">
          <div
            v-for="(skill, index) in resumeData.skills"
            :key="index"
            class="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm border border-indigo-100"
          >
            <input
              v-model="resumeData.skills[index]"
              class="bg-transparent border-none focus:ring-0 p-0 w-24 text-sm"
            />
            <button @click="removeSkill(index)" class="ml-2 text-indigo-400 hover:text-indigo-600">
              <X class="w-3 h-3" />
            </button>
          </div>
        </div>
        <button
          @click="addSkill"
          class="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
        >
          <Plus class="w-4 h-4" />
          Add Skill
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white;
}
.input-field-sm {
  @apply w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-sm;
}
</style>
