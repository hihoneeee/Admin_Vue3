<template>
  <div class="container-fluid p-0">
    <div class="row g-0">
      <!-- Sidebar column -->
      <div class="col-auto">
        <AdminSidebar />
      </div>

      <div class="col main-content">
        <!-- Fixed top navigation -->
        <div class="top-nav">
          <AdminNav />
        </div>

        <!-- Content area with proper spacing -->
        <div class="content-area">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from "@/components/AdminSidebar.vue";
import AdminNav from "@/components/AdminNav.vue";
</script>

<style>
/* Main content area */
.main-content {
  margin-left: 260px;
  width: calc(100% - 260px);
  min-height: 100vh;
}

/* Content area with padding to avoid overlap */
.content-area {
  padding: 80px 20px 20px 20px; /* Top padding to account for nav height + some space */
  min-height: 100vh;
}

/* For mobile responsiveness (optional) */
@media (max-width: 768px) {
  .sidebar-wrapper {
    width: 0;
    overflow: hidden;
  }

  .main-content {
    margin-left: 0;
    width: 100%;
  }

  .top-nav {
    left: 0;
  }
}
</style>
