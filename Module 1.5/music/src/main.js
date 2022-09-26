import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VeeValidatePlugin from "./includes/validation";
import Icon from "./directives/icon.js";
import { auth } from "./includes/firebase";
import { registerSW } from "virtual:pwa-register";
import GlobalComponents from "./includes/_globals.js";
import progressBar from "@/includes/progress-bar.js";

import "./assets/base.css";
import "./assets/main.css";
import "nprogress/nprogress.css";

registerSW({ immediate: true });

progressBar(router);

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);

    app.use(createPinia());
    app.use(router);
    app.use(VeeValidatePlugin);
    app.use(GlobalComponents);
    app.directive("icon", Icon);

    app.mount("#app");
  }
});
