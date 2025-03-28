<template>
  <v-card flat class="privacy-protection-card">
    <v-card-title class="d-flex align-center mb-4">
      <v-icon left class="mr-2" color="primary" size="24"
        >mdi-shield-outline</v-icon
      >
      <span class="text-h6 font-weight-bold">Privacy & Protection</span>
    </v-card-title>

    <v-card-text>
      <!-- Password Modification Section -->
      <v-row>
        <v-col cols="12">
          <div class="mb-4">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon :size="26" color="primary">
                mdi-account-key-outline
              </v-icon>
              <h3 class="text-subtitle-1 font-weight-medium">
                Password Modification
              </h3>
            </div>
            <v-card-subtitle class="pl-0 my-4 text-caption">
              Update your password regularly to enhance account security. Ensure
              your new password
              <br />
              is strong and unique.
            </v-card-subtitle>

            <v-chip color="info" variant="tonal" size="small">
              <v-icon>mdi-alert-circle-outline</v-icon>
              <span>Your password was last updated on 07/08/22</span>
            </v-chip>
          </div>
          <RouterLink
            to=""
            label="Change password"
            appendIcon="mdi-chevron-right"
            customTextClass="text-primary"
            customContainerClass="my-custom-container"
          />
        </v-col>
      </v-row>
      <v-divider class="my-6"></v-divider>

      <!-- Two Factor Authentication Section -->
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center ga-2 mb-2">
            <v-icon :size="26" color="primary"> mdi-lock-outline </v-icon>
            <h3 class="text-subtitle-1 font-weight-medium">
              Two Factor Authentication
            </h3>
          </div>
          <v-card-subtitle class="pl-0 my-3 text-caption">
            We will ask for OTP whenever we detect login from an unrecognised
            device.
          </v-card-subtitle>
          <RouterLink
            to=""
            label="Click here to turn off two factor authentication"
            appendIcon="mdi-chevron-right"
            customTextClass="text-primary"
            customContainerClass="my-custom-container"
            color="primary"
          />
          <p class="my-3 text-caption font-weight-bold">
            Set how you are going to receive OPT
          </p>

          <v-radio-group v-model="otpMethod" density="compact" class="px-0">
            <v-radio color="primary" value="sms" :ripple="false" class="mb-2">
              <template v-slot:label>
                <span class="text-caption">
                  Send a text message to (***) ***-**78
                </span>
              </template>
            </v-radio>
            <v-radio color="primary" value="email" :ripple="false">
              <template v-slot:label>
                <span class="text-caption">
                  Send an email to *****hing@email.com
                </span>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-divider class="my-6"></v-divider>

      <!-- Alternate Login Method -->
      <v-row>
        <v-col cols="12" class="d-inline-flex flex-column ga-3">
          <div class="d-flex align-center ga-2">
            <v-icon :size="26" color="primary"> mdi-lock-clock </v-icon>
            <h3 class="text-subtitle-1 font-weight-medium">
              Alternate Login Method
            </h3>
          </div>
          <v-card-subtitle class="pl-0 text-caption">
            Set up different alternate methods if you somehow lose your email or
            password.
          </v-card-subtitle>
          <div class="d-flex ga-2" style="align-items: center">
            <p class="my-3 text-caption font-weight-bold">
              Use an authenticator app
            </p>
            <v-chip
              variant="tonal"
              size="small"
              class="font-weight-bold"
              style="
                background-color: #099f69, opacity 15%;
                color: #066f49;
                border: 1px #066f49 solid;
              "
            >
              Recommended
            </v-chip>
          </div>
          <div class="d-flex ga-2" style="align-items: center">
            <span class="text-caption text-grey-darken-1"
              >1. Download an authenticator app such as</span
            >
            <RouterLink
              to=""
              label="Microsoft Authenticator"
              customTextClass="text-primary "
              customContainerClass="my-custom-container"
              color="primary"
            />
          </div>
          <span class="text-caption text-grey-darken-1"
            >2.Scan this QR Code or copy the key</span
          >
          <div class="d-flex ga-2" style="align-items: center">
            <v-img
              :src="qrCodeImage"
              :aspect-ratio="1"
              class="bg-white"
              max-width="80"
              max-height="80"
              :cover="true"
            ></v-img>
            <p class="text-h6 font-weight-bold">3412 1234 6355 1234</p>
          </div>
          <p class="text-caption text-grey-darken-1">
            3. Copy and enter 6 digit code from the app whenever you are trying
            to log in.
          </p>
          <p class="text-caption font-weight-bold">Use security key</p>
          <p class="text-caption text-grey-darken-1">
            Use a physical security key to gain access to your account
            instantly.
          </p>
          <v-btn
            variant="tonal"
            color="gray"
            prepend-icon="mdi-chevron-right"
            class="text-caption bg-grey-lighten-5 font-weight-medium align-self-start"
            size="small"
          >
            Set up security key
          </v-btn>
          <p class="text-caption font-weight-bold">
            You are connected in the following devices
          </p>
          <PrivacyAuthCard
            v-for="auth in securityKeys"
            :key="auth.id"
            :device="auth"
          />
        </v-col>
      </v-row>
      <v-divider class="my-6"></v-divider>

      <!-- Recognized Devices -->
      <v-row>
        <v-col cols="12" class="d-inline-flex flex-column ga-3">
          <div class="d-flex align-center ga-2">
            <v-icon :size="26" color="primary"> mdi-cellphone-link </v-icon>
            <h3 class="text-subtitle-1 font-weight-medium">
              Recognized Devices
            </h3>
          </div>
          <v-card-subtitle class="pl-0 text-caption">
            Review a list of devices in which you won't have to use a login
            code.
          </v-card-subtitle>
          <div class="d-inline-flex flex-column ga-3">
            <p class="text-caption font-weight-bold">
              You are logged in the following devices
            </p>
            <PrivacyDeviceCard
              v-for="device in devicesKeys"
              :key="device.id"
              :device="device"
            />
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-6"></v-divider>

      <v-row>
        <v-col cols="12" class="d-inline-flex flex-column ga-3">
          <div class="d-flex align-center ga-2">
            <v-icon :size="26" color="primary"> mdi-bell-ring-outline </v-icon>
            <h3 class="text-subtitle-1 font-weight-medium">Login Alerts</h3>
          </div>
          <v-card-subtitle class="pl-0 text-caption">
            Set how we are going to send you an alert if there is an
            unrecognised login attempt.
          </v-card-subtitle>
          <div class="d-flex flex-column">
            <v-checkbox
              v-model="loginAlertSms"
              :ripple="false"
              density="compact"
              hide-details
              color="primary"
              @change="() => handleLoginAlertMethodChange('sms')"
            >
              <template v-slot:label>
                <span class="text-caption ml-2">
                  Send a text message to (***) ***-**78
                </span>
              </template>
            </v-checkbox>
            <v-checkbox
              v-model="loginAlertEmail"
              :ripple="false"
              density="compact"
              hide-details
              color="primary"
              @change="() => handleLoginAlertMethodChange('email')"
            >
              <template v-slot:label>
                <span class="text-caption ml-2">
                  Send an email to *****hing@email.com
                </span>
              </template>
            </v-checkbox>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  RouterLink,
  PrivacyDeviceCard,
  PrivacyAuthCard,
} from "@/components/index";
import qrCodeImage from "@/assets/qr-code.jpg";
import { securityKeys, devicesKeys } from "@/utils/setting";

const twoFactorEnabled = ref(true);
const otpMethod = ref("sms");
const loginAlertMethod = ref(""); // Thêm biến loginAlertMethod
const loginAlertSms = ref(false);
const loginAlertEmail = ref(false);

const openPasswordChangeDialog = () => {
  // Implement password change logic
  console.log("Open password change dialog");
};

const openAlternateLoginDialog = () => {
  // Implement alternate login method logic
  console.log("Open alternate login method dialog");
};

// Hàm xử lý khi chọn phương thức cảnh báo
const handleLoginAlertMethodChange = (method) => {
  if (method === "sms") {
    loginAlertEmail.value = false;
    loginAlertSms.value = true;
  } else if (method === "email") {
    loginAlertSms.value = false;
    loginAlertEmail.value = true;
  }
};
</script>

<style scoped>
.my-custom-container {
  cursor: pointer;
}
</style>
