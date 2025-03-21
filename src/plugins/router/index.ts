import { createRouter, createWebHistory } from "vue-router";

// Lấy tất cả các file Vue trong thư mục pages
const pages = import.meta.glob("/src/pages/**/*.vue");

function buildRoutesFromPages() {
  // Định nghĩa các layout
  const layouts = {
    admin: {
      path: "/admin",
      name: "admin",
      component: () => import("@/pages/admin/layout.vue"),
      children: [],
    },
    // Layout mặc định cho public (không có tiền tố)
    public: {
      path: "/",
      name: "public",
      component: () => import("@/pages/public/layout.vue"),
      children: [],
    },
  };

  // Phân loại các routes
  Object.entries(pages).forEach(([filePath, component]) => {
    // Bỏ qua các file layout
    if (filePath.endsWith("/layout.vue")) {
      return;
    }

    // Chỉ xử lý các file page.vue
    if (!filePath.endsWith("/page.vue")) {
      return;
    }

    // Chuyển đổi đường dẫn file thành route path
    let routePath = filePath
      .replace("/src/pages", "")
      .replace(/\/page\.vue$/, "");

    // Xử lý route trống
    if (routePath === "") routePath = "/";

    // Kiểm tra nếu route thuộc layout admin
    if (routePath.startsWith("/admin")) {
      const childPath =
        routePath.replace("/admin", "").replace(/^\//, "") || "dashboard";
      const routeSegments = routePath.split("/").filter(Boolean);
      const routeName =
        routeSegments.length > 1
          ? `admin-${routeSegments.slice(1).join("-")}`
          : "admin-dashboard";

      layouts.admin.children.push({
        path: childPath,
        name: routeName,
        component,
      });

      console.log(
        `Added admin child route: '${childPath}' with name: ${routeName}`
      );
    }
    // Xử lý các route public (không có tiền tố /admin)
    else {
      // Kiểm tra xem path có bắt đầu bằng / không
      const normalizedPath = routePath.startsWith("/")
        ? routePath.substring(1)
        : routePath;

      // Tạo route name từ segments
      const routeSegments = normalizedPath.split("/").filter(Boolean);
      const routeName = routeSegments.length ? routeSegments.join("-") : "home";

      layouts.public.children.push({
        path: normalizedPath,
        name: routeName,
        component,
      });

      console.log(
        `Added public child route: '${normalizedPath}' with name: ${routeName}`
      );
    }
  });

  // Thêm redirect mặc định cho các layout
  Object.values(layouts).forEach((layout) => {
    if (layout.children.length > 0) {
      const firstRealChild = layout.children.find((child) => !child.redirect);

      if (firstRealChild) {
        layout.children.unshift({
          path: "",
          redirect: { name: firstRealChild.name },
        });
      }
    }
  });

  // Chỉ trả về các layout có children
  const finalRoutes = Object.values(layouts).filter(
    (layout) => layout.children.length > 0
  );

  // Thêm route 404 nếu cần
  finalRoutes.push({
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/components/common/404.vue"),
    children: [],
  });

  return finalRoutes;
}

const routes = buildRoutesFromPages();
console.log("Final routes:", JSON.stringify(routes, null, 2));

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
