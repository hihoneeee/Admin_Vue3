<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :rail="mini"
    permanent
    class="vuexy-sidebar h-100"
    :width="mini ? 70 : 240"
    elevation="3"
  >
    <!-- App Logo -->
    <div class="py-3 px-4 d-flex align-center border-bottom">
      <router-link
        to="/admin/dash-board"
        class="d-flex align-center text-decoration-none"
      >
        <template v-if="mini">
          <v-icon style="color: #1867c0">mdi-shield-account</v-icon>
        </template>
        <template v-else>
          <h2
            class="text-h6 font-weight-bold primary--text text-truncate text-center"
            style="color: #1867c0"
          >
            <v-icon>mdi-shield-account</v-icon> Admin Homing
          </h2>
        </template>
      </router-link>
      <v-spacer></v-spacer>
    </div>

    <!-- Navigation Menu -->
    <div class="sidebar-content">
      <v-list nav density="compact" class="pa-2">
        <template v-for="(item, index) in menuItems" :key="index">
          <!-- Items with children - Uses v-menu in mini mode -->
          <template v-if="item.children && item.children.length > 0">
            <!-- Use v-menu for mini mode -->
            <v-menu
              v-if="mini"
              offset-x
              :close-on-content-click="false"
              location="end"
            >
              <template v-slot:activator="{ props: menuProps }">
                <v-list-item
                  v-bind="menuProps"
                  :prepend-icon="item.icon"
                  :value="item.id"
                  class="rounded my-1"
                  :active="isGroupActiveById(item.id)"
                >
                  <v-tooltip activator="parent" location="end">
                    {{ item.title }}
                  </v-tooltip>
                </v-list-item>
              </template>

              <v-list width="200" class="pa-2" elevation="3">
                <v-list-item
                  v-for="(child, childIndex) in item.children"
                  :key="childIndex"
                  :prepend-icon="child.icon"
                  :title="child.title"
                  :value="child.title"
                  :to="child.to"
                  :active="currentRoute === child.to"
                  class="rounded"
                  density="comfortable"
                ></v-list-item>
              </v-list>
            </v-menu>

            <!-- Use list-group for normal mode -->
            <v-list-group
              v-else
              :value="item.id"
              :active="isGroupActiveById(item.id)"
              class="rounded child-compact"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  v-bind="props"
                  :prepend-icon="item.icon"
                  :title="item.title"
                  :value="item.id"
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
              ></v-list-item>
            </v-list-group>
          </template>

          <v-list-item
            v-else
            :prepend-icon="item.icon"
            :title="mini ? '' : item.title"
            :value="item.id"
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
    </div>

    <!-- Bottom Section -->
    <template v-slot:append>
      <div class="px-2 py-2 border-top">
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <div v-if="!mini" class="d-flex align-center justify-space-between">
              <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/81.jpg"
                title="John Doe"
                subtitle="Administrator"
                class="px-1"
              >
              </v-list-item>
              <v-btn
                v-bind="props"
                color="primary"
                icon="mdi-cog-outline"
                variant="text"
                size="small"
              ></v-btn>
            </div>
            <div v-else class="d-flex flex-column align-center">
              <v-avatar class="my-2" size="40">
                <v-img
                  src="https://randomuser.me/api/portraits/men/81.jpg"
                ></v-img>
              </v-avatar>
              <v-btn
                v-bind="props"
                color="primary"
                icon="mdi-cog-outline"
                variant="text"
                size="small"
              ></v-btn>
            </div>
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
              @click="emit('logout')"
            ></v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>

    <!-- Toggle Button -->
    <template v-if="!$vuetify.display.mobile">
      <div class="toggle-button-container">
        <v-btn
          color="primary"
          variant="flat"
          size="small"
          icon
          class="toggle-button"
          @click="updateMini(!mini)"
        >
          <v-icon>
            {{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}
          </v-icon>
        </v-btn>
      </div></template
    >
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { menuItems } from "@/utils/common";

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

const isGroupActiveById = (id) => {
  const item = menuItems.find((item) => item.id === id);
  if (item && item.children) {
    return item.children.some(
      (child) =>
        currentRoute.value === child.to ||
        currentRoute.value.startsWith(child.to + "/")
    );
  }
  return false;
};

const isItemActive = (item) => {
  return (
    currentRoute.value === item.to ||
    currentRoute.value.startsWith(item.to + "/")
  );
};

// Map URL path tiếng Anh với id tiếng Việt
const getMenuIdFromPath = (path) => {
  if (path.includes("/admin/user")) return 3;
  if (path.includes("/admin/product")) return 2;
  if (path.includes("/admin/dash-board")) return 1;
  if (path.includes("/admin/calendar")) return 4;
  if (path.includes("/admin/task")) return 5;
  return null;
};

const updateMini = (value) => {
  emit("update:miniSidebar", value);
};
</script>

<style scoped>
.vuexy-sidebar {
  position: fixed !important;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh !important;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  background: #fcfcfc;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
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
  overflow: visible; /* Changed from hidden to visible */
}

:deep(.v-list-item:hover) {
  background-color: rgba(var(--v-theme-primary), 0.05);
}

:deep(.v-list-item__title) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.child-compact > .v-list-item--child) {
  padding-left: 8px !important;
}

.child-item {
  margin-left: 0 !important;
}

.border-top {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.toggle-button-container {
  position: absolute;
  top: 50%;
  right: -14px;
  transform: translateY(-50%);
  z-index: 101;
}

.toggle-button {
  height: 28px !important;
  width: 28px !important;
  min-width: 0 !important;
  padding: 0 !important;
  border-radius: 50% !important;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
}

.toggle-button .v-icon {
  font-size: 18px !important;
}
</style>
