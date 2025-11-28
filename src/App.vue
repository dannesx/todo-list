<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useColorMode } from "@vueuse/core"
import SelectPriority from "./components/SelectPriority.vue"
import { PlusCircle } from "lucide-vue-next"

const mode = useColorMode()
mode.value = "dark"
</script>

<template>
  <div class="max-w-3xl mx-auto p-4">
    <h1>Tasks ✨</h1>
    <p class="mb-2">
      A simple task manager made with <code>Vue.js</code> &
      <code>Laravel PHP</code>
    </p>

    <div class="flex gap-2">
      <Input placeholder="Add task" class="flex-1" />
      <SelectPriority />
      <Button>
        <PlusCircle />
        Add task
      </Button>
    </div>
  </div>
</template>
