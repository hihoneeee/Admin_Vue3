<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { productsItem, categoriesItem } from "@/utils/product";
import { TableEmty } from "@/components/index";

const dataProducts = ref(productsItem);

const router = useRouter();
const search = ref("");
const page = ref(1);
const itemsPerPage = ref(5);
const column = ref(["created_at", "description", "status"]);
const publishFilter = ref("Tất cả");
const categoryFilter = ref("Tất cả");
const stockFilter = ref("Tất cả");
const categories = ref(categoriesItem);

const headers = [
  { title: "ID", key: "id", sortable: true },
  {
    title: "Sản phẩm",
    key: "product",
    sortable: false,
    align: "start" as const,
  },
  { title: "Mô tả", key: "description", sortable: true },
  { title: "Kho", key: "stock", sortable: true },
  { title: "Trạng thái", key: "status", sortable: true },
  { title: "Danh mục", key: "category", sortable: true },
  { title: "Ngày tạo", key: "created_at", sortable: true },
  {
    title: "Hành động",
    key: "actions",
    sortable: false,
    align: "end" as const,
  },
];

const filteredProducts = computed(() => {
  let filtered = [...dataProducts.value];

  // Lọc theo trạng thái
  if (publishFilter.value !== "Tất cả") {
    filtered = filtered.filter(
      (product) =>
        product.status ===
        (publishFilter.value === "Công khai" ? "published" : "draft")
    );
  }

  // Lọc theo danh mục
  if (categoryFilter.value !== "Tất cả") {
    filtered = filtered.filter(
      (product) => product.category === categoryFilter.value
    );
  }

  // Lọc theo tình trạng kho
  if (stockFilter.value !== "Tất cả") {
    if (stockFilter.value === "Còn hàng") {
      filtered = filtered.filter((product) => product.stock > 0);
    } else if (stockFilter.value === "Hết hàng") {
      filtered = filtered.filter((product) => product.stock === 0);
    }
  }

  return filtered;
});

const getStatusColor = (status) => {
  const colors = {
    published: "success",
    draft: "warning",
  };
  return colors[status] || "grey";
};

const getStockStatus = (stock) => {
  if (stock === 0) return { text: "Hết hàng", color: "error" };
  if (stock < 10) return { text: "Sắp hết", color: "warning" };
  return { text: `${stock} sản phẩm`, color: "primary" };
};

const openEditModal = (id) => {
  router.push(`/admin/product/edit/${id}`);
};

const deleteItem = (item) => {
  // Hiển thị dialog xác nhận
  if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${item.name}"?`)) {
    // Xóa sản phẩm
    dataProducts.value = dataProducts.value.filter(
      (product) => product.id !== item.id
    );
  }
};

const createNewProduct = () => {
  router.push("/admin/product/create");
};

const hasProducts = computed(() => {
  return dataProducts.value.length > 0;
});
</script>

