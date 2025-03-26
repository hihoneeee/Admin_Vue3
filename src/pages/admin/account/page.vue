<template>
  <v-container fluid class="account-settings-container">
    <v-card class="account-settings-card elevation-1">
      <v-row no-gutters>
        <!-- Sidebar -->
        <v-col cols="12" md="3" class="sidebar">
          <h2 class="pa-6 pb-0" style="font-size: 1.25rem">
            <v-icon size="20">mdi-cog-outline</v-icon> Account Settings
          </h2>
          <v-card flat class="sidebar-card pa-4">
            <v-text-field
              v-model="search"
              variant="outlined"
              density="compact"
              prepend-inner-icon="mdi-magnify"
              label="Find a setting"
              rounded="lg"
              class="mb-4"
              hide-details
            ></v-text-field>

            <v-list class="sidebar-menu">
              <v-list-item
                v-for="(item, index) in menuItems"
                :key="index"
                :active="selectedMenuItem.title === item.title"
                @click="selectMenuItem(item)"
                rounded="lg"
                class="mb-4"
                :class="{
                  'active-menu-item': selectedMenuItem.title === item.title,
                }"
              >
                <template v-slot:prepend>
                  <v-icon color="primary">
                    {{ item.icon }}
                  </v-icon>
                </template>
                <v-list-item-title class="text-body-2 font-weight-medium">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- Dynamic Content Area -->
        <v-col
          cols="12"
          md="9"
          class="content-area"
          :class="{
            'pa-6': $vuetify.display.xs,
            'py-6 px-16': !$vuetify.display.xs,
          }"
        >
          <component
            :is="selectedMenuItem.component"
            :key="selectedMenuItem.title"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { PersonalInfo, PrivacyProtection } from "@/components/index";
const search = ref("");

const menuItems = [
  {
    title: "Personal Information",
    icon: "mdi-account-outline",
    component: PersonalInfo,
  },
  {
    title: "Work & Education",
    icon: "mdi-briefcase-outline",
    component: "",
  },
  {
    title: "Privacy & Protection",
    icon: "mdi-shield-outline",
    component: PrivacyProtection,
  },
  {
    title: "Language & Region",
    icon: "mdi-earth",
    component: "",
  },
  {
    title: "Notification & Alerts",
    icon: "mdi-bell-outline",
    component: "",
  },
  {
    title: "Accessibility",
    icon: "mdi-hand-back-left-outline",
    component: "",
  },
  {
    title: "Credit Card Information",
    icon: "mdi-credit-card-outline",
    component: "",
  },
];

const selectedMenuItem = ref(menuItems[0]);

const selectMenuItem = (item) => {
  selectedMenuItem.value = item;
};
</script>

<style scoped>
.account-settings-container {
  background-color: #f4f5fa;
}

.account-settings-card {
  border-radius: 8px;
  overflow: hidden;
}

.sidebar {
  background-color: #f8f9fa;
  border-right: 1px solid #e0e0e0;
}

.sidebar-menu .v-list-item {
  transition: all 0.3s ease;
  background-color: #ebf2f5;
}

.sidebar-menu .v-list-item:hover {
  background-color: #dbe6eb;
}

.active-menu-item {
  background-color: rgba(25, 118, 210, 0.16) !important;
}
</style>
