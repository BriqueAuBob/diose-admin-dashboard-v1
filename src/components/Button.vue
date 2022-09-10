<template>
  <button class="rounded-lg p-4 bg-primary-500 text-white">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
