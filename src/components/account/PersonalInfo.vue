<template>
  <v-card flat>
    <v-card-title class="d-flex align-center mb-4">
      <v-icon left class="mr-2">mdi-account-outline</v-icon>
      Personal Information
    </v-card-title>

    <v-card-text>
      <v-row>
        <!-- Avatar Upload -->
        <v-col cols="12" class="d-flex justify-center mb-6">
          <v-avatar size="150" class="avatar-upload border">
            <v-img v-if="avatarPreview" :src="avatarPreview"></v-img>
            <div v-else class="d-flex flex-column align-center">
              <v-icon size="22" color="grey-darken-1">mdi-camera-plus</v-icon>
              <span class="text-caption mt-2">Upload Avatar</span>
            </div>
            <input
              type="file"
              ref="avatarInput"
              accept="image/*"
              style="display: none"
              @change="handleAvatarUpload"
            />
            <v-btn
              icon
              size="small"
              class="upload-btn"
              @click="triggerFileUpload"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-avatar>
        </v-col>

        <!-- Name Section -->
        <v-col cols="12">
          <v-form ref="nameForm" @submit.prevent="saveChanges">
            <div>
              <div class="d-flex align-items-center" style="gap: 4px">
                <v-icon size="22"> mdi-card-account-details-outline</v-icon>
                <h3>Name</h3>
              </div>
              <v-card-subtitle class="pl-0 my-5">
                Edit your name here if you wish to make any changes. You can
                also edit your user name
                <br />
                which will be showed publicly.
              </v-card-subtitle>
              <v-row dense>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.firstName"
                    label="First Name"
                    variant="outlined"
                    density="compact"
                    :rules="[(v) => !!v || 'First name is required']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="user.lastName"
                    label="Last Name"
                    variant="outlined"
                    density="compact"
                    :rules="[(v) => !!v || 'Last name is required']"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n2">
                  <v-text-field
                    v-model="user.userName"
                    label="Username"
                    variant="outlined"
                    density="compact"
                    prepend-inner-icon="mdi-at"
                    :rules="[(v) => !!v || 'Username is required']"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <v-divider class="my-7"></v-divider>
            <div>
              <div class="d-flex align-items-center" style="gap: 2px">
                <v-icon size="22">mdi-cake-variant-outline</v-icon>
                <h3 class="">Birthday</h3>
              </div>
              <v-card-subtitle class="pl-0 my-5">
                Adjust your date of birth to ensure it’s accurate in your
                account. Visibility of your birthday
                <br />
                can also be controlled here.
              </v-card-subtitle>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.birthday"
                    label="Birthday"
                    placeholder="mm/dd/yyyy"
                    variant="outlined"
                    density="compact"
                    prepend-inner-icon="mdi-calendar"
                    :rules="[(v) => !!v || 'Birthday is required']"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <p class="">Who can see your birthday?</p>
              <v-radio-group
                v-model="user.birthdayVisibility"
                class="radio-group"
              >
                <v-radio
                  class="text-body-2 flex-0-0"
                  label="Only me"
                  value="private"
                ></v-radio>
                <v-radio
                  class="text-body-2 flex-0-0"
                  label="Followers only"
                  value="followers"
                ></v-radio>
                <v-radio
                  class="text-body flex-0-0"
                  label="Everyone"
                  value="public"
                ></v-radio>
              </v-radio-group>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" variant="elevated" @click="saveChanges">
        Save Changes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, reactive } from "vue";

const avatarPreview = ref(null);
const avatarInput = ref(null);
const nameForm = ref(null);

const user = reactive({
  firstName: "Luke",
  lastName: "Skywalker",
  userName: "LukeSkywalker212",
  email: "luke.skywalker@example.com",
  phoneNumber: "+1 (555) 123-4567",
  birthday: "05/14/1951",
});

const triggerFileUpload = () => {
  avatarInput.value.click();
};

const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveChanges = async () => {
  const { valid } = await nameForm.value.validate();

  if (valid) {
    // Implement save logic here
    console.log("Saving user information:", user);
    // You might want to add an API call or state management logic here
  }
};
</script>

<style scoped>
.avatar-upload {
  position: relative;
  cursor: pointer;
  background-color: #f4f5fa;
}

.upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 2px;
}
</style>
