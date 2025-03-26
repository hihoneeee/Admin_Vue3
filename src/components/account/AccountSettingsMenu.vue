<template>
  <v-card flat>
    <v-list>
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="index"
        @click="selectMenuItem(item)"
        :class="{ active: selectedItem === item }"
      >
        <template v-slot:prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["select-menu-item"]);

const selectedItem = ref(props.menuItems[0]);

const selectMenuItem = (item) => {
  selectedItem.value = item;
  emit("select-menu-item", item);
};
</script>

<style scoped>
.active {
  background-color: #e6f2ff;
  color: #1976d2;
}
</style>
