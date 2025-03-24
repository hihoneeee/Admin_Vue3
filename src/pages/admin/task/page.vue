<template>
  <div>
    <div class="task-preview-container">
      <div class="d-flex align-center justify-space-between mb-4">
        <h1 class="text-h5 font-weight-bold text-capitalize">
          Xem trước nhiệm vụ
        </h1>
        <v-btn color="primary" class="elevation-0 text-capitalize" rounded>
          Lọc
          <v-icon right>mdi-filter-variant</v-icon>
        </v-btn>
      </div>
      <div class="view-tabs mb-4">
        <v-tabs v-model="activeTab" background-color="transparent">
          <v-tab value="list" class="text-capitalize">Danh sách</v-tab>
          <v-tab value="board" class="text-capitalize">Bảng</v-tab>
          <v-tab value="timeline" class="text-capitalize">Dòng thời gian</v-tab>
        </v-tabs>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          hide-details
          single-line
          variant="solo"
          rounded
          placeholder="Search"
          class="search-field"
        ></v-text-field>
      </div>

      <div class="board-container">
        <v-row class="board-columns">
          <v-col
            v-for="column in columns"
            :key="column.id"
            class="board-column"
          >
            <h2 class="text-h6 font-weight-medium mb-4">{{ column.title }}</h2>
            <div class="task-list">
              <v-card
                v-for="task in getTasksByStatus(column.id)"
                :key="task.id"
                class="mb-4 task-card"
                variant="outlined"
                rounded="lg"
              >
                <v-card-text class="pb-4">
                  <div class="d-flex justify-space-between align-center">
                    <div class="d-flex align-center">
                      <v-checkbox
                        v-if="column.id !== 'done'"
                        density="compact"
                        color="primary"
                        hide-details
                        :model-value="task.status === 'done'"
                        class="rounded-circle"
                      ></v-checkbox>
                      <v-icon
                        v-else
                        color="primary"
                        icon="mdi-check-circle"
                      ></v-icon>
                      <span class="text-subtitle-1 font-weight-medium ml-2">{{
                        task.title
                      }}</span>
                    </div>
                    <v-menu location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-btn icon variant="text" v-bind="props" size="small">
                          <v-icon>mdi-dots-horizontal</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                          v-for="(action, i) in taskActions"
                          :key="i"
                          :value="action"
                          @click="handleTaskAction(action, task)"
                        >
                          <v-list-item-title>{{ action }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>

                  <div class="task-tags mt-2">
                    <v-chip
                      size="small"
                      :color="getPriorityColor(task.priority)"
                      label
                      class="mr-2"
                    >
                      {{ task.priority }}
                    </v-chip>
                    <v-chip v-if="task.track" size="small" color="amber" label>
                      On Track
                    </v-chip>
                    <v-chip v-if="task.risk" size="small" color="error" label>
                      At Risk
                    </v-chip>
                  </div>

                  <p class="text-body-2 text-grey mt-3">
                    {{ task.description }}
                  </p>

                  <div v-if="task.preview" class="task-preview mt-3">
                    <v-img
                      :src="task.preview"
                      height="150"
                      cover
                      class="rounded-lg"
                    ></v-img>
                  </div>

                  <div class="d-flex justify-space-between align-center mt-4">
                    <div class="task-assignees d-flex align-center">
                      <v-avatar
                        v-for="(assignee, index) in task.assignees"
                        :key="index"
                        size="30"
                        class="ml-n2"
                        :style="{ zIndex: task.assignees.length - index }"
                      >
                        <v-img :src="assignee"></v-img>
                      </v-avatar>
                      <v-avatar
                        v-if="task.extraAssignees"
                        size="30"
                        color="primary"
                        class="ml-n2"
                      >
                        <span class="text-white"
                          >+{{ task.extraAssignees }}</span
                        >
                      </v-avatar>
                    </div>

                    <div class="task-stats d-flex align-center">
                      <v-icon size="small" class="mr-1"
                        >mdi-comment-outline</v-icon
                      >
                      <span class="text-caption mr-3">{{ task.comments }}</span>

                      <v-icon size="small" class="mr-1">mdi-attachment</v-icon>
                      <span class="text-caption">{{ task.attachments }}</span>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { tasksItem } from "@/utils/common";
const activeTab = ref("board");
const search = ref("");

const columns = ref([
  { id: "todo", title: "Việc cần làm" },
  { id: "in-progress", title: "Đang tiến hành" },
  { id: "in-review", title: "Đang xem lại" },
  { id: "done", title: "Hoàn thành" },
]);

const tasks = ref(tasksItem);

const taskActions = ref(["Edit", "Delete", "Move", "Copy"]);

const getTasksByStatus = (status) => {
  return tasks.value.filter((task) => task.status === status);
};

const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "info";
    case "medium":
      return "warning";
    case "low":
      return "error";
    default:
      return "grey";
  }
};

const handleTaskAction = (action, task) => {
  console.log(`${action} task:`, task);
  // Implement actions logic here
};
</script>

<style scoped>
.task-preview-container {
  padding: 16px;
}

.view-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-field {
  max-width: 240px;
}

.board-columns {
  gap: 16px;
}

.board-column {
  min-width: 270px;
}

.task-card {
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
}

.task-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.task-tags {
  display: flex;
  flex-wrap: wrap;
}

.task-assignees {
  position: relative;
}
</style>
