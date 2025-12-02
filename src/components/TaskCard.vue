<script setup lang="ts">
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

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  toggleComplete: [id: number]
}>()

const handleToggle = (checked: boolean) => {
  console.log(checked)
  emit("toggleComplete", props.task.id)
}
</script>

<template>
  <Card
    :class="[
      'bg-body group hover:bg-card transition',
      task.completed && 'border-dashed opacity-50',
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
      <Checkbox
        class="cursor-pointer"
        :default-value="task.completed"
      />
    </CardHeader>
    <CardFooter>
      <span class="text-xs italic text-muted-foreground"
        >Created at: {{ new Date(task.created_at).toDateString() }}</span
      >
    </CardFooter>
  </Card>
</template>
