<script setup lang="ts">
import { ArrowDown, ArrowUp, Minus } from "lucide-vue-next"
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select"
import SelectValue from "./ui/select/SelectValue.vue"
</script>

<template>
  <Select>
    <SelectTrigger class="w-full sm:w-auto">
      <SelectValue placeholder="Priority" id="priority" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="1">
        <ArrowUp />
        High
      </SelectItem>
      <SelectItem value="2">
        <Minus />
        Medium
      </SelectItem>
      <SelectItem value="3">
        <ArrowDown />
        Low
      </SelectItem>
    </SelectContent>
  </Select>
</template>
