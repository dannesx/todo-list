<script setup lang="ts">
import { ArrowDown, ArrowUp, Minus } from "lucide-vue-next"
import { Select, SelectTrigger, SelectContent, SelectItem } from "./ui/select"
import SelectValue from "./ui/select/SelectValue.vue"
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Priority" />
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
