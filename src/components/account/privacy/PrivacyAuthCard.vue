<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      class="d-flex align-start justify-space-between ga-4 pa-4 cursor-pointer"
      :color="isHovering ? '#dbe6eb' : '#f2f2f2f2'"
      flat
    >
      <div class="d-flex align-center ga-4">
        <v-icon size="30" class="mr-4">{{ device.icon }}</v-icon>

        <div>
          <div class="text-body-1 font-weight-medium">
            {{ device.name }}
          </div>

          <div class="d-flex align-center ga-2">
            <v-icon size="16" :color="device.statusType">
              mdi-checkbox-marked-circle
            </v-icon>
            <span :class="['text-' + device.statusType, 'text-caption']">
              {{ device.status }}
            </span>
          </div>

          <div class="text-caption text-disabled">
            {{ device.subtext }}
          </div>
        </div>
      </div>
      <div class="d-flex align-center">
        <v-btn
          v-if="isHovering"
          color="grey"
          icon="mdi-pencil"
          size="small"
          density="compact"
          :icon-size="12"
        ></v-btn>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "PrivacyDeviceCard",
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
};
</script>
