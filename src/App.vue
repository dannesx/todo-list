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

/**
 * Handler chamado quando uma nova tarefa é criada
 * Adiciona a nova tarefa ao início do array, evitando um novo fetch
 * @param newTask - A tarefa recém-criada retornada pela API
 */
const handleTaskCreated = (newTask: Task) => {
  // Adiciona a nova tarefa no início do array
  tasks.value.unshift(newTask)
}

/**
 * Handler chamado quando uma tarefa é atualizada (ex: toggle completed)
 * Atualiza a tarefa no array local com os dados retornados pela API
 * @param updatedTask - A tarefa atualizada retornada pela API
 */
const handleTaskUpdated = (updatedTask: Task) => {
  // Encontra o índice da tarefa no array
  const index = tasks.value.findIndex(t => t.id === updatedTask.id)

  // Se encontrou, substitui pela versão atualizada
  if (index !== -1) {
    tasks.value[index] = updatedTask
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

    <!-- TaskForm emite evento 'task-created' quando uma nova tarefa é criada -->
    <TaskForm @task-created="handleTaskCreated" />

    <Separator class="my-6" />

    <div class="space-y-4">
      <!-- TaskCard emite evento 'task-updated' quando a tarefa é atualizada -->
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @task-updated="handleTaskUpdated"
      />
    </div>
  </div>
</template>
