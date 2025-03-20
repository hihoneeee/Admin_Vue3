import { createRouter, createWebHistory } from "vue-router";

const pages = import.meta.glob("/src/pages/**/*.vue");

function buildRoutesFromPages() {
  const layouts = {};
  const standaloneRoutes = [];

  // First pass: identify layout components
  Object.entries(pages).forEach(([filePath, component]) => {
    const layoutMatch = filePath.match(/\/src\/pages\/([^\/]+)\/index\.vue$/);
    if (layoutMatch) {
      const layoutName = layoutMatch[1];
      layouts[layoutName] = {
        path: `/${layoutName}`,
        name: layoutName,
        component: component,
        children: [],
      };
      console.log(`Found layout: ${layoutName} - ${filePath}`);
    }
  });

  console.log("All pages:", Object.keys(pages));

  // Second pass: organize routes into layouts or standalone
  Object.entries(pages).forEach(([filePath, component]) => {
    // Skip layout index files (already processed)
    if (filePath.match(/\/src\/pages\/([^\/]+)\/index\.vue$/)) {
      return;
    }

    // Convert file path to route path
    let routePath = filePath
      .replace("/src/pages", "")
      .replace(/\.vue$/, "")
      .replace(/\/index$/, "");

    // Handle empty routes
    if (routePath === "") routePath = "/";

    // Check if this belongs to a layout
    const layoutMatch = routePath.match(/^\/([^\/]+)/);

    if (layoutMatch && layouts[layoutMatch[1]]) {
      const layoutName = layoutMatch[1];
      // Extract the child path (everything after the layout name)
      let childPath = routePath.substring(layoutName.length + 1) || "";

      // Important fix: Remove leading slash if present
      if (childPath.startsWith("/")) {
        childPath = childPath.substring(1);
      }

      // Create route name that's more specific
      const routeSegments = routePath.split("/").filter(Boolean);
      const routeName = `${layoutName}-${routeSegments.slice(1).join("-")}`;

      layouts[layoutName].children.push({
        path: childPath,
        name: routeName || `${layoutName}-default`,
        component: component,
      });

      console.log(
        `Added child route: '${childPath}' to layout: ${layoutName} with name: ${routeName}`
      );
    } else {
      // This is a standalone route
      standaloneRoutes.push({
        path: routePath,
        name: routePath.replace(/\//g, "-").substring(1) || "home",
        component: component,
      });
    }
  });

  // Add default redirects for layouts with proper redirect path
  Object.keys(layouts).forEach((layoutName) => {
    if (layouts[layoutName].children.length > 0) {
      // Find the first child that's not a redirect itself
      const firstRealChild = layouts[layoutName].children.find(
        (child) => !child.redirect
      );

      if (firstRealChild) {
        layouts[layoutName].children.unshift({
          path: "",
          redirect: { name: firstRealChild.name },
        });
      }
    }
  });

  return [...standaloneRoutes, ...Object.values(layouts)];
}
const routes = buildRoutesFromPages();
console.log("Final routes:", JSON.stringify(routes, null, 2));

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
