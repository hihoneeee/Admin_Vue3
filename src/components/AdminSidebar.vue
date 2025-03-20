<template>
  <v-navigation-drawer permanent width="260" class="admin-sidebar">
    <v-list-item class="px-4 py-2 my-4">
      <div class="text-h6">Admin Panel</div>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/admin/dash-board"
        value="dashboard"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-account"
        title="Users"
        to="/admin/user"
        value="users"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-shopping"
        title="Products"
        to="/admin/products"
        value="products"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-chart-bar"
        title="Analytics"
        to="/admin/analytics"
        value="analytics"
      ></v-list-item>

      <v-list-item
        prepend-icon="mdi-cog"
        title="Settings"
        to="/admin/settings"
        value="settings"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup></script>

<style scoped>
.admin-sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  height: 100vh;
}
</style>
