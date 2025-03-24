<template>
  <v-container fluid class="not-found-container fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="5" xl="4">
        <v-card class="mx-auto text-center py-8 rounded-xl" elevation="8">
          <v-card-item>
            <v-icon
              color="error"
              size="128"
              icon="mdi-alert-circle-outline"
              class="mb-4"
            ></v-icon>

            <v-card-title class="text-h2 font-weight-bold mb-2">
              404
            </v-card-title>

            <v-card-subtitle class="text-h5 mb-4">
              Trang không tìm thấy
            </v-card-subtitle>

            <v-card-text class="text-body-1 mb-6">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di
              chuyển.
            </v-card-text>

            <v-divider class="mb-6"></v-divider>

            <v-card-actions class="justify-center">
              <v-btn
                color="primary"
                size="large"
                to="/"
                prepend-icon="mdi-home"
                variant="elevated"
                class="px-6"
              >
                Về trang chủ
              </v-btn>

              <v-btn
                color="secondary"
                size="large"
                @click="goBack"
                prepend-icon="mdi-arrow-left"
                variant="tonal"
                class="ml-4 px-6"
              >
                Quay lại
              </v-btn>
            </v-card-actions>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.not-found-container {
  background-color: rgb(245, 245, 245);
  min-height: 100vh;
}
</style>