<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-6">
      <h2 class="text-h5 font-weight-medium">Danh sách sản phẩm</h2>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus-circle"
        class="rounded-lg"
        @click="createNewProduct"
      >
        Thêm
      </v-btn>
    </div>

    <!-- Filter Card -->
    <v-card flat border class="rounded-lg mb-4 pa-4">
      <div class="d-flex flex-wrap align-center gap-4" style="gap: 1rem;">
        <v-select
          v-model="categoryFilter"
          :items="categories"
          label="Danh mục"
          hide-details
          density="compact"
          variant="outlined"
          rounded="lg"
          bg-color="surface"
          class="filter-select"
          style="min-width: 150px; margin-right: 1rem"
        ></v-select>

        <v-select
          v-model="publishFilter"
          :items="['Tất cả', 'Công khai', 'Bản nháp']"
          label="Trạng thái"
          hide-details
          density="compact"
          variant="outlined"
          rounded="lg"
          bg-color="surface"
          class="filter-select"
          style="min-width: 150px; margin-right: 1rem"
        ></v-select>

        <div class="d-flex flex-grow-1 align-center">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Tìm kiếm sản phẩm"
            single-line
            hide-details
            density="compact"
            variant="outlined"
            rounded="lg"
            bg-color="surface"
            class="flex-grow-1"
          ></v-text-field>

          <v-btn
            icon="mdi-eye-outline"
            variant="text"
            color="primary"
            class="ml-2"
          >
            <v-menu offset-y>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  color="primary"
                  icon="mdi-eye-outline"
                  variant="text"
                  size="small"
                  rounded
                ></v-btn>
              </template>

              <v-list width="220" elevation="3" class="pa-2">
                <v-list-subheader>Hiển thị cột</v-list-subheader>
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
                  class="mb-2"
                ></v-text-field>
                <v-divider class="my-2"></v-divider>
                <v-checkbox
                  v-model="column"
                  label="ID"
                  value="id"
                  hide-details
                  density="compact"
                ></v-checkbox>
                <v-checkbox
                  v-model="column"
                  label="Giá"
                  value="price"
                  hide-details
                  density="compact"
                ></v-checkbox>
                <v-checkbox
                  v-model="column"
                  label="Kho"
                  value="stock"
                  hide-details
                  density="compact"
                ></v-checkbox>
                <v-checkbox
                  v-model="column"
                  label="Trạng thái"
                  value="status"
                  hide-details
                  density="compact"
                ></v-checkbox>
                <v-checkbox
                  v-model="column"
                  label="Danh mục"
                  value="category"
                  hide-details
                  density="compact"
                ></v-checkbox>
                <v-checkbox
                  v-model="column"
                  label="Ngày tạo"
                  value="created_at"
                  hide-details
                  density="compact"
                ></v-checkbox>
              </v-list>
            </v-menu>
          </v-btn>
        </div>
      </div>
    </v-card>

    <!-- Data Table -->
    <v-card flat border class="rounded-lg">
      <template v-if="hasProducts && filteredProducts.length > 0">
        <v-data-table
          :headers="headers"
          :items="filteredProducts"
          :items-per-page="itemsPerPage"
          v-model:page="page"
          :search="search"
          hover
          class="elevation-0 custom-table"
        >
          <template v-slot:item.product="{ item }">
            <div class="d-flex align-center gap-3">
              <v-avatar size="48" rounded="lg">
                <v-img :src="item.thumbnail" cover></v-img>
              </v-avatar>
              <div>
                <p class="text-subtitle-1 font-weight-medium mb-0">
                  {{ item.name }}
                </p>
                <p
                  class="text-caption text-medium-emphasis mb-0 text-truncate"
                  style="max-width: 200px"
                >
                  {{ item.price }}
                </p>
              </div>
            </div>
          </template>

          <!-- Cột kho -->
          <template v-slot:item.stock="{ item }">
            <v-chip
              :color="getStockStatus(item.stock).color"
              size="small"
              class="text-capitalize"
              variant="tonal"
            >
              {{ getStockStatus(item.stock).text }}
            </v-chip>
          </template>

          <!-- Cột trạng thái -->
          <template v-slot:item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
              size="small"
              class="text-capitalize"
              variant="tonal"
            >
              {{ item.status === "published" ? "Công khai" : "Bản nháp" }}
            </v-chip>
          </template>

          <!-- Cột danh mục -->
          <template v-slot:item.category="{ item }">
            <span>{{ item.category }}</span>
          </template>

          <!-- Cột hành động -->
          <template v-slot:item.actions="{ item }">
            <div class="d-flex gap-2">
              <v-btn
                icon
                size="small"
                variant="text"
                color="primary"
                @click="openEditModal(item.id)"
              >
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
              <v-btn
                icon
                size="small"
                variant="text"
                color="error"
                @click="deleteItem(item)"
              >
                <v-icon>mdi-delete-outline</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </template>

      <!-- Empty state -->
      <template v-else>
        <TableEmty
          icon="mdi-package-variant"
          value="Thêm sản phẩm mới"
          title="Không có sản phẩm"
          description="Chưa có sản phẩm nào trong hệ thống"
          @create="createNewProduct"
        />
      </template>
    </v-card>
  </div>
</template>

<style scoped>
.custom-table :deep(td) {
  padding: 16px !important;
}

.filter-select {
  max-width: 200px;
}

.select-items-per-page :deep(.v-field__input) {
  padding-top: 4px;
  padding-bottom: 4px;
  min-height: auto;
}

@media (max-width: 960px) {
  .filter-select {
    min-width: 100% !important;
  }
}
</style>
