<template>
  <div class="container-fluid p-0">
    <v-container>
      <v-btn
        variant="outlined"
        class="d-flex items-center gap-2 mb-10"
        @click="$router.push('/admin/user/create')"
      >
        <font-awesome-icon :icon="faCirclePlus" /> Create
      </v-btn>
      <v-card>
        <v-card-title> Danh sách người dùng </v-card-title>
        <div class="d-flex items-center justify-between px-4 py-2">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm"
            single-line
            hide-details
            class="mr-4 w-30 v-text-field"
            variant="outlined"
            density="compact"
          ></v-text-field>
          <v-select
            v-model="roleFilter"
            :items="['Tất cả', 'Admin', 'User', 'Manager']"
            label="Lọc theo vai trò"
            hide-details
            class="w-auto v-select"
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

          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-btn
                icon
                size="small"
                color="primary"
                class="mr-2"
                @click="openEditModal(item.id)"
              >
                <font-awesome-icon :icon="faEdit" />
              </v-btn>
              <v-btn icon size="small" color="error" @click="deleteItem(item)">
                <font-awesome-icon :icon="faTrash" />
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card>

      <UserEditDialog
        v-model="editDialog"
        :userId="editUserId"
        @save="handleSaveUser"
      />
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { dataUsers } from "@/utils/common.ts";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCirclePlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { UserEditDialog } from "@/components";

const search = ref("");
const page = ref(1);
const roleFilter = ref("Tất cả");
const editDialog = ref(false);
const editUserId = ref(null);

const headers = [
  { title: "Avatar", key: "avatar", sortable: false },
  { title: "ID", key: "id", sortable: true },
  { title: "Tên người dùng", key: "userName", sortable: true },
  { title: "Email", key: "email", sortable: true },
  { title: "Số điện thoại", key: "phone", sortable: true },
  { title: "Vai trò", key: "role", sortable: true },
  { title: "Hành động", key: "actions", sortable: false },
];

const filteredUsers = computed(() => {
  if (roleFilter.value === "Tất cả") {
    return dataUsers;
  } else {
    return dataUsers.filter((user) => user.role === roleFilter.value);
  }
});

const openEditModal = (id) => {
  editUserId.value = id;
  editDialog.value = true;
};

const handleSaveUser = (updatedUser) => {
  const index = dataUsers.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) {
    dataUsers[index] = { ...updatedUser };
    console.log("Đã cập nhật người dùng:", dataUsers[index]);
  }

  // Reset ID
  editUserId.value = null;
};

const deleteItem = (item) => {
  console.log("Xóa người dùng:", item.id);
  // Thêm logic hiển thị dialog xác nhận xóa
};
</script>

<style>
.v-text-field {
  width: 30%;
}
.v-select {
  width: 30%;
}
</style>
