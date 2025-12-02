<script setup lang="ts">
import { ref } from 'vue'
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { PlusCircle } from "lucide-vue-next"
import SelectPriority from "./SelectPriority.vue"
import { taskService } from '@/services/api'
import type Task from '@/types/Task'

/**
 * Eventos emitidos pelo componente
 * @event task-created - Emitido quando uma nova tarefa é criada com sucesso
 */
const emit = defineEmits<{
  'task-created': [task: Task]
}>()

/**
 * Refs para os campos do formulário
 */
// Título da tarefa
const title = ref('')
// Prioridade da tarefa (padrão: medium)
const priority = ref<'low' | 'medium' | 'high'>('medium')
// Estado de loading durante a requisição
const isLoading = ref(false)
// Mensagem de erro, caso ocorra
const errorMessage = ref('')

/**
 * Função para submeter o formulário e criar uma nova tarefa
 * 1. Valida se o título foi preenchido
 * 2. Chama a API para criar a tarefa
 * 3. Emite evento com a tarefa criada
 * 4. Limpa o formulário
 * 5. Trata erros caso ocorram
 */
const handleSubmit = async () => {
  // Validação básica
  if (!title.value.trim()) {
    errorMessage.value = 'Por favor, informe um título para a tarefa'
    return
  }

  try {
    // Inicia loading
    isLoading.value = true
    errorMessage.value = ''

    // Chama a API para criar a tarefa
    // A API retorna um AxiosResponse, então acessamos .data para pegar a tarefa
    const response = await taskService.create({
      title: title.value.trim(),
      priority: priority.value,
      completed: false
    })

    // Emite evento para o componente pai com a nova tarefa
    emit('task-created', response.data)

    // Limpa o formulário após sucesso
    title.value = ''
    priority.value = 'medium'
  } catch (error) {
    // Trata erros da API
    console.error('Erro ao criar tarefa:', error)
    errorMessage.value = 'Erro ao criar tarefa. Tente novamente.'
  } finally {
    // Finaliza loading
    isLoading.value = false
  }
}
</script>

<template>
  <!-- Formulário para criação de tarefas com prevent default -->
  <form @submit.prevent="handleSubmit">
    <FieldGroup class="sm:grid sm:grid-cols-6 sm:gap-2 gap-4">
      <!-- Campo de título com v-model -->
      <Field class="col-span-4">
        <Input
          v-model="title"
          placeholder="Add task"
          id="title"
          :disabled="isLoading"
        />
      </Field>

      <!-- Campo de prioridade com v-model -->
      <Field>
        <SelectPriority v-model="priority" />
      </Field>

      <!-- Botão de submit com estado de loading -->
      <Field>
        <Button type="submit" :disabled="isLoading">
          <PlusCircle />
          {{ isLoading ? 'Adding...' : 'Add task' }}
        </Button>
      </Field>
    </FieldGroup>

    <!-- Mensagem de erro, se houver -->
    <p v-if="errorMessage" class="text-red-500 text-sm mt-2">
      {{ errorMessage }}
    </p>
  </form>
</template>
