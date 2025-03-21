<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :rail="mini"
    permanent
    class="vuexy-sidebar h-100 relative"
    :width="mini ? 70 : 240"
    elevation="3"
  >
    <!-- App Logo -->
    <div class="py-3 px-4 d-flex align-center border-bottom">
      <router-link
        to="/admin/dashboard"
        class="d-flex align-center text-decoration-none"
      >
        <v-img
          src="/admin-logo.png"
          alt="Logo"
          height="32"
          width="32"
          class="me-3"
        ></v-img>
        <h2
          v-if="!mini"
          class="text-h6 font-weight-bold primary--text text-truncate"
        >
          TailAdmin
        </h2>
      </router-link>
      <v-spacer></v-spacer>
      <div class="absolute top-0">
        <v-btn
          v-if="!mini"
          variant="text"
          size="small"
          icon="mdi-chevron-left"
          @click="updateMini(true)"
          density="comfortable"
        ></v-btn>
        <v-btn
          v-else
          variant="text"
          size="small"
          icon="mdi-chevron-right"
          @click="updateMini(false)"
          density="comfortable"
        ></v-btn>
      </div>
    </div>

    <!-- Navigation Menu -->
    <v-list nav density="compact" class="pa-2">
      <template v-for="(item, index) in menuItems" :key="index">
        <v-list-group
          v-if="item.children && item.children.length > 0"
          :value="item.title"
          :active="isGroupActive(item)"
          class="rounded child-compact"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.title"
              :value="item.title"
              class="rounded"
              :class="{ 'py-1': !mini }"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            :prepend-icon="child.icon"
            :title="child.title"
            :value="child.title"
            :to="child.to"
            :active="currentRoute === child.to"
            class="child-item rounded text-truncate"
            :class="{ 'py-1': !mini }"
          >
            <v-tooltip v-if="mini" activator="parent" location="end">
              {{ child.title }}
            </v-tooltip>
          </v-list-item>
        </v-list-group>

        <!-- If the item has no children, render as a list item -->
        <v-list-item
          v-else
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.title"
          :to="item.to"
          :active="isItemActive(item)"
          class="rounded my-1"
          :class="{ 'py-1': !mini }"
        >
          <v-tooltip v-if="mini" activator="parent" location="end">
            {{ item.title }}
          </v-tooltip>
        </v-list-item>
      </template>
    </v-list>

    <!-- Bottom Section -->
    <template v-slot:append>
      <div class="px-2 py-2 border-top">
        <div v-if="!mini" class="d-flex align-center justify-space-between">
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/81.jpg"
            title="John Doe"
            subtitle="Administrator"
            class="px-1"
          >
          </v-list-item>
          <v-btn
            color="primary"
            icon="mdi-logout"
            variant="text"
            size="small"
            @click="emit('logout')"
          ></v-btn>
        </div>
        <div v-else class="d-flex flex-column align-center">
          <v-avatar class="my-2" size="40">
            <v-img src="https://randomuser.me/api/portraits/men/81.jpg"></v-img>
          </v-avatar>
          <v-btn
            color="primary"
            icon="mdi-logout"
            variant="text"
            size="small"
            @click="emit('logout')"
          ></v-btn>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  miniSidebar: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "update:miniSidebar", "logout"]);

// Router
const route = useRoute();

// Computed values
const currentRoute = computed(() => route.path);
const mini = computed({
  get: () => props.miniSidebar,
  set: (value) => emit("update:miniSidebar", value),
});

// Menu items data structure
const menuItems = [
  {
    title: "Dashboard",
    icon: "mdi-view-dashboard-outline",
    to: "/admin/dash-board",
  },

  {
    title: "Users",
    icon: "mdi-account-group-outline",
    children: [
      {
        title: "List Users",
        icon: "mdi-account-multiple",
        to: "/admin/user",
      },
      {
        title: "Create User",
        icon: "mdi-account-plus",
        to: "/admin/user/create",
      },
    ],
  },
  {
    title: "Calendar",
    icon: "mdi-calendar-outline",
    to: "/admin/calendar",
  },
  {
    title: "User Profile",
    icon: "mdi-account-outline",
    to: "/admin/profile",
  },
  {
    title: "Tasks",
    icon: "mdi-check-box-outline",
    to: "/admin/tasks",
  },
];

const isGroupActive = (item) => {
  if (item.children) {
    return item.children.some((child) => currentRoute.value.includes(child.to));
  }
  return false;
};

const isItemActive = (item) => {
  return currentRoute.value.includes(item.to);
};

const updateMini = (value) => {
  emit("update:miniSidebar", value);
};
</script>

<style scoped>
.vuexy-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh !important;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  background: #fcfcfc;
  z-index: 100;
}

:deep(.v-list-item--active) {
  background-color: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

:deep(.v-list-item--active .v-list-item__prepend) {
  color: rgb(var(--v-theme-primary));
}

:deep(.v-list-item) {
  min-height: 40px;
  transition: all 0.2s ease;
  overflow: hidden;
}

:deep(.v-list-item:hover) {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

:deep(.v-list-item__title) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Reduce indentation of child items */
:deep(.child-compact > .v-list-item--child) {
  padding-left: 8px !important;
}

.child-item {
  margin-left: 0 !important;
  padding-left: 12px !important;
}

/* Adjust prepend icon spacing for child items */
:deep(.child-item .v-list-item__prepend) {
  margin-right: 4px;
}

.border-top {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
