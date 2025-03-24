<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h2 class="text-h5 font-weight-medium">Danh sách người dùng</h2>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus-circle"
        class="rounded-lg"
        @click="$router.push('/admin/user/create')"
      >
        Tạo mới
      </v-btn>
    </div>

    <v-card flat border class="rounded-lg mb-4">
      <v-card-text class="py-4">
        <div class="d-flex justify-content-between gap-2">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Tìm kiếm"
            single-line
            hide-details
            density="compact"
            variant="outlined"
            rounded="lg"
            bg-color="surface"
            style="margin-right: 2rem"
          ></v-text-field>
          <v-select
            v-model="roleFilter"
            :items="['Tất cả', 'Admin', 'User', 'Manager']"
            label="Lọc theo vai trò"
            hide-details
            density="compact"
            variant="outlined"
            rounded="lg"
            bg-color="surface"
            style="margin-left: 2rem"
          ></v-select>
        </div>
      </v-card-text>
    </v-card>

    <v-card flat border class="rounded-lg">
      <v-data-table
        :headers="headers"
        :items="filteredUsers"
        :items-per-page="5"
        :page.sync="page"
        :search="search"
        hover
        class="data-table-border-none"
      >
        <template v-slot:item.avatar="{ item }">
          <v-avatar size="40">
            <v-img :src="item.avatar" cover></v-img>
          </v-avatar>
        </template>

        <template v-slot:item.role="{ item }">
          <v-chip
            :color="getRoleColor(item.role)"
            size="small"
            class="text-capitalize"
            variant="tonal"
          >
            {{ item.role }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="d-flex gap-2">
            <v-btn
              icon
              size="small"
              variant="text"
              color="primary"
              @click="openEditModal(item.id)"
            >
              <font-awesome-icon :icon="faEdit" />
            </v-btn>
            <v-btn
              icon
              size="small"
              variant="text"
              color="error"
              @click="deleteItem(item)"
            >
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
  { title: "Avatar", key: "avatar", sortable: false, align: "start" },
  { title: "ID", key: "id", sortable: true },
  { title: "Tên", key: "userName", sortable: true },
  { title: "Email", key: "email", sortable: true },
  { title: "Số điện thoại", key: "phone", sortable: true },
  { title: "Vai trò", key: "role", sortable: true },
  { title: "Hành động", key: "actions", sortable: false, align: "end" },
];

const filteredUsers = computed(() => {
  if (roleFilter.value === "Tất cả") {
    return dataUsers;
  } else {
    return dataUsers.filter((user) => user.role === roleFilter.value);
  }
});

const getRoleColor = (role) => {
  const colors = {
    Admin: "primary",
    User: "info",
    Manager: "warning",
  };
  return colors[role] || "grey";
};

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

<style scoped>
.min-width-200 {
  min-width: 200px;
}

:deep(.data-table-border-none) {
  border: none !important;
}

:deep(.v-table) {
  background: transparent !important;
  border-radius: 8px;
}

:deep(.v-table th) {
  font-size: 0.875rem !important;
  color: rgba(var(--v-theme-on-surface), 0.7) !important;
  font-weight: 600 !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgb(var(--v-theme-surface)) !important;
  padding: 12px 16px !important;
}

:deep(.v-table td) {
  padding: 10px 16px !important;
  height: auto !important;
  color: rgb(var(--v-theme-on-surface)) !important;
}

:deep(.v-card-text) {
  padding: 16px 24px !important;
}
</style>
