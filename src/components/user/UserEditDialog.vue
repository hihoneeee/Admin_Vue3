<!-- UserEditDialog.vue -->
<template>
  <v-dialog v-model="dialogVisible" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Chỉnh sửa thông tin người dùng</span>
      </v-card-title>
      <v-card-text>
        <v-container v-if="userData">
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="userData.userName"
                label="Tên người dùng"
                required
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="userData.email" label="Email" required />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="userData.phone" label="Số điện thoại" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="userData.role"
                :items="['Admin', 'User', 'Manager']"
                label="Vai trò"
                required
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
          Hủy
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveChanges">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from "vue";
import { dataUsers } from "@/utils/common";

// Định nghĩa interface cho User
interface User {
  id: number | string;
  userName: string;
  email: string;
  phone: string;
  role: string;
}

// Định nghĩa props và emits
const props = defineProps<{
  modelValue: boolean;
  userId: string | number | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "save", user: User): void;
}>();

// Lấy giá trị reactive từ props
const { modelValue, userId } = toRefs(props);

// Khai báo các state reactive
const dialogVisible = ref<boolean>(false);
const userData = ref<User | null>(null);

// Đồng bộ trạng thái của dialog với props modelValue
watch(modelValue, (newVal) => {
  dialogVisible.value = newVal;
  if (newVal && userId.value !== null) {
    loadUserData();
  }
});

// Khi dialog đóng, emit sự kiện update và reset dữ liệu
watch(dialogVisible, (newVal) => {
  emit("update:modelValue", newVal);
  if (!newVal) {
    userData.value = null;
  }
});

// Hàm tải dữ liệu người dùng dựa trên userId
const loadUserData = (): void => {
  const user = dataUsers.find((user) => user.id === userId.value);
  if (user) {
    // Tạo bản sao để tránh thay đổi trực tiếp dữ liệu gốc
    userData.value = { ...user };
  } else {
    console.error("Không tìm thấy người dùng với ID:", userId.value);
    closeDialog();
  }
};

// Hàm đóng dialog
const closeDialog = (): void => {
  dialogVisible.value = false;
};

// Hàm lưu thay đổi và emit dữ liệu chỉnh sửa ra ngoài
const saveChanges = (): void => {
  if (!userData.value) return;
  emit("save", userData.value);
  closeDialog();
};
</script>
