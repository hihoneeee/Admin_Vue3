import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

// Thêm font Roboto
import "@fontsource/roboto/400.css"; // Regular
import "@fontsource/roboto/500.css"; // Medium
import "@fontsource/roboto/700.css"; // Bold

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
