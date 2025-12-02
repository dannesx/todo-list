<script setup lang="ts">
import { ArrowDown, ArrowUp, Minus } from "lucide-vue-next"

defineProps<{
  level: "low" | "medium" | "high"
}>()
</script>

<template>
  <div class="flex items-center space-x-1">
    <template v-if="level === 'high'">
      <ArrowUp :size="16"/>
      <span>High</span>
    </template>

    <template v-if="level === 'medium'">
      <Minus :size="16"/>
      <span>Medium</span>
    </template>

    <template v-if="level === 'low'">
      <ArrowDown :size="16"/>
      <span>Low</span>
    </template>
  </div>
</template>
