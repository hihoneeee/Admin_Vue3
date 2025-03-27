<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h2 class="text-h5 font-weight-medium">Danh sách đơn đặt hàng</h2>
      <div class="d-flex align-items-center" style="gap: 12px">
        <v-btn
          color="primary"
          variant="tonal"
          prepend-icon="mdi-file-export"
          class="rounded-lg text-capitalize text-capitalize text-caption"
        >
          Xuất
        </v-btn>
        <v-btn
          color="primary"
          variant="tonal"
          prepend-icon="mdi-file-import"
          class="rounded-lg text-capitalize text-capitalize text-caption"
        >
          Nhập
        </v-btn>
      </div>
    </div>

    <v-card flat border class="rounded-lg mb-4 pa-4">
      <div
        class="d-flex flex-wrap align-center gap-4 justify-content-between"
        style="gap: 1rem"
      >
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Tìm kiếm đơn hàng (Mã ĐH, Tên KH)"
          single-line
          hide-details
          density="compact"
          variant="outlined"
          rounded="lg"
          bg-color="surface"
        ></v-text-field>

        <v-select
          v-model="dateFilter"
          :items="dates"
          item-title="name"
          item-value="value"
          label="Lọc theo ngày"
          hide-details
          density="compact"
          variant="outlined"
          rounded="lg"
          bg-color="surface"
          class="filter-select"
          style="min-width: 150px"
        ></v-select>

        <v-select
          v-model="paymentStatusFilter"
          :items="paymentStatuses"
          item-title="name"
          item-value="value"
          label="Trạng thái thanh toán"
          hide-details
          density="compact"
          variant="outlined"
          rounded="lg"
          bg-color="surface"
          class="filter-select"
          style="min-width: 150px"
        ></v-select>
      </div>
    </v-card>

    <v-card flat border class="rounded-lg">
      <v-data-table
        :headers="headers"
        :items="filteredOrders"
        :search="search"
        :items-per-page="itemsPerPage"
        v-model:page="page"
        show-select
        hover
        class="elevation-0 custom-table"
      >
        <template v-slot:item.Order="{ item }">
          <router-link
            :to="`/admin/order/detail/${item.orderId}`"
            class="d-flex align-center gap-3 text-decoration-none"
          >
            <span
              class="text-subtitle font-weight-medium mb-0 text-primary order-id hover-underline"
            >
              #{{ item.orderId }}</span
            >
          </router-link>
        </template>

        <template v-slot:item.customer="{ item }">
          <div class="d-flex align-center" style="gap: 12px">
            <v-avatar size="30">
              <v-img :src="item.avatar" cover></v-img>
            </v-avatar>
            <p class="text-subtitle font-weight-medium mb-0 text-primary">
              {{ item.customerName }}
            </p>
          </div>
        </template>

        <template v-slot:item.payment="{ item }">
          <v-chip
            :color="getPaymentColor(item.paymentStatus)"
            size="small"
            label
          >
            {{ item.paymentStatus }}
          </v-chip>
        </template>

        <template v-slot:item.shipping="{ item }">
          <v-chip
            :color="getFulfillmentColor(item.fulfillmentStatus)"
            size="small"
            label
          >
            {{ item.fulfillmentStatus }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                color="primary"
                icon="mdi-dots-horizontal"
                variant="text"
                size="small"
                rounded
              ></v-btn>
            </template>

            <v-list width="220" elevation="3" class="pa-2">
              <v-list-item
                title="Chi tiết"
                density="comfortable"
                rounded="lg"
                @click="viewOrderDetails(item)"
              ></v-list-item>
              <v-list-item
                title="Chỉnh sửa"
                density="comfortable"
                rounded="lg"
                @click="editOrder(item)"
              ></v-list-item>
              <v-list-item
                title="Xóa"
                density="comfortable"
                rounded="lg"
                @click="deleteOrder(item)"
              ></v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const search = ref("");
const dateFilter = ref("Tất cả");
const paymentStatusFilter = ref("");
const page = ref(1);
const itemsPerPage = ref(5);

const dates = [
  { id: 1, name: "Tất cả", value: "all" },
  { id: 2, name: "Ngày hôm nay", value: "today" },
  { id: 3, name: "Ngày hôm trước", value: "yesterday" },
  { id: 4, name: "7 ngày trước", value: "7 days ago" },
  { id: 5, name: "30 ngày trước", value: "30 days ago" },
];

const paymentStatuses = [
  { name: "Tất cả", value: "" },
  { name: "Đã thanh toán", value: "Paid" },
  { name: "Chưa thanh toán", value: "Due" },
  { name: "Hoàn tiền", value: "Refunded" },
];

const headers = [
  { title: "Đơn hàng", key: "Order", sortable: false },
  { title: "Thời gian", key: "date", sortable: true },
  {
    title: "Khách hàng",
    key: "customer",
    sortable: true,
    align: "start" as const,
  },
  { title: "Trạng thái TT", key: "payment", sortable: true },
  { title: "Giao hàng", key: "shipping", sortable: true },
  { title: "Tổng đơn", key: "total", sortable: true },
  {
    title: "Hành động",
    key: "actions",
    sortable: false,
    align: "end" as const,
  },
];

const orders = ref([
  {
    orderId: "4544321",
    date: "04 February, 2024",
    customerName: "Yaga Masamichi",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    paymentStatus: "Paid",
    fulfillmentStatus: "Fulfilled",
    total: "$259.00",
  },
  {
    orderId: "1644322",
    date: "05 February, 2024",
    customerName: "Manami Suda",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    paymentStatus: "Paid",
    fulfillmentStatus: "Partially Fulfilled",
    total: "$1,099.00",
  },
  // Thêm nhiều đơn hàng hơn
  {
    orderId: "8244323",
    date: "06 February, 2024",
    customerName: "Okkotsu Yuta",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    paymentStatus: "Refunded",
    fulfillmentStatus: "Unfulfilled",
    total: "$209.00",
  },
]);

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchSearch =
      order.orderId.toLowerCase().includes(search.value.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.value.toLowerCase());

    const matchPaymentStatus =
      !paymentStatusFilter.value ||
      order.paymentStatus === paymentStatusFilter.value;

    // Bạn có thể thêm logic lọc theo ngày ở đây nếu cần
    return matchSearch && matchPaymentStatus;
  });
});

const getPaymentColor = (status) => {
  switch (status) {
    case "Paid":
      return "success";
    case "Due":
      return "warning";
    case "Refunded":
      return "error";
    default:
      return "default";
  }
};

const getFulfillmentColor = (status) => {
  switch (status) {
    case "Fulfilled":
      return "success";
    case "Partially Fulfilled":
      return "warning";
    case "Unfulfilled":
      return "error";
    default:
      return "default";
  }
};

// Các phương thức xử lý sự kiện
const viewOrderDetails = (order) => {
  // Xử lý logic xem chi tiết đơn hàng
  console.log("Xem chi tiết đơn hàng:", order);
};

const editOrder = (order) => {
  // Xử lý logic chỉnh sửa đơn hàng
  console.log("Chỉnh sửa đơn hàng:", order);
};

const deleteOrder = (order) => {
  // Xử lý logic xóa đơn hàng
  console.log("Xóa đơn hàng:", order);
};
</script>

<style scoped>
.custom-table {
  background-color: transparent;
}
.hover-underline {
  text-decoration: none;
}
.hover-underline:hover {
  text-decoration: underline;
}
</style>
