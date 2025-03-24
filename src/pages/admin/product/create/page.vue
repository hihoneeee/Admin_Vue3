<script setup>
import { useToast } from "@/@core/composable/useToast";
import { ref, reactive } from "vue";

const { toast } = useToast();
const currentStep = ref(0);
const imagePreview = ref([]);

const rules = {
  required: (value) => !!value || "Trường này là bắt buộc",
};

const product = reactive({
  name: "",
  category: "",
  brand: "",
  model: "",
  description: "",
  specs: {
    processor: "",
    ram: "",
    storage: "",
    display: "",
    graphics: "",
    battery: "",
    other: "",
  },
  mainImage: null,
  additionalImages: [],
  videoUrl: "",
  price: "",
  discountPrice: "",
  sku: "",
  stock: 0,
  inStock: true,
  featured: false,
  published: true,
});

const removeImage = (index) => {
  imagePreview.value.splice(index, 1);
};

const saveProduct = () => {
  // Giả lập API call để lưu sản phẩm
  console.log("Đang lưu sản phẩm:", product);

  toast({
    title: "Thành công!",
    text: `Sản phẩm "${product.name}" đã được tạo thành công.`,
    icon: "mdi-check-circle",
    variant: "success",
  });

  currentStep.value = 0;
};
</script>
<template>
  <div>
    <v-card class="mb-5">
      <v-card-title class="bg-primary text-h5 py-4">
        <v-icon size="large" start class="mr-2">mdi-cellphone-link</v-icon>
        Thêm sản phẩm công nghệ mới
      </v-card-title>

      <v-card-text>
        <v-stepper v-model="currentStep" class="mt-5">
          <v-stepper-header>
            <v-stepper-item step="1" title="Thông tin cơ bản"></v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item step="2" title="Thông số kỹ thuật"></v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item step="3" title="Hình ảnh và Media"></v-stepper-item>
            <v-divider></v-divider>
            <v-stepper-item step="4" title="Giá và Kho hàng"></v-stepper-item>
          </v-stepper-header>

          <v-stepper-window class="py-2">
            <v-stepper-window-item step="1">
              <v-row>
                <v-col cols="12">
                  <h3 class="text-h6 mb-4">Thông tin cơ bản của sản phẩm</h3>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="product.name"
                    label="Tên sản phẩm"
                    variant="outlined"
                    placeholder="Nhập tên sản phẩm"
                    :rules="[rules.required]"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="product.category"
                    label="Danh mục"
                    variant="outlined"
                    :items="categories"
                    :rules="[rules.required]"
                    hide-details="auto"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="product.brand"
                    label="Thương hiệu"
                    variant="outlined"
                    :items="brands"
                    :rules="[rules.required]"
                    hide-details="auto"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="product.model"
                    label="Model"
                    variant="outlined"
                    placeholder="Nhập model sản phẩm"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="product.description"
                    label="Mô tả sản phẩm"
                    variant="outlined"
                    placeholder="Nhập mô tả chi tiết sản phẩm"
                    rows="4"
                    :rules="[rules.required]"
                    hide-details="auto"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-stepper-window-item>

            <!-- Step 2: Technical Specifications -->
            <v-stepper-window-item step="2">
              <v-row>
                <v-col cols="12">
                  <h3 class="text-h6 mb-4">Thông số kỹ thuật</h3>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                    v-model="product.specs.processor"
                    label="Bộ vi xử lý (CPU/Chip)"
                    variant="outlined"
                    placeholder="Ví dụ: Apple M1, Intel i7-12700H"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                    v-model="product.specs.ram"
                    label="RAM"
                    variant="outlined"
                    placeholder="Ví dụ: 8GB, 16GB"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                    v-model="product.specs.storage"
                    label="Bộ nhớ trong"
                    variant="outlined"
                    placeholder="Ví dụ: 256GB SSD, 1TB"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                    v-model="product.specs.display"
                    label="Màn hình"
                    variant="outlined"
                    placeholder="Ví dụ: 15.6 inch, 4K OLED"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                    v-model="product.specs.graphics"
                    label="Card đồ họa"
                    variant="outlined"
                    placeholder="Ví dụ: NVIDIA RTX 3060, Intel Iris Xe"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6" lg="4">
                  <v-text-field
                    v-model="product.specs.battery"
                    label="Pin"
                    variant="outlined"
                    placeholder="Ví dụ: 6000mAh, 10 giờ sử dụng"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="product.specs.other"
                    label="Thông số khác"
                    variant="outlined"
                    placeholder="Thông số khác như kết nối, cổng, tính năng đặc biệt..."
                    rows="3"
                    hide-details="auto"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-stepper-window-item>

            <!-- Step 3: Images & Media -->
            <v-stepper-window-item step="3">
              <v-row>
                <v-col cols="12">
                  <h3 class="text-h6 mb-4">Hình ảnh và Media</h3>
                </v-col>

                <v-col cols="12">
                  <v-file-input
                    v-model="product.mainImage"
                    label="Hình ảnh chính"
                    variant="outlined"
                    prepend-icon="mdi-camera"
                    accept="image/*"
                    show-size
                    counter
                    :rules="[rules.required]"
                    hide-details="auto"
                  ></v-file-input>
                </v-col>

                <v-col cols="12">
                  <v-file-input
                    v-model="product.additionalImages"
                    label="Hình ảnh phụ"
                    variant="outlined"
                    prepend-icon="mdi-image-multiple"
                    accept="image/*"
                    show-size
                    counter
                    multiple
                    chips
                    hide-details="auto"
                  ></v-file-input>
                </v-col>

                <v-col cols="12">
                  <div class="d-flex flex-wrap preview-images">
                    <div
                      v-for="(image, index) in imagePreview"
                      :key="index"
                      class="ma-2 preview-container"
                    >
                      <v-img
                        :src="image"
                        height="100"
                        width="100"
                        cover
                        class="rounded"
                      ></v-img>
                      <v-btn
                        icon
                        size="small"
                        color="error"
                        variant="text"
                        class="preview-delete-btn"
                        @click="removeImage(index)"
                      >
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="product.videoUrl"
                    label="URL Video sản phẩm (YouTube, Vimeo, ...)"
                    variant="outlined"
                    placeholder="https://youtube.com/watch?v=..."
                    prepend-inner-icon="mdi-youtube"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-stepper-window-item>

            <!-- Step 4: Price & Inventory -->
            <v-stepper-window-item step="4">
              <v-row>
                <v-col cols="12">
                  <h3 class="text-h6 mb-4">Giá và Kho hàng</h3>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="product.price"
                    label="Giá bán (VNĐ)"
                    variant="outlined"
                    type="number"
                    placeholder="Nhập giá sản phẩm"
                    :rules="[rules.required]"
                    hide-details="auto"
                    density="comfortable"
                    prefix="₫"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="product.discountPrice"
                    label="Giá khuyến mãi (VNĐ)"
                    variant="outlined"
                    type="number"
                    placeholder="Nhập giá khuyến mãi (nếu có)"
                    hide-details="auto"
                    density="comfortable"
                    prefix="₫"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="product.sku"
                    label="Mã SKU"
                    variant="outlined"
                    placeholder="Mã quản lý sản phẩm"
                    :rules="[rules.required]"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="product.stock"
                    label="Số lượng trong kho"
                    variant="outlined"
                    type="number"
                    placeholder="Nhập số lượng sản phẩm"
                    :rules="[rules.required]"
                    hide-details="auto"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-switch
                    v-model="product.inStock"
                    color="primary"
                    label="Còn hàng"
                    hide-details
                  ></v-switch>
                </v-col>

                <v-col cols="12">
                  <v-switch
                    v-model="product.featured"
                    color="warning"
                    label="Sản phẩm nổi bật"
                    hide-details
                  ></v-switch>
                </v-col>

                <v-col cols="12">
                  <v-switch
                    v-model="product.published"
                    color="success"
                    label="Đăng bán ngay"
                    hide-details
                  ></v-switch>
                </v-col>
              </v-row>
            </v-stepper-window-item>
          </v-stepper-window>

          <v-divider class="my-4"></v-divider>

          <!-- Navigation Buttons -->
          <v-card-actions>
            <v-btn
              v-if="currentStep > 0"
              variant="outlined"
              prepend-icon="mdi-arrow-left"
              @click="currentStep--"
            >
              Quay lại
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              v-if="currentStep < 4"
              color="primary"
              variant="elevated"
              append-icon="mdi-arrow-right"
              @click="currentStep++"
            >
              Tiếp tục
            </v-btn>

            <v-btn
              v-if="currentStep === 4"
              color="success"
              variant="elevated"
              prepend-icon="mdi-check"
              @click="saveProduct"
            >
              Hoàn tất
            </v-btn>
          </v-card-actions>
        </v-stepper>
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped>
.create-product-card {
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1) !important;
}

.preview-container {
  position: relative;
}

.preview-delete-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  background: white !important;
}

.preview-images {
  gap: 12px;
}

:deep(.v-stepper-header) {
  box-shadow: none;
  border-radius: 8px;
  background-color: #f5f5f5;
}

:deep(.v-stepper-item--complete),
:deep(.v-stepper-item--active) {
  color: var(--v-primary-base) !important;
}
</style>
