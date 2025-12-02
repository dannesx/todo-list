<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useColorMode } from "@vueuse/core"
import SelectPriority from "./components/SelectPriority.vue"
import { PlusCircle } from "lucide-vue-next"
import TaskCard from "./components/TaskCard.vue"
import type Task from "./types/Task"
import Separator from "./components/ui/separator/Separator.vue"

const mode = useColorMode()
mode.value = "dark"

const tasks: Task[] = [
  {
    id: 1,
    title: "Learn Vue.js",
    priority: "high",
    completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Learn Laravel",
    priority: "high",
    completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Take out the trash",
    priority: "medium",
    completed: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
</script>

<template>
  <div class="max-w-3xl mx-auto p-6">
    <h1>Tasks ✨</h1>
    <p class="mb-4">
      A simple task manager made with <code>Vue.js</code> &
      <code>Laravel PHP</code>
    </p>

    <div class="flex gap-3 sm:gap-2 mb-6 flex-col sm:flex-row">
      <Input placeholder="Add task" class="flex-1" />
      <SelectPriority />
      <Button>
        <PlusCircle />
        Add task
      </Button>
    </div>

    <Separator class="my-6"/>

    <div class="space-y-4">
      <TaskCard v-for="task in tasks" :task />
    </div>
  </div>
</template>
