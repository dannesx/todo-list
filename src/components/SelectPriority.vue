<script setup lang="ts">
import { ArrowDown, ArrowUp, Minus } from "lucide-vue-next"
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select"
import SelectValue from "./ui/select/SelectValue.vue"

/**
 * Props do componente SelectPriority
 * @param modelValue - Valor selecionado (baixado do v-model)
 */
defineProps<{
  modelValue?: string
}>()

/**
 * Eventos emitidos pelo componente
 * @event update:modelValue - Emitido quando o valor da prioridade muda
 */
const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()
</script>

<template>
  <!--
    Select de prioridade com suporte a v-model
    Os valores foram ajustados para corresponder ao tipo Task: "low" | "medium" | "high"
  -->
  <Select :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <SelectTrigger class="w-full sm:w-auto">
      <SelectValue placeholder="Priority" id="priority" />
    </SelectTrigger>
    <SelectContent>
      <!-- Alta prioridade -->
      <SelectItem value="high">
        <ArrowUp />
        High
      </SelectItem>
      <!-- Média prioridade -->
      <SelectItem value="medium">
        <Minus />
        Medium
      </SelectItem>
      <!-- Baixa prioridade -->
      <SelectItem value="low">
        <ArrowDown />
        Low
      </SelectItem>
    </SelectContent>
  </Select>
</template>
