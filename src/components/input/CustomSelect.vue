<template>
  <div class="custom-select-container">
    <label
      v-if="showLabel"
      :for="id"
      class="custom-select-label mb-1 d-block"
      >{{ label }}</label
    >
    <div class="custom-select-wrapper">
      <v-select
        :id="id"
        v-model="innerValue"
        :items="items"
        :placeholder="placeholder"
        :hide-details="hideDetails"
        :variant="variant"
        :density="density"
        :disabled="disabled"
        :error="error"
        :error-messages="errorMessages"
        :class="['custom-select', customClass]"
        v-bind="$attrs"
        @update:model-value="updateValue"
      >
        <template v-if="prependIcon" v-slot:prepend>
          <v-icon>{{ prependIcon }}</v-icon>
        </template>
        <template v-if="appendIcon" v-slot:append>
          <v-icon>{{ appendIcon }}</v-icon>
        </template>
      </v-select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  id: {
    type: String,
    default: () => `select-${Math.random().toString(36).substring(2, 9)}`,
  },
  placeholder: {
    type: String,
    default: "",
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "outlined",
  },
  density: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: [String, Array],
    default: "",
  },
  prependIcon: {
    type: String,
    default: "",
  },
  appendIcon: {
    type: String,
    default: "",
  },
  customClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const innerValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);

const updateValue = (value) => {
  emit("update:modelValue", value);
};
</script>

<style scoped>
.custom-select-container {
  margin-bottom: 12px;
}

.custom-select-label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
}

.custom-select {
  width: 100%;
}
</style>
