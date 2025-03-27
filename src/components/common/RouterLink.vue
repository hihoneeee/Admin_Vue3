<template>
  <router-link
    :to="to"
    :class="[
      'd-flex',
      'align-center',
      'gap-3',
      'text-decoration-none',
      'hover-container',
      customContainerClass,
    ]"
  >
    <div
      class="d-flex align-center hover-wrapper text-caption"
      :class="dynamicColorClass"
    >
      <span
        :class="[
          'text-subtitle',
          'font-weight-medium',
          'mb-0',
          'order-id',
          'hover-link',
          dynamicColorClass,
          customTextClass,
        ]"
      >
        {{ label }}
      </span>

      <v-icon
        v-if="appendIcon"
        :icon="appendIcon"
        :class="['hover-icon', dynamicColorClass, appendIconClass]"
      />
    </div>
  </router-link>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  appendIcon: {
    type: String,
    default: null,
  },
  customContainerClass: {
    type: [String, Array],
    default: "",
  },
  customTextClass: {
    type: [String, Array],
    default: "",
  },
  appendIconClass: {
    type: [String, Array],
    default: "",
  },
  color: {
    type: String,
    default: "primary",
  },
});

const dynamicColorClass = computed(() => {
  return `text-${props.color}`;
});
</script>

<style scoped>
.hover-wrapper {
  position: relative;
  align-items: center;
}

.hover-icon {
  color: inherit;
  margin-left: 4px;
}

.hover-link {
  position: relative;
  font-weight: 600;
}

.hover-wrapper::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  right: calc(100% - 100%);
  background-color: currentColor;
  transition: width 0.3s ease;
}

.hover-wrapper:hover::after {
  width: 100%;
  right: 100%;
}
</style>
