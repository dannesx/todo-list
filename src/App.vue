<script setup lang="ts">
import { useColorMode } from "@vueuse/core"
import { ref, onMounted } from "vue"
import TaskCard from "./components/TaskCard.vue"
import type Task from "./types/Task"
import Separator from "./components/ui/separator/Separator.vue"
import TaskForm from "./components/TaskForm.vue"
import { taskService } from "./services/api"

const mode = useColorMode()
mode.value = "dark"

const tasks = ref<Task[]>([])
const loading = ref(false)

const fetchTasks = async () => {
  loading.value = true
  try {
    const response = await taskService.getAll()
    tasks.value = response.data
  } catch (error) {
    console.error("Failed to fetch tasks", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchTasks())
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1>Tasks ✨</h1>
    <p class="mb-4">
      A simple task manager made with <code>Vue.js</code> &
      <code>Laravel PHP</code>
    </p>

    <TaskForm />

    <Separator class="my-6" />

    <div class="space-y-4">
      <TaskCard v-for="task in tasks" :task />
    </div>
  </div>
</template>
