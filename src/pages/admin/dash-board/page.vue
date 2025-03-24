<template>
  <div>
    <h2 class="text-h5 font-weight-medium mb-6">Dashboard</h2>
    <VRow>
      <v-col cols="12" sm="6" lg="3">
        <v-card flat border class="rounded-lg">
          <v-card-text class="pa-5">
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-subtitle-2 text-grey-darken-1 mb-1">
                  TOTAL USERS
                </div>
                <div class="text-h4 font-weight-medium">2,845</div>
                <div class="d-flex align-center mt-1">
                  <v-icon size="small" color="success" class="me-1"
                    >mdi-arrow-up</v-icon
                  >
                  <span class="text-caption text-success font-weight-medium"
                    >12% from last month</span
                  >
                </div>
              </div>
              <v-avatar
                color="primary"
                rounded="lg"
                size="48"
                class="d-flex align-center justify-center"
              >
                <v-icon size="24" color="white">mdi-account-group</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Total Revenue -->
      <v-col cols="12" sm="6" lg="3">
        <v-card flat border class="rounded-lg">
          <v-card-text class="pa-5">
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-subtitle-2 text-grey-darken-1 mb-1">
                  TOTAL REVENUE
                </div>
                <div class="text-h4 font-weight-medium">$48,290</div>
                <div class="d-flex align-center mt-1">
                  <v-icon size="small" color="success" class="me-1"
                    >mdi-arrow-up</v-icon
                  >
                  <span class="text-caption text-success font-weight-medium"
                    >8.5% from last month</span
                  >
                </div>
              </div>
              <v-avatar
                color="success"
                rounded="lg"
                size="48"
                class="d-flex align-center justify-center"
              >
                <v-icon size="24" color="white">mdi-currency-usd</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Orders -->
      <v-col cols="12" sm="6" lg="3">
        <v-card flat border class="rounded-lg">
          <v-card-text class="pa-5">
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-subtitle-2 text-grey-darken-1 mb-1">
                  ORDERS
                </div>
                <div class="text-h4 font-weight-medium">1,253</div>
                <div class="d-flex align-center mt-1">
                  <v-icon size="small" color="success" class="me-1"
                    >mdi-arrow-up</v-icon
                  >
                  <span class="text-caption text-success font-weight-medium"
                    >5.2% from last month</span
                  >
                </div>
              </div>
              <v-avatar
                color="warning"
                rounded="lg"
                size="48"
                class="d-flex align-center justify-center"
              >
                <v-icon size="24" color="white">mdi-cart</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Visitors -->
      <v-col cols="12" sm="6" lg="3">
        <v-card flat border class="rounded-lg">
          <v-card-text class="pa-5">
            <div class="d-flex align-center justify-space-between">
              <div>
                <div class="text-subtitle-2 text-grey-darken-1 mb-1">
                  VISITORS
                </div>
                <div class="text-h4 font-weight-medium">45,678</div>
                <div class="d-flex align-center mt-1">
                  <v-icon size="small" color="error" class="me-1"
                    >mdi-arrow-down</v-icon
                  >
                  <span class="text-caption text-error font-weight-medium"
                    >3.8% from last month</span
                  >
                </div>
              </div>
              <v-avatar
                color="info"
                rounded="lg"
                size="48"
                class="d-flex align-center justify-center"
              >
                <v-icon size="24" color="white">mdi-eye</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </VRow>
  </div>
</template>

<script setup></script>

<style scoped>
.dashboard-card {
  border-radius: 8px;
  transition: transform 0.3s;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}
</style>
