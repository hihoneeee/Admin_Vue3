<template>
  <v-app-bar class="admin-navbar px-4" flat>
    <v-btn icon @click="toggleSidebar">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-text-field
      density="compact"
      variant="outlined"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      hide-details
      class="admin-search mx-4"
      style="max-width: 300px"
    ></v-text-field>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <v-btn icon class="ml-2">
      <v-icon>mdi-email</v-icon>
    </v-btn>

    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <v-btn icon class="ml-2" v-bind="props">
          <v-avatar size="36">
            <v-img
              src="https://randomuser.me/api/portraits/men/85.jpg"
              alt="Avatar"
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item title="Profile" prepend-icon="mdi-account"></v-list-item>
        <v-list-item title="Settings" prepend-icon="mdi-cog"></v-list-item>
        <v-divider></v-divider>
        <v-list-item title="Logout" prepend-icon="mdi-logout"></v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup>
import { ref } from "vue";

const sidebarVisible = ref(true);

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}
</script>

<style scoped>
.admin-navbar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
