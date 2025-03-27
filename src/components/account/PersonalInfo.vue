<template>
  <v-card flat>
    <v-card-title class="d-flex align-center mb-4">
      <v-icon left class="mr-2 text-primary">mdi-account-outline</v-icon>
      Personal Information
    </v-card-title>

    <v-card-text>
      <v-row>
        <!-- Avatar Upload -->
        <v-col cols="12" class="d-flex justify-center mb-6">
          <div class="avatar-container">
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              @change="onFileSelected"
              style="display: none"
            />
            <v-avatar
              size="150"
              class="avatar-upload"
              @click="triggerFileUpload"
            >
              <img
                v-if="avatarUrl"
                :src="avatarUrl"
                alt="Avatar"
                class="avatar-image"
              />
              <div v-else class="avatar-placeholder">
                <v-icon size="30" color="grey">mdi-camera-plus-outline</v-icon>
                <span class="upload-text">Upload Avatar</span>
              </div>
            </v-avatar>
          </div>
        </v-col>

        <!-- Name Section -->
        <v-col cols="12">
          <v-form ref="nameForm" @submit.prevent="saveChanges">
            <div>
              <div class="d-flex align-center ga-2">
                <v-icon :size="24" color="primary">
                  mdi-card-account-details-outline
                </v-icon>
                <h3 class="text-subtitle-1 font-weight-medium">Name</h3>
              </div>
              <v-card-subtitle class="pl-0 my-4 text-caption">
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

            <v-divider class="my-6"></v-divider>
            <div>
              <div class="d-flex ga-1">
                <v-icon :size="24" color="primary">
                  mdi-cake-variant-outline
                </v-icon>
                <h3 class="text-subtitle-1 font-weight-medium">Birthday</h3>
              </div>
              <v-card-subtitle class="pl-0 my-4 text-caption">
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
              <p class="mb-2 text-caption text-grey-darken-1">
                Who can see your birthday?
              </p>
              <v-radio-group
                v-model="user.birthdayVisibility"
                inline
                density="compact"
              >
                <v-radio value="private" class="ml-2">
                  <template v-slot:label>
                    <span class="text-caption mr-1">Only me</span>
                  </template></v-radio
                >
                <v-radio value="followers">
                  <template v-slot:label>
                    <span class="text-caption mr-1">Followers only</span>
                  </template></v-radio
                >
                <v-radio value="public">
                  <template v-slot:label>
                    <span class="text-caption mr-1">Everyone</span>
                  </template></v-radio
                >
              </v-radio-group>
            </div>

            <v-divider class="my-6"></v-divider>
            <div>
              <div class="d-flex ga-1">
                <v-icon :size="24" color="primary"> mdi-phone-outline </v-icon>
                <h3 class="text-subtitle-1 font-weight-medium">Phone</h3>
              </div>
              <v-card-subtitle class="pl-0 my-4 text-caption">
                Add a personal or official phone number to stay connected with
                ease and ensure account
                <br />
                recovery options are available.
              </v-card-subtitle>

              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.phoneNumber"
                    label="Phone"
                    variant="outlined"
                    density="compact"
                    :rules="[(v) => !!v || 'Phone is required']"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <p class="mb-2 text-caption text-grey-darken-1">
                This phone number has to be confirmed to ensure its authenticity
                first before being <br />
                connected with your profile.
              </p>
              <RouterLink
                to="/admin/account"
                label="Confirm your number"
                appendIcon="mdi-chevron-right"
                customTextClass="text-red"
                customContainerClass="my-custom-container"
              />
            </div>

            <v-divider class="my-6"></v-divider>
            <div>
              <div class="d-flex ga-2 mb-2">
                <v-icon :size="24" color="primary">
                  mdi-email-fast-outline
                </v-icon>
                <h3 class="text-subtitle-1 font-weight-medium">
                  Email Address
                </h3>
              </div>
              <v-card-subtitle class="pl-0 my-4 text-caption">
                Add a personal or official phone number to stay connected with
                ease and ensure account
                <br />
                recovery options are available.
              </v-card-subtitle>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.phoneNumber"
                    label="Phone"
                    variant="outlined"
                    density="compact"
                    :rules="[(v) => !!v || 'Phone is required']"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <p class="mb-2 text-caption text-grey-darken-1">
                This phone number has to be confirmed to ensure its authenticity
                first before being <br />
                connected with your profile.
              </p>
              <RouterLink
                to="/admin/account"
                label="Confirm your number"
                appendIcon="mdi-chevron-right"
                customTextClass="text-red"
                customContainerClass="my-custom-container"
              />
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        variant="elevated"
        @click="saveChanges"
        class="text-capitalize text-caption"
        prepend-icon="mdi-content-save-all-outline"
        rounded="lg"
      >
        Save Changes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import { RouterLink } from "@/components/index";
const nameForm = ref(null);
const fileInput = ref(null);
const avatarUrl = ref(null);

const user = reactive({
  firstName: "Luke",
  lastName: "Skywalker",
  userName: "LukeSkywalker212",
  email: "luke.skywalker@example.com",
  phoneNumber: "+1 (555) 123-4567",
  birthday: "05/14/1951",
});

const triggerFileUpload = () => {
  fileInput.value.click();
};

const onFileSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Kiểm tra kích thước file
    if (file.size > 5 * 1024 * 1024) {
      alert("Kích thước ảnh không được vượt quá 5MB");
      return;
    }

    // Kiểm tra định dạng file
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Chỉ chấp nhận file ảnh (JPEG, PNG, GIF)");
      return;
    }

    // Đọc và hiển thị ảnh
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarUrl.value = e.target.result;
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
.avatar-container {
  position: relative;
  cursor: pointer;
}

.avatar-upload {
  background-color: #ebf2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  border: 2px #cccc dashed;
}

.avatar-upload:hover {
  opacity: 0.8;
}

.avatar-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-text {
  margin-top: 10px;
  color: #666;
  font-size: 0.75rem;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
