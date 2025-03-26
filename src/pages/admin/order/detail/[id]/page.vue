<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { orderItem } from "@/utils/order";

export default defineComponent({
  name: "OrderDetails",
  setup() {
    const order = ref(orderItem[0]);

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const subtotal = computed(() =>
      order.value.dataProduct.reduce((sum, product) => sum + product.price, 0)
    );

    const shipping = ref(8.0);
    const tax = computed(() => subtotal.value * 0.1);
    const discountTotal = computed(() =>
      order.value.discounts.reduce((sum, discount) => sum + discount.amount, 0)
    );
    const total = computed(
      () => subtotal.value + shipping.value + tax.value - discountTotal.value
    );

    return {
      order,
      formatDate,
      subtotal,
      shipping,
      tax,
      discountTotal,
      total,
    };
  },
});
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="mb-6 pa-4">
          <div class="d-flex justify-space-between align-center mb-4">
            <div>
              <h2 class="text-h5 font-weight-medium">
                Đơn hàng #{{ order.orderCode }}
              </h2>
              <div class="text-caption text-grey">
                Tracking Number: {{ order.trackingNumber }}
              </div>
            </div>
            <div class="d-flex align-items-center" style="gap: 12px">
              <v-btn
                color="primary"
                variant="tonal"
                prepend-icon="mdi-printer"
                class="rounded-lg text-capitalize"
              >
                In máy
              </v-btn>
            </div>
          </div>
          <div class="d-flex flex-column align-items-end">
            <v-card-text class="text-caption pa-0">
              <div class="text-grey-darken-2">
                Placed on <strong>{{ formatDate(order.created_at) }}</strong>
              </div>
              <div class="text-grey-darken-2">
                {{ order.quantity }} items, Total:
                {{ total.toLocaleString() }} $
              </div>
            </v-card-text>
          </div>
        </v-card>

        <!-- Order Status Card -->
        <v-card class="mb-6 pa-4">
          <v-card-title class="text-subtitle-1">Order Status</v-card-title>
          <v-card-text>
            <v-timeline align="start" side="end">
              <v-timeline-item
                v-for="(status, index) in order.status.history"
                :key="index"
                :dot-color="
                  index === order.status.history.length - 1 ? 'primary' : 'grey'
                "
              >
                <template v-slot:opposite>
                  <div class="text-caption text-grey">
                    {{ formatDate(status.date) }}
                  </div>
                </template>
                <div>
                  <div class="font-weight-bold">{{ status.state }}</div>
                  <div class="text-caption text-grey">
                    Location: {{ status.location }}
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>

        <!-- Products Card -->
        <v-card class="mb-6 pa-4">
          <v-card-title>Order Items</v-card-title>
          <v-card-text>
            <template
              v-for="(product, index) in order.dataProduct"
              :key="index"
            >
              <v-divider v-if="index > 0" class="my-4"></v-divider>
              <v-row>
                <v-col cols="3">
                  <v-img :src="product.image" contain></v-img>
                </v-col>
                <v-col cols="9">
                  <h3>{{ product.name }}</h3>
                  <p>Sold by {{ product.seller }}</p>
                  <v-row>
                    <v-col cols="6">
                      <p>Size: {{ product.size }}</p>
                      <p>Color: {{ product.color }}</p>
                      <p>SKU: {{ product.sku }}</p>
                    </v-col>
                    <v-col cols="6">
                      <p>Category: {{ product.category }}</p>
                      <p>
                        Warranty: {{ product.warranty.type }} ({{
                          product.warranty.period
                        }})
                      </p>
                    </v-col>
                  </v-row>
                  <div class="text-h6 text-right">
                    {{ product.price.toLocaleString() }} $
                  </div>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>

        <!-- Payment Summary Card -->
        <v-card class="mb-6 pa-4">
          <v-card-title>Payment Summary</v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-grey-darken-1">Subtotal:</span>
              <span>{{ subtotal.toLocaleString() }} $</span>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-grey-darken-1">Shipping:</span>
              <span>{{ shipping.toLocaleString() }} $</span>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-grey-darken-1">Tax:</span>
              <span>{{ tax.toLocaleString() }} $</span>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between mb-2">
              <span class="text-grey-darken-1">Discounts:</span>
              <span class="text-success"
                >-{{ discountTotal.toLocaleString() }} $</span
              >
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between">
              <span class="font-weight-medium">Total:</span>
              <span class="font-weight-bold"
                >{{ total.toLocaleString() }} $</span
              >
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Sidebar -->
      <v-col cols="12" md="4">
        <!-- Customer Information Card -->
        <v-card class="mb-6 pa-4">
          <v-card-title>Customer Information</v-card-title>
          <v-card-text>
            <div class="d-flex align-center mb-4">
              <v-avatar class="mr-4">
                <v-img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                ></v-img>
              </v-avatar>
              <div>
                <div class="text-primary font-weight-bold">
                  {{ order.dataUser.userName }}
                </div>
                <div class="text-caption text-grey">
                  Customer Type: {{ order.dataUser.customerType }}
                </div>
                <div class="text-caption text-grey">
                  Member Since: {{ order.dataUser.memberSince }}
                </div>
              </div>
            </div>
            <v-divider class="mb-3"></v-divider>
            <div class="d-flex align-center mb-2">
              <v-icon size="small" class="mr-2">mdi-email-outline</v-icon>
              {{ order.dataUser.email }}
            </div>
            <div class="d-flex align-center">
              <v-icon size="small" class="mr-2">mdi-phone-outline</v-icon>
              {{ order.dataUser.phone }}
            </div>
          </v-card-text>
        </v-card>

        <!-- Shipping Information Card -->
        <v-card class="mb-6 pa-4">
          <v-card-title class="text-h6 font-weight-bold mb-4"
            >Shipping Information</v-card-title
          >
          <v-card-text>
            <div class="mb-4">
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Shipping Address
              </div>
              <div class="text-body-1">{{ order.address.street }}</div>
              <div class="text-body-2 text-grey-darken-1">
                {{ order.address.city }}, {{ order.address.state }}
                {{ order.address.zipCode }}
              </div>
              <div class="text-body-2 text-grey-darken-1">
                {{ order.address.country }}
              </div>
              <div class="text-caption text-grey">
                Address Type: {{ order.address.type }}
              </div>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div>
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Shipping Details
              </div>
              <div class="d-flex align-center mb-1">
                <span class="text-grey-darken-1">Method:</span>
                <span class="ml-2 text-body-2">{{
                  order.shipping.method
                }}</span>
              </div>
              <div class="d-flex align-center mb-1">
                <span class="text-grey-darken-1">Carrier:</span>
                <span class="ml-2 text-body-2">{{
                  order.shipping.carrier
                }}</span>
              </div>
              <div class="d-flex align-center mb-3">
                <span class="text-grey-darken-1">Estimated Delivery:</span>
                <span class="ml-2 text-body-2 font-weight-medium">
                  {{
                    new Date(
                      order.shipping.estimatedDelivery
                    ).toLocaleDateString()
                  }}
                </span>
              </div>
              <v-btn
                :href="order.shipping.trackingUrl"
                target="_blank"
                color="primary"
                variant="tonal"
                class="mt-2 text-capitalize"
                size="small"
              >
                Track Shipment
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Payment Details Card -->
        <v-card class="mb-6 pa-4">
          <v-card-title class="text-h6 font-weight-bold mb-4"
            >Payment Details</v-card-title
          >
          <v-card-text>
            <div class="mb-4">
              <div class="d-flex align-center mb-3">
                <v-avatar
                  size="42"
                  class="mr-3"
                  color="primary"
                  variant="tonal"
                >
                  <v-icon size="24">mdi-credit-card</v-icon>
                </v-avatar>
                <div>
                  <div class="text-subtitle-1 font-weight-medium">
                    {{ order.payment.cardType }}
                    <span class="text-grey-darken-1"
                      >•••• {{ order.payment.lastFourDigits }}</span
                    >
                  </div>
                  <div class="text-caption text-grey">
                    Transaction ID:
                    <span class="font-weight-medium">{{
                      order.payment.transactionId
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <v-divider class="my-4"></v-divider>

            <div>
              <div class="text-subtitle-1 font-weight-medium mb-2">
                Billing Address
              </div>
              <v-chip size="small" color="primary" variant="flat" class="mb-2">
                Default Billing
              </v-chip>
              <div class="text-body-1">
                {{ order.payment.billingAddress.street }}
              </div>
              <div class="text-body-2 text-grey-darken-1">
                {{ order.payment.billingAddress.city }},
                {{ order.payment.billingAddress.state }}
                {{ order.payment.billingAddress.zipCode }}
              </div>
              <div class="text-body-2 text-grey-darken-1">
                {{ order.payment.billingAddress.country }}
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Additional Information Card -->
        <v-card class="pa-4">
          <v-card-title>Additional Information</v-card-title>
          <v-card-text>
            <div class="mb-3">
              <div class="font-weight-bold">Customer Notes</div>
              <div class="text-grey">
                {{ order.notes.customerNote }}
              </div>
            </div>
            <v-divider class="mb-3"></v-divider>
            <div class="mb-3">
              <div class="font-weight-bold">Staff Notes</div>
              <div class="text-grey">
                {{ order.notes.staffNote }}
              </div>
            </div>
            <v-divider class="mb-3"></v-divider>
            <div>
              <div class="font-weight-bold">Return Policy</div>
              <div>
                Returns:
                {{ order.returnPolicy.allowReturn ? "Allowed" : "Not Allowed" }}
              </div>
              <div>Return Period: {{ order.returnPolicy.period }}</div>
              <div class="text-caption text-grey">
                Conditions: {{ order.returnPolicy.conditions }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.v-list-item {
  padding: 0;
}
</style>
