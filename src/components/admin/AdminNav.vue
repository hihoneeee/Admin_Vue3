<template>
  <v-app-bar elevation="1" color="white" height="64" class="px-4">
    <v-app-bar-nav-icon
      class="d-lg-none"
      @click="$emit('toggle-drawer')"
    ></v-app-bar-nav-icon>

    <!-- Logo for mobile -->
    <div class="d-flex d-lg-none align-center">
      <v-img
        src="/admin-logo.png"
        alt="Logo"
        height="32"
        width="32"
        class="me-2"
      ></v-img>
      <h2 class="text-h6 font-weight-bold text-primary text-truncate">
        TailAdmin
      </h2>
    </div>

    <!-- Search -->
    <v-text-field
      density="compact"
      variant="solo-filled"
      class="rounded-pill mx-4 my-2"
      placeholder="Search or type command..."
      hide-details
      prepend-inner-icon="mdi-magnify"
      append-inner-icon="mdi-keyboard"
      style="max-width: 400px"
    >
      <template v-slot:append>
        <v-chip size="small" color="grey-lighten-3" class="font-weight-bold"
          >⌘K</v-chip
        >
      </template>
    </v-text-field>

    <v-spacer></v-spacer>

    <!-- Right Side Icons -->
    <v-btn icon variant="text" class="ms-2">
      <v-icon>mdi-bell-outline</v-icon>
      <v-badge color="error" content="4" floating dot></v-badge>
    </v-btn>

    <!-- Dark/Light Theme -->
    <v-btn icon variant="text" @click="$emit('toggle-theme')" class="ms-2">
      <v-icon>{{
        isDark ? "mdi-white-balance-sunny" : "mdi-moon-waning-crescent"
      }}</v-icon>
    </v-btn>

    <!-- User Menu -->
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn class="ms-3 px-2" v-bind="props" variant="text" color="default">
          <v-avatar size="32" class="me-2">
            <v-img src="https://randomuser.me/api/portraits/men/81.jpg"></v-img>
          </v-avatar>
          <div class="d-none d-sm-flex flex-column align-start">
            <span class="text-subtitle-2 font-weight-medium">Musharof</span>
            <span class="text-caption text-grey">Admin</span>
          </div>
          <v-icon size="small" class="ms-2">mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list width="220" elevation="3" class="pa-2">
        <v-list-item
          title="My Profile"
          prepend-icon="mdi-account-outline"
          density="comfortable"
          rounded="lg"
        ></v-list-item>
        <v-list-item
          title="My Calendar"
          prepend-icon="mdi-calendar-outline"
          density="comfortable"
          rounded="lg"
        ></v-list-item>
        <v-list-item
          title="My Tasks"
          prepend-icon="mdi-check-box-outline"
          density="comfortable"
          rounded="lg"
        ></v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item
          title="Account Settings"
          prepend-icon="mdi-cog-outline"
          density="comfortable"
          rounded="lg"
        ></v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item
          title="Log Out"
          prepend-icon="mdi-logout-variant"
          density="comfortable"
          rounded="lg"
          color="error"
          @click="$emit('logout')"
        ></v-list-item>
      </v-list>
    </v-menu>
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

:deep(.v-field__append-inner) {
  padding-inline-start: 8px !important;
}

:deep(.v-list-item:hover) {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

:deep(.v-list-item--active) {
  background-color: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}
</style>
