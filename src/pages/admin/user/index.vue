<template>
  <v-container>
    <v-card>
      <v-card-title> Danh sách người dùng </v-card-title>

      <div class="d-flex items-center justify-between px-4 py-2">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Tìm kiếm"
          single-line
          hide-details
          class="mr-4 w-30"
          variant="outlined"
          density="compact"
        ></v-text-field>
        <v-select
          v-model="roleFilter"
          :items="['Tất cả', 'Admin', 'User', 'Manager']"
          label="Lọc theo vai trò"
          hide-details
          class="w-auto"
          variant="outlined"
          density="compact"
        ></v-select>
      </div>

      <v-data-table
        :headers="headers"
        :items="filteredUsers"
        :items-per-page="5"
        :page.sync="page"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.avatar="{ item }">
          <v-avatar size="40">
            <v-img :src="item.avatar"></v-img>
          </v-avatar>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { dataUsers } from "@/utils/common.ts";
const search = ref("");
const page = ref(1);
const roleFilter = ref("Tất cả");

const headers = [
  { title: "Avatar", key: "avatar", sortable: false },
  { title: "ID", key: "id", sortable: true },
  { title: "Tên người dùng", key: "userName", sortable: true },
  { title: "Email", key: "email", sortable: true },
  { title: "Số điện thoại", key: "phone", sortable: true },
  { title: "Vai trò", key: "role", sortable: true },
];

const filteredUsers = computed(() => {
  if (roleFilter.value === "Tất cả") {
    return dataUsers;
  } else {
    return dataUsers.filter((user) => user.role === roleFilter.value);
  }
});
</script>
