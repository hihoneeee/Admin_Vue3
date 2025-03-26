<template>
  <v-card flat>
    <v-card-title class="d-flex align-center mb-4">
      <v-icon left class="mr-2">mdi-shield-outline</v-icon>
      Privacy & Protection
    </v-card-title>

    <v-card-text>
      <!-- Password Modification Section -->
      <v-row class="mb-6">
        <v-col cols="12">
          <v-card variant="outlined" class="pa-4">
            <div class="d-flex justify-space-between align-center">
              <div>
                <h3 class="text-h6 mb-2">Password Modification</h3>
                <p class="text-caption text-medium-emphasis">
                  Update your password regularly to enhance account security.
                  Ensure your new password is strong and unique.
                </p>
                <v-chip color="info" variant="tonal" size="small" class="mt-2">
                  Your password was last updated on 07/08/22
                </v-chip>
              </div>
              <v-btn
                color="primary"
                variant="outlined"
                @click="openPasswordChangeDialog"
              >
                Change password
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Two Factor Authentication Section -->
      <v-row class="mb-6">
        <v-col cols="12">
          <v-card variant="outlined" class="pa-4">
            <div class="d-flex justify-space-between align-center">
              <div>
                <h3 class="text-h6 mb-2">Two Factor Authentication</h3>
                <p class="text-caption text-medium-emphasis">
                  We will ask for OTP whenever we detect login from an
                  unrecognised device.
                </p>
                <v-radio-group v-model="otpMethod" inline class="mt-2">
                  <v-radio
                    label="Send a text message to (***) ***-**78"
                    value="sms"
                  ></v-radio>
                  <v-radio
                    label="Send an email to *****hing@email.com"
                    value="email"
                  ></v-radio>
                </v-radio-group>
              </div>
              <v-switch
                v-model="twoFactorEnabled"
                color="primary"
                label="Enable"
                hide-details
              ></v-switch>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Alternate Login Method -->
      <v-row>
        <v-col cols="12">
          <v-card variant="outlined" class="pa-4">
            <div class="d-flex justify-space-between align-center">
              <div>
                <h3 class="text-h6 mb-2">Alternate Login Method</h3>
                <p class="text-caption text-medium-emphasis">
                  Add an additional login method for easier account access.
                </p>
              </div>
              <v-btn
                color="primary"
                variant="outlined"
                @click="openAlternateLoginDialog"
              >
                Add Method
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const twoFactorEnabled = ref(true);
const otpMethod = ref("sms");

const openPasswordChangeDialog = () => {
  // Implement password change logic
  console.log("Open password change dialog");
};

const openAlternateLoginDialog = () => {
  // Implement alternate login method logic
  console.log("Open alternate login method dialog");
};
</script>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>
