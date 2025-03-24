<template>
  <div class="d-flex flex-column align-center py-12">
    <v-icon size="64" color="grey-lighten-1" class="mb-4">
      {{ icon }}
    </v-icon>
    <p class="text-h6 text-grey-darken-1">{{ title }}</p>
    <p class="text-body-2 text-grey">
      {{ description }}
    </p>
    <v-btn
      color="primary"
      prepend-icon="mdi-plus"
      class="mt-4"
      @click="$emit('create')"
    >
      {{ value }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: null,
  },
  value: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
});

defineEmits(["create"]);
</script>
