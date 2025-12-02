<script setup lang="ts">
import { ref } from "vue"
import type Task from "@/types/Task"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import PriorityLevel from "./PriorityLevel.vue"
import { taskService } from "@/services/api"

const props = defineProps<{
  task: Task
}>()

/**
 * Eventos emitidos pelo componente
 * @event task-updated - Emitido quando a tarefa é atualizada com sucesso
 */
const emit = defineEmits<{
  'task-updated': [task: Task]
}>()

// Estado de loading durante a requisição
const isUpdating = ref(false)

/**
 * Handler para toggle do checkbox
 * Faz PATCH na API para atualizar o status de completed
 * @param checked - Novo estado do checkbox (não usado, invertemos o atual)
 */
const handleToggle = async (checked: boolean) => {
  // Previne múltiplas requisições simultâneas
  if (isUpdating.value) return

  try {
    isUpdating.value = true

    // Inverte o estado atual de completed
    const newCompletedStatus = !props.task.completed

    // Faz PATCH na API
    const response = await taskService.update(props.task.id, {
      completed: newCompletedStatus
    })

    // Emite evento com a tarefa atualizada para o componente pai
    emit('task-updated', response.data)
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
    // Aqui você pode adicionar um toast/notificação de erro se desejar
  } finally {
    isUpdating.value = false
  }
}
</script>

<template>
  <!--
    Card da tarefa
    - Opacity reduzida quando completada
    - Click no card inteiro faz toggle
    - Loading state desabilita interação
  -->
  <Card
    :class="[
      'bg-body group hover:bg-card transition',
      task.completed && 'border-dashed opacity-50',
      isUpdating && 'pointer-events-none opacity-75'
    ]"
    @click="handleToggle"
  >
    <CardHeader class="flex justify-between">
      <div>
        <CardTitle
          :class="task.completed && 'line-through text-muted-foreground'"
          >{{ task.title }}</CardTitle
        >
        <CardDescription class="m-0">
          <PriorityLevel :level="task.priority" />
        </CardDescription>
      </div>
      <!-- Checkbox reflete o estado atual da tarefa -->
      <Checkbox
        class="cursor-pointer"
        :checked="task.completed"
        :disabled="isUpdating"
      />
    </CardHeader>
    <CardFooter>
      <span class="text-xs italic text-muted-foreground"
        >Created at: {{ new Date(task.created_at).toDateString() }}</span
      >
    </CardFooter>
  </Card>
</template>
