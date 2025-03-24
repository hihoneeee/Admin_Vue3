<template>
  <v-app-bar flat color="surface" height="64">
    <!-- Toggle Button for Sidebar -->
    <v-app-bar-nav-icon
      class="d-lg-none"
      @click="$emit('toggle-drawer')"
    ></v-app-bar-nav-icon>

    <!-- Search Bar -->
    <div class="d-flex align-center ms-4 flex-grow-1">
      <v-text-field
        density="compact"
        variant="outlined"
        placeholder="tìm kiếm..."
        hide-details
        prepend-inner-icon="mdi-magnify"
        class="search-field"
        style="max-width: 250px"
      ></v-text-field>
    </div>

    <v-spacer></v-spacer>

    <!-- Right Side Icons -->
    <!-- Command Palette Button -->
    <v-btn icon variant="text" class="me-2">
      <v-icon>mdi-console</v-icon>
    </v-btn>

    <!-- Notification Button -->
    <v-btn icon variant="text" class="me-2">
      <v-badge color="error" dot>
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>

    <!-- Dark/Light Theme -->
    <v-btn icon variant="text" @click="$emit('toggle-theme')" class="me-3">
      <v-icon>{{
        isDark ? "mdi-white-balance-sunny" : "mdi-moon-waning-crescent"
      }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
defineProps({
  isDark: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggle-drawer", "toggle-theme", "logout"]);
</script>

<style scoped>
.v-app-bar {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.primary-text {
  color: rgb(var(--v-theme-primary));
}

:deep(.search-field .v-field__outline) {
  opacity: 0 !important;
}

:deep(.search-field .v-field__overlay) {
  opacity: 0 !important;
}

:deep(.search-field .v-field__input) {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  min-height: unset !important;
}

:deep(.v-list-item:hover) {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

:deep(.v-list-item--active) {
  background-color: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}
</style>
