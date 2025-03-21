<template>
  <div>
    <h2 class="text-h4 mb-6">Dashboard</h2>

    <v-row>
      <!-- Total Users -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="dashboard-card">
          <v-card-text>
            <div class="d-flex align-center">
              <div>
                <div class="text-overline mb-1">TOTAL USERS</div>
                <div class="text-h4">2,845</div>
                <div class="text-caption text-success">
                  <v-icon size="small" color="success">mdi-arrow-up</v-icon>
                  12% from last month
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-avatar color="primary" rounded size="50" class="elevation-1">
                <v-icon size="28" color="white">mdi-account-group</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Total Revenue -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="dashboard-card">
          <v-card-text>
            <div class="d-flex align-center">
              <div>
                <div class="text-overline mb-1">TOTAL REVENUE</div>
                <div class="text-h4">$48,290</div>
                <div class="text-caption text-success">
                  <v-icon size="small" color="success">mdi-arrow-up</v-icon>
                  8.5% from last month
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-avatar color="success" rounded size="50" class="elevation-1">
                <v-icon size="28" color="white">mdi-currency-usd</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Orders -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="dashboard-card">
          <v-card-text>
            <div class="d-flex align-center">
              <div>
                <div class="text-overline mb-1">ORDERS</div>
                <div class="text-h4">1,253</div>
                <div class="text-caption text-success">
                  <v-icon size="small" color="success">mdi-arrow-up</v-icon>
                  5.2% from last month
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-avatar color="warning" rounded size="50" class="elevation-1">
                <v-icon size="28" color="white">mdi-cart</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Visitors -->
      <v-col cols="12" sm="6" lg="3">
        <v-card class="dashboard-card">
          <v-card-text>
            <div class="d-flex align-center">
              <div>
                <div class="text-overline mb-1">VISITORS</div>
                <div class="text-h4">45,678</div>
                <div class="text-caption text-error">
                  <v-icon size="small" color="error">mdi-arrow-down</v-icon>
                  3.8% from last month
                </div>
              </div>
              <v-spacer></v-spacer>
              <v-avatar color="info" rounded size="50" class="elevation-1">
                <v-icon size="28" color="white">mdi-eye</v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
