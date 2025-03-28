<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-bind="props"
      class="d-flex align-center justify-space-between pa-4 cursor-pointer"
      :color="isHovering ? '#dbe6eb' : '#f2f2f2f2'"
      flat
    >
      <div class="d-flex align-center">
        <v-icon :icon="device.icon" size="32" class="mr-4" />
        <div>
          <div class="text-body-1 font-weight-medium">
            {{ device.title }}
          </div>
          <div class="text-caption text-medium-emphasis">
            {{ device.subTitle }}
          </div>
          <div class="text-caption mt-1">
            {{ device.time }}
          </div>
        </div>
      </div>

      <div class="d-flex align-center">
        <v-chip
          v-if="device.status"
          variant="tonal"
          size="small"
          class="font-weight-bold"
          style="
            background-color: #099f69, opacity 15%;
            color: #066f49;
            border: 1px #066f49 solid;
          "
        >
          {{ device.status }}
        </v-chip>
        <v-icon icon="mdi-chevron-right" color="grey"></v-icon>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "DeviceAccessCard",
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
};
</script>
