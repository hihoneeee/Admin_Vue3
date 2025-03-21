<template>
  <v-app>
    <!-- Sidebar Component -->
    <AdminSidebar
      :modelValue="drawer"
      @update:modelValue="drawer = $event"
      :miniSidebar="mini"
      @update:miniSidebar="mini = $event"
      @logout="logout"
    />

    <!-- Main Content -->
    <v-main class="vuexy-content">
      <!-- Top Navigation Component -->
      <AdminNav
        :isDark="isDark"
        @toggle-drawer="drawer = !drawer"
        @toggle-theme="toggleTheme"
        @logout="logout"
      />

      <!-- Page Content -->
      <v-container fluid class="content-wrapper pa-6">
        <router-view />
      </v-container>

      <!-- Footer -->
      <v-footer class="d-flex flex-column">
        <div class="px-6 py-4 text-center w-100">
          <span
            >&copy; {{ new Date().getFullYear() }} Your Company. All rights
            reserved.</span
          >
          <v-spacer></v-spacer>
          <span>Powered by Vuexy Admin Template</span>
        </div>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { AdminSidebar, AdminNav } from "@/components/index";

// States
const drawer = ref(true);
const mini = ref(false);
const isDark = ref(false);

// Toggle theme
const toggleTheme = () => {
  isDark.value = !isDark.value;
  // Implement theme switching logic here
  document.body.classList.toggle("dark-theme");
};

// Logout function
const logout = () => {
  // Implement logout logic here
  console.log("Logout clicked");
};

// Adjust sidebar based on screen size
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth < 1200) {
      drawer.value = false;
    } else {
      drawer.value = true;
    }

    if (window.innerWidth < 992) {
      mini.value = true;
    } else {
      mini.value = false;
    }
  };

  window.addEventListener("resize", handleResize);
  handleResize(); // Call once on mount

  return () => {
    window.removeEventListener("resize", handleResize);
  };
});
</script>

<style scoped>
.vuexy-content {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.content-wrapper {
  min-height: calc(100vh - 128px); /* Full height minus header and footer */
}

/* For dark theme */
:deep(.dark-theme) {
  background-color: #283046;
  color: #fff;
}

:deep(.dark-theme .v-app-bar) {
  background-color: #283046 !important;
  color: #fff;
}

:deep(.dark-theme .v-navigation-drawer) {
  background-color: #283046 !important;
  color: #fff;
}

:deep(.dark-theme .v-footer) {
  background-color: #283046 !important;
  color: #fff;
}
</style>
