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
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="userData.email"
                label="Email"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="userData.phone"
                label="Số điện thoại"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="userData.role"
                :items="['Admin', 'User', 'Manager']"
                label="Vai trò"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
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

<script setup>
import { ref, watch, toRefs } from "vue";
import { dataUsers } from "@/utils/common.ts";

const props = defineProps({
  modelValue: Boolean,
  userId: {
    type: [String, Number],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const { modelValue, userId } = toRefs(props);
const dialogVisible = ref(false);
const userData = ref(null);

// Theo dõi thay đổi của prop modelValue để cập nhật biến local
watch(modelValue, (newVal) => {
  dialogVisible.value = newVal;
  if (newVal && userId.value) {
    loadUserData();
  }
});

// Theo dõi thay đổi của biến local để emit event
watch(dialogVisible, (newVal) => {
  emit("update:modelValue", newVal);
  if (!newVal) {
    userData.value = null;
  }
});

// Tải dữ liệu người dùng dựa trên ID
const loadUserData = () => {
  const user = dataUsers.find((user) => user.id === userId.value);
  if (user) {
    userData.value = { ...user };
  } else {
    console.error("Không tìm thấy người dùng với ID:", userId.value);
    closeDialog();
  }
};

// Đóng dialog
const closeDialog = () => {
  dialogVisible.value = false;
};

// Lưu thay đổi
const saveChanges = () => {
  if (!userData.value) return;

  // Emit event save với dữ liệu đã chỉnh sửa
  emit("save", userData.value);
  closeDialog();
};
</script>
