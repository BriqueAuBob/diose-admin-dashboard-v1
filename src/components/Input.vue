<template>
  <input
    placeholder="Rechercher un utilisateur..."
    class="bg-white dark:bg-dark-900 w-full p-5 rounded-lg focus:outline-none shadow-sm"
    @keyup.enter="(e) => $emit('enter', e.target.value)"
    @change="(e) => $emit('change', e.target.value)"
    @input="(e) => $emit('update:modelValue', e.target.value)"
  />
</template>

<script setup>
defineEmits(["change", "enter", "update:modelValue"]);

defineProps({
  modelValue: {
    type: String,
  },
});
</script>
