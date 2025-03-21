<template>
  <v-container>
    <v-card class="mb-5">
      <v-card-title class="text-h6 py-4 bg-grey-darken-4">
        Thêm Người Dùng
      </v-card-title>
      <v-card-text class="pt-4">
        <Form @submit="onSubmit" v-slot="{ errors }">
          <v-row>
            <v-col cols="12" md="6">
              <label class="text-body-2 font-weight-medium d-block mb-2"
                >Họ tên <span class="text-error">*</span></label
              >
              <Field
                name="fullName"
                v-slot="{ field, errorMessage, meta }"
                rules="required"
              >
                <v-text-field
                  v-bind="field"
                  density="compact"
                  variant="outlined"
                  placeholder="Nhập họ tên"
                  :error-messages="errorMessage"
                  :class="{
                    'is-invalid': meta.touched && errorMessage,
                    'is-valid': meta.touched && !errorMessage,
                  }"
                ></v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <label class="text-body-2 font-weight-medium d-block mb-2"
                >Email <span class="text-error">*</span></label
              >
              <Field
                name="email"
                v-slot="{ field, errorMessage, meta }"
                rules="required|email"
              >
                <v-text-field
                  v-bind="field"
                  density="compact"
                  variant="outlined"
                  placeholder="example@email.com"
                  :error-messages="errorMessage"
                  :class="{
                    'is-invalid': meta.touched && errorMessage,
                    'is-valid': meta.touched && !errorMessage,
                  }"
                ></v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <label class="text-body-2 font-weight-medium d-block mb-2"
                >Mật khẩu <span class="text-error">*</span></label
              >
              <Field
                name="password"
                v-slot="{ field, errorMessage, meta }"
                rules="required|min:8"
              >
                <v-text-field
                  v-bind="field"
                  variant="outlined"
                  density="compact"
                  placeholder="Nhập mật khẩu"
                  :error-messages="errorMessage"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :class="{
                    'is-invalid': meta.touched && errorMessage,
                    'is-valid': meta.touched && !errorMessage,
                  }"
                ></v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <label class="text-body-2 font-weight-medium d-block mb-2"
                >Số điện thoại <span class="text-error">*</span></label
              >
              <Field
                name="phoneNumber"
                v-slot="{ field, errorMessage, meta }"
                rules="required|digits:10"
              >
                <v-text-field
                  v-bind="field"
                  variant="outlined"
                  density="compact"
                  placeholder="0912345678"
                  :error-messages="errorMessage"
                  :class="{
                    'is-invalid': meta.touched && errorMessage,
                    'is-valid': meta.touched && !errorMessage,
                  }"
                ></v-text-field>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <label class="text-body-2 font-weight-medium d-block mb-2"
                >Vai trò <span class="text-error">*</span></label
              >
              <Field
                name="role"
                v-slot="{ field, errorMessage, meta }"
                rules="required"
              >
                <v-select
                  v-bind="field"
                  :items="roles"
                  variant="outlined"
                  density="compact"
                  placeholder="Chọn vai trò"
                  :error-messages="errorMessage"
                  :class="{
                    'is-invalid': meta.touched && errorMessage,
                    'is-valid': meta.touched && !errorMessage,
                  }"
                ></v-select>
              </Field>
            </v-col>

            <v-col cols="12" md="6">
              <label class="text-body-2 font-weight-medium d-block mb-2"
                >Ngày sinh</label
              >
              <Field name="birthDate" v-slot="{ field, errorMessage, meta }">
                <v-text-field
                  v-bind="field"
                  variant="outlined"
                  density="compact"
                  placeholder="Chọn ngày sinh"
                  :error-messages="errorMessage"
                  :append-inner-icon="'mdi-calendar'"
                  readonly
                  @click="showDatePicker = true"
                  :class="{
                    'is-invalid': meta.touched && errorMessage,
                    'is-valid': meta.touched && !errorMessage,
                  }"
                ></v-text-field>
              </Field>
              <v-dialog v-model="showDatePicker" max-width="290px">
                <v-date-picker
                  v-model="selectedDate"
                  @update:model-value="updateBirthDate"
                ></v-date-picker>
              </v-dialog>
            </v-col>

            <v-col cols="12">
              <label class="text-body-2 font-weight-medium d-block mb-2"
                >Địa chỉ</label
              >
              <Field name="address" v-slot="{ field, errorMessage, meta }">
                <v-textarea
                  v-bind="field"
                  variant="outlined"
                  density="compact"
                  placeholder="Nhập địa chỉ"
                  :error-messages="errorMessage"
                  rows="3"
                  :class="{
                    'is-invalid': meta.touched && errorMessage,
                    'is-valid': meta.touched && !errorMessage,
                  }"
                ></v-textarea>
              </Field>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              variant="outlined"
              class="me-3"
              @click="resetForm"
            >
              Hủy
            </v-btn>
            <v-btn
              color="primary"
              type="submit"
              :disabled="Object.keys(errors).length > 0"
            >
              Thêm người dùng
            </v-btn>
          </v-card-actions>
        </Form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, defineRule, configure, useForm } from "vee-validate";
import { required, email, min, digits } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";

// Đăng ký các rules
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("digits", digits);

// Cấu hình messages tiếng Việt
configure({
  generateMessage: localize("vi", {
    messages: {
      required: "{field} là bắt buộc",
      min: "{field} phải có ít nhất {length} ký tự",
      email: "{field} phải là một địa chỉ email hợp lệ",
      digits: "{field} phải có đúng {length} chữ số",
    },
  }),
});

const roles = ["Admin", "User", "Manager"];
const showPassword = ref(false);
const showDatePicker = ref(false);
const selectedDate = ref(null);

const { resetForm } = useForm();

const updateBirthDate = (date) => {
  selectedDate.value = date;
  showDatePicker.value = false;
};

const onSubmit = (values) => {
  console.log("Payload:", JSON.stringify(values, null, 2));
};
</script>

<style scoped>
.bg-light-primary {
  background-color: #f8f8fb !important;
}
.text-error {
  color: #f44336;
}
</style>
