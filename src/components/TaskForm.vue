<script setup lang="ts">
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { PlusCircle } from "lucide-vue-next"
import SelectPriority from "./SelectPriority.vue"
</script>

<template>
  <form>
    <FieldGroup class="sm:grid sm:grid-cols-6 sm:gap-2 gap-4">
      <Field class="col-span-4">
        <Input placeholder="Add task" id="title"/>
      </Field>

      <Field>
        <SelectPriority />
      </Field>

      <Field>
        <Button type="submit">
          <PlusCircle />
          Add task
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>
